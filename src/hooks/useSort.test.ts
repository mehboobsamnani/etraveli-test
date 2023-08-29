import { renderHook, act } from '@testing-library/react'
import useSort from './useSort'
import { IFilmDetail } from 'shared/types'

const mockData: IFilmDetail[] = [
  {
    title: 'Film A',
    episode_id: 2,
    release_date: '2000-01-01',
    opening_crawl: '',
    director: ''
  },
  {
    title: 'Film B',
    episode_id: 1,
    release_date: '2001-01-01',
    opening_crawl: '',
    director: ''
  }
]

describe('useSort Hook', () => {
  it('should sort data based on initial sort key', () => {
    const { result } = renderHook(() => useSort(mockData, 'episode_id'))

    expect(result.current.sortedData[0].title).toBe('Film B')
  })

  it('should change sort key and update sorted data', () => {
    const { result } = renderHook(() => useSort(mockData, 'episode_id'))

    act(() => {
      result.current.sortData('release_date')
    })

    expect(result.current.sortedData[0].title).toBe('Film A')
  })

  it('should update data when initialData changes', () => {
    const { result, rerender } = renderHook(
      ({ data }) => useSort(data, 'episode_id'),
      { initialProps: { data: mockData } }
    )

    const updatedData = [
      {
        title: 'Film C',
        episode_id: 3,
        release_date: '2002-01-01',
        opening_crawl: '',
        ratings: [],
        director: ''
      }
    ]

    rerender({ data: updatedData })

    expect(result.current.sortedData[0].title).toBe('Film C')
  })
})
