import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Administrador</Text>

      <Text style={styles.subtitulo}>
        Gerencie os registros do Memorial Map
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => alert('Em breve: cadastrar falecido')}
      >
        <Text style={styles.textoBotao}>Cadastrar Falecido</Text>
      </Pressable>

      <Pressable
        style={styles.botao}
        onPress={() => alert('Em breve: visualizar registros')}
      >
        <Text style={styles.textoBotao}>📋 Ver Registros</Text>
      </Pressable>

      <Pressable
        style={styles.botaoVoltar}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },

  botao: {
    width: '90%',
    backgroundColor: '#4a6fa5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    marginTop: 15,
    padding: 12,
  },

  textoVoltar: {
    fontSize: 16,
    color: '#4a6fa5',
  },
});