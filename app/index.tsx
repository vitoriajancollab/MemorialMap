import { router } from 'expo-router';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';

export default function BoasVindas() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // Animação do menu lateral
  const menuAnim = useRef(new Animated.Value(-320)).current;

  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),

        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Abre o menu
  function abrirMenu() {
    setMenuAberto(true);

    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  // Fecha o menu
  function fecharMenu() {
    Animated.timing(menuAnim, {
      toValue: -320,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMenuAberto(false);
    });
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

        {/* CONTEÚDO PRINCIPAL */}
        <Animated.View
          style={[
            styles.conteudo,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.icone}>
            🕊️
          </Text>

          <Text style={styles.titulo}>
            MEMORIAL MAP
          </Text>

          <Text style={styles.subtitulo}>
            Encontre, lembre e homenageie.
          </Text>

          <Text style={styles.mensagem}>
            Um espaço criado para ajudar você
            a encontrar e localizar pessoas
            que fazem parte da sua história.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.botaoEntrar,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => router.navigate('/login')}
          >
            <Text style={styles.textoBotao}>
              ENTRAR
            </Text>

            <Text style={styles.seta}>
              →
            </Text>
          </Pressable>
        </Animated.View>

        <Text style={styles.rodape}>
          Memorial Map
        </Text>

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
         {/*MENU FECHAR*/}
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

          {/* OPÇÕES */}

          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>⚙️</Text>
            <Text style={styles.textoOpcao}>
              Configurações
            </Text>
          </Pressable>

          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>🪦</Text>
            <Text style={styles.textoOpcao}>
              Cemitérios
            </Text>
          </Pressable>

          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>✉️</Text>
            <Text style={styles.textoOpcao}>
              Contato
            </Text>
          </Pressable>

          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>ℹ️</Text>
            <Text style={styles.textoOpcao}>
              Sobre Nós
            </Text>
          </Pressable>

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

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 35, 55, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  /* BOTÃO ☰ */

  botaoMenu: {
    position: 'absolute',
    top: 55,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: 'rgba(146, 182, 248, 0.94)',
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

  /* CONTEÚDO */

  conteudo: {
    width: '90%',
    maxWidth: 480,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 25,
    padding: 22,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 6,
  },

  icone: {
    fontSize: 42,
    marginBottom: 12,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#243b53',
    textAlign: 'center',
    letterSpacing: 1,
  },

  subtitulo: {
    fontSize: 17,
    color: '#4a6fa5',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  mensagem: {
    fontSize: 15,
    lineHeight: 23,
    color: '#667085',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },

  botaoEntrar: {
    width: '100%',
    height: 52,
    backgroundColor: '#294f7d',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 4,
  },

  botaoPressionado: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },

  seta: {
    color: '#ffffff',
    fontSize: 22,
    marginLeft: 10,
  },

  rodape: {
    position: 'absolute',
    bottom: 18,
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
  },

  /* FUNDO ESCURO */

  fundoMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 15,
  },

  /* MENU LATERAL */

  menuLateral: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 320,
    backgroundColor: '#f7fbfa',
    zIndex: 20,

    paddingTop: 55,
    paddingHorizontal: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 10,
  },

  cabecalhoMenu: {
    alignItems: 'center',
    marginBottom: 25,
  },

  iconeMenuGrande: {
    fontSize: 48,
    marginBottom: 8,
  },

  nomeMenu: {
    fontSize: 22,
    fontWeight: '800',
    color: '#243b53',
    letterSpacing: 1,
  },

  fraseMenu: {
    fontSize: 13,
    color: '#667085',
    textAlign: 'center',
    marginTop: 6,
  },

  opcaoMenu: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 14,
    marginBottom: 5,
  },

  iconeOpcao: {
    fontSize: 22,
    width: 40,
  },

  textoOpcao: {
    fontSize: 16,
    color: '#344054',
    fontWeight: '600',
  },

  linha: {
    height: 1,
    backgroundColor: '#d9e2e0',
    marginVertical: 15,
  },

  versaoContainer: {
  marginTop: 20,
  alignItems: 'center',
  paddingBottom: 20,
},

  versao: {
    fontSize: 12,
    color: '#667085',
  },

  botaoFechar: {
  position: 'absolute',
  top: 18,
  right: 18,
  width: 38,
  height: 38,
  borderRadius: 12,
  backgroundColor: '#e9f0ef',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 5,
},

iconeFechar: {
  fontSize: 18,
  color: '#243b53',
  fontWeight: '700',
},
});