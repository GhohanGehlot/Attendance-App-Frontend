import { useNavigation } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../Styles/Auth.js"; 

export default function Signup() {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput 
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
        />

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
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <Text style={styles.signup} onPress={() => navigation.navigate("Login") }>Already have an account? Login</Text>
      </View>
    </View>
  );
}
