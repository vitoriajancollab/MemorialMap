
import { router } from 'expo-router';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Contato() {
  const emailContato = 'contato@memorialmap.com.br';

  async function abrirEmail() {
    try {
      await Linking.openURL(`mailto:${emailContato}`);
    } catch {
      // O aplicativo de e-mail pode não estar configurado.
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* LOGO OFICIAL */}
      <Image
        source={require('../assets/images/Logo-MemorialMap.png')}
        style={styles.logoImagem}
        resizeMode="contain"
      />

      {/* TÍTULO */}
      <Text style={styles.titulo}>
        FALA CONOSCO
      </Text>

      <Text style={styles.subtitulo}>
        Estamos aqui para ouvir você.
      </Text>

      <Text style={styles.descricaoInicial}>
        Entre em contato pelos nossos canais.
      </Text>

      {/* E-MAIL */}
      <Pressable
        style={styles.linhaContato}
        onPress={abrirEmail}
      >
        <View style={styles.iconeEmail}>
          <Text style={styles.textoIconeEmail}>✉</Text>
        </View>

        <View style={styles.divisorDourado} />

        <View style={styles.informacoes}>
          <Text style={styles.rotulo}>
            E-M A I L
          </Text>

          <Text style={styles.email}>
            {emailContato}
          </Text>

          <Text style={styles.legenda}>
            Endereço provisório
          </Text>
        </View>
      </Pressable>

      {/* WHATSAPP */}
      <View style={styles.linhaContato}>
        <View style={styles.iconeWhatsApp}>
          <Text style={styles.textoIconeWhatsApp}>
            ☎
          </Text>
        </View>

        <View style={styles.divisorDourado} />

        <View style={styles.informacoes}>
          <Text style={styles.rotulo}>
            W H A T S A P P
          </Text>

          <Text style={styles.whatsappTitulo}>
            Em breve!
          </Text>

          <Text style={styles.legenda}>
            Nosso canal estará disponível
            quando definirmos o número oficial.
          </Text>
        </View>
      </View>

      {/* RODAPÉ */}
      <View style={styles.decoracaoRodape}>
        <View style={styles.linhaDourada} />
        <View style={styles.diamante} />
        <View style={styles.linhaDourada} />
      </View>

      <Text style={styles.rodape}>
        Memorial Map  •  Versão 1.0.0
      </Text>

      {/* BOTÃO VOLTAR */}
      <Pressable
        style={styles.botaoVoltar}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBotaoVoltar}>
          ←  Voltar
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 35,
    alignItems: 'center',
  },

  logoImagem: {
    width: 220,
    height: 180,
    marginBottom: 24,
  },

  titulo: {
    fontSize: 27,
    fontWeight: '900',
    color: '#123456',
    letterSpacing: 1,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#526F8E',
    textAlign: 'center',
    marginTop: 14,
  },

  descricaoInicial: {
    fontSize: 15,
    color: '#526F8E',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 38,
  },

  linhaContato: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },

  iconeEmail: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#123456',
    borderWidth: 2,
    borderColor: '#DDA52D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoIconeEmail: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },

  iconeWhatsApp: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#123456',
    borderWidth: 2,
    borderColor: '#DDA52D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoIconeWhatsApp: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '700',
  },

  divisorDourado: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: '#DDA52D',
    marginHorizontal: 14,
  },

  informacoes: {
    flex: 1,
  },

  rotulo: {
    fontSize: 11,
    fontWeight: '800',
    color: '#627B98',
    marginBottom: 8,
  },

  email: {
    fontSize: 14,
    fontWeight: '800',
    color: '#123456',
  },

  whatsappTitulo: {
    fontSize: 19,
    fontWeight: '800',
    color: '#123456',
    marginBottom: 6,
  },

  legenda: {
    fontSize: 12,
    color: '#627B98',
    lineHeight: 19,
    marginTop: 7,
  },

  decoracaoRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginTop: 30,
    marginBottom: 22,
    gap: 12,
  },

  linhaDourada: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDA52D',
  },

  diamante: {
    width: 13,
    height: 13,
    backgroundColor: '#DDA52D',
    transform: [{ rotate: '44deg' }],
  },

  rodape: {
    fontSize: 12,
    color: '#627B98',
    textAlign: 'center',
    letterSpacing: 1,
  },

  botaoVoltar: {
    width: '35%',
    paddingVertical: 17,
    backgroundColor: '#123456',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    borderWidth: 1,
    borderColor: '#DDA52D',
  },

  textoBotaoVoltar: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
