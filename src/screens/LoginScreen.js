import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/slices/authSlice';
import { validatePassword, validateUsername } from '../utils/validations';
import CustomTextInput from '../components/CustomTextInput';
import UserIcon from '../components/icons/UserIcon';
import LockIcon from '../components/icons/LockIcon';
import EyeIcon from '../components/icons/EyeIcon';
import { useWindowDimensions } from 'react-native';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const { token,refreshToken,  user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome back, ${user?.firstName} ${user?.lastName}! 👋`,
        visibilityTime: 2000,
      });

      setTimeout(() => {
        navigation.navigate('Main'); // Redirect to Home Screen
      }, 700);
    }
  }, [token]);

  const handleLogin = () => {
    const usernameValidation = validateUsername(username.trim());
    const passwordValidation = validatePassword(password.trim());

    setUsernameError(usernameValidation);
    setPasswordError(passwordValidation);

    if (!usernameValidation && !passwordValidation) {
      dispatch(loginRequest({ username:username.trim(), password:password.trim() }));
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.innerContainer, { width: width * 0.9, maxWidth: 400 }]}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
          <CustomTextInput
            label="Username"
            value={username}
            onChangeText={text => {
              setUsername(text);
              setUsernameError('');
            }}
            leftIcon={UserIcon}
            error={usernameError}
          />
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry={secureTextEntry}
            leftIcon={LockIcon}
            rightIcon={() => (
              <EyeIcon
                secureTextEntry={secureTextEntry}
                toggleSecureEntry={() => setSecureTextEntry(!secureTextEntry)}
              />
            )}
            error={passwordError}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 7,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6200ea',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
