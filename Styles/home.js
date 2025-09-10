import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  attendanceBox: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between", // 🔥 proper spacing
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  attendanceText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },

  attendancePerc: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50", // green % = positive
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  fab: {
  position: "absolute",
  bottom: 30,   // distance from bottom
  right: 30,    // distance from right
  width: 60,
  height: 60,
  borderRadius: 30, // makes it a circle
  backgroundColor: "#4CAF50", // green button
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 6, // Android shadow
},

fabText: {
  fontSize: 30,
  color: "white",
  fontWeight: "bold",
  marginTop: -2, // centers "+" nicely
},

modalWrapper: {
  flex: 1,
  justifyContent: "center",  // centers vertically
  alignItems: "center",      // centers horizontally
  backgroundColor: "rgba(0,0,0,0.5)", // dim background
},

modalContent: {
  width: "80%",
  backgroundColor: "white",
  padding: 20,
  borderRadius: 15,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 15,
},

input: {
  width: "100%",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
},

submitBtn: {
  backgroundColor: "#4CAF50",
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 10,
},

submitText: {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
},

});


