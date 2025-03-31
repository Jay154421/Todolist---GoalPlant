import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "./Components/Login";
import { SignupPage } from "./Components/Signup";
import { HomePage } from "./Components/Home";
import { DashBoardPage } from "./Components/DashBoard";
import { ProtectedRoute } from "./Supabase/ProtectedRoute";
import { CreateTaskPage } from "./Components/CreateTask";
import { CompleteTaskPage } from "./Components/CompleteTask";
import "./css/App.css";
import { EditPage } from "./Components/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complete-task"
          element={
            <ProtectedRoute>
              <CompleteTaskPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-task/:taskId"
          element={
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
