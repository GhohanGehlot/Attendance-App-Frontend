import { Pressable, Text } from "react-native";
import { styles } from "../Styles/home.js";

export default function AddButton({ onPress }) {
  return (
    <Pressable style={styles.fab} onPress={onPress} >
      <Text style={styles.fabText}>+</Text>
    </Pressable>
  );
}
