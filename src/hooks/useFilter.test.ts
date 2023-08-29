import { renderHook } from '@testing-library/react'
import useFilter from './useFilter'
import { IFilmDetail } from 'shared/types'

const mockLists: IFilmDetail[] = [
  {
    title: 'Film A',
    episode_id: 2,
    release_date: '2000-01-01',
    opening_crawl: '',
    ratings: [],
    director: ''
  },
  {
    title: 'Film B',
    episode_id: 1,
    release_date: '2001-01-01',
    opening_crawl: '',
    ratings: [],
    director: ''
  }
]

describe('useFilter Hook', () => {
  it('should return the same list when searchTerm is empty', () => {
    const { result } = renderHook(() => useFilter(mockLists, ''))

    expect(result.current.filteredList).toEqual(mockLists)
  })

  it('should filter the list based on the searchTerm', () => {
    const { result } = renderHook(() => useFilter(mockLists, 'film'))

    expect(result.current.filteredList).toHaveLength(2)
    expect(result.current.filteredList[0].title).toBe('Film A')
    expect(result.current.filteredList[1].title).toBe('Film B')
  })

  it('should not filter the list when searchTerm is not found', () => {
    const { result } = renderHook(() => useFilter(mockLists, 'xyz'))

    expect(result.current.filteredList).toHaveLength(0)
  })
})
