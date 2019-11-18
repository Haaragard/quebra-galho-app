import React, {Component} from 'react';
import {
	View,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	Button,
	ToastAndroid,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import {styles, formStyles, colors} from '../../styles/DefaultStyles';

import moment from 'moment';

import api from '../../api';

import Icon from 'react-native-vector-icons/Entypo';

const showPassIcon = (
	<Icon name="eye" size={30} color="#000" style={formStyles.btnRightInput} />
);
const hidePassIcon = (
	<Icon
		name="eye-with-line"
		size={30}
		color="#000"
		style={formStyles.btnRightInput}
	/>
);

export default class Cadastro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nome: '',
			sobrenome: '',
			email: '',
			cpf: '',
			password: '',
			passwordConfirm: '',
			showPass: true,
			showPassConfirm: true,
			dataNasc: moment(new Date()).format('DD/MM/YYYY'),
			todayDate: moment(new Date()).format('DD/MM/YYYY'),
		};
	}

	static navigationOptions = {
		title: 'Cadastro',
	};

	handleNomeChange = nome => {
		this.setState({nome});
	};

	handleSobrenomeChange = sobrenome => {
		this.setState({sobrenome});
	};

	handleEmailChange = email => {
		this.setState({email});
	};

	handleCpfChange = cpf => {
		this.setState({cpf});
	};

	handlePasswordChange = password => {
		this.setState({password});
	};

	handlePasswordConfirmChange = passwordConfirm => {
		this.setState({passwordConfirm});
	};

	handleShowPass = () => {
		this.setState({showPass: !this.state.showPass});
	};

	handleShowPassConfirm = () => {
		this.setState({showPassConfirm: !this.state.showPassConfirm});
	};

	validationPass = (password, passwordConfirm) => {
		if (password === passwordConfirm) {
			return true;
		} else {
			ToastAndroid.show('Senhas não coincidem!', ToastAndroid.SHORT);
			return false;
		}
	};

	validationDataNascimento = dataNascimento => {
		let dateNascUser = moment(dataNascimento, 'DD/MM/YYYY').add(18, 'years');
		let dateNow = moment(this.state.todayDate, 'DD/MM/YYYY');

		return moment(dateNow).isAfter(dateNascUser) ? true : false;
	};

	pressBtnCadastrar = () => {
		let regex = /(?!(\d)\1{2}.\1{3}.\1{3}-\1{2})\d{3}\.\d{3}\.\d{3}\-\d{2}/gm;
		if (!this.state.nome) {
			ToastAndroid.show(
				'É necessário preencher o campo de "Nome"',
				ToastAndroid.SHORT,
			);
		} else if (!this.state.email) {
			ToastAndroid.show(
				'É necessário preencher o campo de "E-mail"',
				ToastAndroid.SHORT,
			);
		} else if (!this.state.cpf) {
			{
				ToastAndroid.show(
					'É necessário preencher o campo de "CPF"',
					ToastAndroid.SHORT,
				);
			}
		} else if (!regex.test(this.state.cpf)) {
			ToastAndroid.show('O CPF digitado é inválido.', ToastAndroid.SHORT);
		} else if (!this.validationDataNascimento(this.state.dataNasc)) {
			ToastAndroid.show(
				'Idade do usuário precisa ser maior de 18!',
				ToastAndroid.SHORT,
			);
		} else if (!this.state.password) {
			ToastAndroid.show(
				'É necessário preencher o campo de "Senha"',
				ToastAndroid.SHORT,
			);
		} else if (
			this.validationPass(this.state.password, this.state.passwordConfirm)
		) {
			this._store();
		}
	};

	_store = async () => {
		let dataStore = {
			nome: this.state.nome,
			sobrenome: this.state.sobrenome,
			email: this.state.email,
			cpf: this.state.cpf,
			senha: this.state.password,
			dataNascimento: this.state.dataNasc
				.split('/')
				.reverse()
				.join('-'),
		};
		try {
			await api
				.post('/user/store', dataStore)
				.then(response => {
					ToastAndroid.show(
						'Cadastro realizado com sucesso!',
						ToastAndroid.SHORT,
					);
					this.props.navigation.navigate('Login');
				})
				.catch(err => {
					ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
				});
		} catch (error) {
			ToastAndroid.show(
				'Ocorreu um erro ao tentar cadastrar.',
				ToastAndroid.SHORT,
			);
		}
	};

	render() {
		return (
			<View style={styles.content}>
				<ScrollView contentContainerStyle={styles.contentScrollView}>
					<View style={styles.groupText}>
						<Text style={styles.primaryGreatTitle}>Cadastre-se</Text>
						<Text style={styles.secondaryGreatTitle}>
							e contrate ou começe seus serviços agora!
						</Text>
					</View>
					<View style={formStyles.form}>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Nome</Text>
							<View style={formStyles.borderInputText}>
								<TextInput
									style={formStyles.inputText}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="Nome"
									maxLength={40}
									autoCapitalize="words"
									autoCompleteType="name"
									onChangeText={this.handleNomeChange}
									value={this.state.nome}
								/>
							</View>
						</View>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Sobrenome</Text>
							<View style={formStyles.borderInputText}>
								<TextInput
									style={formStyles.inputText}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="Sobrenome"
									maxLength={40}
									autoCapitalize="words"
									autoCompleteType="name"
									onChangeText={this.handleSobrenomeChange}
									value={this.state.sobrenome}
								/>
							</View>
						</View>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>E-mail</Text>
							<View style={formStyles.borderInputText}>
								<TextInput
									style={formStyles.inputText}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="meu.email@quebra-galho.com"
									maxLength={40}
									autoCapitalize="none"
									autoCompleteType="email"
									onChangeText={this.handleEmailChange}
									value={this.state.email}
								/>
							</View>
						</View>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>CPF</Text>
							<View style={formStyles.borderInputText}>
								<TextInputMask
									style={formStyles.inputText}
									placeholder="999.999.999-99"
									type={'cpf'}
									value={this.state.cpf}
									onChangeText={this.handleCpfChange}
								/>
							</View>
						</View>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Data de nascimento</Text>
							<DatePicker
								date={this.state.dataNasc}
								mode="date"
								placeholder="Data de nascimento"
								format="DD/MM/YYYY"
								minDate="01/01/1900"
								maxDate={this.state.todayDate}
								confirmBtnText="Confirmar"
								cancelBtnText="Cancelar"
								onDateChange={date => {
									this.setState({dataNasc: date});
								}}
							/>
						</View>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Senha</Text>
							<View style={formStyles.borderInputText}>
								<TextInput
									style={formStyles.inputText}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="******"
									maxLength={30}
									autoCapitalize="none"
									autoCompleteType="password"
									secureTextEntry={this.state.showPass}
									onChangeText={this.handlePasswordChange}
									value={this.state.password}
								/>
								<TouchableOpacity onPress={this.handleShowPass}>
									{this.state.showPass ? showPassIcon : hidePassIcon}
								</TouchableOpacity>
							</View>
						</View>
						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Reescreva a senha</Text>
							<View style={formStyles.borderInputText}>
								<TextInput
									style={formStyles.inputText}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="******"
									maxLength={30}
									autoCapitalize="none"
									autoCompleteType="password"
									secureTextEntry={this.state.showPassConfirm}
									onChangeText={this.handlePasswordConfirmChange}
									value={this.state.passwordConfirm}
								/>
								<TouchableOpacity onPress={this.handleShowPassConfirm}>
									{this.state.showPassConfirm ? showPassIcon : hidePassIcon}
								</TouchableOpacity>
							</View>
						</View>
						<View style={formStyles.btGroup}>
							<View style={formStyles.btSubmit}>
								<Button title="Criar conta" onPress={this.pressBtnCadastrar} />
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
