import styles from "./SearchFilter.module.css"

interface SearchFilterProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className={styles.search_filter}>
      <input
        placeholder="Search by title"
        type="search"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value)
        }}
      />
    </div>

  )
}

export default SearchFilter
