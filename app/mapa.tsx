import { useLocalSearchParams, router } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Mapa() {
  const {
    latitude,
    longitude,
    nome,
    cemiterio,
    quadra,
    lote,
  } = useLocalSearchParams();

  const lat = Number(latitude);
  const lng = Number(longitude);

  const voltar = () => {
  router.back();
};

  const abrirGoogleMaps = () => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  Linking.openURL(url);
};

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return (
      <View style={styles.erro}>
        <Text style={styles.titulo}>🗺️ Localização</Text>

        <Text style={styles.mensagem}>
          Não foi possível encontrar a localização deste registro.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Pressable style={styles.botaoVoltar} onPress={voltar}>
      <Text style={styles.textoVoltar}>← Voltar</Text>
      </Pressable>

      <Text style={styles.titulo}>
        🗺️ Localização
      </Text>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker
           coordinate={{
           latitude: lat,
           longitude: lng,
         }}
            title={`📍 ${nome?.toString() || 'Localização'}`}   description={
           `🏛️ ${cemiterio || '-'} | 📍 Quadra ${quadra || '-'} | 🔢 Lote ${lote || '-'}`
         }
          pinColor="#243b53"
        />
      </MapView>

      <View style={styles.informacoes}>

        <Text style={styles.tituloInformacoes}>
        📋 Detalhes da sepultura
       </Text>

        <Text style={styles.nome}>
          👤 {nome?.toString() || 'Pessoa'}
        </Text>

        <Text style={styles.info}>
          🏛️ Cemitério: {cemiterio?.toString() || '-'}
        </Text>

        <Text style={styles.info}>
          📍 Quadra: {quadra?.toString() || '-'}
        </Text>

        <Text style={styles.info}>
          🔢 Lote: {lote?.toString() || '-'}
        </Text>
       <Pressable style={styles.botao} onPress={abrirGoogleMaps}>
       <Text style={styles.textoBotao}>🚶 Como chegar</Text>
       </Pressable>
      </View>

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
  minHeight: 0,
},

 informacoes: {
  backgroundColor: '#fff',
  padding: 18,
  paddingBottom: 80,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#243b53',
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: '#52606d',
    marginBottom: 6,
  },

  erro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  mensagem: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  botao: {
  backgroundColor: '#243b53',
  padding: 15,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 12,
},

textoBotao: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
botaoVoltar: {
  backgroundColor: '#243b53',
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 10,
  alignSelf: 'flex-start',
  marginLeft: 15,
  marginTop: 5,
},

textoVoltar: {
  color: '#fff',
  fontSize: 15,
  fontWeight: 'bold',
},

tituloInformacoes: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#243b53',
  marginBottom: 12,
},
});