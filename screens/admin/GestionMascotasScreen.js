import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, Modal,
  TouchableOpacity, FlatList
} from 'react-native';

const GestionMascotasScreen = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [mascotas, setMascotas] = useState([]);
  const [mascotaEditar, setMascotaEditar] = useState(null);

  const manejarEnvio = () => {
    if (!nombre || !tipo) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const nueva = { id: Date.now().toString(), nombre, tipo };
    setMascotas([...mascotas, nueva]);
    setMensaje(`Mascota "${nombre}" (${tipo}) registrada (simulado).`);
    setNombre('');
    setTipo('');
    setModalAgregar(false);
  };

  const manejarEdicion = () => {
    if (!mascotaEditar) return;
    setMascotas(mascotas.map(m => m.id === mascotaEditar.id ? mascotaEditar : m));
    Alert.alert('Mascota editada (simulado)');
    setMascotaEditar(null);
    setModalEditar(false);
  };

  const manejarEliminacion = () => {
    if (mascotas.length === 0) return;
    const ultima = mascotas[mascotas.length - 1];
    setMascotas(mascotas.filter(m => m.id !== ultima.id));
    Alert.alert(`Mascota "${ultima.nombre}" eliminada (simulado)`);
    setModalEliminar(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar mascotas</Text>

      <Button title="Agregar mascota" onPress={() => setModalAgregar(true)} />
      <Button title="Editar mascota" onPress={() => {
        const ultima = mascotas[mascotas.length - 1];
        setMascotaEditar(ultima);
        setModalEditar(true);
      }} />
      <Button title="Eliminar última mascota" onPress={() => setModalEliminar(true)} color="red" />

      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10 }}>{item.nombre} ({item.tipo})</Text>
        )}
      />

      {/* Modal Agregar */}
      <Modal visible={modalAgregar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar mascota</Text>
            <TextInput
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <View style={styles.tipoContainer}>
              <TouchableOpacity onPress={() => setTipo('Perro')} style={[styles.tipoBtn, tipo === 'Perro' && styles.tipoActivo]}>
                <Text>Perro</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTipo('Gato')} style={[styles.tipoBtn, tipo === 'Gato' && styles.tipoActivo]}>
                <Text>Gato</Text>
              </TouchableOpacity>
            </View>
            <Button title="Registrar" onPress={manejarEnvio} />
            <Button title="Cancelar" onPress={() => setModalAgregar(false)} color="gray" />
          </View>
        </View>
      </Modal>

      {/* Modal Editar */}
      <Modal visible={modalEditar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar mascota (última agregada)</Text>
            <TextInput
              placeholder="Nuevo nombre"
              value={mascotaEditar?.nombre || ''}
              onChangeText={(text) => setMascotaEditar({ ...mascotaEditar, nombre: text })}
              style={styles.input}
            />
            <View style={styles.tipoContainer}>
              <TouchableOpacity onPress={() => setMascotaEditar({ ...mascotaEditar, tipo: 'Perro' })} style={[styles.tipoBtn, mascotaEditar?.tipo === 'Perro' && styles.tipoActivo]}>
                <Text>Perro</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMascotaEditar({ ...mascotaEditar, tipo: 'Gato' })} style={[styles.tipoBtn, mascotaEditar?.tipo === 'Gato' && styles.tipoActivo]}>
                <Text>Gato</Text>
              </TouchableOpacity>
            </View>
            <Button title="Guardar cambios" onPress={manejarEdicion} />
            <Button title="Cancelar" onPress={() => setModalEditar(false)} color="gray" />
          </View>
        </View>
      </Modal>

      {/* Modal Eliminar */}
      <Modal visible={modalEliminar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Deseas eliminar la última mascota agregada?</Text>
            <Button title="Eliminar" onPress={manejarEliminacion} color="red" />
            <Button title="Cancelar" onPress={() => setModalEliminar(false)} color="gray" />
          </View>
        </View>
      </Modal>

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}
    </View>
  );
};

export default GestionMascotasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20,
  },
  title: {
    fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 10, marginBottom: 15,
  },
  tipoContainer: {
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15,
  },
  tipoBtn: {
    padding: 10, backgroundColor: '#eee', borderRadius: 10,
  },
  tipoActivo: {
    backgroundColor: '#ffcc80',
  },
  mensaje: {
    marginTop: 20, textAlign: 'center', color: 'green', fontWeight: 'bold'
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});