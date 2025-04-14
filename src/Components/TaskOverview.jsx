import { useEffect, useState } from "react";
import supabase from "../Supabase/SupabaseClient.js";
import "../css/App.css";
import { Header } from "./Header";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

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
  const [totalTrackedTime, setTotalTrackedTime] = useState(0);
  const { t } = useTranslation();

  console.log("Total Tracked Time:", totalTrackedTime);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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

    let totalSeconds = 0;
    for (let key in localStorage) {
      if (key.startsWith("task-time-")) {
        const value = parseInt(localStorage.getItem(key), 10);
        if (!isNaN(value)) {
          totalSeconds += value;
        }
      }
    }
    setTotalTrackedTime(totalSeconds);

    fetchTaskStats();
  }, []);

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: t("Task Completed"),
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
        text: t("Daily Task Completed Statistics"),
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
            <p>{t("Task Completed")}</p>
          </div>
          <div className="box-task-pending">
            <p className="no-task-pending">{pendingCount}</p>
            <p>{t("Pending Task")}</p>
          </div>
          <div className="box-task-tracked">
            <p className="total-tracked-time">{formatTime(totalTrackedTime)}</p>
            <p>{t("Total Time Tracked")}</p>
          </div>
          <div className="box-task-statistics">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
