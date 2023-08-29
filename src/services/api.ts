import { IFilmDetail } from 'shared/types'

const getFilms = async () => {
  return getFetch('https://swapi.dev/api/films/?format=json')
}

const getFilmDetail = async ({
  title,
  release_date
}: Pick<IFilmDetail, 'title' | 'release_date'>) => {
  const [year] = release_date.split('-')
  return getFetch(
    `http://www.omdbapi.com/?apikey=b9a5e69d&t=${title}&y=${year}&plot=full`
  )
}

const getFetch = (url: string) => {
  return fetch(url).then(async response => {
    const res = await response.json()
    if (!response.ok) {
      return Promise.reject(res.message)
    }
    return res
  })
}
export { getFilms, getFilmDetail }