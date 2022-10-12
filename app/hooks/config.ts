import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, setData } from "../components/utils";

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

export const updateAnimal = async (animal) => {
  const animals = await getData("animals");

  const index = animals.findIndex((obj) => obj.index === animal.index);
  if (index == -1) {
    return;
  }

  animals[index].code = animal.code;
  animals[index].letter = animal.letter;
  animals[index].number = animal.number;
  animals[index].sex = animal.sex;
  animals[index].comment = animal.comment;

  await setData("animals", animals);
};

export const deleteAnimal = async (index) => {
  const animals = await getData("animals");

  animals.splice(index, 1);

  await setData("animals", animals);
};
