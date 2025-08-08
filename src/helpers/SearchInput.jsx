import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchInput = ({ searchTerm, onSearchTermChange, delay = 500 }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [timer, setTimer] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      onSearchTermChange(value);
    }, delay);

    setTimer(newTimer);
  };

  return (
    <div className="relative">
      <Label className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <Search className="size-4 text-gray-500/60 dark:text-accent" />
        </span>
        <Input
          type="search"
          className="max-w-xl px-9"
          // value={searchTerm}
          // onChange={(e) => onSearchTermChange(e.target.value)}
          value={inputValue || ""}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </Label>
    </div>
  );
};

export default SearchInput;
