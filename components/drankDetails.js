import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

const DrankDetails = (props) => {
  const handleExit = () => {
    props.setScreen('list')
  }
  return (
    <View>
      <Image source={{ uri: props.image }} style={{width: 200, height: 200}} />
      <Text style={styles.drank_title}>{props.title}</Text>
      <Text>{props.description}</Text>
      <TouchableWithoutFeedback onPressIn={handleExit}>
        <View>
          <Text style={styles.drank_title}>exit</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  drank_title: {
    flexDirection: 'column',
    marginBottom: 30,
  }
});

export default DrankDetails;