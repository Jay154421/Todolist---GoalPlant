import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient.js";
import { Header } from "./Header.jsx";
import { Card } from "./Card.jsx";
import { Link } from "react-router-dom";
import { SortOrder } from "./SortOrder.jsx";
import { BulkAction } from "./BulkAction.jsx";
import "../css/App.css";

export const DashBoardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [markedTasks, setMarkedTasks] = useState([]);
  const [cardLayout, setCardLayout] = useState("layout1");
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

  const handleDelete = async (taskId) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const sortedTasks = [...filteredTasks].sort((a, b) => a.order - b.order);

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

  //Drag and Drop Function
  // 1. Reorder utility
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // 2. Drag start — store dragged index in dataTransfer
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
    e.currentTarget.classList.add("dragging");
  };

  // 3. Drag end — reset visual
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  // 4. Drop — reorder local task list
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    if (isNaN(dragIndex)) return;

    const newTaskOrder = reorder(tasks, dragIndex, dropIndex);
    setTasks(newTaskOrder);

    // Animate dropped card
    const dropTarget = e.currentTarget;
    dropTarget.classList.add("drop-anim");

    setTimeout(() => {
      dropTarget.classList.remove("drop-anim");
    }, 300); // Match this to animation duration
  };

  // 5. Drag over — required to allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            cardLayout={cardLayout}
            setCardLayout={setCardLayout}
          />

          <BulkAction
            onMarkAll={handleMarkAll}
            onDeleteAll={handleDeleteAll}
            isMarked={markedTasks.length === tasks.length}
          />
        </div>

        <div className="task-list">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task, index) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                subtitle={task.description}
                dueDate={task.due_date}
                category={task.category}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onMarkTask={handleMarkTask} // Pass mark/unmark function to Card
                isMarked={markedTasks.includes(task.id)} // Pass marked status to Card
                layout={cardLayout}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
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
