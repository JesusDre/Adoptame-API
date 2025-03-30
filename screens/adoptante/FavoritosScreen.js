import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FavoritosContext } from '../../context/FavoritosContext';
import CardMascota from '../../components/CardMascota';

const FavoritosScreen = () => {
  const { favoritos } = useContext(FavoritosContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mis mascotas favoritas ❤️</Text>
      {favoritos.length === 0 ? (
        <Text style={styles.vacio}>No has agregado favoritos aún.</Text>
      ) : (
        favoritos.map((mascota, index) => (
          <CardMascota
            key={index}
            nombre={mascota.nombre}
            imagen={mascota.imagen}
            onFavorite={() => {}}
          />
        ))
      )}
    </ScrollView>
  );
};

export default FavoritosScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20, alignItems: 'center',
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 10,
  },
  vacio: {
    marginTop: 20, fontSize: 16, color: 'gray',
  }
});
