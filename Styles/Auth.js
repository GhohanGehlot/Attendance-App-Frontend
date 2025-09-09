import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f6fc", 
  },

  card: {
    width: "85%",
    padding: 25,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
    alignItems: "center",
    gap: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
    borderRadius: 10,
  },

  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#4CAF50", 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  signup: {
    marginTop: 15,
    fontSize: 14,
    color: "#007BFF", 
  },
});
