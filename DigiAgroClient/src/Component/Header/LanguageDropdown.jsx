import React, { useState } from "react"
import "./SuperHeader.css"

function LanguageDropdown({ onLanguageChange }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("EN")

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" },
  ]

  const handleSelect = (lang) => {
    setSelected(lang.label)
    setOpen(false)
    onLanguageChange(lang.code)
  }

  return (
    <div className="language-dropdown">
      <button
        className="language-btn"
        onClick={() => setOpen(!open)}
      >
        🌐 {selected} ▼
      </button>

      {open && (
        <div className="language-menu">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="language-item"
              onClick={() => handleSelect(lang)}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
