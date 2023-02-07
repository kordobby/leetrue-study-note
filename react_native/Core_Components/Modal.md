# Modal

- Modal Component is a basic way to present content above and enclosing View.

## Props

### View Props

- inherits View Props

### `animationType`

- controls how the modal animates
- type : `none`, `slide`, `fade`

### `onRequestClose`

- `onRequestClose` callback is called
  - when the user taps the hardward back btn on Android
  - when a Modal is being dismissed using a drag gesture when presentationStyle is pageSheet or formSheet on iOS

### `onShow`

- allows passing a function that will be called once the modal has been shown

### `transparent`

- determines whether your modal will fill the entire view
- type : `boolean`
- default : `false`

### `visible`

- determines whether ur modal is visible
- type : `boolean`
- default : `true`

```javascript
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.centeredView}>
          <View stype={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setOpen(!open)}
            >
              <Text style={styles.textStyle}>HideModal</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default App;
```
