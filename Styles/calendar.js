import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  calendar: {
    marginVertical: 10,
  },
  statsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statsLabel: {
    fontSize: 16,
    color: "#555",
  },
  statsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});