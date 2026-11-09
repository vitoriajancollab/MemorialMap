import { router } from 'expo-router';
import {ImageBackground, Pressable,StyleSheet,Text,View,} from 'react-native';

export default function EscolhaEmail() {
  function comEmail() {
    router.push('/login?email=obrigatorio');
  }

  function semEmail() {
    router.push('/login?email=opcional');
  }

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icone}>🕊️</Text>

          <Text style={styles.titulo}>
            Como você deseja continuar?
          </Text>

          <Text style={styles.subtitulo}>
            Escolha uma das opções abaixo para continuar
            usando o Memorial Map.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.opcao,
              pressed && styles.opcaoPressionada,
            ]}
            onPress={comEmail}
          >
            <Text style={styles.iconeOpcao}>📧</Text>

            <View style={styles.textoContainer}>
              <Text style={styles.tituloOpcao}>
                Quero usar e-mail
              </Text>

              <Text style={styles.descricaoOpcao}>
                Informe seu e-mail para facilitar o acesso
                e receber novidades, se desejar.
              </Text>
            </View>

            <Text style={styles.seta}>›</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.opcao,
              pressed && styles.opcaoPressionada,
            ]}
            onPress={semEmail}
          >
            <Text style={styles.iconeOpcao}>👤</Text>

            <View style={styles.textoContainer}>
              <Text style={styles.tituloOpcao}>
                Não quero usar e-mail
              </Text>

              <Text style={styles.descricaoOpcao}>
                Você poderá usar o Memorial Map normalmente.
              </Text>
            </View>

            <Text style={styles.seta}>›</Text>
          </Pressable>

          <Pressable
            style={styles.botaoVoltar}
            onPress={() => router.back()}
          >
            <Text style={styles.textoVoltar}>
              ← Voltar
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },

  icone: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 12,
  },

  titulo: {
    fontSize: 25,
    fontWeight: '800',
    color: '#243B53',
    textAlign: 'center',
    lineHeight: 32,
  },

  subtitulo: {
    fontSize: 15,
    color: '#667085',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },

  opcao: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 14,
  },

  opcaoPressionada: {
    opacity: 0.75,
  },

  iconeOpcao: {
    fontSize: 32,
    width: 48,
    textAlign: 'center',
    marginRight: 10,
  },

  textoContainer: {
    flex: 1,
  },

  tituloOpcao: {
    fontSize: 17,
    fontWeight: '800',
    color: '#243B53',
    marginBottom: 5,
  },

  descricaoOpcao: {
    fontSize: 13,
    color: '#667085',
    lineHeight: 19,
  },

  seta: {
    fontSize: 32,
    color: '#243B53',
    marginLeft: 8,
  },

  botaoVoltar: {
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 10,
  },

  textoVoltar: {
    color: '#667085',
    fontSize: 15,
    fontWeight: '600',
  },
});