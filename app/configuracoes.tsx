
import { router } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Configuracoes() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>

        <Text style={styles.icone}>⚙️</Text>

        <Text style={styles.titulo}>
          Configurações
        </Text>

        <Text style={styles.subtitulo}>
          Personalize sua experiência no Memorial Map.
        </Text>
      </View>

      {/* MEUS DADOS */}
      <View style={styles.cartao}>
        <Text style={styles.iconeOpcao}>👤</Text>

        <View style={styles.informacoes}>
          <Text style={styles.tituloOpcao}>
            Meus dados
          </Text>

          <Text style={styles.descricao}>
            Consulte suas informações de usuário.
          </Text>
        </View>
      </View>

      {/* NOTIFICAÇÕES */}
      <View style={styles.cartao}>
        <Text style={styles.iconeOpcao}>🔔</Text>

        <View style={styles.informacoes}>
          <Text style={styles.tituloOpcao}>
            Notificações
          </Text>

          <Text style={styles.descricao}>
            Preferências de avisos e novidades.
          </Text>
        </View>
      </View>

      {/* PRIVACIDADE */}
      <View style={styles.cartao}>
        <Text style={styles.iconeOpcao}>🛡️</Text>

        <View style={styles.informacoes}>
          <Text style={styles.tituloOpcao}>
            Privacidade
          </Text>

          <Text style={styles.descricao}>
            Informações sobre sua privacidade.
          </Text>
        </View>
      </View>

      {/* RODAPÉ */}
      <Text style={styles.versao}>
        Memorial Map • Versão 1.0.0
      </Text>

        <Pressable
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoVoltar}>‹ Voltar</Text>
        </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  conteudo: {
    padding: 22,
    paddingTop: 55,
    paddingBottom: 35,
  },

  cabecalho: {
    alignItems: 'center',
    marginBottom: 30,
  },

  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#123456',
    borderRadius: 12,
    marginBottom: 25,
  },

  textoVoltar: {
    color: '#f2f7fc',
    fontSize: 16,
    fontWeight: '600',
  },

  icone: {
    fontSize: 45,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#243B53',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    marginTop: 8,
  },

  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },

  iconeOpcao: {
    fontSize: 27,
    marginRight: 15,
  },

  informacoes: {
    flex: 1,
  },

  tituloOpcao: {
    fontSize: 16,
    fontWeight: '700',
    color: '#243B53',
    marginBottom: 5,
  },

  descricao: {
    fontSize: 13,
    color: '#667085',
    lineHeight: 19,
  },

  versao: {
    textAlign: 'center',
    fontSize: 12,
    color: '#98A2B3',
    marginTop: 25,
  },
});
