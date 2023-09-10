import { render, fireEvent, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';
import { act } from 'react-dom/test-utils' //
import App from './App'
import * as api from './services/api'
import { useFilmsQuery } from "./hooks";

const mockedUseUsersQuery = useFilmsQuery as jest.Mock;
jest.mock("./hooks/useFilmsQuery");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe('App Component', () => {
  // Mocked data for testing
  const mockFilms = [
    {
      title: 'Episode One',
      episode_id: 1,
      release_date: '2000-01-01'
    },
    {
      title: 'Episode Two',
      episode_id: 2,
      release_date: '2001-01-01'
    }
  ]

  const mockFilmDetail = {
    Ratings: [{ Source: 'IMDB', Value: '98%' }],
    Poster: 'mock-poster-url'
  }

  // Set up mocks before each test
  beforeEach(() => {
    // Mock the getFilms function
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      data : { results: mockFilms },
    }));
    // Mock the getFilmDetail function using jest.spyOn
    jest.spyOn(api, 'filmDetails').mockResolvedValue(mockFilmDetail)
  })
  const AppComponent = 
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  
  test('renders the App component', async () => {
    render( AppComponent)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    const episodeOne = screen.getByText('Episode One')
    fireEvent.click(episodeOne)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(screen.getAllByText('Episode I - Episode One').length).toBe(1)
    expect(episodeOne).toBeInTheDocument()
  })

  test('displays error when films returns an error', async () => {
    const error = "Error Message"
    mockedUseUsersQuery.mockImplementation(() => ({
      isLoading: false,
      error: new Error(error),
    }));

    render(AppComponent)

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    const errorMessage = screen.getByText(error)
    expect(errorMessage).toBeInTheDocument()
  })
})
