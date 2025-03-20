import "../css/dashboard.css";
import { useState } from "react";

export function HomePage() {
  const [tasks, setTasks] = useState([
    // Static task data
    {
      id: 1,
      title: "Task 1",
      priority: "High",
      category: "Work",
      subId: "1",
      completed: false,
      isOverdue: false,
      dueDate: "2025-03-21",
    },
    {
      id: 2,
      title: "Task 2",
      priority: "Medium",
      category: "Personal",
      subId: "2",
      completed: true,
      isOverdue: true,
      dueDate: "2025-03-18",
    },
    {
      id: 3,
      title: "Task 3",
      priority: "Low",
      category: "Study",
      subId: "3",
      completed: false,
      isOverdue: false,
      dueDate: "2025-03-22",
    },
  ]);

  // Add task function (static implementation)
  const addTask = () => {
    alert("Add task functionality would go here");
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task function
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Update the state after deletion
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>

      <div className="button-container">
        <button onClick={addTask} className="add-button">
          + Add Task
        </button>

        <button className="filter-button">Filters</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-content">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="checkbox"
                />
              </div>

              <div className="task-details">
                <div className="task-header">
                  <span className="task-title">{task.title}</span>

                  <span className={`tag priority-${task.priority}`}>
                    {task.priority}
                  </span>

                  <span className={`tag category-${task.category}`}>
                    {task.category}
                  </span>
                </div>

                <p className="task-id">{task.subId}</p>

                {task.isOverdue && (
                  <div className="overdue">
                    Clock
                    <span>Overdue: {task.dueDate}</span>
                  </div>
                )}
              </div>

              <div className="task-actions">
                <button className="action-button edit-button">Edit</button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
