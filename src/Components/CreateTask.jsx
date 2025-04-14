import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import "../css/App.css"; // Import the CSS file
import { useTranslation } from "react-i18next";

export function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <div className="create-task-container">
      {message && <div className="message">{message}</div>}
      <h2 className="page-title">{t("Add New Task")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">{t("Task")}</label>
          <input
            type="text"
            className="form-input"
            placeholder={t("Task title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t("Description")}</label>
          <textarea
            className="form-textarea"
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="label">{t("Category")}</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="personal">{t("personal")}</option>
            {/* <option value="health">Health</option> */}
            <option value="work">{t("work")}</option>
            <option value="school">{t("school")}</option>
          </select>
        </div>
        <div>
          <label className="label">{t("Priority")}</label>
          <div className="priority-options">
            {[
              { label: "low", value: "low", className: "priority-low" },
              {
                label: "medium",
                value: "medium",
                className: "priority-medium",
              },
              { label: "high", value: "high", className: "priority-high" },
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
                  {t(label)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="label">{t("Due Date")}</label>
          <div className="due-date-wrapper">
            <input
              type="text"
              className="due-date-input"
              placeholder={t("Select a date")}
              value={dueDate}
              onClick={toggleCalendar}
              readOnly
            />
            {showCalendar && (
              <input
                type="date"
                onChange={handleDateChange}
                className="due-date-calendar"
              />
            )}
          </div>
        </div>
        <div className="button-container">
          <Link to="/dashboard">
            <button className="cancel-button">Cancel</button>
          </Link>
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
