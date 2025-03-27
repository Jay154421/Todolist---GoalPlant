import { useState } from "react";

export const SortOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  //   const tasks = [
  //     {
  //       id: "1",
  //       title: "Doe",
  //       subtitle: "Sub title",
  //       dueDate: new Date("2023-03-01"),
  //       isCompleted: false,
  //       category: "personal",
  //       priority: "medium",
  //     },
  //     {
  //       id: "2",
  //       title: "Title",
  //       subtitle: "Sub title",
  //       dueDate: new Date("2023-04-01"),
  //       isCompleted: false,
  //       category: "shopping",
  //       priority: "low",
  //     },
  //     {
  //       id: "3",
  //       title: "All",
  //       subtitle: "Sub title",
  //       dueDate: new Date("2023-04-01"),
  //       isCompleted: false,
  //       category: "health",
  //       priority: "high",
  //     },
  //   ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  //   Filter tasks by selected category
  //     let filteredTasks = selectedCategory
  //       ? tasks.filter((task) => task.category === selectedCategory)
  //       : tasks;

  //   Sort tasks based on sort order
  //     if (sortOrder !== "none") {
  //       filteredTasks = [...filteredTasks].sort((a, b) => {
  //         if (sortOrder === "asc") {
  //           return a.title.localeCompare(b.title);
  //         } else {
  //           return b.title.localeCompare(a.title);
  //         }
  //       });
  //     }

  return (
    <>
      {/* Category Filters */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-3 py-1 text-xs rounded-full border-1 border-gray-400 bg-gray-100"
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("personal")}
            className={`px-3 py-1 text-xs rounded-full border border-green-200 ${
              selectedCategory === "personal"
                ? "bg-green-100 text-green-800"
                : "bg-white text-green-800"
            }`}
          >
            personal
          </button>
          <button
            onClick={() => setSelectedCategory("shopping")}
            className={`px-3 py-1 text-xs rounded-full border border-orange-200 ${
              selectedCategory === "shopping"
                ? "bg-orange-100 text-orange-800"
                : "bg-white text-orange-800"
            }`}
          >
            shopping
          </button>
          <button
            onClick={() => setSelectedCategory("health")}
            className={`px-3 py-1 text-xs rounded-full border border-teal-200 ${
              selectedCategory === "health"
                ? "bg-teal-100 text-teal-800"
                : "bg-white text-teal-800"
            }`}
          >
            health
          </button>
        </div>
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
                  Sort by Title
                </div>
                <button
                  onClick={() => handleSort("asc")}
                  className={`flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${
                    sortOrder === "asc" && "bg-gray-50"
                  }`}
                >
                  <svg width="16" height="16" className="mr-2 h-4 w-4">
                    <path d="M6 9l6-6 6 6" />
                  </svg>
                  A-Z
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 ${
                    sortOrder === "desc" && "bg-gray-50"
                  }`}
                >
                  <svg width="16" height="16" className="mr-2 h-4 w-4">
                    <path d="M6 9l6-6 6 6" />
                  </svg>
                  Z-A
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
