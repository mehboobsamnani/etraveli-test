import { IFilmDetail } from 'shared/types'
import { useState, useEffect, useMemo } from 'react'

const useSort = (
  initialData: IFilmDetail[],
  initialSortKey: keyof IFilmDetail
) => {
  const [data, setData] = useState<IFilmDetail[]>([])
  const [sortKey, setSortKey] = useState<keyof IFilmDetail>(initialSortKey)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const sortedData = useMemo(() => {
    const sortedArray = [...data].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]
      if (aValue && bValue) {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
      return 0
    })

    return sortedArray
  }, [data, sortKey])

  const sortData = (key: keyof IFilmDetail) => {
    setSortKey(key)
  }

  return { sortedData, sortData }
}

export default useSort
