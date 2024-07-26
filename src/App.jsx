import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainWebsite from "./pages/mainwebsite";
import Description from "./pages/Description";
import Elorendeles from "./pages/Elorendeles";
import Rolunk from "./pages/Rolunk";
import Kapcsolat from "./pages/Kapcsolat";
import AdminMainPage from "./admin/pages/AdminMainPages";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainWebsite />} />

          <Route path="/elorendeles" element={<Elorendeles />} />
          <Route path="/rolunk" element={<Rolunk />} />
          <Route path="/kapcsolat" element={<Kapcsolat />} />
          <Route path="/description" element={<Description />} />
          <Route path= "/adminmain" element={<AdminMainPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
