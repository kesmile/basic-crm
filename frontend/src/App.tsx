import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Clients from "./pages/Clients";
import ClientForm from "./pages/forms/ClientForm";
import Projects from "./pages/Projects";
import ProjectForm from "./pages/forms/ProjectForm";
import Meetings from "./pages/Meetings";
import MeetingForm from "./pages/forms/MeetingForm";
import Contacts from "./pages/Contacts";
import ContactForm from "./pages/forms/ContactForm";
import MeetingDetails from "./pages/MeetingDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/new"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/edit/:id"
          element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meetings"
          element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meetings/new"
          element={
            <ProtectedRoute>
              <MeetingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meetings/edit/:id"
          element={
            <ProtectedRoute>
              <MeetingForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/new"
          element={
            <ProtectedRoute>
              <ContactForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/edit/:id"
          element={
            <ProtectedRoute>
              <ContactForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meetings/:id"
          element={
            <ProtectedRoute>
              <MeetingDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
