import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.image || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.username}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout Button */}
      {/* <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(logout())}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: { alignItems: 'center', padding: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  username: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, color: 'gray' },
  logoutButton: { marginTop: 20, padding: 15, backgroundColor: 'red', alignItems: 'center', marginHorizontal: 20, borderRadius: 5 },
  logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CustomDrawerContent;
