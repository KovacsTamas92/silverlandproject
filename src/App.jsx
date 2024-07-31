import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainWebsite from "./pages/mainwebsite";
import Description from "./pages/Description";
import Elorendeles from "./pages/Elorendeles";
import Rolunk from "./pages/Rolunk";
import Kapcsolat from "./pages/Kapcsolat";
import AdminMainPage from "./admin/pages/AdminMainPages";
import AdminUpload from "./admin/pages/AdminUpload";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRegistration from "./admin/pages/AdminRegistration";
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainWebsite />} />

            <Route path="/elorendeles" element={<Elorendeles />} />
            <Route path="/rolunk" element={<Rolunk />} />
            <Route path="/kapcsolat" element={<Kapcsolat />} />
            <Route path="/description" element={<Description />} />
            <Route path= "/adminlogin" element={<AdminLogin />}/>
            <Route path="/adminregistration" element={<AdminRegistration />} />
            <Route path="/adminmain" element={<ProtectedRoute element={<AdminMainPage />} />} />
            <Route path="/adminupload" element={<ProtectedRoute element={<AdminUpload />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
