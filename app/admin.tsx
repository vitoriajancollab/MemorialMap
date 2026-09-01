import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.icone}>⚙️</Text>

        <Text style={styles.titulo}>
          Área do Administrador
        </Text>

        <Text style={styles.subtitulo}>
          Gerencie os registros do Memorial Map
        </Text>
      </View>

      <View style={styles.menu}>

        <Pressable
          style={styles.card}
          onPress={() => router.push('/cadastro')}
        >
          <View style={styles.iconeCard}>
            <Text style={styles.emoji}>➕</Text>
          </View>

          <View style={styles.informacoes}>
            <Text style={styles.tituloCard}>
              Cadastrar Falecido
            </Text>

            <Text style={styles.descricao}>
              Adicione um novo registro ao Memorial Map
            </Text>
          </View>

          <Text style={styles.seta}>›</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push('/registros')}
        >
          <View style={styles.iconeCard}>
            <Text style={styles.emoji}>📋</Text>
          </View>

          <View style={styles.informacoes}>
            <Text style={styles.tituloCard}>
              Ver Registros
            </Text>

            <Text style={styles.descricao}>
              Consulte os falecidos cadastrados
            </Text>
          </View>

          <Text style={styles.seta}>›</Text>
        </Pressable>

      </View>

      <Pressable
        style={styles.botaoVoltar}
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
    padding: 20,
  },

  cabecalho: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 35,
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
  },

  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },

  menu: {
    width: '100%',
  },

  card: {
    width: '100%',
    minHeight: 90,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    elevation: 4,
  },

  iconeCard: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: '#e8eef7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  emoji: {
    fontSize: 25,
  },

  informacoes: {
    flex: 1,
  },

  tituloCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },

  descricao: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },

  seta: {
    fontSize: 30,
    color: '#4a6fa5',
    marginLeft: 8,
  },

  botaoVoltar: {
    alignSelf: 'center',
    marginTop: 15,
    padding: 12,
  },

  textoVoltar: {
    fontSize: 16,
    color: '#4a6fa5',
    fontWeight: '600',
  },
});
