import { sampleRAKs } from "../RAKdata";
import RAKCard from "../components/RAKCard";

function HomePage() {
    return (
    <div id="rak-list">
        <h1>Random Acts of Kindness</h1>
        {sampleRAKs.map((rak) => (
        <RAKCard key={rak.id} rakData={rak} />
        ))}
    </div>
    );
}

export default HomePage;
