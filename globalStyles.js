import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    width: "80%",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "white",
    fontSize: 16,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },

  backText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },

  liveText: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
  },
});

export default globalStyles;