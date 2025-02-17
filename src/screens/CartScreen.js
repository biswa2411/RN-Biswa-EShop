import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {Text, Button, Card, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from '../redux/slices/cartSlice';
import {placeOrder} from '../redux/slices/orderSlice';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {items, totalPrice} = useSelector(state => state.cart);

  const handleRemoveItem = id => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      {text: 'Cancel'},
      {text: 'Yes', onPress: () => dispatch(removeFromCart(id))},
    ]);
  };

  return (
    <View style={styles.container}>
     {items.length > 0 ? (<>
     <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>
                ${item.price} x {item.quantity}
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                onPress={() =>
                  dispatch(
                    updateQuantity({id: item.id, quantity: item.quantity + 1}),
                  )
                }>
                +
              </Button>
              <Button
                onPress={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1),
                    }),
                  )
                }>
                -
              </Button>
              <IconButton
                icon="delete"
                onPress={() => handleRemoveItem(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Orders');
          dispatch(placeOrder(items));
          dispatch(clearCart());
        }}
        style={styles.proceedButton}>
        Proceed to Order
      </Button>
     </>) : (
             <Text style={styles.noOrderText}>No items added to cart yet.</Text>
           )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#6200ea',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  totalContainer: {
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  proceedButton: {
    marginTop: 15,
    backgroundColor: '#6200ea',
  },
  noOrderText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default CartScreen;
