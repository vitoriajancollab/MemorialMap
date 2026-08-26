import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataFalecimento, setDataFalecimento] = useState('');
  const [cemiterio, setCemiterio] = useState('');
  const [quadra, setQuadra] = useState('');
  const [lote, setLote] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [falecidos, setFalecidos] = useState<any[]>([]);
  const [idEditando, setIdEditando] = useState<number | null>(null);

  async function carregarFalecidos() {
  try {
    const resposta = await fetch(
      'http://192.168.1.74:3000/falecidos'
    );

    const dados = await resposta.json();

    setFalecidos(dados);
  } catch (erro) {
    console.error('Erro ao carregar falecidos:', erro);
  }
}

useEffect(() => {
  carregarFalecidos();
}, []);

async function excluirFalecido(id: number) {
  try {
    const resposta = await fetch(
      `http://192.168.1.74:3000/falecidos/${id}`,
      {
        method: 'DELETE',
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || 'Erro ao excluir falecido.');
      return;
    }

    alert('Falecido excluído com sucesso!');

    carregarFalecidos();
  } catch (erro) {
    console.error(erro);
    alert('Não foi possível conectar com a API.');
  }
}
function editarFalecido(falecido: any) {
  alert(`Editando: ${falecido.Nome}`);

  setIdEditando(falecido.Id);
  setNome(falecido.Nome);
  setCemiterio(falecido.Cemiterio);
  setQuadra(falecido.Quadra);
  setLote(falecido.Lote);
  setLatitude(String(falecido.Latitude ?? ''));
  setLongitude(String(falecido.Longitude ?? ''));

  setDataNascimento(
    new Date(falecido.DataNascimento).toLocaleDateString('pt-BR')
  );

  setDataFalecimento(
    new Date(falecido.DataFalecimento).toLocaleDateString('pt-BR')
  );
}
async function salvarEdicao() {
  if (idEditando === null) {
    return;
  }

  try {
    const resposta = await fetch(
      `http://192.168.1.74:3000/falecidos/${idEditando}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: nome,
          DataNascimento: dataNascimento,
          DataFalecimento: dataFalecimento,
          Cemiterio: cemiterio || null,
          Quadra: quadra || null,
          Lote: lote || null,
          Latitude: latitude
            ? Number(latitude.replace(',', '.'))
            : null,
          Longitude: longitude
            ? Number(longitude.replace(',', '.'))
            : null,
        }),
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || 'Erro ao editar falecido.');
      return;
    }

    alert('Falecido atualizado com sucesso!');

    setIdEditando(null);

    setNome('');
    setDataNascimento('');
    setDataFalecimento('');
    setCemiterio('');
    setQuadra('');
    setLote('');
    setLatitude('');
    setLongitude('');

    carregarFalecidos();
  } catch (erro) {
    console.error(erro);
    alert('Não foi possível conectar com a API.');
  }
}

     async function cadastrar() {
           console.log('INICIOU O CADASTRO');

       try {
    
      function formatarData(data: string) {
   if (!data) return null;

  const partes = data.split('/');

   if (partes.length === 3) {
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    return data;
   }
    alert('Vou chamar a API agora!');

    const resposta = await fetch('http://192.168.1.74:3000/falecidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        Nome: nome,
        DataNascimento: dataNascimento,
        DataFalecimento: dataFalecimento,
        Cemiterio: cemiterio || null,
        Quadra: quadra || null,
        Lote: lote || null,
        Latitude: latitude ? Number(latitude.replace(',', '.')) : null,
        Longitude: longitude ? Number(longitude.replace(',', '.')) : null,
      }),
    });

    console.log('RESPOSTA DA API:', resposta.status);


    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || 'Erro ao cadastrar falecido.');
      return;
    }

    alert(`Falecido cadastrado com sucesso!\n\nNome: ${dados.Nome}`);

    setNome('');
    setDataNascimento('');
    setDataFalecimento('');
    setCemiterio('');
    setQuadra('');
    setLote('');
    setLatitude('');
    setLongitude('');
  } catch (erro) {
    console.error(erro);
    alert('Não foi possível conectar com a API.');
  }
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastrar Falecido</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do falecido"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de falecimento"
        value={dataFalecimento}
        onChangeText={setDataFalecimento}
      />

      <TextInput
        style={styles.input}
        placeholder="Cemitério"
        value={cemiterio}
        onChangeText={setCemiterio}
      />

      <TextInput
        style={styles.input}
        placeholder="Quadra"
        value={quadra}
        onChangeText={setQuadra}
      />

      <TextInput
        style={styles.input}
        placeholder="Lote"
        value={lote}
        onChangeText={setLote}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
     
    <Pressable
      style={styles.botao}
      onPress={idEditando !== null ? salvarEdicao : cadastrar}
>
    <Text style={styles.textoBotao}>
      {idEditando !== null ? 'Salvar edição' : 'Cadastrar'}
    </Text>
    </Pressable>

{falecidos.map((falecido) => (
  <View key={falecido.Id} style={styles.card}>
    <Text style={styles.nomeFalecido}>
      {falecido.Nome}
    </Text>

    <Text>
      Cemitério: {falecido.Cemiterio || 'Não informado'}
    </Text>

    <Text>
      Quadra: {falecido.Quadra || 'Não informado'} | Lote: {falecido.Lote || 'Não informado'}
    </Text>

     <Pressable
        style={styles.botaoEditar}
        onPress={() => editarFalecido(falecido)}
>
    <Text style={styles.textoBotao}>
    ✏️ Editar
    </Text>
   </Pressable>


    <Pressable
      style={styles.botaoExcluir}
      onPress={() => excluirFalecido(falecido.Id)}
    >
      <Text style={styles.textoBotao}>
        🗑️ Excluir
      </Text>
    </Pressable>
  </View>
))}


    </ScrollView>
    
  );
  
}



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


card: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 10,
  marginTop: 15,
  borderWidth: 1,
  borderColor: '#ddd',
},

nomeFalecido: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,
},

botaoExcluir: {
  backgroundColor: '#c62828',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 12,
},

botaoEditar: {
  backgroundColor: '#1565c0',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 12,
},
});