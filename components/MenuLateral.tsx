import { router } from 'expo-router';
import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type MenuLateralProps = {
  aberto: boolean;
  onAbrir: () => void;
  onFechar: () => void;
};

export default function MenuLateral({
  aberto,
  onAbrir,
  onFechar,
}: MenuLateralProps) {
  const menuAnim = useRef(new Animated.Value(-320)).current;

  function abrirMenu() {
    onAbrir();

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
      onFechar();
    });
  }

  return (
    <>
      {/* BOTÃO DO MENU */}
      {!aberto && (
        <Pressable
          style={styles.botaoMenu}
          onPress={abrirMenu}
        >
          <Text style={styles.iconeMenu}>☰</Text>
        </Pressable>
      )}

      {/* FUNDO ESCURO */}
      {aberto && (
        <Pressable
          onPress={fecharMenu}
        />
      )}

      {/* MENU LATERAL */}
      {aberto && (
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

          {/* CABEÇALHO */}
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
             onPress={() => {
             Animated.timing(menuAnim, {
             toValue: -320,
             duration: 300,
             useNativeDriver: true,
             }).start(() => {
             onFechar();
             router.push('/configuracoes');
             });
              }}
          >
            <Text style={styles.iconeOpcao}>
              ⚙️
            </Text>

            <Text style={styles.textoOpcao}>
              Configurações
            </Text>
          </Pressable>

          {/* CEMITÉRIOS */}
          <Pressable
                style={styles.opcaoMenu}
                onPress={() => {
                fecharMenu();
                router.push('/pesquisa');
                }}
              >
             <Text style={styles.iconeOpcao}>
              🪦
             </Text>

            <Text style={styles.textoOpcao}>
              Cemitérios
            </Text>
          </Pressable>

          {/* CONTATO */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={() => {
             Animated.timing(menuAnim, {
             toValue: -320,
             duration: 300,
              useNativeDriver: true,
            }).start(() => {
              onFechar();
              router.push('/contato');
             });
             }}
          >
            <Text style={styles.iconeOpcao}>
              ✉️
            </Text>

            <Text style={styles.textoOpcao}>
              Contato
            </Text>
          </Pressable>

          {/* SOBRE NÓS */}
          <Pressable
            style={styles.opcaoMenu}
           onPress={() => {
            fecharMenu();
            router.push('/sobre');
            }}
          >
            <Text style={styles.iconeOpcao}>
              ℹ️
            </Text>

            <Text style={styles.textoOpcao}>
              Sobre Nós
            </Text>
          </Pressable>

          {/* POLÍTICA DE PRIVACIDADE */}
          <Pressable
            style={styles.opcaoMenu}
            onPress={fecharMenu}
          >
            <Text style={styles.iconeOpcao}>
              🛡️
            </Text>

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
            <Text style={styles.iconeOpcao}>
              🚪
            </Text>

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
      )}
    </>
  );
}

const styles = StyleSheet.create({

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
    fontSize: 30,
    color: '#243B53',
    fontWeight: '700',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

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

  linha: {
    height: 1,
    backgroundColor: '#E4E7EC',
    width: '100%',
    marginVertical: 12,
  },

  versaoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  versao: {
    fontSize: 12,
    color: '#98A2B3',
  },
});