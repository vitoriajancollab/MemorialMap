import { View, Text, StyleSheet } from "react-native";

export default function Pesquisar() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Tela de Pesquisa
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  titulo:{
    fontSize:30,
    fontWeight:"bold"
  }
});