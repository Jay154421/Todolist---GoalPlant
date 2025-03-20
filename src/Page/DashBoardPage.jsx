import { TaskCategory } from "../Components/TaskCategory";
import { Link } from "react-router-dom";
import "../css/dashboard.css";

import { Header } from "./Header";

export function DashBoardPage() {
  return (
    <>
      <Header />

      <div>
        <h1>Dashboard</h1>
        <Link to="/create-task">
          <button>Add Task</button>
        </Link>

        <h1>Task Manager</h1>
        {/* Add a list of existing categories here */}
        <TaskCategory taskTitle="dfs" />
      </div>
    </>
  );
}
