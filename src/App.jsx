import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { DashBoard } from "./Components/DashBoard";
import { ProtectedRoute } from "./Supabase/ProtectedRoute";
import { CreateTask } from "./Components/CreateTask";
import { CompleteTask } from "./Components/CompleteTask";
import "./css/App.css";
import { EditTask } from "./Components/EditTask";
import { TaskOverview } from "./Components/TaskOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complete-task"
          element={
            <ProtectedRoute>
              <CompleteTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task-overview"
          element={
            <ProtectedRoute>
              <TaskOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-task/:taskId"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
