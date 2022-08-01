import { useCallback } from "react";

const SneakersFetch = () => {
    const request = useCallback(async (url, body = null, method = "GET", headers = {'Content-Type': 'application/json'}) => {
        try {
            const res = await fetch(url, {method, headers, body});
            if (!res.ok) {
                throw new Error(`Could not fetch url ${url}, status ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch(e){
            throw e.message;
        }
    });
    return {request}
};

export default SneakersFetch;