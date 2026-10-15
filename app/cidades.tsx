
import { router } from 'expo-router';
import { useState } from 'react';
import {ImageBackground,Pressable,ScrollView,StyleSheet,Text,TextInput,View,} from 'react-native';

const cidades = [
  { nome: 'Agudos', estado: 'SP', cemiterios: 3 },
  { nome: 'Bauru', estado: 'SP', cemiterios: 5 },
  { nome: 'Lençóis Paulista', estado: 'SP', cemiterios: 4 },
  { nome: 'Marília', estado: 'SP', cemiterios: 6 },
  { nome: 'Jaú', estado: 'SP', cemiterios: 4 },
];

export default function Cidades() {
  const [busca, setBusca] = useState('');

  const cidadesFiltradas = cidades.filter((cidade) =>
    cidade.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
          <Text style={styles.titulo}>📍 Escolha uma cidade</Text>

          <Text style={styles.subtitulo}>
            Selecione a cidade que possui cemitérios cadastrados no Memorial Map.
          </Text>

          <TextInput
            style={styles.busca}
            placeholder="🔎  Buscar uma cidade..."
            placeholderTextColor="#8293A3"
            value={busca}
            onChangeText={setBusca}
          />

          {cidadesFiltradas.map((cidade) => (
            <Pressable
              key={cidade.nome}
              style={styles.cartaoCidade}
              onPress={() => {
  alert(`Você selecionou ${cidade.nome}!`);
}}
            >
              <View style={styles.imagemCidade}>
                <Text style={styles.iconeCidade}>🏙️</Text>
              </View>

              <View style={styles.infoCidade}>
                <Text style={styles.nomeCidade}>
                  {cidade.nome}
                </Text>
                <Text style={styles.estado}>{cidade.estado}</Text>
                <Text style={styles.quantidade}>
                  ⚰️ {cidade.cemiterios} cemitérios cadastrados
                </Text>
              </View>

              <Text style={styles.seta}>›</Text>
            </Pressable>
          ))}

          {cidadesFiltradas.length === 0 && (
            <Text style={styles.semResultado}>
              Não encontramos essa cidade.
            </Text>
          )}

          <View style={styles.ajuda}>
            <Text style={styles.textoAjuda}>
              ℹ️ Não encontrou sua cidade? Entre em contato com a administração do Memorial Map.
            </Text>
          </View>
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
    textAlign: 'center',
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
  subtitulo: {
    color: '#617487',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  busca: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5E1EA',
    borderRadius: 13,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
  },
  cartaoCidade: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2EBF1',
  },
  imagemCidade: {
    width: 68,
    height: 68,
    backgroundColor: '#E5EFF7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconeCidade: {
    fontSize: 30,
  },
  infoCidade: {
    flex: 1,
  },
  nomeCidade: {
    color: '#244A6C',
    fontSize: 17,
    fontWeight: 'bold',
  },
  estado: {
    color: '#718397',
    fontSize: 12,
    marginTop: 2,
  },
  quantidade: {
    color: '#617487',
    fontSize: 11,
    marginTop: 5,
  },
  seta: {
    color: '#244A6C',
    fontSize: 28,
    marginLeft: 5,
  },
  semResultado: {
    textAlign: 'center',
    color: '#617487',
    padding: 20,
  },
  ajuda: {
    backgroundColor: '#E4F2FC',
    borderRadius: 13,
    padding: 13,
    marginTop: 8,
  },
  textoAjuda: {
    color: '#315775',
    fontSize: 12,
    lineHeight: 19,
  },
});
