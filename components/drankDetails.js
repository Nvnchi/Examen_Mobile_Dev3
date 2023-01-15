import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

const DrankDetails = (props) => {
  const handleExit = () => {
    props.setScreen('list')
  }
  return (
    <View>
      <Image source={{ uri: props.image }} style={styles.drank_foto} />
      <Text style={styles.drank_title}>{props.title}</Text>
      <Text style={styles.drank_description}>{props.description.substring(3, props.description.length-5)}</Text>
      <TouchableWithoutFeedback onPressIn={handleExit}>
        <View>
          <Text style={styles.drank_back}>Back to the drinks!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  drank_back: {
    flexDirection: 'column',
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor: '#E3ACF9',
    marginLeft: 75,
    marginRight: 75,
    marginTop: 100,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  drank_foto: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
},
drank_title: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 24,
    color: '#8DCBE6',
    fontWeight: 'bold',
},
drank_description: {
    textAlign: 'center',
    fontSize: 14,
},
});

export default DrankDetails;