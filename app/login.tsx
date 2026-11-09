import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native';

export default function Login() {
  const { email } = useLocalSearchParams();

  const [nome, setNome] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');

  async function continuar() {
    // O nome sempre é obrigatório
    if (!nome.trim()) {
      return;
    }

    // Se a pessoa escolheu usar e-mail,
    // o e-mail também passa a ser obrigatório
    if (email === 'obrigatorio' && !emailUsuario.trim()) {
      return;
    }

    await AsyncStorage.setItem(
      'nomeUsuario',
      nome.trim()
    );

    await AsyncStorage.setItem(
      'emailUsuario',
      emailUsuario.trim()
    );
    await AsyncStorage.setItem(
  'usaEmail',
  email === 'obrigatorio' ? 'true' : 'false'
);

    router.navigate('/cidades');
  }

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          <Text style={styles.icone}>
            🕊️
          </Text>

          <Text style={styles.titulo}>
            Bem-vindo ao Memorial Map
          </Text>

          <Text style={styles.subtitulo}>
            Antes de começar, conte-nos um pouco sobre você.
          </Text>

          {/* NOME */}
          <View style={styles.campoContainer}>
            <Text style={styles.label}>
              Nome *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#98A2B3"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* E-MAIL */}
          <View style={styles.campoContainer}>
            <Text style={styles.label}>
              E-mail {email === 'obrigatorio' ? '*' : ''}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={
                email === 'obrigatorio'
                  ? 'Digite seu e-mail'
                  : 'Digite seu e-mail (opcional)'
              }
              placeholderTextColor="#98A2B3"
              value={emailUsuario}
              onChangeText={setEmailUsuario}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* BOTÃO CONTINUAR */}
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              !nome.trim() && styles.botaoDesativado,
              email === 'obrigatorio' &&
                !emailUsuario.trim() &&
                styles.botaoDesativado,
              pressed &&
                nome.trim() &&
                (
                  email !== 'obrigatorio' ||
                  emailUsuario.trim()
                ) &&
                styles.botaoPressionado,
            ]}
            onPress={continuar}
            disabled={
              !nome.trim() ||
              (
                email === 'obrigatorio' &&
                !emailUsuario.trim()
              )
            }
          >
            <Text style={styles.textoBotao}>
              CONTINUAR
            </Text>

            <Text style={styles.seta}>
              →
            </Text>
          </Pressable>

          {/* VOLTAR */}
          <Pressable
            style={styles.botaoVoltar}
            onPress={() => router.back()}
          >
            <Text style={styles.textoVoltar}>
              ← Voltar
            </Text>
          </Pressable>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 24,
    padding: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 8,
  },

  icone: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#243B53',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 25,
  },

  campoContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#243B53',
    backgroundColor: '#FFFFFF',
  },

  botao: {
    height: 54,
    borderRadius: 15,
    backgroundColor: '#243B53',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  botaoDesativado: {
    backgroundColor: '#BFC7D1',
  },

  botaoPressionado: {
    opacity: 0.8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  seta: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 10,
  },

  botaoVoltar: {
    alignItems: 'center',
    marginTop: 18,
  },

  textoVoltar: {
    color: '#667085',
    fontSize: 14,
    fontWeight: '600',
  },
});