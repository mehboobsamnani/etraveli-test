import { renderHook, act } from '@testing-library/react'
import useFilms from './useFilms'

describe('useFilms Hook', () => {
  beforeEach(() => {
    const mockData = {
      results: [
        {
          title: 'Film A',
          episode_id: 1,
          release_date: '2000-01-01'
        }
      ]
    }

    const mockJsonPromise = Promise.resolve(mockData)

    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise
    })

    global.fetch = jest.fn().mockResolvedValue(mockFetchPromise)
  })

  it('should fetch and return film data', async () => {
    const { result } = renderHook(() => useFilms())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.data).toEqual([
      {
        title: 'Film A',
        episode_id: 1,
        release_date: '2000-01-01'
      }
    ])
  })

  it('should handle fetch error', async () => {
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: jest.fn().mockRejectedValue({ message: 'Error message' })
    })

    global.fetch = jest.fn().mockResolvedValue(mockFetchPromise)

    const { result } = renderHook(() => useFilms())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Error message')
    expect(result.current.data.length).toBe(0)
  })
})
