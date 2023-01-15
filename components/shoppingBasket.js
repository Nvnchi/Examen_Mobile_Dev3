import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';
import Drank from './drank';

const DrankDetails = (props) => {
  const handleExit = () => {
    props.setScreen('list')
  }

  const handleGetImage = (html) => {
    const image = html.match(/src=".*?"/g)[0]
    return image.substring(5, image.length - 1)
  }

  return (
    <View>
      <Text style={styles.title}>Shopping Basket!</Text>
      <TouchableWithoutFeedback onPressIn={handleExit}>
        <View>
          <Text style={styles.drank_title}>exit</Text>
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={props.shoppingBasket}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => (
          <>
            <Drank onPressIn={() => props.setScreen(item)} title={item.title.rendered} image={handleGetImage(item.content.rendered)} />
            <Text onPress={() => props.handleRemoveToBasket(item)}>Remove from basket</Text>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 30,
  },
  drank_title: {
    flexDirection: 'column',
    marginBottom: 30,
  }
});

export default DrankDetails;