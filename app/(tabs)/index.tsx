import { router } from 'expo-router';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Index() {
  return (
    <ImageBackground
      source={require('../../assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.conteudo}>
          <Text style={styles.icone}>🕊️</Text>

          <Text style={styles.titulo}>
            MEMORIAL MAP
          </Text>

          <Text style={styles.subtitulo}>
            Encontre, lembre e homenageie.
          </Text>

          <Text style={styles.mensagem}>
            Um espaço criado para ajudar você
            a encontrar e localizar pessoas
            que fazem parte da sua história.
          </Text>

          <Pressable
            style={styles.botao}
            onPress={() => router.push('/pesquisa')}
          >
            <Text style={styles.textoBotao}>
              ENTRAR →
            </Text>
          </Pressable>
        </View>

        <Text style={styles.rodape}>
          Memorial Map
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 35, 55, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  conteudo: {
    width: '90%',
    maxWidth: 480,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
  },

  icone: {
    fontSize: 42,
    marginBottom: 12,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#243b53',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 17,
    color: '#4a6fa5',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  mensagem: {
    fontSize: 15,
    lineHeight: 23,
    color: '#667085',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },

  botao: {
    width: '100%',
    height: 52,
    backgroundColor: '#294f7d',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  rodape: {
    position: 'absolute',
    bottom: 18,
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});