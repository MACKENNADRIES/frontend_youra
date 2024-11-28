import { useState, useEffect } from "react";
import getRAK from "../api/get-rak";

export default function useRAK(rakId) {
    const [rak, setRak] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRAK(rakId)
                .then((rak) => {
            setRak(rak);
            setIsLoading(false);
            })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
    });
}, [rakId]);

return { rak, isLoading, error };
}
