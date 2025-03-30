import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import { Header } from "./Header";
import { Card } from "../Components/Card.jsx";
import { Link } from "react-router-dom";
import { SortOrder } from "../Components/SortOrder.jsx";

export const DashBoardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate(); // For navigation

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

  const handleDelete = async (taskId) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  // Filter tasks based on category
  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  // Sort tasks based on title (A-Z or Z-A)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`); // Navigate to the edit page
  };

  if (loading) {
    return (
      <div className="font-roboto">
        <Header />
        <main className="p-4">
          <h2 className="text-center text-2xl font-bold mb-6">
            Loading tasks...
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="font-roboto">
      <Header />
      <main className="flex flex-col h-screen">
        <div className="mb-12">
          <SortOrder
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="space-y-4">
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
                onDelete={handleDelete}
                onEdit={handleEdit} // Pass onEdit to Card
              />
            ))
          ) : (
            <p className="text-center">No tasks found.</p>
          )}
        </div>
      </main>

      {/* Add Task Button */}
      <div className="fixed bottom-6 right-6">
        <Link to="/create-task">
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
        </Link>
      </div>
    </div>
  );
};
