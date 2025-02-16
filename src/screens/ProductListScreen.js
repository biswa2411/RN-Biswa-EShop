import React, { useEffect, useLayoutEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../redux/slices/productSlice';
import { selectProduct } from '../redux/slices/productDetailsSlice';

const { width } = Dimensions.get('window');
const numColumns = 2;
const ProductListingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);
  useLayoutEffect(() => {
   if(list?.length === 0){ dispatch(fetchProductsRequest())};
  // dispatch(fetchProductsRequest())
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button mode="contained" onPress={() => dispatch(fetchProductsRequest())} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
              dispatch(selectProduct(item)); // Store product in Redux
              navigation.navigate('ProductDetails'); // Navigate without params
            }}
          style={styles.item}>
            <Card >
              <Card.Cover source={{ uri: item.thumbnail }} style={styles.image} />
              <Card.Content>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingVertical:5,
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  item: {
    width: (width / numColumns) - 20,
    marginBottom: 10,
  },
  image: {
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#6200ea',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: '#6200ea',
  },
});

export default ProductListingScreen;
