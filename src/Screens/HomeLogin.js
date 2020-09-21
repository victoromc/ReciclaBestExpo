import React from 'react';
import { View, KeyboardAvoidingView, Platform, Alert, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Icon } from 'react-native-elements';
import firebase from 'firebase';
import KeysInfo from '../Utils/KeysInfo';


const HomeLogin = ({ navigation }) => {

  const getUser = (cpf, password) => {
    let userInfo = {
      userCpf: cpf,
      userPwd: password,

    };
    if (userInfo.userPwd != null && userInfo.userCpf) {
      if (!firebase.apps.length) {
        firebase.initializeApp(KeysInfo.getFirebaseConfig());
      }
      firebase
        .database()
        .ref('users/' + userInfo.userCpf)
        .once('value')
        .then(function (snapshot) {
          console.log('Getting user info');
          console.log(snapshot.val());
          if(snapshot.val() === null){
            Alert.alert('Usuário inexistente!');
          }
          if (snapshot.val().userPwd === userInfo.userPwd) {
            // navigation.navigate('HomeLogado');

            navigation.navigate('HomeLogado', {
              userName: snapshot.val().userName,
            });
          } else {
            Alert.alert('Senha incorreta!');
          }
        });
    }

  };

  const highestTimeoutId = setTimeout(() => ';');
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  let behavior = '';
  if (Platform === 'ios') {
    behavior = 'padding';
  }
  let cpf = null;
  let pwd = null;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled
      behavior={behavior}
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            source={require('../../assets/logoReciclaBest.png')} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textLabel}>Login</Text>
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="CPF"
            leftIcon={<Icon name="id-card" type="font-awesome" color="#aaa" />}
            leftIconContainerStyle={styles.inputIcon}
            onChangeText={(text) => { cpf = text }}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="Senha"
            leftIcon={<Icon name="lock" type="font-awesome" color="#aaa" />}
            leftIconContainerStyle={styles.inputIcon}
            onChangeText={(text) => { pwd = text }}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => getUser(cpf, pwd)} style={styles.btn}>
            <Text style={styles.appButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.btn}>
            <Text style={styles.appButtonText}>Cadastre-se</Text>
          </TouchableOpacity>
          {/* <Button style={styles.btn} onPress={() => navigation.navigate('Cadastro')} title='Efetuar cadastro' /> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default HomeLogin;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  inputView: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2%',

  },
  imageView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 20,
  },
  textLabel: {
    fontWeight: 'bold',
    color: '#282828',
    fontSize: 24,
  },
  btn: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#14E075',
    width: '50%',
    padding: 10,
  },
  appButtonText: {
    fontWeight: 'bold',
    color: '#282828',
    fontSize: 18,
  }
});