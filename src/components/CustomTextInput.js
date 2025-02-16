import React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  error,
}) => {
  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        left={leftIcon && <TextInput.Icon icon={leftIcon} />}
        right={rightIcon && <TextInput.Icon icon={rightIcon} />}
        error={!!error}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default CustomTextInput;
