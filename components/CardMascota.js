import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CardMascota = ({ nombre, imagen, onFavorite, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: imagen }} style={styles.imagen} />
      </TouchableOpacity>
      <Text style={styles.nombre}>{nombre}</Text>
      <TouchableOpacity style={styles.boton} onPress={onFavorite}>
        <Text style={styles.textoBoton}>❤️ Agregar a Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardMascota;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  boton: {
    backgroundColor: '#ff8c00',
    padding: 8,
    borderRadius: 10,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
