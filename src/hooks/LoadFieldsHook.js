import { useEffect } from "react";
import loadFields from "../utils/LoadFields";

export default function useFields(injectedProvider, setFields) {

    useEffect(() => {
        const load = async () => {
            await loadFields(injectedProvider, setFields);
        }
        load();
        // eslint-disable-next-line
    }, [injectedProvider]);
}