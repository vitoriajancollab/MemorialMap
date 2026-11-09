
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {ScrollView,StyleSheet,Text,View,} from 'react-native';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usaEmail, setUsaEmail] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
      const emailSalvo = await AsyncStorage.getItem('emailUsuario');
      const escolhaEmail = await AsyncStorage.getItem('usaEmail');

      setNome(nomeSalvo || 'Nome não informado');
      setEmail(emailSalvo || '');
      setUsaEmail(escolhaEmail === 'true');
      setCarregando(false);
    }

    carregarDados();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <View style={styles.cabecalho}>
        <Text style={styles.icone}>👤</Text>
        <Text style={styles.titulo}>Meus dados</Text>
        <Text style={styles.subtitulo}>
          Consulte suas informações no Memorial Map.
        </Text>
      </View>

      {carregando ? (
        <Text style={styles.descricao}>Carregando seus dados...</Text>
      ) : (
        <>
          <View style={styles.cartao}>
            <Text style={styles.rotulo}>Nome</Text>
            <Text style={styles.valor}>{nome}</Text>
          </View>

          <View style={styles.cartao}>
            <Text style={styles.rotulo}>E-mail</Text>
            <Text style={styles.valor}>
              {usaEmail ? email || 'E-mail não informado' : 'Não utiliza e-mail'}
            </Text>
          </View>

          <View style={styles.cartao}>
            <Text style={styles.rotulo}>Uso de e-mail</Text>
            <Text style={styles.valor}>
              {usaEmail ? 'Sim, utiliza e-mail' : 'Não utiliza e-mail'}
            </Text>
          </View>
        </>
      )}

      <Text style={styles.aviso}>
        Estas informações são utilizadas para identificar suas preferências
        no aplicativo.
      </Text>

      <Text
        style={styles.botaoVoltar}
        onPress={() => router.back()}
      >
        ‹ Voltar
      </Text>
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
  icone: {
    fontSize: 45,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#243B53',
  },
  subtitulo: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    marginTop: 8,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  rotulo: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 7,
  },
  valor: {
    fontSize: 17,
    fontWeight: '700',
    color: '#243B53',
  },
  descricao: {
    fontSize: 14,
    color: '#667085',
  },
  aviso: {
    fontSize: 13,
    color: '#667085',
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 20,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#123456',
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
