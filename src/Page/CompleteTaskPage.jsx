// CompleteTaskPage.jsx
import { useState, useEffect } from "react";
import supabase from "../Supabase/SupabaseClient";
import { Header } from "./Header";
import { Card } from "../Components/Card.jsx";
import { Link } from "react-router-dom";

export const CompleteTaskPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading status

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        // Retrieve user authentication details
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // Fetch completed tasks for the authenticated user
        const { data, error } = await supabase
          .from("tasks")
          .select(
            "id, title, priority, description, due_date, category, is_completed"
          )
          .eq("user_id", user.id)
          .eq("is_completed", true) // Filter by completed tasks
          .limit(50); // Limit to 50 tasks for example

        if (error) {
          console.error("Error fetching completed tasks:", error.message);
          throw error;
        }

        setCompletedTasks(data); // Set tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false); // Set loading state to false once the fetch completes
      }
    };

    fetchCompletedTasks();

    return () => {
      setCompletedTasks([]); // Cleanup tasks on component unmount
    };
  }, []); // Empty dependency array to run only once when the component mounts

  // If data is still loading, display a loading message
  if (loading) {
    return (
      <div className="font-roboto">
        <Header />
        <main className="p-4">
          <h2 className="text-center text-2xl font-bold mb-6">
            Loading completed tasks...
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="font-roboto">
      <Header />
    
      {/* Main */}
      <main className="p-4">
        <h2 className="text-center text-xl font-bold mb-6">
          Completed Task List
        </h2>
        <div className="space-y-4">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <Card
                key={task.id}
                title={task.title}
                priority={task.priority}
                subtitle={task.description}
                dueDate={task.due_date}
                category={task.category}
              />
            ))
          ) : (
            <p className="text-center">No completed tasks found.</p>
          )}
        </div>
      </main>
    </div>
  );
};
