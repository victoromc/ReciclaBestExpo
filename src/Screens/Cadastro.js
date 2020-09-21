import React, { useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Alert, Image , StyleSheet} from 'react-native';
import firebase from 'firebase';
import KeysInfo from '../Utils/KeysInfo';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Icon } from 'react-native-elements';

const Cadastro = ({ navigation }) => {
    const efetuarCadastro = (cpf, password, nome, sobrenome) => {
        let userInfo = {
            userCpf: cpf,
            userPwd: password,
            userName: nome,
            userLastName: sobrenome,

        };
        console.log(userInfo);
        if (userInfo.userPwd != null && userInfo.userCpf != null) {
            if (!firebase.apps.length) {
                firebase.initializeApp(KeysInfo.getFirebaseConfig());
            }
            firebase
                .database()
                .ref('users/' + userInfo.userCpf)
                .set(userInfo)
                .then((data) => {
                    //success callback
                    Alert.alert('Cadastro efetuado com sucesso.');
                    console.log('data ', data);
                    navigation.navigate('HomeLogin');
                })
                .catch((error) => {
                    //error callback
                    console.log('error ', error);
                });
        }

    };

    let behavior = '';
    if (Platform === 'ios') {
        behavior = 'padding';
    }
    let nome = null;
    let sobreNome = null;
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
                    <Text style={styles.textLabel}>Cadastro</Text>
                </View>
                <View style={styles.inputView}>
                    <Input
                        placeholder="Nome"
                        leftIcon={<Icon name="user" type="font-awesome" color="#aaa" />}
                        leftIconContainerStyle={styles.inputIcon}
                        onChangeText={(text) => { nome = text; }}
                    />
                </View>

                <View style={styles.inputView}>
                    <Input
                        placeholder="Sobrenome"
                        leftIcon={<Icon name="user" type="font-awesome" color="#aaa" />}
                        leftIconContainerStyle={styles.inputIcon}
                        onChangeText={(text) => { sobreNome = text; }}
                    />
                </View>

                <View style={styles.inputView}>
                    <Input
                        placeholder="CPF"
                        leftIcon={<Icon name="id-card" type="font-awesome" color="#aaa" />}
                        leftIconContainerStyle={styles.inputIcon}
                        onChangeText={(text) => { cpf = text; }}
                    />
                </View>

                <View style={styles.inputView}>
                    <Input
                        placeholder="Senha"
                        leftIcon={<Icon name="lock" type="font-awesome" color="#aaa" />}
                        leftIconContainerStyle={styles.inputIcon}
                        onChangeText={(text) => { pwd = text; }}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => efetuarCadastro(cpf, pwd, nome, sobreNome)} style={styles.btn}>
                        <Text style={styles.appButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Cadastro;



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