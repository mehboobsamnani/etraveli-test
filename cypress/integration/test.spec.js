/* global Cypress */
// Custom command to get and store the film list
Cypress.Commands.add('getAndStoreFilmList', () => {
    cy.intercept('GET', 'https://swapi.dev/api/films/?format=json').as('swapApiRequest');
    cy.wait('@swapApiRequest', { timeout: 40000 })
  });
  
  describe('Movie App', () => {
    before(() => {
      cy.visit("/"); 
      cy.getAndStoreFilmList();
    });
  
    it('displays detailed list of films', () => {
      cy.get('[data-testid="film"]').should('have.length.above', 1);
    });
  
    it('displays detailed view when a film is clicked', function () {
      cy.get('[data-testid="film"]').first().click();
      cy.get('[data-testid="filmDetail"]').should('be.visible');
    });
  
    it('allows filtering movies by name', () => {
        cy.get('[data-testid="title"]').first().invoke('text').then((text) => {
            // Use the copied text as needed
            cy.get('[data-testid="search-input"]').type(text);
            cy.get('[data-testid="film"]').should('have.length', 1);
          });
    });
  });
  