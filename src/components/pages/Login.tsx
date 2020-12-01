import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, Image, Input, Text } from 'react-native-elements';
import { useUserContext } from '../../contexts/UserContext';
import { rootPage, Page } from './RootPage';

const styles = StyleSheet.create({
  image: {
    marginTop: -30,
    marginBottom: 80,
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: 11,
    fontSize: 20,
    color: '#fff',
  },
});

const Component: React.FC = () => {

  const userContext = useUserContext();
  const navigation = useNavigation();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    await userContext.login(userName, password);
    setUserName('');
    setPassword('');
    navigation.navigate('main');
  };

  return (
    <Page>
      <Image containerStyle={styles.image} source={require('../../assets/logo.png')}
        style={{ height: 200, width: 500 }} />
      <Text style={styles.label}>User name</Text>
      <Input placeholder="your name" value={userName}
        onChangeText={(text) => setUserName(text)} />
      <Text style={styles.label}>Password</Text>
      <Input placeholder="xxxxxxxxxx" secureTextEntry value={password}
        onChangeText={(text) => setPassword(text)} />
      <Button title="Login" onPress={login} disabled={userName === '' || password === ''} />
    </Page>
  );
};

export default rootPage('login', Component);
