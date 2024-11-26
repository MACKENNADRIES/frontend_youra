import useRAKs from "../hooks/use-raks";
import RAKCard from "../components/RAKCard.jsx";

function HomePage() {
    const { raks, isLoading, error } = useRAKs();

    if (isLoading) return <p>Loading RAKs...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div id="rak-list" className="rak-grid">
            {raks.map((rakData) => (
                <RAKCard key={rakData.id} rakData={rakData} />
            ))}
        </div>
    );
}

export default HomePage;
