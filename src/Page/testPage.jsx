import React, { useState } from "react";

export default function TestPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const tasks = [
    {
      id: "1",
      title: "Title 1",
      subtitle: "Sub title",
      dueDate: new Date("2023-03-01"),
      category: "personal",
      priority: "medium",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Title 2",
      subtitle: "Sub title",
      dueDate: new Date("2023-04-01"),
      category: "shopping",
      priority: "low",
      isCompleted: false,
    },
    {
      id: "3",
      title: "Title 3",
      subtitle: "Sub title",
      dueDate: new Date("2023-04-01"),
      category: "health",
      priority: "high",
      isCompleted: false,
    },
  ];

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const isOverdue = (date) => date < new Date();
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

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
          {["All", "personal", "shopping", "health"].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category === "All" ? null : category)
              }
              className={`px-3 py-1 text-xs rounded-full border ${
                selectedCategory === category ? "bg-blue-100" : "bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button>{/* Placeholder for menu */}</button>
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
                  <h3 className="font-medium">{task.title}</h3>
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
                  {/* Edit button placeholder */}
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  {/* Delete button placeholder */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-6 right-6">
        <button className="h-14 w-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
          {/* Plus icon placeholder */}
        </button>
      </div>
    </div>
  );
}
