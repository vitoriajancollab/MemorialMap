import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Memorial Map',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pesquisa"
        options={{
          title: 'Pesquisa',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="cadastro"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="registros"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="boas-vindas"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}