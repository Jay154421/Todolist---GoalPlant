import { useState, useEffect } from "react";
import supabase from "../Supabase/SupabaseClient";
import { Header } from "./Header";
import { Card } from "../Components/Card.jsx";

export const CompleteTaskPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("tasks")
          .select("id, title, priority, description, due_date, category")
          .eq("user_id", user.id)
          .eq("is_completed", true);

        if (!error) {
          setCompletedTasks(data);
        } else {
          throw error;
        }
      } catch (error) {
        console.error("Error fetching completed tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const handleUncomplete = async (taskId) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ is_completed: false })
        .eq("id", taskId);

      if (!error) {
        // Remove the task from the completed tasks list
        setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
      } else {
        throw error;
      }
    } catch (error) {
      console.error("Error marking task as incomplete:", error.message);
    }
  };

  return (
    <div className="font-roboto">
      <Header />
      <main className="p-4">
        <h2 className="text-center text-xl font-bold mb-6">Completed Tasks</h2>
        {loading ? (
          <p className="text-center ">Loading Task...</p>
        ) : completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              subtitle={task.description}
              dueDate={task.due_date}
              category={task.category}
              isCompleted={true}
              onComplete={handleUncomplete} // Pass the uncomplete handler
              onDelete={(id) => {
                // Optional: Add delete functionality if needed
                handleUncomplete(id); // Treat delete as uncomplete
              }}
            />
          ))
        ) : (
          <p className="text-center">No completed tasks.</p>
        )}
      </main>
    </div>
  );
};