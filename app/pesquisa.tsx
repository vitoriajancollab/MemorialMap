import { router } from 'expo-router';
import { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Index() {
  const [nome, setNome] = useState('');
  const [resultado, setResultado] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [pesquisou, setPesquisou] = useState(false);

  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [tituloAviso, setTituloAviso] = useState('');
  const [mensagemAviso, setMensagemAviso] = useState('');
  const [iconeAviso, setIconeAviso] = useState('🔔');

  function mostrarMensagem(
    titulo: string,
    mensagem: string,
    icone: string = '🔔'
  ) {
    setTituloAviso(titulo);
    setMensagemAviso(mensagem);
    setIconeAviso(icone);
    setMostrarAviso(true);
  }

  function formatarData(data: string) {
    if (!data) return '-';

    const dataObj = new Date(data);

    return dataObj.toLocaleDateString('pt-BR');
  }

  async function pesquisar() {
    if (!nome.trim()) {
      mostrarMensagem(
        'Atenção',
        'Digite o nome de uma pessoa para pesquisar.',
        '🔎'
      );
      return;
    }

    try {
      setCarregando(true);
      setPesquisou(true);

      const resposta = await fetch(
        'http://192.168.1.74:3000/falecidos'
      );

      const dados = await resposta.json();

      const normalizarTexto = (texto: string) => {
        return texto
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      };

      const textoPesquisa = normalizarTexto(nome.trim());

      const filtrados = dados.filter((item: any) => {
        const nomeRegistro = normalizarTexto(
          String(item.Nome || '').trim()
        );

        return nomeRegistro.includes(textoPesquisa);
      });

      setResultado(filtrados);
    } catch (erro) {
      mostrarMensagem(
        'Erro de conexão',
        'Não foi possível conectar com a API.',
        '⚠️'
      );

      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Área de pesquisa */}
          <View style={styles.caixaPesquisa}>
            <Text style={styles.titulo}>
              Encontre uma pessoa
            </Text>

            <Text style={styles.subtitulo}>
              Pesquise pelo nome para localizar uma pessoa
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo"
              placeholderTextColor="#777"
              value={nome}
              onChangeText={setNome}
            />

            <Pressable
              style={styles.botaoPesquisar}
              onPress={pesquisar}
            >
              <Text style={styles.textoPesquisar}>
                🔎 Pesquisar
              </Text>
            </Pressable>

            <Pressable
              style={styles.botaoAdmin}
              onPress={() => router.push('/admin')}
            >
              <Text style={styles.textoAdmin}>
                ⚙️ Área do Administrador
              </Text>
            </Pressable>
          </View>

          {/* Aviso personalizado */}
          {mostrarAviso && (
            <View style={styles.caixaAviso}>
              <Text style={styles.iconeAviso}>
                {iconeAviso}
              </Text>

              <Text style={styles.tituloAviso}>
                {tituloAviso}
              </Text>

              <Text style={styles.textoAviso}>
                {mensagemAviso}
              </Text>

              <Pressable
                style={styles.botaoAviso}
                onPress={() => setMostrarAviso(false)}
              >
                <Text style={styles.textoBotaoAviso}>
                  OK
                </Text>
              </Pressable>
            </View>
          )}

          {carregando && (
            <Text style={styles.carregando}>
              ⏳ Buscando registros...
            </Text>
          )}

          {pesquisou &&
            !carregando &&
            resultado.length === 0 && (
              <View style={styles.semResultado}>
                <Text style={styles.iconeSemResultado}>
                  🔎
                </Text>

                <Text style={styles.tituloSemResultado}>
                  Nenhum registro encontrado
                </Text>

                <Text style={styles.textoSemResultado}>
                  Tente pesquisar utilizando outro nome.
                </Text>
              </View>
            )}

          {resultado.map((item: any) => (
            <View
              key={String(
                item.Id ?? `${item.Nome}-${item.Lote}`
              )}
              style={styles.card}
            >
              <Text style={styles.resultado}>
                👤 {item.Nome}
              </Text>

              <View style={styles.linha} />

              <Text style={styles.info}>
                🏛️ {item.Cemiterio}
              </Text>

              <Text style={styles.info}>
                📍 Quadra {item.Quadra} • Lote {item.Lote}
              </Text>

              <View style={styles.datas}>
                <View style={styles.dataBox}>
                  <Text style={styles.dataLabel}>
                    Nascimento
                  </Text>

                  <Text style={styles.dataValor}>
                    {formatarData(item.DataNascimento)}
                  </Text>
                </View>

                <View style={styles.dataBox}>
                  <Text style={styles.dataLabel}>
                    Falecimento
                  </Text>

                  <Text style={styles.dataValor}>
                    {formatarData(item.DataFalecimento)}
                  </Text>
                </View>
              </View>

              <Pressable
                style={styles.botaoMapa}
                onPress={() =>
                  router.push({
                    pathname: '/mapa',
                    params: {
                      latitude: String(
                        item.Latitude ?? ''
                      ),
                      longitude: String(
                        item.Longitude ?? ''
                      ),
                      nome: item.Nome,
                      cemiterio: item.Cemiterio,
                      quadra: item.Quadra,
                      lote: item.Lote,
                    },
                  })
                }
              >
                <Text style={styles.textoMapa}>
                  🗺️ Ver localização
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  scroll: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  caixaPesquisa: {
    width: '88%',
    maxWidth: 460,
    backgroundColor: 'rgba(255,255,255,0.94)',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 0,
  },

  titulo: {
    color: '#243b53',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitulo: {
    color: '#52606d',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },

  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d0d7de',
  },

  botaoPesquisar: {
    width: '100%',
    backgroundColor: '#294f7d',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  textoPesquisar: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  botaoAdmin: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#294f7d',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
  },

  textoAdmin: {
    color: '#4a6fa5',
    fontSize: 15,
    fontWeight: 'bold',
  },

  caixaAviso: {
    width: '88%',
    maxWidth: 460,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginTop: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d6e0ea',
  },

  iconeAviso: {
    fontSize: 38,
    marginBottom: 8,
  },

  tituloAviso: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#243b53',
    marginBottom: 6,
    textAlign: 'center',
  },

  textoAviso: {
    fontSize: 15,
    color: '#52606d',
    textAlign: 'center',
    marginBottom: 15,
  },

  botaoAviso: {
    backgroundColor: '#243b53',
    paddingVertical: 11,
    paddingHorizontal: 35,
    borderRadius: 10,
  },

  textoBotaoAviso: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  card: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'rgba(255,255,255,0.97)',
    marginTop: 18,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e5e8',
  },

  resultado: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#243b53',
    marginBottom: 12,
  },

  info: {
    fontSize: 15,
    color: '#52606d',
    marginBottom: 8,
  },

  carregando: {
    marginTop: 20,
    fontSize: 16,
    color: '#243b53',
    fontWeight: 'bold',
  },

  semResultado: {
    width: '90%',
    maxWidth: 500,
    marginTop: 18,
    padding: 22,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
  },

  iconeSemResultado: {
    fontSize: 30,
    marginBottom: 8,
  },

  tituloSemResultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#243b53',
    textAlign: 'center',
    marginBottom: 5,
  },

  textoSemResultado: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
  },

  linha: {
    width: '100%',
    height: 1,
    backgroundColor: '#e1e5e8',
    marginBottom: 14,
  },

  datas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
  },

  dataBox: {
    width: '48%',
    backgroundColor: '#f5f7fa',
    padding: 12,
    borderRadius: 12,
  },

  dataLabel: {
    fontSize: 12,
    color: '#7b8794',
    marginBottom: 4,
  },

  dataValor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#243b53',
  },

  botaoMapa: {
    width: '100%',
    backgroundColor: '#294f7d',
    padding: 13,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoMapa: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
