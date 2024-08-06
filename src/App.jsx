import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainWebsite from "./pages/mainwebsite";
import Description from "./pages/Description";
import Elorendeles from "./pages/Elorendeles";
import Rolunk from "./pages/Rolunk";
import Kapcsolat from "./pages/Kapcsolat";
import AdminMainPage from "./admin/pages/AdminMainPages";
import AdminUpload from "./admin/pages/AdminUpload";
import Regandlogin from "./pages/registration";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRegistration from "./admin/pages/AdminRegistration";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import AdminOrderingPage from "./admin/pages/AdminOrderingPage";
import AdminOrderingEdit from "./admin/pages/AdminOrderingEdit";
import { CartProvider } from "./components/cartcontext";
import Registration from "./pages/registration";
import Userlogin from "./pages/userlogin";
import UserProfile from "./pages/userprofile";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<MainWebsite />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/userprofile" element={<UserProfile />} />

              <Route path="/elorendeles" element={<Elorendeles />} />
              <Route path="/rolunk" element={<Rolunk />} />
              <Route path="/kapcsolat" element={<Kapcsolat />} />
              <Route path="/description" element={<Description />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route
                path="/adminregistration"
                element={<AdminRegistration />}
              />
              <Route path="/userlogin" element={<Userlogin />} />
              <Route
                path="/adminmain"
                element={<ProtectedRoute element={<AdminMainPage />} />}
              />
              <Route
                path="/adminupload"
                element={<ProtectedRoute element={<AdminUpload />} />}
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
