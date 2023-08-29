import { useEffect, useState } from 'react'
import { IFilmDetail } from '../shared/types'
import { getFilms } from '../services/api'

const useFilms = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<IFilmDetail[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getFilms()
        setData(res.results)
        setIsLoading(false)
      } catch (error: any) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    fetchFilms()
  }, [])

  return { isLoading, data, error }
}

export default useFilms
