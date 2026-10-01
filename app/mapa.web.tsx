import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View, } from 'react-native';

// react-native-maps não tem implementação real na web, então esta tela usa um embed do Google Maps
export default function MapaWeb() {
  const {
    latitude,
    longitude,
    nome,
    cemiterio,
    quadra,
    lote,
  } = useLocalSearchParams();

  const paraNumero = (valor: unknown) => {
    if (valor === undefined || valor === null) return NaN;
    return Number(String(valor).trim().replace(',', '.'));
  };

  const lat = paraNumero(latitude);
  const lng = paraNumero(longitude);

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

      <iframe
        style={styles.mapa as any}
        src={`https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
        title="Mapa"
      />

      <View style={styles.informacoes}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conteudoInformacoes}
        >

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

          <Pressable
            style={styles.botao}
            onPress={abrirGoogleMaps}
          >
            <Text style={styles.textoBotao}>
              🚶 Como chegar
            </Text>
          </Pressable>

          <Pressable
            style={styles.botaoFloricultura}
              onPress={() =>
              router.push({
              pathname: '/floricultura',
              params: {
              latitude: lat.toString(),
              longitude: lng.toString(),
              },
             })
              }
              >
          <Text style={styles.textoFloricultura}>
           🌷 Floricultura
          </Text>
         </Pressable>

        </ScrollView>

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
    borderWidth: 0,
  },

  informacoes: {
    backgroundColor: '#fff',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  conteudoInformacoes: {
    padding: 18,
    paddingBottom: 30,
  },

  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#243b53',
    marginBottom: 6,
  },

  info: {
    fontSize: 15,
    color: '#52606d',
    marginBottom: 3,
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

  botaoFloricultura: {
    backgroundColor: '#fff0f7',
    borderWidth: 2,
    borderColor: '#d96bb3',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  textoFloricultura: {
    color: '#8b2f6b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
