import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../styles/styles.css"; // Import CSS

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <div>
                <Link to="/">Home</Link>
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
