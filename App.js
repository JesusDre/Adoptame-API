import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FavoritosProvider } from './context/FavoritosContext';
import LoginScreen from './screens/LoginScreen';
import DrawerAdoptante from './navigation/DrawerAdoptante';
import DrawerAdmin from './navigation/DrawerAdmin';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return userInfo.role === 'admin' ? <DrawerAdmin /> : <DrawerAdoptante />;
};

export default function App() {
  return (
    <AuthProvider>
      <FavoritosProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </FavoritosProvider>
    </AuthProvider>
  );
}
