import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import { Loading } from "./Loading";
import "../css/App.css";

export function EditPage() {
  const { taskId } = useParams(); // Get taskId from URL
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", taskId)
        .single();
      if (error) {
        setMessage(error.message);
      } else {
        setTask(data);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (e) => {
    setTask({ ...task, priority: e.target.value });
  };

  const handleDateChange = (e) => {
    setTask({ ...task, due_date: e.target.value });
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("tasks")
      .update({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        due_date: task.due_date,
      })
      .eq("id", taskId);

    if (error) {
      setMessage(error.message);
    } else {
      navigate("/dashboard"); // Navigate back to dashboard after edit
    }
  };

  if (!task) {
    return <Loading />;
  }

  return (
    <div className="edit-container">
      {message && <div className="error-message">{message}</div>}
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Task Title */}
        <div>
          <label>Task</label>
          <input
            type="text"
            className="task-title"
            value={task.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        {/* Task Description */}
        <div>
          <label>Description</label>
          <textarea
            className="task-description"
            value={task.description}
            name="description"
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            className="category-select"
            value={task.category}
            name="category"
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="work">Work</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex">
          {[
            { label: "Low", value: "low", className: "priority-low" },
            { label: "Medium", value: "medium", className: "priority-medium" },
            { label: "High", value: "high", className: "priority-high" },
          ].map(({ label, value, className }) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                type="radio"
                name="priority"
                value={value}
                checked={task.priority === value}
                onChange={handlePriorityChange}
              />
              <span className={`text-sm font-medium ${className}`}>
                {label}
              </span>
            </label>
          ))}
        </div>

        {/* Due Date */}
        <div>
          <label>Due Date</label>
          <div className="date-picker-container">
            <input
              type="text"
              className="date-picker"
              placeholder="Select a date"
              value={task.due_date}
              onClick={toggleCalendar}
              readOnly
            />
            <span className="date-picker-icon" onClick={toggleCalendar}>
              📅
            </span>
            {showCalendar && (
              <input
                type="date"
                onChange={handleDateChange}
                className="absolute top-full left-0 bg-white border border-gray-300 shadow-md p-2 rounded"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between mt-4">
          <Link to="/dashboard">
            <button className="cancel-button">Cancel</button>
          </Link>
          <button type="submit" className="submit-button">
            Edit Task
          </button>
        </div>
      </form>
    </div>
  );
}
