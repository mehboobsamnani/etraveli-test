import { useState } from 'react'
import './App.css'
import { getFilmDetail } from './services/api'
import {
  Dropdown,
  FilmDetails,
  Films,
  PageLoader,
  SearchFilter
} from './components'
import { IFilmDetail } from './shared/types'
import { options } from './constants'
import { useSort, useFilter, useFilms } from './hooks'
function App() {
  const [selectedEpisode, setSelectedEpisode] = useState<IFilmDetail>()
  const { isLoading, data: films, error } = useFilms()
  const [searchTerm, setSearchTerm] = useState('')
  const { sortedData, sortData } = useSort(films, 'episode_id')
  const { filteredList } = useFilter(sortedData, searchTerm)

  const setFilmDetails = async (selectedEpisode: any) => {
    try {
      const res = await getFilmDetail(selectedEpisode)
      setSelectedEpisode({
        ...selectedEpisode,
        ratings: res.Ratings,
        poster: res.Poster
      })
    } catch (e) {
      console.log('error', e)
    }
  }

  const handleClick = (selectedEpisode: IFilmDetail) => {
    setSelectedEpisode(selectedEpisode)
    setFilmDetails(selectedEpisode)
  }

  const handleSortChange = (selectedValue: string) => {
    sortData(selectedValue as keyof IFilmDetail)
  }

  return (
    <div className="app" data-testid="app">
      {isLoading && <PageLoader />}
      {error && (
        <p data-testid="error" className="error">
          Failed to load Data
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
        selectedFilm={selectedEpisode}
      />
      <FilmDetails episode={selectedEpisode} />
    </div>
  )
}

export default App
