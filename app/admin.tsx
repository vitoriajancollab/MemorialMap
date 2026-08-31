import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  return (
    <View style={styles.container}>

      <Text style={styles.icone}>⚙️</Text>

      <Text style={styles.titulo}>
        Área do Administrador
      </Text>

      <Text style={styles.subtitulo}>
        Gerencie os registros do Memorial Map
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.textoBotao}>
          ➕ Cadastrar Falecido
        </Text>
      </Pressable>

      <Pressable
        style={styles.botao}
        onPress={() => router.push('/registros')}
      >
        <Text style={styles.textoBotao}>
          📋 Ver Registros
        </Text>
      </Pressable>

      <Pressable
        style={styles.voltar}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVoltar}>
          ← Voltar
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  icone: {
    fontSize: 42,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 35,
  },

  botao: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: '#294f7d',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  voltar: {
    marginTop: 15,
    padding: 12,
  },

  textoVoltar: {
    color: '#294f7d',
    fontSize: 16,
    fontWeight: 'bold',
  },
});