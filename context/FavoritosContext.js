import React, { createContext, useState } from 'react';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (mascota) => {
    if (!favoritos.find(fav => fav.imagen === mascota.imagen)) {
      setFavoritos([...favoritos, mascota]);
    }
  };

  const eliminarFavorito = (imagen) => {
    setFavoritos(favoritos.filter(mascota => mascota.imagen !== imagen));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
