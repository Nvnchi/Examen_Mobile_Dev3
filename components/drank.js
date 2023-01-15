import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const Drank = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.setScreen}>
      <View>
        <Text style={styles.drank_naam}>{props.title}</Text>
        <Image source={{uri: props.image}} style={styles.drank_foto} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Drank;

const styles = StyleSheet.create({
    drank_naam: {
      textAlign: 'center',
      marginBottom: 15,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#8DCBE6',
      marginTop: 25,
    },
    drank_beschrijving: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#F637EC',
    },
    drank_foto: {
      width: 200,
      height: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
});