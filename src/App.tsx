import { useState } from 'react'
import {
  useQuery,
} from '@tanstack/react-query'

import './App.css'
import {
  Dropdown,
  FilmDetails,
  Films,
  PageLoader,
  SearchFilter,
  Error
} from './components'
import { IFilmDetail } from './shared/types'
import { options } from './constants'
import { useSort, useFilter, useFilmsQuery } from './hooks'
import { films, filmDetails } from 'services/api'

function App() {

  const [selectedFilm, setSelectedFilm] = useState<IFilmDetail>()

  const { error, data, isLoading } = useFilmsQuery()

  const { error: filmError, data: metaDetails } = useQuery({
    enabled: !!selectedFilm,
    queryKey: ['filmDetail', selectedFilm?.episode_id, selectedFilm?.title],
    queryFn: () => selectedFilm && filmDetails(selectedFilm)
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const { sortedData, sortData } = useSort(data?.results, 'episode_id')
  const { filteredList } = useFilter(sortedData, searchTerm)

  const handleClick = (film: IFilmDetail) => {
    if (film.episode_id === selectedFilm?.episode_id) {
      setSelectedFilm(undefined)
      return
    }
    setSelectedFilm(film)
  }

  const handleSortChange = (selectedValue: string) => {
    sortData(selectedValue as keyof IFilmDetail)
  }

  return (
    <div className="app" data-testid="app">
      <Error err={[error as Error, filmError as Error]} />
      <Dropdown
        label="Sort By"
        options={options}
        onChange={handleSortChange}
        currentValue="episode_id"
      />
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? <PageLoader /> : <>
        <Films
          onClick={handleClick}
          films={filteredList}
          selectedFilm={selectedFilm}
        />
        <FilmDetails film={selectedFilm} metaDetails={metaDetails} />
      </>
      }
    </div>
  )
}

export default App
