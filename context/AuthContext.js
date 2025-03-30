import React, { createContext, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });

      if (response.data.token) {
        let role = "adoptante";
        if (username === "admin") {
          role = "admin";
        }

        setUserInfo({ token: response.data.token, role });
      }
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas. Intenta con:\nUsuario: adoptante o admin\nContraseña: cityslicka");
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
