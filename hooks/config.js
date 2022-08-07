import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetConfig = (isRefreshing) => {
    const [config, setConfig] = useState();

    useEffect(() => {
        AsyncStorage.getItem("config")
            .then(value => {
                setConfig(value !== null ? JSON.parse(value) : {});
            }).catch(error => {
                console.info({ error });
                setConfig({});
            });
    }, [isRefreshing]);

    return {
        config: config || {},
    };
};