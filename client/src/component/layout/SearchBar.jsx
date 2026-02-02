import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const SearchBar = ({ search, setSearch, onSearch }) => {


    return (
        <div className="flex items-center gap-2">
            <Input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full"
            />
            <Button onClick={onSearch} variant="ghost">Search</Button>
        </div>
    )
}

export default SearchBar