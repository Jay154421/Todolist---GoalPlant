import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../css/App.css";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const onSelectLanguage = (langCode) => {
    i18n.changeLanguage(langCode); // Changes language in i18next
    setIsDropdownOpen(false);
  };

  return (
    <div className="language-dropdown">
      <button className="language-button" onClick={toggleDropdown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8 8 0 0 1 5.08 16m2.95-8H5.08a8 8 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z"
          ></path>
        </svg>{" "}
        <span style={{ fontSize: "0.8em", marginLeft: "4px" }}>▼</span>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="dropdown-item"
              onClick={() => onSelectLanguage(lang.code)}
            >
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <span style={{ marginLeft: "8px" }}>✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
