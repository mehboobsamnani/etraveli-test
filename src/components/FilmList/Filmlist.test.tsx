import { render, fireEvent, screen } from '@testing-library/react'
import FilmList from './FilmList'

const mockEpisodes = [
  {
    episode_id: 1,
    title: 'Episode One',
    release_date: '2023-01-01',
    opening_crawl: '',
    ratings: [],
    director: 'Mehboob'
  }
  // Add more mock episodes as needed
]

test('renders episodes correctly', () => {
  render(<FilmList films={mockEpisodes} onClick={() => {}} />)
  mockEpisodes.forEach(episode => {
    const episodeElement = screen.getByTestId('film')
    expect(episodeElement).toBeInTheDocument()
  })
})

test('invokes onClick callback when clicking on an episode', () => {
  const mockClickHandler = jest.fn()
  render(
    <FilmList
      selectedFilm={mockEpisodes[0]}
      films={mockEpisodes}
      onClick={mockClickHandler}
    />
  )

  const episodeToClick = mockEpisodes[0]
  const episodeElement = screen.getByTestId('film')
  fireEvent.click(episodeElement)

  expect(mockClickHandler).toHaveBeenCalledWith(episodeToClick)
})

test('does not render anything when no episodes are provided', () => {
  render(<FilmList films={[]} onClick={() => {}} />)
  const episodeElement = screen.getByTestId('filmList')
  expect(episodeElement).toBeEmptyDOMElement()
})
