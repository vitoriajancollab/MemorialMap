import { router } from 'expo-router';
import { Pressable,ScrollView,StyleSheet,Text,View,} from 'react-native';

export default function Sobre() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.icone}>🕊️</Text>

      <Text style={styles.titulo}>Sobre Nós</Text>

      <Text style={styles.subtitulo}>
        Memorial Map
      </Text>

      <View style={styles.linha} />

      <Text style={styles.texto}>
        O Memorial Map nasceu com o propósito de aproximar
        pessoas de suas memórias, facilitando a localização
        de entes queridos e preservando suas histórias.
      </Text>

      <Text style={styles.tituloSecao}>Nossa missão</Text>

      <Text style={styles.texto}>
        Tornar a busca por pessoas sepultadas mais simples
        e acessível, utilizando a tecnologia para ajudar
        famílias a encontrarem seus entes queridos.
      </Text>

      <Text style={styles.tituloSecao}> O que oferecemos</Text>

      <Text style={styles.texto}>
        • Consulta de registros de pessoas falecidas.
        {'\n'}
        • Informações sobre cemitérios, quadras e lotes.
        {'\n'}
        • Localização de sepulturas por meio do mapa.
        {'\n'}
        • Uma maneira mais prática de manter viva a memória
        de quem amamos.
      </Text>

      <Text style={styles.tituloSecao}> Nosso compromisso</Text>

      <Text style={styles.texto}>
        Acreditamos que cada vida deixa uma história.
        Nosso compromisso é utilizar a tecnologia com
        respeito, cuidado e sensibilidade, valorizando
        a memória de cada pessoa.
      </Text>

      <View style={styles.fraseContainer}>
        <Text style={styles.frase}>
          “Encontrar, lembrar e homenagear.”
        </Text>
      </View>

      <Text style={styles.versao}>
        Memorial Map • Versão 1.0.0
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.back()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
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
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },

  icone: {
    fontSize: 48,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0B2D50',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 18,
    color: '#C99527',
    marginTop: 8,
    fontWeight: '600',
  },

  linha: {
    width: 100,
    height: 3,
    backgroundColor: '#D9A52E',
    marginVertical: 24,
    borderRadius: 5,
  },

  tituloSecao: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0B2D50',
    alignSelf: 'flex-start',
    marginTop: 28,
    marginBottom: 12,
  },

  texto: {
    fontSize: 16,
    lineHeight: 26,
    color: '#414852',
    textAlign: 'justify',
    alignSelf: 'stretch',
  },

  fraseContainer: {
    marginTop: 30,
    padding: 18,
    backgroundColor: '#EAE3D3',
    borderRadius: 12,
    width: '100%',
  },

  frase: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#0B2D50',
    textAlign: 'center',
    fontWeight: '600',
  },

  versao: {
    fontSize: 13,
    color: '#777777',
    marginTop: 25,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#0B2D50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});