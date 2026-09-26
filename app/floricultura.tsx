import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Floricultura() {
      const { latitude, longitude } = useLocalSearchParams();

     const procurarFloricultura = () => {
     const lat = Number(latitude);
     const lng = Number(longitude);

     const url = `https://www.google.com/maps/search/floricultura/@${lat},${lng},15z`;

     Linking.openURL(url);
  };
    
  return (
    
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>

        <Pressable
          style={styles.botaoVoltar}
          onPress={() => router.replace('/mapa')}        >
          <Text style={styles.textoVoltar}>← Voltar</Text>
        </Pressable>

        <Text style={styles.titulo}>
          🌷 Floricultura
        </Text>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >

        {/* Banner */}
        <View style={styles.banner}>

          <Text style={styles.tituloBanner}>
            🌷 Floricultura Memorial Map
          </Text>

          <Text style={styles.subtitulo}>
            Flores que eternizam bons sentimentos. 💕
          </Text>

        </View>

        {/* Produtos */}
        <View style={styles.card}>

          <Text style={styles.tituloSecao}>
            🌻 Nossos chaveiros
          </Text>

          <Text style={styles.descricao}>
            Pequenas flores feitas à mão com muito carinho.
          </Text>

           {/* Produto */}
          <View style={styles.produto}>

            <Image
              source={require('../assets/images/flor-croche.jpeg')}
              style={styles.fotoFlor}
              resizeMode="contain"
            />

            <Text style={styles.nomeProduto}>
              🌻 Chaveiro Flor de Crochê
            </Text>

            <Text style={styles.preco}>
              R$ 5,00
            </Text>

            <Text style={styles.detalhes}>
              🧶 Feito à mão
            </Text>
            <Pressable
             style={styles.botaoProcurar}
              onPress={procurarFloricultura}
              >
             <Text style={styles.textoProcurar}>
             🔎 Procurar uma floricultura próxima
             </Text>
            </Pressable>

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  cabecalho: {
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },

  botaoVoltar: {
    backgroundColor: '#243b53',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },

  textoVoltar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#243b53',
    textAlign: 'center',
    marginTop: -34,
  },

  conteudo: {
    padding: 18,
    paddingBottom: 40,
  },

  banner: {
    backgroundColor: '#fff0f7',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  tituloBanner: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b2f6b',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#52606d',
    textAlign: 'center',
    marginTop: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f0c5dd',
  },

  tituloSecao: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#243b53',
  },

  descricao: {
    fontSize: 15,
    color: '#52606d',
    marginTop: 6,
    marginBottom: 18,
  },

  produto: {
    backgroundColor: '#fff0f7',
    borderRadius: 15,
    padding: 18,
  },

  fotoFlor: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },

  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#243b53',
  },

  preco: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#c62f72',
    marginTop: 10,
  },

  detalhes: {
    fontSize: 15,
    color: '#52606d',
    marginTop: 8,
  },
  botaoProcurar: {
  backgroundColor: '#243b53',
  padding: 15,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 18,
},

 textoProcurar: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

});