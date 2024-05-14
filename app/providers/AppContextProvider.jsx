import React, {
  useMemo,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { getLocalStorage } from "../utils/storage";
import { USER_NAME_LOCAL_STORAGE_KEY } from "../constants";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [user, setUser] = useState("");

  async function getUser() {
    try {
      const userName = await getLocalStorage(USER_NAME_LOCAL_STORAGE_KEY);
      setUser(userName);
    } catch (error) {
      console.error("Could not get user from local storage", error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
