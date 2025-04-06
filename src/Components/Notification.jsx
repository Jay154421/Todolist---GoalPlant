import { useEffect, useState } from "react";
import supabase from "../Supabase/SupabaseClient";
import { format, parseISO, isToday, isAfter, addDays } from "date-fns";
import "../css/App.css"; // Import the CSS file

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const checkTasks = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const now = new Date();

        const { data: tasks, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_completed", false)
          .order("due_date", { ascending: true });

        if (error) throw error;

        if (tasks && tasks.length > 0) {
          const newNotifications = tasks.reduce((acc, task) => {
            if (!task.due_date) return acc;

            const dueDate = parseISO(task.due_date);
            const oneDayBefore = addDays(dueDate, -1);

            if (isAfter(now, dueDate)) {
              acc.push({
                id: `${task.id}-overdue`,
                taskId: task.id,
                message: `"${task.title}" is overdue!`,
                type: "overdue",
                dueDate: task.due_date,
              });
            } else if (isToday(dueDate)) {
              acc.push({
                id: `${task.id}-due-today`,
                taskId: task.id,
                message: `"${task.title}" is due today!`,
                type: "due-today",
                dueDate: task.due_date,
              });
            } else if (isToday(oneDayBefore) || isAfter(now, oneDayBefore)) {
              acc.push({
                id: `${task.id}-due-soon`,
                taskId: task.id,
                message: `"${task.title}" is due tomorrow (${format(
                  dueDate,
                  "MMM dd"
                )})`,
                type: "due-soon",
                dueDate: task.due_date,
              });
            }

            return acc;
          }, []);

          setNotifications(newNotifications);

          if (permission === "granted" && newNotifications.length > 0) {
            newNotifications.forEach((notification) => {
              new Notification("Task Reminder", {
                body: notification.message,
                icon: "/favicon.ico",
                tag: notification.id,
              });
            });
          }
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error checking tasks:", error);
      }
    };

    checkTasks();
    const interval = setInterval(checkTasks, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [permission]);

  const requestNotificationPermission = () => {
    if (!("Notification" in window)) return;
    Notification.requestPermission().then(setPermission);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleComplete = async (taskId) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ is_completed: true })
        .eq("id", taskId);
      if (!error)
        setNotifications(notifications.filter((n) => n.taskId !== taskId));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      <button
        onClick={() => {
          setShowNotifications(!showNotifications);
          if (permission !== "granted") requestNotificationPermission();
        }}
        className="notification-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
            <path
              fill="#007bff"
              d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21"
            ></path>
          </g>
        </svg>
        <span className="notification-badge">{notifications.length}</span>
      </button>

      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Task Reminders</h3>
            <button onClick={clearNotifications} className="clear-button">
              Clear All
            </button>
          </div>
          <ul className="notification-list">
            {notifications
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((notification) => (
                <li
                  key={notification.id}
                  className={`notification-item ${notification.type}`}
                >
                  <div>
                    <p>{notification.message}</p>
                    <p className="due-date">
                      Due:{" "}
                      {format(parseISO(notification.dueDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleComplete(notification.taskId)}
                    className="complete-button"
                    title="Mark as complete"
                  >
                    ✔
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
