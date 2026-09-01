import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {
     const { latitude, longitude, nome } = useLocalSearchParams();

     const lat = Number(latitude);
     const lng = Number(longitude);
  return (

    
    <View style={styles.container}>
      <Text style={styles.titulo}>
        🗺️ Localização de teste
      </Text>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
         coordinate={{
         latitude: lat,
         longitude: lng,
          }}
          title={nome?.toString() || 'Localização'}
          description="Localização registrada no Memorial Map"
          />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },

  mapa: {
    flex: 1,
  },
});