import { Text } from "react-native";
import { Modal, View, StyleSheet } from "react-native";
const PopUpCommon = () => {
  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <View style={styles.dimmed}>
        <View style={styles.container}>
          <Text style={styles.text}>asdfadsf</Text>
          <Text style={styles.buttontext}>asdfadsf</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dimmed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: `rgba(0, 0, 0, 0.36)`,
  },
  container: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttontext: {
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PopUpCommon;
