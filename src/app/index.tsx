import { useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [nome, setNome] = useState('');
  const [resultado, setResultado] = useState<any[]>([]);

  async function pesquisar() {
    try {
      const resposta = await fetch('http://192.168.1.74:3000/falecidos');
      const dados = await resposta.json();

      const filtrados = dados.filter((item: any) =>
      item.Nome.toLowerCase().includes(nome.toLowerCase())
        );

      setResultado(filtrados);
    } catch (erro) {
      alert('Erro ao conectar com a API.');
      console.log(erro);
    }
  }

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Encontre o falecido</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />

        <Button title="Pesquisar" onPress={pesquisar}/>

        <Pressable
         style={styles.botaoAdmin}
         onPress={() => router.push('/admin')}
         >
          <Text style={styles.textoAdmin}>⚙️ Área do Administrador</Text>
          </Pressable>

        {resultado.map((item: any) => (

            <View key={item.Id.toString()} style={styles.card}>
              <Text style={styles.resultado}>👤 Nome: {item.Nome}</Text>
           <Text>🏛️ Cemitério: {item.Cemiterio}</Text>
           <Text>📍 Quadra: {item.Quadra}</Text>
           <Text>🪦 Lote: {item.Lote}</Text>
         <Text>
            📅 Falecimento: {item.DataFalecimento?.substring(0, 10)}
           </Text>      
               </View>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  titulo: {
    color: '#161313',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '90%',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },

  resultado: {
    fontSize: 18,
  },

  botaoAdmin: {
  marginTop: 15,
  padding: 12,
},

textoAdmin: {
  color: '#4a6fa5',
  fontSize: 16,
  fontWeight: 'bold',
},
});