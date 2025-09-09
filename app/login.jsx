import { useNavigation } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../Styles/login.js";

export default function Login() {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
        />

        <TextInput 
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>

        <Text style={styles.signup} onPress={() => navigation.navigate("Signup")}>Don’t have an account? Sign up</Text>
      </View>
    </View>
  );
}