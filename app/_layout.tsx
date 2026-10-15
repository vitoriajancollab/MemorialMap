
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MenuLateral from '@/components/MenuLateral';
import { FonteProvider } from '@/contexts/FonteContext';

export default function RootLayout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <FonteProvider>
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
    </FonteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
