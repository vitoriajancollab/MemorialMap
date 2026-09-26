import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { API_URL } from '../constants/Api';


export default function Registros() {
  const [falecidos, setFalecidos] = useState<any[]>([]);
  const [pesquisa, setPesquisa] = useState('');


  async function carregarFalecidos() {
    try {
      const resposta = await fetch(`${API_URL}/falecidos`);


      const dados = await resposta.json();


      setFalecidos(Array.isArray(dados) ? dados : []);
    } catch (erro) {
      console.error('Erro ao carregar falecidos:', erro);
      alert('Não foi possível carregar os registros.');
    }
  }


    useEffect(() => {
    carregarFalecidos();
  }, []);


  const normalizarTexto = (texto: string) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  // A API retorna registros com casos mistos (Nome/nome, Id/id...), então lemos os dois formatos
  function campo(registro: any, chave: string) {
    if (!registro) return undefined;
    const chaveMinuscula = chave.charAt(0).toLowerCase() + chave.slice(1);
    return registro[chave] ?? registro[chaveMinuscula];
  }

  // A API pode gravar a data como dd/mm/yyyy ou como timestamp em milissegundos (ex: "957484800000.0")
  function formatarData(data: any) {
    if (!data) return 'Não informado';

    const texto = String(data).trim();

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return texto;

    const dataObj = /^\d+(\.\d+)?$/.test(texto)
      ? new Date(Number(texto))
      : new Date(texto);

    return isNaN(dataObj.getTime())
      ? 'Não informado'
      : dataObj.toLocaleDateString('pt-BR');
  }

  const registrosFiltrados = falecidos.filter((falecido) =>
    normalizarTexto(String(campo(falecido, 'Nome') || '')).includes(
      normalizarTexto(pesquisa)
    )
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📋 Registros</Text>


      <Text style={styles.subtitulo}>
        Falecidos cadastrados no Memorial Map
      </Text>


      <TextInput
        style={styles.input}
        placeholder="🔎 Pesquisar pelo nome"
        value={pesquisa}
        onChangeText={setPesquisa}
      />


      <View style={styles.resumo}>
  <View style={styles.resumoIcone}>
    <Text style={styles.resumoEmoji}>
      📋
    </Text>
  </View>


  <View>
    <Text style={styles.resumoNumero}>
      {registrosFiltrados.length}
    </Text>


    <Text style={styles.resumoTexto}>
      {registrosFiltrados.length === 1
        ? 'registro encontrado'
        : 'registros encontrados'}
    </Text>
  </View>
</View>


     {registrosFiltrados.length === 0 ? (
  <View style={styles.semRegistros}>
    <Text style={styles.iconeSemRegistros}>
      📭
    </Text>


    <Text style={styles.tituloSemRegistros}>
      Nenhum registro encontrado
    </Text>


    <Text style={styles.textoSemRegistros}>
      Tente pesquisar por outro nome.
    </Text>
  </View>
) : (
        registrosFiltrados.map((falecido) => (
       <Pressable
       key={campo(falecido, 'Id')}
       style={({ pressed }) => [
       styles.card,
       pressed && styles.cardPressionado,
  ]}
>


       <View style={styles.cabecalhoCard}>


       <View style={styles.iconeFalecido}>
       <Text style={styles.emojiFalecido}>🕊️</Text>
       </View>


       <View style={styles.nomeContainer}>
        <Text style={styles.nome}>
        {campo(falecido, 'Nome')}
        </Text>


      <Text style={styles.identificador}>
        Registro #{campo(falecido, 'Id')}
      </Text>
    </View>


 </View>


            <View style={styles.linha} />
            <View style={styles.datasContainer}>


  <View style={styles.dataBox}>
    <Text style={styles.rotulo}>
      Nascimento
    </Text>


    <Text style={styles.data}>
      {formatarData(campo(falecido, 'DataNascimento'))}
    </Text>
  </View>


  <View style={styles.dataBox}>
    <Text style={styles.rotulo}>
      Falecimento
    </Text>


    <Text style={styles.data}>
      {formatarData(campo(falecido, 'DataFalecimento'))}
    </Text>
  </View>


 </View>
           <View style={styles.localizacao}>


  <Text style={styles.rotulo}>
    📍 Localização
  </Text>


  <View style={styles.cemiterioContainer}>
  <Text style={styles.iconeLocal}>
    📍
  </Text>


  <Text style={styles.cemiterio}>
    {campo(falecido, 'Cemiterio') || 'Não informado'}
  </Text>
</View>


  <View style={styles.localContainer}>


    <View style={styles.localBox}>
      <Text style={styles.rotulo}>
        Quadra
      </Text>


      <Text style={styles.valorLocal}>
        {campo(falecido, 'Quadra') || 'Não informado'}
      </Text>
    </View>


    <View style={styles.localBox}>
      <Text style={styles.rotulo}>
        Lote
      </Text>


      <Text style={styles.valorLocal}>
        {campo(falecido, 'Lote') || 'Não informado'}
      </Text>
    </View>


  </View>


</View>


            <Pressable
              style={({ pressed }) => [
                  styles.botaoMapa,
                pressed && styles.botaoMapaPressionado,
                ]}
              onPress={() =>
              router.push({
              pathname: '/mapa',
              params: {
              latitude: String(campo(falecido, 'Latitude') ?? ''),
              longitude: String(campo(falecido, 'Longitude') ?? ''),
              nome: campo(falecido, 'Nome'),
              cemiterio: campo(falecido, 'Cemiterio'),
              quadra: campo(falecido, 'Quadra'),
              lote: campo(falecido, 'Lote'),
            },
            })
           }
             >
              <View style={styles.conteudoBotao}>
              <Text style={styles.iconeBotao}>
                🗺️
              </Text>


              <Text style={styles.textoBotao}>
              Ver no mapa
             </Text>
            </View>
            </Pressable>
          </Pressable>
        ))
      )}
            <Pressable
        style={({ pressed }) => [
          styles.botaoVoltar,
          pressed && styles.botaoVoltarPressionado,
        ]}
        onPress={() => router.push('/admin')}
      >
        <Text style={styles.textoVoltar}>
          ← Voltar
        </Text>
      </Pressable>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 20,
  paddingTop: 25,
  paddingBottom: 30,
  backgroundColor: '#f4f6f8',
  flexGrow: 1,
},


  titulo: {
  fontSize: 30,
  fontWeight: '800',
  textAlign: 'center',
  color: '#1f2937',
  marginTop: 25,
  letterSpacing: 0.3,
},


  subtitulo: {
  textAlign: 'center',
  color: '#6b7280',
  fontSize: 15,
  marginTop: 8,
  marginBottom: 28,
  lineHeight: 21,
},


  input: {
  backgroundColor: '#ffffff',
  borderRadius: 14,
  paddingHorizontal: 18,
  height: 52,
  fontSize: 16,
  color: '#1f2937',
  marginBottom: 20,


  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 5,


  elevation: 3,
},


  card: {
  backgroundColor: '#ffffff',
  padding: 20,
  borderRadius: 18,
  marginBottom: 18,


  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.10,
  shadowRadius: 6,


  elevation: 4,
},


cardPressionado: {
  opacity: 0.96,
  transform: [{ scale: 0.99 }],
},


  cabecalhoCard: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},


  iconeFalecido: {
  width: 52,
  height: 52,
  borderRadius: 14,
  backgroundColor: '#e8eef7',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 14,
},


 emojiFalecido: {
  fontSize: 24,
},


 nomeContainer: {
  flex: 1,
},


 identificador: {
  fontSize: 13,
  color: '#9ca3af',
  marginTop: 3,
},
  nome: {
  fontSize: 20,
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: 14,
  letterSpacing: 0.2,
},
  informacao: {
  fontSize: 15,
  color: '#4b5563',
  marginBottom: 8,
  lineHeight: 21,
},
  semRegistros: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 18,
  padding: 30,
  marginTop: 10,


  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.06,
  shadowRadius: 5,


  elevation: 2,
},


  iconeSemRegistros: {
  fontSize: 42,
  marginBottom: 12,
},


  tituloSemRegistros: {
  fontSize: 18,
  fontWeight: '700',
  color: '#374151',
},


  textoSemRegistros: {
  fontSize: 14,
  color: '#9ca3af',
  marginTop: 6,
  textAlign: 'center',
},


  botaoMapa: {
  backgroundColor: '#4a6fa5',
  height: 48,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 16,


  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.12,
  shadowRadius: 4,


  elevation: 3,
},


  conteudoBotao: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},


  iconeBotao: {
  fontSize: 18,
  marginRight: 7,
},


 textoBotao: {
  color: '#ffffff',
  fontSize: 15,
  fontWeight: '700',
  letterSpacing: 0.2,
},
  resumo: {
  backgroundColor: '#ffffff',
  borderRadius: 16,
  padding: 14,
  marginBottom: 18,
  flexDirection: 'row',
  alignItems: 'center',


  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.06,
  shadowRadius: 5,


  elevation: 2,
},


  resumoIcone: {
  width: 45,
  height: 45,
  borderRadius: 12,
  backgroundColor: '#e8eef7',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
},


  resumoEmoji: {
  fontSize: 21,
},


  resumoNumero: {
  fontSize: 20,
  fontWeight: '800',
  color: '#1f2937',
},


  resumoTexto: {
  fontSize: 13,
  color: '#6b7280',
  marginTop: 1,
},
  linha: {
  height: 1,
  backgroundColor: '#eef0f2',
  marginBottom: 15,
},


  datasContainer: {
  flexDirection: 'row',
  gap: 12,
  marginBottom: 14,
},


  dataBox: {
  flex: 1,
  backgroundColor: '#f8fafc',
  borderRadius: 12,
  padding: 12,
},


  rotulo: {
  fontSize: 12,
  color: '#9ca3af',
  marginBottom: 4,
},


  data: {
  fontSize: 15,
  fontWeight: '600',
  color: '#374151',
},
  localizacao: {
  backgroundColor: '#f8fafc',
  borderRadius: 12,
  padding: 14,
  marginBottom: 2,
},


 cemiterio: {
  fontSize: 15,
  fontWeight: '600',
  color: '#374151',
  flex: 1,
},


  localContainer: {
  flexDirection: 'row',
  gap: 12,
},


  localBox: {
  flex: 1,
},


  valorLocal: {
  fontSize: 15,
  fontWeight: '600',
  color: '#374151',
},
  botaoMapaPressionado: {
  opacity: 0.75,
  transform: [{ scale: 0.98 }],
},
cemiterioContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},


iconeLocal: {
  fontSize: 17,
  marginRight: 7,
},
botaoVoltar: {
  alignSelf: 'center',
  backgroundColor: '#ffffff',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 12,
  marginTop: 5,
  marginBottom: 10,


  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.06,
  shadowRadius: 4,


  elevation: 2,
},


botaoVoltarPressionado: {
  opacity: 0.7,
  transform: [{ scale: 0.97 }],
},


textoVoltar: {
  fontSize: 15,
  color: '#4a6fa5',
  fontWeight: '700',
},
});
