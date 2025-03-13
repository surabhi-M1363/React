import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Import CSS

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h2>Welcome, {user?.email}!</h2>
            <button className="logout-btn" onClick={() => {
                logout();
                navigate("/login");
            }}>Logout</button>
        </div>
    );
};

export default Home;
