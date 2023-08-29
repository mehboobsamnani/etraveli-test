import { IFilmDetail } from 'shared/types'
import { useMemo } from 'react'

const useFilter = (lists: any, searchTerm: string) => {
  const filteredList: IFilmDetail[] = useMemo(() => {
    if (!searchTerm) {
      return lists
    }
    return lists.filter((list: any) =>
      list.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, lists])

  return { filteredList }
}

export default useFilter
