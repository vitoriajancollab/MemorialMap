import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, ImageBackground, Pressable, StyleSheet, Text, TextInput, View, } from 'react-native';
export default function Login() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const menuAnim = useRef(new Animated.Value(-320)).current;
  const [menuAberto, setMenuAberto] = useState(false);

 function abrirMenu() {
  setMenuAberto(true);

  Animated.timing(menuAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
}

  function fecharMenu() {
  Animated.timing(menuAnim, {
    toValue: -320,
    duration: 300,
    useNativeDriver: true,
  }).start(() => {
    setMenuAberto(false);
  });
}

 async function continuar() {
  if (!nome.trim()) {
    return;
  }

  await AsyncStorage.setItem('nomeUsuario', nome.trim());
  await AsyncStorage.setItem('emailUsuario', email.trim());

  router.navigate('/pesquisa');
}

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <Pressable
         style={styles.botaoMenu}
           onPress={abrirMenu}
         >
         <Text style={styles.iconeMenu}>☰</Text>
         </Pressable>

         <View style={styles.card}>

          <Text style={styles.icone}>🕊️</Text>

          <Text style={styles.titulo}>
            Bem-vindo ao Memorial Map
          </Text>

          <Text style={styles.subtitulo}>
            Antes de começar, conte-nos um pouco sobre você.
          </Text>

          <View style={styles.campoContainer}>
            <Text style={styles.label}>Nome *</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#98A2B3"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.campoContainer}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail (opcional)"
              placeholderTextColor="#98A2B3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.botao,
              !nome.trim() && styles.botaoDesativado,
              pressed && nome.trim() && styles.botaoPressionado,
            ]}
            onPress={continuar}
            disabled={!nome.trim()}
          >
            <Text style={styles.textoBotao}>
              CONTINUAR
            </Text>

            <Text style={styles.seta}>→</Text>
          </Pressable>

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

  botaoMenu: {
  position: 'absolute',
  top: 55,
  left: 20,
  width: 52,
  height: 52,
  borderRadius: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.94)',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.18,
  shadowRadius: 6,
  elevation: 5,
},

iconeMenu: {
  fontSize: 28,
  color: '#243b53',
  fontWeight: '700',
},
});