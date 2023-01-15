import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';
import Drank from './drank';

const ShoppingBasket = (props) => {
  const handleExit = () => {
    props.setScreen('list')
  }

  const handleGetImage = (html) => {
    const image = html.match(/src=".*?"/g)[0]
    return image.substring(5, image.length - 1)
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping basket!</Text>
        <TouchableWithoutFeedback onPressIn={handleExit}>
          <View>
            <Text style={styles.drank_exit}>&#60; exit</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <FlatList
          data={props.shoppingBasket}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <>
              <Drank onPressIn={() => props.setScreen(item)} title={item.title.rendered} image={handleGetImage(item.content.rendered)} />
              <Text style={styles.drank_remove} onPress={() => props.handleRemoveToBasket(item)}>Remove from basket</Text>
            </>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF8DC7',
        marginTop: 75,
  },
  header: {
    backgroundColor: 'black',
  },
  drank_exit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFACC7',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
  drank_remove: {
    textAlign: 'right',
    marginRight: 70,
    marginTop: 15,
    marginBottom: 45,
    color: '#C3AED6',
    textDecorationLine: 'underline',
  },
});

export default ShoppingBasket;