import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/helpers/SearchInput";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  pageLimit,
  onLimitChange,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
      <Select onValueChange={onLimitChange} defaultValue={pageLimit}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Set page limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Set page limit</SelectLabel>
            {["All", "10", "20", "40", "60", "80", "100"].map((val) => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <SearchInput
        searchTerm={searchTerm}
        onSearchTermChange={(term) => {
          onSearchChange(term);
        }}
      />
    </div>
  );
};

export default FilterBar;
