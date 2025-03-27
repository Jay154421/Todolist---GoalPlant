import { useState, useEffect } from "react";
import supabase from "../Supabase/SupabaseClient";
import { Header } from "./Header";
import { Card } from "../Components/Card.jsx";
import { Link } from "react-router-dom";
import { SortOrder } from "../Components/SortOrder.jsx";

export const DashBoardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading status

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Retrieve user authentication details
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // Fetch tasks for the authenticated user, specifying only needed fields
        const { data, error } = await supabase
          .from("tasks")
          .select("id, title, priority, description, due_date, category") // Select specific columns
          .eq("user_id", user.id) // Filter by user_id
          .limit(50); // Limit the number of tasks fetched to 50 (for example)

        if (error) {
          console.error("Error fetching tasks:", error.message);
          throw error;
        }

        setTasks(data); // Set tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false); // Set loading state to false once the fetch completes
      }
    };

    fetchTasks();

    return () => {
      setTasks([]); // Cleanup tasks on component unmount
    };
  }, []); // Empty dependency array to run only once when the component mounts

  const handleDelete = async (taskId) => {
    try {
      // Delete the task from the database
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      console.log(taskId);
      if (error) throw error;

      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  // If data is still loading, display a loading message
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

      {/* Main */}
      <main className="flex flex-col h-screen">
        <div className="mb-12">
          <SortOrder />
        </div>

        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority}
                subtitle={task.description}
                dueDate={task.due_date}
                category={task.category}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center">No tasks found.</p>
          )}
        </div>
      </main>

      {/* Add button */}
      <Link to="/create-task">
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5z"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};
