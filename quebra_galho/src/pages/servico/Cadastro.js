import React, {Component} from 'react';

import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
	FlatList,
	ToastAndroid,
	Button,
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {TextInputMask} from 'react-native-masked-text';

import api from '../../api';

import {colors, formStyles, styles} from '../../styles/DefaultStyles';

import Icon from 'react-native-vector-icons/Entypo';

class DivulgarServico extends Component {
	constructor(props) {
		super(props);
		this._checkLoginUser();
		this.state = {
			user: this.props.user.user,
			service: {
				_id: this.props.service ? this.props.service._id : '',
				nome: 'Desenvolver Software',
				descricao: 'Desenvolvimento de software WEB, Desktop, Mobile.',
				fotoPrincipal: '',
				fotos: [String],
				valor: '',
				createdAt: '',
			},
			newImage: '',
			newImageList: [],
		};
	}

	componentDidMount() {
		// _loadServiceData();
	}

	componentDidUpdate() {
		console.warn(this.state.newImageList);
	}

	render() {
		return (
			<View style={styles.content}>
				<ScrollView contentContainerStyle={styles.contentScrollView}>
					<View style={formStyles.form}>
						<View style={formStyles.inputGroupField}>
							<TouchableOpacity
								style={{
									width: 150,
									height: 100,
									marginBottom: 10,
									borderRadius: 10,
								}}
								onPress={() => {
									console.log('Editar imagem');
								}}>
								<Image
									source={require('../../img/service/defaultService.png')}
									style={{
										width: '100%',
										height: '100%',
									}}
								/>
							</TouchableOpacity>
							<Text>Imagem principal</Text>
						</View>

						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Nome do serviço</Text>
							<View style={formStyles.borderInputText}>
								<TextInput
									style={formStyles.inputText}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="Nome do serviço"
									maxLength={80}
									autoCapitalize="words"
									onChangeText={this.handleNomeChange}
									value={this.state.service.nome}
								/>
							</View>
						</View>

						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Adicionar imagens</Text>
							<View
								style={{
									width: '100%',
								}}>
								<FlatList
									contentContainerStyle={{
										backgroundColor: '#F2F2F2',
										width: '100%',
										height: 300,
									}}
									ItemSeparatorComponent={() => (
										<View style={styles.separatorDown} />
									)}
									ListEmptyComponent={() => (
										<View style={styles.contentFlatListEmpty}>
											<Text>Nenhum encontrado...</Text>
										</View>
									)}
									data={this.state.newImageList}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({item, index}) => (
										<View
											style={{
												flexDirection: 'row',
												width: '100%',
												height: 100,
											}}>
											<View
												style={{
													flex: 1,
													height: '100%',
													flexDirection: 'row',
												}}>
												<Image
													source={{uri: item.image.uri}}
													style={{width: 150, height: '100%'}}
												/>
											</View>
											<TouchableOpacity
												style={{
													height: '100%',
													justifyContent: 'center',
												}}
												onPress={() => this.handleRemoveImageInList(index)}>
												<Icon
													name="erase"
													size={20}
													style={{marginRight: 10}}
												/>
											</TouchableOpacity>
										</View>
									)}
								/>
								<View
									style={{
										width: '100%',
										flexDirection: 'row',
									}}>
									<TouchableOpacity
										style={{
											flex: 1,
											borderWidth: 1,
											borderColor: '#000',
											backgroundColor: '#D5D5D5',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										onPress={() => this.handleAddImageInList()}>
										<Icon name="circle-with-plus" size={25} />
									</TouchableOpacity>
									<TouchableOpacity
										style={{
											flex: 1,
											borderWidth: 1,
											borderColor: '#000',
											backgroundColor: '#D5D5D5',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										onPress={() => this.handleClearImagesList()}>
										<Icon name="circle-with-cross" size={25} />
									</TouchableOpacity>
								</View>
							</View>
						</View>

						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Descrição</Text>
							<View style={formStyles.borderInputTextBox}>
								<TextInput
									style={formStyles.inputTextBox}
									placeholderTextColor={colors.placeHolderTextColor}
									placeholder="Descrição de serviço"
									maxLength={250}
									multiline
									numberOfLines={10}
									autoCapitalize="sentences"
									autoCompleteType="off"
									onChangeText={this.handleDescricaoChange}
									value={this.state.service.descricao}
								/>
							</View>
						</View>

						<View style={formStyles.inputGroupField}>
							<Text style={formStyles.labelInput}>Valor</Text>
							<View style={formStyles.borderInputText}>
								<TextInputMask
									style={formStyles.inputText}
									type={'money'}
									value={this.state.service.valor}
									placeholderTextColor={colors.placeHolderTextColor}
									onChangeText={this.handleValorChange}
								/>
							</View>
						</View>

						<View style={{marginTop: 50}}>
							<Button
								title="Home"
								onPress={() => this.props.navigation.navigate('Home')}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}

	handleNomeChange = nome => {
		this.setState({
			service: {
				...this.state.service,
				nome,
			},
		});
	};

	handleDescricaoChange = descricao => {
		this.setState({
			service: {
				...this.state.service,
				descricao,
			},
		});
	};

	handleValorChange = valor => {
		this.setState({
			service: {
				...this.state.service,
				valor,
			},
		});
	};

	handleClearImagesList = () => {
		this.setState({newImageList: []});
	};

	handleAddImageInList = () => {
		ImagePicker.openPicker({
			width: 1920,
			height: 1080,
			cropping: true,
		})
			.then(image => {
				let imgPathSplit = image.path.split('/');
				image.nome = imgPathSplit[imgPathSplit.length - 1];

				let newImage = {
					uri: image.path,
					path: image.path,
					mimetype: image.mime,
					type: image.mime,
					originalname: image.nome,
					name: image.nome,
					size: image.size,
				};

				this._addImageInList(newImage);
			})
			.catch(err => {
				ToastAndroid.show(
					'Seleção de imagem principal cancelada.',
					ToastAndroid.SHORT,
				);
			});
	};

	handleRemoveImageInList = index => {
		let newImageList = this.state.newImageList;
		newImageList.splice(index, 1);
		this.setState({newImageList: newImageList});
	};

	handleAddPrincipalImage = () => {};

	_addImageInList = image => {
		let newImageList = this.state.newImageList;
		newImageList.push({image});
		this.setState({newImageList: newImageList});
	};

	_checkLoginUser = () => {
		if (!this.props.user.status.auth) {
			ToastAndroid.show(
				'É preciso estar logado para acessar essa área!',
				ToastAndroid.SHORT,
			);
			this.props.navigation.navigate('Home');
		}
	};

	_loadServiceData = async () => {
		if (!this.state.service._id) return false;
		try {
			await api
				.post('/service/id', {service: this.state.service})
				.then(response => {
					this.setState({service: response.data.service});
				})
				.catch(err => {
					ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
				});
		} catch (error) {
			ToastAndroid.show('Problema ao carregar serviço.', ToastAndroid.SHORT);
		}
	};

	editName = async () => {
		console.warn('Name editing...');
	};
}

const mapStateToProps = (state, props) => ({
	...props,
	user: state.user,
});

export default connect(mapStateToProps)(DivulgarServico);
