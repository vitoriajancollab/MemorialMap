import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}> Memorial Map</Text>

      <Text style={styles.subtitle}>
        Encontre facilmente o jazigo de um ente querido.
      </Text>

      <TextInput
        placeholder="Digite o nome do falecido"
        style={styles.input}
      />

      
       <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/pesquisar")}
     >
      <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.adminButton}>
        <Text style={styles.adminText}>Área do Administrador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  adminButton: {
    marginTop: 20,
  },

  adminText: {
    color: "#2E7D32",
    fontWeight: "bold",
    fontSize: 16,
  },
});