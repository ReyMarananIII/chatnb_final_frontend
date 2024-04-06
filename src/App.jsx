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
import Assessment from "./components/visitor/Assessment";
import EditAssessment from "./components/admin/EditAssessment";
import ViewFeedback from "./components/admin/ViewFeedback";
import ViewLeaderboards from "./components/admin/ViewLeaderboards";
import NoPage from "./components/utils/NoPage";

function App() {
  return (
    <BrowserRouter>
      {/**Visitor Routes */}
      <Routes>
        <Route path="*" element={<NoPage />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/:visitorID" element={<Dashboard />}></Route>
          <Route
            path="/dashboard/:visitorID/assessment"
            element={<Assessment />}
          ></Route>
          <Route path="/dashboard/chat_nb/:nbID" element={<ChatNB />}></Route>
        </Route>

        {/**Admin Routes */}
        <Route path="/AdminAboutUs" element={<AdminAboutUs />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route
          path="/admin_dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        >
          <Route path="/admin_dashboard" element={<NB />}></Route>
          <Route
            path="/admin_dashboard/feedback"
            element={<ViewFeedback />}
          ></Route>

          <Route path="/admin_dashboard/add_nb" element={<AddNB />}></Route>
          <Route
            path="/admin_dashboard/edit_nb/:nbID"
            element={<EditNB />}
          ></Route>
          <Route
            path="/admin_dashboard/edit_assessment"
            element={<EditAssessment />}
          ></Route>
          <Route
            path="/admin_dashboard/viewLeaderboards"
            element={<ViewLeaderboards />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
