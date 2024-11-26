import { Link } from "react-router-dom";
import "./RAKCard.css";


function RAKCard({ rakData }) {
    return (
    <div className="rak-card">
        <Link to={`/rak/${rakData.id}`}>
            <h3>{rakData.title}</h3>
            <p>{rakData.description}</p>
        </Link>
        <p>Status: {rakData.status}</p>
        <p>Aura Points: {rakData.aura_points_value}</p>
    </div>
    );
}

export default RAKCard;
