// src/Components/Notification.jsx
import { useEffect, useState } from "react";
import supabase from "../Supabase/SupabaseClient";
import { format, parseISO, isToday, isAfter, addDays } from 'date-fns';

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [permission, setPermission] = useState(Notification.permission);

    // Check for due tasks and set notifications
    useEffect(() => {
        const checkTasks = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                const now = new Date();

                // Get tasks that are due today or in the next 24 hours
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

                        // Check if task is overdue, due today, or due tomorrow
                        if (isAfter(now, dueDate)) {
                            // Overdue task
                            acc.push({
                                id: `${task.id}-overdue`,
                                taskId: task.id,
                                message: `"${task.title}" is overdue!`,
                                isOverdue: true,
                                dueDate: task.due_date,
                                type: 'overdue'
                            });
                        } else if (isToday(dueDate)) {
                            // Due today
                            acc.push({
                                id: `${task.id}-due-today`,
                                taskId: task.id,
                                message: `"${task.title}" is due today!`,
                                isOverdue: false,
                                dueDate: task.due_date,
                                type: 'due-today'
                            });
                        } else if (isToday(oneDayBefore) || isAfter(now, oneDayBefore)) {
                            // Due tomorrow (1 day before)
                            acc.push({
                                id: `${task.id}-due-soon`,
                                taskId: task.id,
                                message: `"${task.title}" is due tomorrow (${format(dueDate, 'MMM dd')})`,
                                isOverdue: false,
                                dueDate: task.due_date,
                                type: 'due-soon'
                            });
                        }

                        return acc;
                    }, []);

                    setNotifications(newNotifications);

                    // Show browser notifications if permission is granted
                    if (permission === "granted" && newNotifications.length > 0) {
                        newNotifications.forEach(notification => {
                            try {
                                new Notification("Task Reminder", {
                                    body: notification.message,
                                    icon: "/favicon.ico",
                                    tag: notification.id // Prevent duplicate notifications
                                });
                            } catch (err) {
                                console.error("Failed to show notification:", err);
                            }
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
        const interval = setInterval(checkTasks, 30 * 60 * 1000); // Check every 30 minutes
        return () => clearInterval(interval);
    }, [permission]);

    // Request notification permission
    const requestNotificationPermission = () => {
        if (!("Notification" in window)) {
            console.log("This browser does not support notifications");
            return;
        }

        Notification.requestPermission().then(perm => {
            setPermission(perm);
        });
    };

    // Clear all notifications
    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    // Mark task as complete from notification
    const handleComplete = async (taskId) => {
        try {
            const { error } = await supabase
                .from("tasks")
                .update({ is_completed: true })
                .eq("id", taskId);

            if (!error) {
                setNotifications(notifications.filter(n => n.taskId !== taskId));
            }
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    // Get notification badge color based on urgency
    const getBadgeColor = () => {
        if (notifications.some(n => n.isOverdue)) return 'bg-red-500';
        if (notifications.some(n => n.type === 'due-today')) return 'bg-orange-500';
        return 'bg-blue-500';
    };

    // Get notification item background color
    const getNotificationBgColor = (type) => {
        switch (type) {
            case 'overdue': return 'bg-red-50';
            case 'due-today': return 'bg-orange-50';
            case 'due-soon': return 'bg-blue-50';
            default: return 'bg-gray-50';
        }
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (permission !== "granted") {
                        requestNotificationPermission();
                    }
                }}
                className={`relative ${getBadgeColor()} text-white p-2 rounded-full shadow-lg hover:opacity-90 transition-opacity`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-white text-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {notifications.length}
                </span>
            </button>

            {showNotifications && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">Task Reminders</h3>
                        <button
                            onClick={clearNotifications}
                            className="text-sm text-blue-500 hover:text-blue-700"
                        >
                            Clear All
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {notifications
                            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                            .map(notification => (
                                <li
                                    key={notification.id}
                                    className={`text-sm p-3 rounded flex justify-between items-start ${getNotificationBgColor(notification.type)}`}
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Due: {format(parseISO(notification.dueDate), 'MMM dd, yyyy')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleComplete(notification.taskId)}
                                        className="ml-2 text-green-500 hover:text-green-700 flex-shrink-0"
                                        title="Mark as complete"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};