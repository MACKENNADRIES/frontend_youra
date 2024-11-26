import { Link } from "react-router-dom";

function RAKCard({ rakData }) {
    const rakLink = `/rak/${rakData.id}`;

    return (
        <div className="rak-card">
            <Link to={rakLink}>
                <img src={rakData.image} alt={rakData.title} className="rak-image" />
                <h3 className="rak-title">{rakData.title}</h3>
            </Link>
        </div>
    );
}

export default RAKCard;
