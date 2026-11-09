
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View, } from 'react-native';

export default function Notificacoes() {
  const [usaEmail, setUsaEmail] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [novidades, setNovidades] = useState(false);

  useEffect(() => {
    async function carregarPreferencias() {
      const escolhaEmail = await AsyncStorage.getItem('usaEmail');
      const preferenciaNovidades = await AsyncStorage.getItem('notificacoesNovidades');

      setUsaEmail(escolhaEmail === 'true');
      setNovidades(preferenciaNovidades === 'true');
      setCarregando(false);
    }

    carregarPreferencias();
  }, []);

  async function alterarNovidades(valor: boolean) {
    setNovidades(valor);

    await AsyncStorage.setItem(
      'notificacoesNovidades',
      valor ? 'true' : 'false'
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.cabecalho}>
        <Text style={styles.icone}>🔔</Text>
        <Text style={styles.titulo}>Notificações</Text>
        <Text style={styles.subtitulo}>
          Gerencie suas preferências de avisos.
        </Text>
      </View>

      {carregando ? (
        <Text style={styles.descricao}>Carregando preferências...</Text>
      ) : !usaEmail ? (
        <View style={styles.cartao}>
          <Text style={styles.iconeOpcao}>📧</Text>
          <View style={styles.informacoes}>
            <Text style={styles.tituloOpcao}>E-mail não utilizado</Text>
            <Text style={styles.descricao}>
              Como você escolheu não utilizar e-mail, não receberá notificações por esse meio.
              Para utilizar notificações por e-mail, será necessário cadastrar um endereço.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.cartao}>
          <Text style={styles.iconeOpcao}>📢</Text>

          <View style={styles.informacoes}>
            <Text style={styles.tituloOpcao}>Novidades e anúncios</Text>
            <Text style={styles.descricao}>
              Permitir o recebimento de novidades e futuros anúncios por e-mail.
            </Text>
          </View>

          <Switch
            value={novidades}
            onValueChange={alterarNovidades}
            trackColor={{ false: '#D0D5DD', true: '#243B53' }}
            thumbColor="#FFFFFF"
          />
        </View>
      )}

      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>‹ Voltar</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  iconeOpcao: {
    fontSize: 27,
    marginRight: 15,
  },
  informacoes: {
    flex: 1,
  },
  tituloOpcao: {
    fontSize: 16,
    fontWeight: '700',
    color: '#243B53',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 13,
    color: '#667085',
    lineHeight: 19,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#123456',
    borderRadius: 12,
    marginTop: 15,
  },
  textoVoltar: {
    color: '#F2F7FC',
    fontSize: 16,
    fontWeight: '600',
  },
});
