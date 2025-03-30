import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MascotasScreen from '../screens/adoptante/MascotasScreen';
import FavoritosScreen from '../screens/adoptante/FavoritosScreen';
import { Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const DrawerAdoptante = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <Button title="Salir" onPress={logout} />
        ),
      }}
    >
      <Drawer.Screen name="Mascotas Disponibles" component={MascotasScreen} />
      <Drawer.Screen name="Favoritos" component={FavoritosScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerAdoptante;
