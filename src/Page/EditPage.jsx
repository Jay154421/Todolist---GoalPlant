import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import { Loading } from "../Components/Loading";

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
    <div className="max-w-md mx-auto mt-32 p-6 bg-white shadow-lg rounded-lg">
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium">Task</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={task.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={task.description}
            name="description"
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
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
                  checked={task.priority === value}
                  onChange={handlePriorityChange}
                />
                <span className={`text-sm font-medium ${className}`}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded pl-10"
              placeholder="Select a date"
              value={task.due_date}
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

        {/* Submit Button */}
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
            Edit Task
          </button>
        </div>
      </form>
    </div>
  );
}
