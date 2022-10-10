import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetCuigs = (isRefreshing) => {
  const [cuigs, setCuigs] = useState<string[]>();

  useEffect(() => {
    AsyncStorage.getItem("cuigs")
      .then((value) => {
        setCuigs(value !== null ? JSON.parse(value) : []);
      })
      .catch((error) => {
        console.info({ error });
        setCuigs([]);
      });
  }, [isRefreshing]);

  return {
    cuigs: cuigs || [],
  };
};

export const useGetLetters = (isRefreshing) => {
  const [letters, setLetters] = useState<string[]>();

  useEffect(() => {
    AsyncStorage.getItem("letters")
      .then((value) => {
        setLetters(value !== null ? JSON.parse(value) : []);
      })
      .catch((error) => {
        console.info({ error });
        setLetters([]);
      });
  }, [isRefreshing]);

  return {
    letters: letters || [],
  };
};


export const useGetAnimals = (isRefreshing) => {
  const [animals, setAnimals] = useState<any[]>();

  useEffect(() => {
    AsyncStorage.getItem("animals")
      .then((value) => {
        setAnimals(value !== null ? JSON.parse(value) : []);
      })
      .catch((error) => {
        console.info({ error });
        setAnimals([]);
      });
  }, [isRefreshing]);

  return {
    animals: animals || [],
  };
};
