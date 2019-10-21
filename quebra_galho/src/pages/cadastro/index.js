import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Button, ToastAndroid } from 'react-native';
import { styles, formStyles, colors } from '../../styles/DefaultStyles';

import api from '../../api';

import Icon from 'react-native-vector-icons/Entypo';

const showPassIcon = <Icon name="eye" size={30} color="#000" style={formStyles.btnRightInput}/>;
const hidePassIcon = <Icon name="eye-with-line" size={30} color="#000" style={formStyles.btnRightInput}/>;

export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            cpf: '',
            password: '',
            passwordConfirm: '',
            showPass: true,
            showPassConfirm: true,
        };
    }

    static navigationOptions = {
        title: 'Cadastro',
    };

    handleNomeChange = (nome) => {
        this.setState({ nome });
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handleCpfChange = (cpf) => {
        this.setState({ cpf });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handlePasswordConfirmChange = (passwordConfirm) => {
        this.setState({ passwordConfirm });
    };

    handleShowPass = () => {
        this.setState({ showPass: !this.state.showPass });
    }

    handleShowConfirmPass = () => {
        this.setState({ showConfirmPass: !this.state.showConfirmPass });
    }

    validationPass = (password, passwordConfirm) => {
        if(password === passwordConfirm) {
            return true;
        } else {
            ToastAndroid.show('Senhas não coincidem! ' + password + ' ' + passwordConfirm, ToastAndroid.SHORT);
            return false;
        }
    }

    pressBtnCadastrar = () => {
        if(this.validationPass(this.state.password, this.state.passwordConfirm)) {
            this._store();
        }
    }
    
    _store = () => {
        let dataStore = {
            nome: this.state.nome,
            email: this.state.email,
            cpf: this.state.cpf,
            senha: this.state.password,
        };

        api.post('/usuarios', dataStore)
        .then(() =>{
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT);
        })
        .catch(() => {
            ToastAndroid.show('Ocorreu um erro ao tentar realizar o cadastro!', ToastAndroid.SHORT);
        });
    }

    

    render() {
        return (
            <View style={styles.content}>
                <ScrollView contentContainerStyle={styles.contentScrollView}>
                    <View style={styles.groupText}>
                        <Text style={styles.primaryGreatTitle}>Cadastre-se</Text>
                        <Text style={styles.secondaryGreatTitle}>e contrate ou começe seus serviços agora!</Text>
                    </View>
                    <View style={formStyles.form}>
                        <View style={formStyles.inputGroupField}>
                            <Text style={formStyles.labelInput}>Nome completo</Text>
                            <View style={formStyles.borderInputText}>
                                <TextInput
                                    style={formStyles.inputText}
                                    placeholderTextColor= {colors.placeHolderTextColor}
                                    placeholder= 'Nome Completo'
                                    maxLength= {40}
                                    autoCapitalize= 'words'
                                    autoCompleteType= 'name'
                                    onChangeText= {this.handleNomeChange}
                                    value= {this.state.nome}
                                />
                            </View>
                        </View>
                        <View style={formStyles.inputGroupField}>
                            <Text style={formStyles.labelInput}>E-mail</Text>
                            <View style={formStyles.borderInputText}>
                                <TextInput
                                    style={formStyles.inputText}
                                    placeholderTextColor= {colors.placeHolderTextColor}
                                    placeholder= 'meu.email@quebra-galho.com'
                                    maxLength= {40}
                                    autoCapitalize= 'none'
                                    autoCompleteType= 'email'
                                    onChangeText= {this.handleEmailChange}
                                    value= {this.state.email}
                                />
                            </View>
                        </View>
                        <View style={formStyles.inputGroupField}>
                            <Text style={formStyles.labelInput}>CPF</Text>
                            <View style={formStyles.borderInputText}>
                                <TextInput
                                    style={formStyles.inputText}
                                    placeholderTextColor= {colors.placeHolderTextColor}
                                    placeholder= '999.999.999-99'
                                    maxLength= {30}
                                    autoCapitalize= 'none'
                                    autoCompleteType= 'off'
                                    onChangeText= {this.handleCpfChange}
                                    value= {this.state.cpf}
                                />
                            </View>
                        </View>
                        <View style={formStyles.inputGroupField}>
                            <Text style={formStyles.labelInput}>Senha</Text>
                            <View style={formStyles.borderInputText}>
                                <TextInput
                                    style={formStyles.inputText}
                                    placeholderTextColor= {colors.placeHolderTextColor}
                                    placeholder= '******'
                                    maxLength= {30}
                                    autoCapitalize= 'none'
                                    autoCompleteType= 'password'
                                    secureTextEntry={this.state.showPass}
                                    onChangeText= {this.handlePasswordChange}
                                    value= {this.state.password}
                                />
                                <TouchableOpacity
                                    onPress= {this.handleShowPass}
                                >
                                    {(this.state.showPass) ? showPassIcon : hidePassIcon}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={formStyles.inputGroupField}>
                            <Text style={formStyles.labelInput}>Reescreva a senha</Text>
                            <View style={formStyles.borderInputText}>
                                <TextInput
                                    style={formStyles.inputText}
                                    placeholderTextColor= {colors.placeHolderTextColor}
                                    placeholder= '******'
                                    maxLength= {30}
                                    autoCapitalize= 'none'
                                    autoCompleteType= 'password'
                                    secureTextEntry={this.state.showConfirmPass}
                                    onChangeText= {this.handlePasswordConfirmChange}
                                    value= {this.state.passwordConfirm}
                                />
                                <TouchableOpacity
                                    onPress= {this.handleShowConfirmPass}
                                >
                                    {(this.state.showConfirmPass) ? showPassIcon : hidePassIcon}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={formStyles.btGroup}>
                            <View style={formStyles.btSubmit}>
                                <Button
                                    title= 'Criar conta'
                                    onPress= {this.pressBtnCadastrar}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}