import React, { useState } from "react";

function LanguageDropdown({ onLanguageChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("EN");

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" },
  ];

  const handleSelect = (lang) => {
    setSelected(lang.label);
    setOpen(false);
    onLanguageChange(lang.code);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-900 px-3 py-2 rounded-md hover:bg-green-500 transition"
      >
        🌐 {selected}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-32">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;