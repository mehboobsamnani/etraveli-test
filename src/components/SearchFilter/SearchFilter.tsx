interface SearchFilterProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm
}) => {
  return (
    <input
      placeholder="Search by title"
      type="text"
      value={searchTerm}
      onChange={e => {
        setSearchTerm(e.target.value)
      }}
    />
  )
}

export default SearchFilter
