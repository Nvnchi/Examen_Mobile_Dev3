import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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
    <>
      {screen === 'list' && (
        <View style={styles.header}>
          <Text style={styles.title}>Welcome!</Text>
          <TouchableWithoutFeedback onPressIn={() => setScreen('shoppingcart')}>
             <View style={styles.shoppingbasket}>
                <FontAwesomeIcon icon={faShoppingCart} size={30} color={"#FFACC7"} />
              </View>
          </TouchableWithoutFeedback>
          
          <TextInput
            style={styles.input}
            placeholder="Searching for a drink?"
            placeholderTextColor="#fff"
            onChangeText={text => setSearch(text)}
          />
        </View>
      )}
      <View style={styles.container}>
        {screen === 'list' ? (
          isLoading ? <ActivityIndicator/> : (
            <>
              <FlatList
                data={handleFilter(data, search)}
                keyExtractor={({ id }, index) => id.toString()}
                renderItem={({ item }) => (
                  <>
                    <Drank setScreen={() => setScreen(item)} title={item.title.rendered} image={handleGetImage(item.content.rendered)} />
                    { !shoppingBasket.find((shoppingBasketItem) => shoppingBasketItem.id === item.id) && <Text style={styles.drank_basket} onPress={() => handleAddToBasket(item)}>Add to Basket</Text> }
                  </>
                )}
              />
            </>
          )
        ) : screen === 'shoppingcart' ? (
          <ShoppingBasket onPressIn={() => handleOnClick(item)} handleRemoveToBasket={handleRemoveToBasket} setScreen={setScreen} shoppingBasket={shoppingBasket} />
        ) : (
          <DrankDetails setScreen={setScreen} title={screen.title.rendered} image={handleGetImage(screen.content.rendered)} description={screen.excerpt.rendered} />
        )}
      </View >
    </>
  );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF8DC7',
    marginTop: 50,
  },
  shoppingbasket: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  input: {
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  drank_basket: {
    textAlign: 'right',
    marginRight: 70,
    marginTop: 15,
    marginBottom: 45,
    color: '#C3AED6',
    textDecorationLine: 'underline',
  },
});