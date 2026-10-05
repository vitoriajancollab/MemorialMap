import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MenuLateral from '@/components/MenuLateral';

export default function RootLayout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <MenuLateral
        aberto={menuAberto}
        onAbrir={() => setMenuAberto(true)}
        onFechar={() => setMenuAberto(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});