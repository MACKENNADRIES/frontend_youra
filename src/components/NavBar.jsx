import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/profile">Profile</Link>
        </nav>
        <Outlet />
    </div>
);
}

export default Navbar;
