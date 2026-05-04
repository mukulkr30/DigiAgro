import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching:", query);
  };

  return (
    <div className="flex w-full max-w-md bg-white rounded-lg overflow-hidden shadow-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search crops, weather..."
        className="flex-1 px-3 py-2 text-black outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 px-4 text-white hover:bg-blue-600 transition"
      >
        🔍
      </button>
    </div>
  );
}

export default SearchBar;