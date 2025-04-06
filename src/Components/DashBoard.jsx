import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient.js";
import { Header } from "./Header.jsx";
import { Card } from "./Card.jsx";
import { Link } from "react-router-dom";
import { SortOrder } from "./SortOrder.jsx";
import { BulkAction } from "./BulkAction.jsx"; // Import the BulkAction component
import "../css/App.css";

export const DashBoardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [markedTasks, setMarkedTasks] = useState([]); // Track marked tasks
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("tasks")
          .select("id, title, priority, description, due_date, category")
          .eq("user_id", user.id)
          .eq("is_completed", false)
          .limit(50);

        if (error) throw error;
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle marking/unmarking a task
  const handleMarkTask = (taskId) => {
    setMarkedTasks(
      (prev) =>
        prev.includes(taskId)
          ? prev.filter((id) => id !== taskId) // Unmark task
          : [...prev, taskId] // Mark task
    );
  };

  // Handle Mark All functionality
  const handleMarkAll = () => {
    if (markedTasks.length === tasks.length) {
      setMarkedTasks([]); // Unmark all
    } else {
      setMarkedTasks(tasks.map((task) => task.id)); // Mark all
    }
  };

  // Handle Delete All functionality
  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .in("id", markedTasks); // Delete marked tasks

      if (error) throw error;
      setTasks(tasks.filter((task) => !markedTasks.includes(task.id))); // Remove deleted tasks from state
      setMarkedTasks([]); // Clear marked tasks
    } catch (error) {
      console.error("Error deleting tasks:", error.message);
    }
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const handleComplete = async (taskId, isCompleted) => {
    await supabase
      .from("tasks")
      .update({ is_completed: isCompleted })
      .eq("id", taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Header />
        <main className="dashboard-content">
          <h2 className="loading-text">Loading tasks...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-content">
        <div className="filter-container">
          <SortOrder
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <BulkAction
            onMarkAll={handleMarkAll}
            onDeleteAll={handleDeleteAll}
            isMarked={markedTasks.length === tasks.length}
          />
        </div>

        <div className="task-list">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                subtitle={task.description}
                dueDate={task.due_date}
                category={task.category}
                onDelete={handleDeleteAll}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onMarkTask={handleMarkTask} // Pass mark/unmark function to Card
                isMarked={markedTasks.includes(task.id)} // Pass marked status to Card
              />
            ))
          ) : (
            <p className="no-tasks">No tasks found.</p>
          )}
        </div>
      </main>

      <div className="add-task-button">
        <Link to="/create-task">
          <button className="add-task-icon">+</button>
        </Link>
      </div>
    </div>
  );
};
