import { useState } from "react";
import "../css/App.css";

export const SortOrder = ({
  sortOrder,
  setSortOrder,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            {category}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#151515"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 5.92A.96.96 0 1 0 12 4a.96.96 0 0 0 0 1.92m0 7.04a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92M12 20a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92"
            ></path>
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu-sort">
            <div className="dropdown-header">Sort by Task</div>
            <button
              onClick={() => handleSort("asc")}
              className={`dropdown-item ${
                sortOrder === "asc" ? "selected" : ""
              }`}
            >
              A-Z
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`dropdown-item ${
                sortOrder === "desc" ? "selected" : ""
              }`}
            >
              Z-A
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
