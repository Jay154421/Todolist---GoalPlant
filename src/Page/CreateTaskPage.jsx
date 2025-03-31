import { useState } from "react";
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

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("tasks").insert([
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
      setMessage(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-white shadow-lg rounded-lg">
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Task</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="work">Work</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <div className="flex space-x-4 mt-1">
            {[
              { label: "Low", value: "low" },
              {
                label: "Medium",
                value: "medium",
                className: "text-yellow-500",
              },
              { label: "High", value: "high", className: "text-red-500" },
            ].map(({ label, value, className }) => (
              <label key={value} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="priority"
                  value={value}
                  checked={priority === value}
                  onChange={handlePriorityChange}
                />
                <span className={`text-sm font-medium ${className}`}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded pl-10"
              placeholder="Select a date"
              value={dueDate}
              onClick={toggleCalendar}
              readOnly
            />
            <span
              className="absolute left-3 top-2 text-gray-500 cursor-pointer"
              onClick={toggleCalendar}
            >
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
        <div className="flex justify-between mt-4">
          <Link to="/dashboard">
            <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-[#007bff] text-white rounded hover:bg-[#82b8f3]"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
