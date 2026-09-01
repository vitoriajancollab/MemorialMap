
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Memorial Map' }} />

      <View style={styles.container}>
        <Text style={styles.icone}>🕊️</Text>

        <Text style={styles.titulo}>
          Página não encontrada
        </Text>

        <Text style={styles.mensagem}>
          Desculpe, a página que você está procurando
          não existe ou não está disponível.
        </Text>

        <Link href="/" style={styles.botao}>
          <Text style={styles.textoBotao}>
            ← Voltar ao início
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  icone: {
    fontSize: 50,
    marginBottom: 18,
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 10,
  },

  mensagem: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 400,
    marginBottom: 25,
  },

  botao: {
    backgroundColor: '#294f7d',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
