import { useState } from "react";
import { PiNoteFill } from "react-icons/pi";
import OpenDialog from "./dialog.Jsx";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div className="flex items-center gap-2 mb-4 w-[100%]">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search employees..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-[70%] bg-[var(--bg)] text-[var(--textC)]"
      />

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="bg-[var(--textC)] text-[var(--bg)] px-4 py-2 rounded-md hover:bg-[var(--primary)] transition cursor-pointer"
      >
        Search
      </button>

      {/* Open helper dialog */}
      <button
        className="text-3xl cursor-pointer text-[var(--textC)]"
        title="search helper"
        onClick={() => setOpen(true)}
      >
        <PiNoteFill />
      </button>

      {/* Clear input */}
      <button
        onClick={() => {
          setQuery("");
          onSearch("");
        }}
        className="text-[var(--textC)] underline cursor-pointer"
      >
        Clear
      </button>

      {/* Dialog component */}
      <OpenDialog open={open} setOpen={setOpen} />
    </div>
  );
}
