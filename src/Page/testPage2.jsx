"use client";

import { useState } from "react";

export default function TestPage2() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  const tasks = [
    {
      id: "1",
      title: "Doe",
      subtitle: "Sub title",
      dueDate: new Date("2023-03-01"),
      isCompleted: false,
      category: "personal",
      priority: "medium",
    },
    {
      id: "2",
      title: "Zea",
      subtitle: "Sub title",
      dueDate: new Date("2023-04-01"),
      isCompleted: false,
      category: "shopping",
      priority: "low",
    },
    {
      id: "3",
      title: "Ave",
      subtitle: "Sub title",
      dueDate: new Date("2023-04-01"),
      isCompleted: false,
      category: "health",
      priority: "high",
    },
  ];

  // Filter tasks by selected category
  let filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  // Sort tasks based on sort order
  if (sortOrder !== "none") {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }

  const isOverdue = (date) => {
    return date < new Date();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 flex items-center">
        <button className="mr-4">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">GoalPlan</h1>
      </header>

      {/* Category Filters */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-3 py-1 text-xs rounded-full border bg-gray-100"
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
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
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

      {/* Task List */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg p-4 border shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded-sm border-2 border-gray-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === "low" && "bg-blue-100 text-blue-800"
                      } ${
                        task.priority === "medium" &&
                        "bg-orange-100 text-orange-800"
                      } ${
                        task.priority === "high" && "bg-red-100 text-red-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        task.category === "personal" &&
                        "bg-green-100 text-green-800"
                      } ${
                        task.category === "shopping" &&
                        "bg-orange-100 text-orange-800"
                      } ${
                        task.category === "health" &&
                        "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {task.category}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{task.subtitle}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="mr-1"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {isOverdue(task.dueDate) ? (
                      <span className="text-red-500">
                        Overdue: {formatDate(task.dueDate)}
                      </span>
                    ) : (
                      <span>Due: {formatDate(task.dueDate)}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-6 right-6">
        <button className="h-14 w-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 6v12M6 12h12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
