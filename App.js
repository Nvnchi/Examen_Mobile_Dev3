import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Drank from './components/drank';

export default function App() {
  // Declare state variables 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  // Use useEffect to do a get request for data 
  useEffect(() => {
    fetch('https://sidneydevogelaere.be/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
 
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <Drank title={item.title.rendered} content={item.content.rendered} />
          )}
        />
      )}
      
</View>

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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EA047E',
  },
  header: {
    marginTop: 80,
    marginLeft: 20,
  },
});

