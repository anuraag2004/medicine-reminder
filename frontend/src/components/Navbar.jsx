import { Link } from "react-router-dom";
import"./Navbar.css"
function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo as a clickable link */}
      <Link to="/" className="navbar-logo">
        <img 
          src="https://tse4.mm.bing.net/th/id/OIP.yBqoaLGYSk_43kuZEqwGZwHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" 
          alt="Medicine Reminder Logo"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/add" className="nav-link">Add Medicine</Link>
        </li>
        <li>
          <Link to="/reminders" className="nav-link">Reminders</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
      <li>
        <Link to = "/Login" className="nav-link">Login</Link>
        </li> 
        <li>
        <Link to = "/Userpage" className="nav-link">User</Link>
        </li>  
      </ul>

    </nav>
  );
}

export default Navbar;


