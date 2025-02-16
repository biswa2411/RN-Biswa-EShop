import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

const OrderDetailsScreen = ({ navigation }) => {
  const { orders } = useSelector(state => state.order);

  const renderOrderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title} - {item.quantity} pcs</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(order, index) => index.toString()}
          ListHeaderComponent={() => (
            <View style={styles.sectionContainer}>
              <Text style={styles.heading}>Last Order Details</Text>
              <FlatList
                data={orders[orders.length - 1].items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderOrderItem}
                scrollEnabled={false}
              />
              <Text style={styles.totalText}>Total Price: ${orders[orders.length - 1].totalPrice.toFixed(2)}</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            index !== orders.length - 1 && (
              <View style={styles.orderContainer}>
                <Text style={styles.subHeading}>Order {index + 1}</Text>
                <FlatList
                  data={item.items}
                  keyExtractor={(orderItem, i) => i.toString()}
                  renderItem={renderOrderItem}
                  scrollEnabled={false}
                />
                <Text style={styles.totalText}>Total Price: ${item.totalPrice.toFixed(2)}</Text>
              </View>
            )
          )}
          ListFooterComponent={() => (
            <Button
        mode="contained"
        onPress={() => {
          navigation.goBack()
          
        }}
        style={styles.proceedButton}>
        Return to Products
      </Button>
          
          )}
        />
      ) : (
        <Text style={styles.noOrderText}>No orders placed yet.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#444',
  },
  item: {
    marginVertical: 5,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  noOrderText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  orderContainer: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  
  proceedButton: {
    marginVertical: 15,
    backgroundColor: '#6200ea',
  },
});

export default OrderDetailsScreen;
