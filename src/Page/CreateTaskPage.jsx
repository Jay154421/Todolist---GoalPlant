import { useState } from "react";
import "../css/createtask.css";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";

export function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Handle date picker change
  const handleDateChange = (e) => {
    setDueDate(e.target.value);
    setShowCalendar(false); // Close calendar after selection
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: user.id,
        title,
        description,
        category,
        priority,
        due_date: dueDate,
      },
    ]);

    if (error) {
      setMessage(error.message); // Log error message
    } else {
      console.log("Task successfully added:", data);
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <div>{message}</div>}
      <div className="task-form">
        <h2 className="form-title">Add New Task</h2>

        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <div className="select-wrapper">
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="errands">Errands</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="low"
                name="priority"
                value="low"
                checked={priority === "low"}
                onChange={handlePriorityChange}
              />
              <label htmlFor="low" className="radio-label">
                Low
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="medium"
                name="priority"
                value="medium"
                checked={priority === "medium"}
                onChange={handlePriorityChange}
              />
              <label htmlFor="medium" className="radio-label medium">
                Medium
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="high"
                name="priority"
                value="high"
                checked={priority === "high"}
                onChange={handlePriorityChange}
              />
              <label htmlFor="high" className="radio-label high">
                High
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <div className="date-picker">
            <input
              type="text"
              id="dueDate"
              className="form-input date-input"
              placeholder="Select a date"
              value={dueDate}
              onClick={toggleCalendar}
              readOnly
            />
            <span className="calendar-icon" onClick={toggleCalendar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            {showCalendar && (
              <div className="calendar-dropdown">
                <input
                  type="date"
                  onChange={handleDateChange}
                  className="calendar-input"
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Link to="/dashboard">
            <button className="btn btn-cancel">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-submit">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
