import React from 'react'
import { render, screen } from '@testing-library/react'
import FilmDetails from './FilmDetails'

const mockEpisode = {
  title: 'Episode One',
  opening_crawl: 'A long time ago...',
  director: 'Director Name',
  release_date: '2001-01-15',
  episode_id: 1
}
const mockMetaDetail = {
  poster: 'poster-url',
  ratings: [
    { Source: 'Internet Movie Database', Value: '7.5/10' },
    { Source: 'Rotten Tomatoes', Value: '75%' },
    { Source: 'Metacritic', Value: '75/100' }
  ],
}

test('renders film details correctly', () => {
  render(<FilmDetails film={mockEpisode} metaDetails={mockMetaDetail} />)

  expect(screen.getByText('Episode I - Episode One')).toBeInTheDocument()
  expect(screen.getByText('A long time ago...')).toBeInTheDocument()
  expect(screen.getByText('Directed By: Director Name')).toBeInTheDocument()
  expect(screen.getByAltText('Episode One')).toBeInTheDocument()
  expect(screen.getByText('Average Rating:')).toBeInTheDocument()
  expect(
    screen.getByText('Internet Movie Database: 7.5/10')
  ).toBeInTheDocument()
  expect(screen.getByText('Rotten Tomatoes: 75%')).toBeInTheDocument()
  expect(screen.getByText('Metacritic: 75/100')).toBeInTheDocument()
})

test('renders data-score attribute with specific value', () => {
  render(<FilmDetails film={mockEpisode} metaDetails={mockMetaDetail} />)
  const scoreElement = screen.getByTestId('score')
  expect(scoreElement).toHaveAttribute('data-score', '7.5') // Replace with your expected score value
})

test('renders message when no episode data is provided', () => {
  render(<FilmDetails metaDetails={mockMetaDetail}/>)
  expect(
    screen.getByText('Select Film from the list to view detail.')
  ).toBeInTheDocument()
})
