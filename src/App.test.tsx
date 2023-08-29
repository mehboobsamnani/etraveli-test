import { render, fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils' //
import App from './App'
import * as api from './services/api'

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
    jest.spyOn(api, 'getFilms').mockResolvedValue({ results: mockFilms })

    // Mock the getFilmDetail function using jest.spyOn
    jest.spyOn(api, 'getFilmDetail').mockResolvedValue(mockFilmDetail)
  })

  test('renders the App component', async () => {
    render(<App />)
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

  test('displays error when useFilms returns an error', async () => {
    const error = "Error Message"
    jest.spyOn(api, 'getFilms').mockRejectedValue({ message: error })

    render(<App />)

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })

    const errorMessage = screen.getByText(error)
    expect(errorMessage).toBeInTheDocument()
  })
})
