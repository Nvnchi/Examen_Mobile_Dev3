import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Drank = (props) => {
  return (
    <View>
      <Text style={styles.drank_naam}>{props.title}</Text>
      <Text style={styles.drank_beschrijving}>{props.description}</Text>
      <Image source={{uri: props.image}} style={{width: 200, height: 200}} />
    </View>
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