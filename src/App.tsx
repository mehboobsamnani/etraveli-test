import { useState } from 'react'
import './App.css'
import {
  Dropdown,
  FilmDetails,
  Films,
  PageLoader,
  SearchFilter
} from './components'
import { IFilmDetail } from './shared/types'
import { options } from './constants'
import { useSort, useFilter, useFilms, useFilmDetail } from './hooks'
function App() {

  const [selectedFilm, setSelectedFilm] = useState<IFilmDetail>()
  const { isLoading, data: films, error } = useFilms()

  const { data: filmDetails, error: filmError } = useFilmDetail(selectedFilm)
  const [searchTerm, setSearchTerm] = useState('')
  const { sortedData, sortData } = useSort(films, 'episode_id')
  const { filteredList } = useFilter(sortedData, searchTerm)

  const handleClick = (film: IFilmDetail) => {
    if(film.episode_id === selectedFilm?.episode_id) {
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
      {isLoading && <PageLoader />}
      {(error || filmError) && (
        <p data-testid="error" className="error">
          {error || filmError}
        </p>
      )}

      <Dropdown
        label="Sort By"
        options={options}
        onChange={handleSortChange}
        currentValue="episode_id"
      />
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Films
        onClick={handleClick}
        films={filteredList}
        selectedFilm={selectedFilm}
      />
      <FilmDetails film={selectedFilm} metaDetails={filmDetails} />
    </div>
  )
}

export default App
