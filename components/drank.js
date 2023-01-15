import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const Drank = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.setScreen}>
      <View>
        <Text style={styles.drank_naam}>{props.title}</Text>
        <Image source={{uri: props.image}} style={{width: 200, height: 200}} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Drank;

const styles = StyleSheet.create({
    drank_naam: {
      flexDirection: 'column',
      marginBottom: 30,
    },
    drank_beschrijving: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#F637EC',
    }
});