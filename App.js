import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import Drank from './components/drank';
import DrankDetails from './components/drankDetails';
import ShoppingBasket from './components/shoppingBasket';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [screen, setScreen] = useState('list');
  const [isScrolling, setIsScrolling] = useState(false);
  const [search, setSearch] = useState('');
  const [shoppingBasket, setShoppingBasket] = useState([]);

  useEffect(() => {
    fetch('https://sidneydevogelaere.be/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleGetImage = (html) => {
    const image = html.match(/src=".*?"/g)[0]
    return image.substring(5, image.length - 1)
  }

  const handleOnClick = (item) => {
    setScreen(item)
  }

  const handleFilter = (data, searchTerm) => {
    return data.filter((item) => {
      return item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

  const handleAddToBasket = (item) => {
    setShoppingBasket([...shoppingBasket, item])
  }

  const handleRemoveToBasket = (item) => {
    const newShoppingBasket = shoppingBasket.filter((shoppingBasketItem) => {
      return shoppingBasketItem.id !== item.id
    })
    setShoppingBasket(newShoppingBasket)
  }

  return (
    <View style={styles.container}>
      {screen === 'list' ? (
        isLoading ? <ActivityIndicator/> : (
          <>
            <Text style={styles.title}>Welcome!</Text>
            <TouchableWithoutFeedback onPressIn={() => setScreen('shoppingcart')}>
              <View>
                <Text style={styles.shoppingbasket}>Shoppingbasket</Text>
              </View>
            </TouchableWithoutFeedback>
            
            <TextInput
              style={styles.input}
              placeholder="Zoek drankjes..."
              onChangeText={text => setSearch(text)}
            />
            <FlatList
              data={handleFilter(data, search)}
              keyExtractor={({ id }, index) => id.toString()}
              renderItem={({ item }) => (
                <>
                  <Drank setScreen={setScreen} title={item.title.rendered} image={handleGetImage(item.content.rendered)} />
                  { !shoppingBasket.find((shoppingBasketItem) => shoppingBasketItem.id === item.id) && <Text style={styles.drank_beschrijving} onPress={() => handleAddToBasket(item)}>Add to Basket</Text> }
                </>
              )}
            />
          </>
        )
      ) : screen === 'shoppingcart' ? (
        <ShoppingBasket onPressIn={() => handleOnClick(item)} handleRemoveToBasket={handleRemoveToBasket} setScreen={setScreen} shoppingBasket={shoppingBasket} />
      ) : (
        <DrankDetails setScreen={setScreen} title={screen.title.rendered} image={handleGetImage(screen.content.rendered)} description={screen.content.rendered} />
      )}
    </View >
  );
};

// Create stylesheet 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EA047E',
    marginTop: 50,
  },
  shoppingbasket: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6D28',
  },
  header: {
    marginTop: 80,
    marginLeft: 20,
  },
  input: {
    marginBottom: 30,
  },
});