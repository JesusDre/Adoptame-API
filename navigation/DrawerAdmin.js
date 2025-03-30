import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListaMascotasScreen from '../screens/admin/ListaMascotasScreen';
import GestionMascotasScreen from '../screens/admin/GestionMascotasScreen';
import { Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const DrawerAdmin = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <Button title="Salir" onPress={logout} />
        ),
      }}
    >
      <Drawer.Screen name="Listado de Mascotas" component={ListaMascotasScreen} />
      <Drawer.Screen name="Gestionar Mascotas" component={GestionMascotasScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerAdmin;
