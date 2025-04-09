import { useEffect, useState } from "react";
import supabase from "../Supabase/SupabaseClient.js";
import "../css/App.css";
import { Header } from "./Header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function TaskOverview() {
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Fetch completed tasks
        const { data: completedTasks } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_completed", true);

        // Fetch pending tasks
        const { data: pendingTasks } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_completed", false);

        setCompletedCount(completedTasks.length);
        setPendingCount(pendingTasks.length);

        // Generate weekly data
        const today = new Date();
        const thisWeek = [...Array(7)].map((_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - today.getDay() + i);
          return date.toISOString().slice(0, 10);
        });

        const tasksPerDay = thisWeek.map((date) => {
          return completedTasks.filter((task) =>
            task.created_at?.startsWith(date)
          ).length;
        });

        setWeeklyData(tasksPerDay);
      } catch (error) {
        console.error("Error fetching task stats:", error.message);
      }
    };

    fetchTaskStats();
  }, []);

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Tasks Completed",
        data: weeklyData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Daily Task Completion Statistics",
        color: "black",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="container-overview">
        <div className="box-overview">
          <div className="box-task-completed">
            <p className="no-task-completed">{completedCount}</p>
            <p>Task Completed</p>
          </div>
          <div className="box-task-pending">
            <p className="no-task-pending">{pendingCount}</p>
            <p>Pending Task</p>
          </div>
          <div className="box-task-statistics">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
