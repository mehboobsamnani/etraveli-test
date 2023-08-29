export interface DropdownProps {
  label: string
  options: Option[]
  onChange: (selectedValue: string) => void
  currentValue: string
}

export interface Option {
  label: string
  value: string
}

export interface IFilmDetail {
  title: string
  opening_crawl: string
  release_date: string
  episode_id: number
  director: string
}
