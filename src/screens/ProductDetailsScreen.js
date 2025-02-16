import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../redux/slices/productDetailsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Card, Text, Button } from 'react-native-paper';

const ProductDetailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.productDetails.selectedProduct);


  if (!selectedProduct) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: selectedProduct.thumbnail }} style={styles.image} />
        <Card.Content>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
          <Text style={styles.price}>${selectedProduct.price}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {dispatch(addToCart(selectedProduct)); navigation.navigate('Main');}} style={styles.button}>
            Add to Cart
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    color: '#6200ea',
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6200ea',
  },
});

export default ProductDetailsScreen;
