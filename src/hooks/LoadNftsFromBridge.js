import { useEffect, useState } from "react";
import loadNfts from "../utils/LoadNfts";

export default function useNftsFromBridge(injectedProvider, setNftList, setOwnNftList) {
    useEffect(() => {
        const load = async () => {
            await loadNfts(injectedProvider, setNftList, setOwnNftList);
        }
        load();
        // eslint-disable-next-line
    }, [injectedProvider]);
}