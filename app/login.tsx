import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Login() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Animação do menu
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

        {/* BOTÃO DO MENU */}
        <Pressable
          style={styles.botaoMenu}
          onPress={abrirMenu}
        >
          <Text style={styles.iconeMenu}>☰</Text>
        </Pressable>

        {/* FUNDO ESCURO QUANDO O MENU ESTÁ ABERTO */}
        {menuAberto && (
          <Pressable
            style={styles.fundoMenu}
            onPress={fecharMenu}
          />
        )}

        {/* MENU LATERAL */}
        <Animated.View
          style={[
            styles.menuLateral,
            {
              transform: [{ translateX: menuAnim }],
            },
          ]}
        >

          {/* BOTÃO FECHAR */}
          <Pressable
            style={styles.botaoFechar}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeFechar}>✕</Text>
          </Pressable>

          {/* CABEÇALHO DO MENU */}
          <View style={styles.cabecalhoMenu}>

            <Text style={styles.iconeMenuGrande}>
              🕊️
            </Text>

            <Text style={styles.nomeMenu}>
              MEMORIAL MAP
            </Text>

            <Text style={styles.fraseMenu}>
              Encontre, lembre e homenageie.
            </Text>

          </View>

          {/* CONFIGURAÇÕES */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>⚙️</Text>

            <Text style={styles.textoOpcao}>
              Configurações
            </Text>
          </Pressable>

          {/* CEMITÉRIOS */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>🪦</Text>

            <Text style={styles.textoOpcao}>
              Cemitérios
            </Text>
          </Pressable>

          {/* CONTATO */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>✉️</Text>

            <Text style={styles.textoOpcao}>
              Contato
            </Text>
          </Pressable>

          {/* SOBRE NÓS */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>ℹ️</Text>

            <Text style={styles.textoOpcao}>
              Sobre Nós
            </Text>
          </Pressable>

          {/* POLÍTICA DE PRIVACIDADE */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>🛡️</Text>

            <Text style={styles.textoOpcao}>
              Política de Privacidade
            </Text>
          </Pressable>

          {/* LINHA */}
          <View style={styles.linha} />

          {/* LOGIN */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>🚪</Text>

            <Text style={styles.textoOpcao}>
              Login
            </Text>
          </Pressable>

          {/* VERSÃO */}
          <View style={styles.versaoContainer}>
            <Text style={styles.versao}>
              Versão 1.0.0
            </Text>
          </View>

        </Animated.View>

        {/* CARD DE LOGIN */}
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
              E-mail
            </Text>

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

          {/* CONTINUAR */}
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              !nome.trim() && styles.botaoDesativado,
              pressed &&
                nome.trim() &&
                styles.botaoPressionado,
            ]}
            onPress={continuar}
            disabled={!nome.trim()}
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

  /* =========================
     CARD DE LOGIN
  ========================= */

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

  /* =========================
     BOTÃO MENU
  ========================= */

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
    color: '#243B53',
    fontWeight: '700',
  },

  /* =========================
     FUNDO ESCURO
  ========================= */

  fundoMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 20,
  },

  /* =========================
     MENU LATERAL
  ========================= */

  menuLateral: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 320,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 22,
    zIndex: 30,
    elevation: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  /* =========================
     BOTÃO FECHAR
  ========================= */

  botaoFechar: {
    position: 'absolute',
    top: 22,
    right: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F4F7',
    zIndex: 40,
  },

  iconeFechar: {
    fontSize: 20,
    color: '#243B53',
    fontWeight: '700',
  },

  /* =========================
     CABEÇALHO
  ========================= */

  cabecalhoMenu: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 25,
  },

  iconeMenuGrande: {
    fontSize: 42,
    marginBottom: 8,
  },

  nomeMenu: {
    fontSize: 20,
    fontWeight: '800',
    color: '#243B53',
    letterSpacing: 1,
  },

  fraseMenu: {
    fontSize: 12,
    color: '#667085',
    marginTop: 5,
    textAlign: 'center',
  },

  /* =========================
     OPÇÕES
  ========================= */

  opcaoMenu: {
    width: '100%',
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 6,
  },

  iconeOpcao: {
    width: 38,
    fontSize: 21,
  },

  textoOpcao: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#243B53',
  },

  /* =========================
     LINHA
  ========================= */

  linha: {
    height: 1,
    backgroundColor: '#E4E7EC',
    width: '100%',
    marginVertical: 12,
  },

  /* =========================
     VERSÃO
  ========================= */

  versaoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  versao: {
    fontSize: 12,
    color: '#98A2B3',
  },
});