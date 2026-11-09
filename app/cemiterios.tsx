
import { router, useLocalSearchParams } from 'expo-router';
import {ImageBackground, Pressable,ScrollView,StyleSheet, Text,View,} from 'react-native';

// Cemitérios provisórios para testar a tela
const cemiterios = [
  { id: '1', nome: 'Cemitério Municipal' },
  { id: '2', nome: 'Cemitério Jardim da Paz' },
  { id: '3', nome: 'Cemitério Parque da Saudade' },
];

export default function Cemiterios() {
  const { cidade, estado } = useLocalSearchParams<{
    cidade?: string;
    estado?: string;
  }>();

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Pressable
          style={styles.voltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoVoltar}>‹ Voltar</Text>
        </Pressable>

        <View style={styles.cabecalho}>
          <Text style={styles.logo}>🕊️ MEMORIAL MAP</Text>
          <Text style={styles.slogan}>
            Encontre, lembre e homenageie.
          </Text>
        </View>

        <View style={styles.painel}>
          <Text style={styles.titulo}>
            ⚰️ Cemitérios
          </Text>

          <Text style={styles.cidade}>
            {cidade || 'Cidade não informada'} - {estado || ''}
          </Text>

          <Text style={styles.subtitulo}>
            Escolha o cemitério onde deseja procurar uma pessoa.
          </Text>

          {cemiterios.map((cemiterio) => (
            <Pressable
              key={cemiterio.id}
              style={styles.cartao}
              onPress={() =>
                router.push({
                  pathname: '/pesquisa',
                  params: {
                    cidade: cidade || '',
                    estado: estado || '',
                    cemiterio: cemiterio.nome,
                  },
                })
              }
            >
              <View style={styles.icone}>
                <Text style={styles.emoji}>⚰️</Text>
              </View>

              <View style={styles.informacoes}>
                <Text style={styles.nome}>
                  {cemiterio.nome}
                </Text>
                <Text style={styles.descricao}>
                  Consultar registros
                </Text>
              </View>

              <Text style={styles.seta}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    padding: 18,
    paddingTop: 45,
    paddingBottom: 30,
  },
  voltar: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textoVoltar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  slogan: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 5,
  },
  painel: {
    backgroundColor: '#F5FAFD',
    padding: 18,
    borderRadius: 22,
  },
  titulo: {
    color: '#244A6C',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cidade: {
    color: '#B08D3C',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    color: '#617487',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2EBF1',
  },
  icone: {
    width: 58,
    height: 58,
    backgroundColor: '#E5EFF7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 27,
  },
  informacoes: {
    flex: 1,
  },
  nome: {
    color: '#244A6C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#718397',
    fontSize: 12,
    marginTop: 5,
  },
  seta: {
    color: '#244A6C',
    fontSize: 28,
  },
});
