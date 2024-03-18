import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./components/admin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import NB from "./components/admin/NB";
import AddNB from "./components/admin/AddNB";
import EditNB from "./components/admin/EditNB";
import PrivateRoute from "./components/route/PrivateRoute";
import Dashboard from "./components/visitor/Dashboard";
import Login from "./components/visitor/Login";
import AdminPrivateRoute from "./components/route/AdminPrivateRoute";
import ChatNB from "./components/visitor/ChatNB";
import AboutUs from "./components/visitor/AboutUs";
import AdminAboutUs from "./components/admin/AdminAboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/AdminAboutUs" element={<AdminAboutUs />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/:visitorID" element={<Dashboard />}></Route>
          <Route path="/dashboard/chat_nb/:nbID" element={<ChatNB />}></Route>
        </Route>
        <Route
          path="/admin_dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        >
          <Route path="/admin_dashboard" element={<NB />}></Route>

          <Route path="/admin_dashboard/add_nb" element={<AddNB />}></Route>
          <Route
            path="/admin_dashboard/edit_nb/:nbID"
            element={<EditNB />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
