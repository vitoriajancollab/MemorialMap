import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function BotaoIniciar({ onPress }: Props) {
  return (
    <Pressable style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>Iniciar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 15,
    alignItems: 'center',
    width: 100,
  },
  texto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});