import { router } from 'expo-router';
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function BoasVindas() {
  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <View style={styles.conteudo}>

          <Text style={styles.icone}>
            🕊️
          </Text>

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
            style={({ pressed }) => [
              styles.botaoEntrar,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => router.navigate('/pesquisa')}
          >
            <Text style={styles.textoBotao}>
              ENTRAR
            </Text>

            <Text style={styles.seta}>
              →
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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 6,
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
    letterSpacing: 1,
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

  botaoEntrar: {
    width: '100%',
    height: 52,
    backgroundColor: '#294f7d',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 4,
  },

  botaoPressionado: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },

  seta: {
    color: '#ffffff',
    fontSize: 22,
    marginLeft: 10,
  },

  rodape: {
    position: 'absolute',
    bottom: 18,
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
  },
});

