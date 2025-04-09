import { useState } from "react";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import "../css/App.css";

export const SortOrder = ({
  sortOrder,
  setSortOrder,
  selectedCategory,
  setSelectedCategory,
  cardLayout,
  setCardLayout,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation(); // Initialize the useTranslation hook

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSort = (order) => {
    console.log("Sorting by:", order);
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  return (
    <div className="sort-container">
      {/* Category Filters */}
      <div className="category-filters">
        {["All", "personal", "work", "school"].map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === "All" ? null : category)
            }
            className={`category-button ${category} ${
              selectedCategory === category ? "selected" : ""
            }`}
          >
            {t(category)} {/* Translate category names */}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill="#000"
              d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4m0 9.6a2.2 2.2 0 1 0 0 4.402a2.2 2.2 0 0 0 0-4.402"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu-sort">
            <div className="dropdown-header">{t("Sort by Task")}</div>
            {/* Translate header */}
            <button
              onClick={() => handleSort("asc")}
              className={`dropdown-item ${
                sortOrder === "asc" ? "selected" : ""
              }`}
            >
              {t("A-Z")} {/* Translate text */}
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`dropdown-item ${
                sortOrder === "desc" ? "selected" : ""
              }`}
            >
              {t("Z-A")} {/* Translate text */}
            </button>
            <div className="dropdown-header">{t("Customize Task")}</div>
            <button
              className={`dropdown-item ${
                cardLayout === "layout1" ? "selected" : ""
              }`}
              onClick={() => setCardLayout("layout1")}
            >
              Layout 1 (Default)
            </button>
            <button
              className={`dropdown-item ${
                cardLayout === "layout2" ? "selected" : ""
              }`}
              onClick={() => setCardLayout("layout2")}
            >
              Layout 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
