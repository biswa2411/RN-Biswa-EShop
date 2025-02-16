import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EyeIcon = ({ secureTextEntry, toggleSecureEntry }) => (
  <Ionicons
    name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
    size={20}
    color="gray"
    onPress={toggleSecureEntry}
  />
);

export default EyeIcon;
