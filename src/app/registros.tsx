import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Registros() {
  const [falecidos, setFalecidos] = useState<any[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  async function carregarFalecidos() {
    try {
      const resposta = await fetch(
        'http://192.168.1.74:3000/falecidos'
      );

      const dados = await resposta.json();

      setFalecidos(dados);
    } catch (erro) {
      console.error('Erro ao carregar falecidos:', erro);
      alert('Não foi possível carregar os registros.');
    }
  }

  useEffect(() => {
    carregarFalecidos();
  }, []);

  const registrosFiltrados = falecidos.filter((falecido) =>
    falecido.Nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📋 Registros</Text>

      <Text style={styles.subtitulo}>
        Falecidos cadastrados no Memorial Map
      </Text>

      <TextInput
        style={styles.input}
        placeholder="🔎 Pesquisar pelo nome"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {registrosFiltrados.length === 0 ? (
        <Text style={styles.semRegistros}>
          Nenhum registro encontrado.
        </Text>
      ) : (
        registrosFiltrados.map((falecido) => (
          <View key={falecido.Id} style={styles.card}>
            <Text style={styles.nome}>
              {falecido.Nome}
            </Text>

            <Text style={styles.informacao}>
                Nascimento:{' '}
              {new Date(
                falecido.DataNascimento
              ).toLocaleDateString('pt-BR')}
            </Text>

            <Text style={styles.informacao}>
                Falecimento:{' '}
              {new Date(
                falecido.DataFalecimento
              ).toLocaleDateString('pt-BR')}
            </Text>

            <Text style={styles.informacao}>
              📍 Cemitério:{' '}
              {falecido.Cemiterio || 'Não informado'}
            </Text>

            <Text style={styles.informacao}>
              Quadra: {falecido.Quadra || 'Não informado'}
            </Text>

            <Text style={styles.informacao}>
              Lote: {falecido.Lote || 'Não informado'}
            </Text>

            <Pressable
              style={styles.botaoMapa}
              onPress={() =>
                alert('Em breve: localização no mapa')
              }
            >
              <Text style={styles.textoBotao}>
                🗺️ Ver no mapa
              </Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f8',
    flexGrow: 1,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginTop: 20,
  },

  subtitulo: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  nome: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },

  informacao: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 6,
  },

  semRegistros: {
    textAlign: 'center',
    marginTop: 30,
    color: '#6b7280',
    fontSize: 16,
  },

  botaoMapa: {
    backgroundColor: '#4a6fa5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});