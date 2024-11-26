import { useState, useEffect } from "react";
import getRAKs from "../api/get-raks";

export default function useRAKs() {
    const [raks, setRAKs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRAKs()
            .then((data) => {
                setRAKs(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    return { raks, isLoading, error };
}
