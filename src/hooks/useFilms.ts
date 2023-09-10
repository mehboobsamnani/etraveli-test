import { useEffect, useState } from 'react'
import { IFilmDetail } from '../shared/types'
import { getFilms } from '../services/api'

const useFilms = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<IFilmDetail[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getFilms()
      .then((res) => {
        setData(res.results)
      })
      .catch((error: any) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { isLoading, data, error }
}

export default useFilms
