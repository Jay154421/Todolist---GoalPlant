import { useState } from "react";

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
    <div className="p-4 flex items-center justify-between border-b border-gray-200">
      {/* Category Filters */}
      <div className="flex space-x-2">
        {["All", "personal", "shopping", "health", "work", "school"].map(
          (category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category === "All" ? null : category)
              }
              className={`px-3 py-1 text-xs rounded-full border ${category === "All"
                  ? "border-gray-400 bg-gray-100"
                  : category === "personal"
                    ? `border-green-200 ${selectedCategory === "personal"
                      ? "bg-green-100 text-green-800"
                      : "bg-white text-green-800"
                    }`
                    : category === "shopping"
                      ? `border-orange-200 ${selectedCategory === "shopping"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-white text-orange-800"
                      }`
                      : category === "health"
                        ? `border-teal-200 ${selectedCategory === "health"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-white text-teal-800"
                        }`
                        : category === "work"
                          ? `border-blue-200 ${selectedCategory === "work"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-white text-blue-800"
                          }`
                          : category === "school"
                            ? `border-purple-200 ${selectedCategory === "school"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-white text-purple-800"
                            }`
                            : ""
                }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="p-1 rounded-full hover:bg-gray-100"
        >
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
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-400">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-400">
                Sort by Task
              </div>
              <button
                onClick={() => handleSort("asc")}
                className={`flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${sortOrder === "asc" ? "bg-gray-50" : ""
                  }`}
              >
                A-Z
              </button>
              <button
                onClick={() => handleSort("desc")}
                className={`flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${sortOrder === "desc" ? "bg-gray-50" : ""
                  }`}
              >
                Z-A
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
