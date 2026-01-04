import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import AddMedicine from "./pages/AddMedicine";
import Login from "./pages/Login"; // Ensure your file is named Login.jsx or Login.js
import Reminder from "./pages/Reminder";
import Register from "./pages/Register";
import Userpage from "./pages/UserPage";

function App() {
  const location = useLocation();

  // List of paths where we want to HIDE the Navbar
  const hideNavbarRoutes = ["/login", "/register"];

  // Check if current path is in the hide list
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Only show Navbar if we are NOT on Login or Register page */}
      {showNavbar && <Navbar />}
      
      <Routes>
        {/* Redirects to Home */}
        <Route path="/" element={<Home />} />
        
        {/* ✅ FIXED: Added this so navigate('/home') from Login works */}
        <Route path="/home" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/add" element={<AddMedicine />} />       
        <Route path="/reminders" element={<Reminder />} /> 
        
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />
        <Route path = "/userpage" element={<Userpage />} />
      </Routes>
    </>
  );
}

export default App;



