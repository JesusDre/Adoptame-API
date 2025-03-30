import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, Text, ActivityIndicator, Alert, StyleSheet,
  Modal, Image, TouchableOpacity, Button
} from 'react-native';
import axios from 'axios';
import CardMascota from '../../components/CardMascota';

const ListaMascotasScreen = () => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const perros = await axios.get('https://dog.ceo/api/breeds/image/random/5');
        const gatos = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');

        const mascotasData = [
          ...perros.data.message.map((url, i) => ({
            tipo: 'Perro',
            nombre: `Firulais ${i + 1}`,
            imagen: url,
            raza: 'Labrador',
            tamano: 'Grande',
            descripcion: 'Perro muy juguetón y amigable.'
          })),
          ...gatos.data.map((gato, i) => ({
            tipo: 'Gato',
            nombre: `Michi ${i + 1}`,
            imagen: gato.url,
            raza: 'Siames',
            tamano: 'Pequeño',
            descripcion: 'Gato curioso y cariñoso.'
          }))
        ];

        setMascotas(mascotasData);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar las mascotas');
      } finally {
        setCargando(false);
      }
    };

    cargarMascotas();
  }, []);

  const filtrarMascotas = () => {
    if (filtro === 'Todos') return mascotas;
    return mascotas.filter(m => m.tamano === filtro);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Lista de mascotas del refugio 🏠</Text>

      <View style={styles.filtros}>
        {['Todos', 'Grande', 'Pequeño'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltro(f)}
            style={[styles.filtroBtn, filtro === f && styles.filtroActivo]}
          >
            <Text style={styles.filtroTexto}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#ff8c00" style={{ marginTop: 20 }} />
      ) : (
        filtrarMascotas().map((mascota, index) => (
          <CardMascota
            key={index}
            nombre={mascota.nombre}
            imagen={mascota.imagen}
            onPress={() => {
              setMascotaSeleccionada(mascota);
              setModalVisible(true);
            }}
          />
        ))
      )}

      {mascotaSeleccionada && (
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: mascotaSeleccionada.imagen }} style={styles.modalImagen} />
              <Text style={styles.modalNombre}>{mascotaSeleccionada.nombre}</Text>
              <Text>Raza: {mascotaSeleccionada.raza}</Text>
              <Text>Tamaño: {mascotaSeleccionada.tamano}</Text>
              <Text style={{ marginVertical: 10 }}>{mascotaSeleccionada.descripcion}</Text>
              <Button title="Cerrar" onPress={() => setModalVisible(false)} color="gray" />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default ListaMascotasScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  filtroBtn: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filtroActivo: {
    backgroundColor: '#ff8c00',
  },
  filtroTexto: {
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalNombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
