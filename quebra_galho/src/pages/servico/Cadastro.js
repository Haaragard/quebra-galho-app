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
      loadingPage: false,
      user: this.props.user.user,
      service: {
        _id: this.props.service ? this.props.service._id : '',
        nome: '',
        descricao: '',
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

  render() {
    return (
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.contentScrollView}
          nestedScrollEnabled={true}>
          <View style={formStyles.form}>
            <View style={formStyles.inputGroupField}>
              <TouchableOpacity
                style={{
                  width: 250,
                  height: 200,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.handleChangeImgPrincipal();
                }}>
                <Image
                  source={
                    this.state.service.fotoPrincipal
                      ? {
                          uri: `${BASE_URL_IMG_AVATAR_USER}/${this.state.service.fotoPrincipal}`,
                        }
                      : this.state.newImage
                      ? {uri: this.state.newImage.uri}
                      : require('../../img/service/defaultService.png')
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
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
                  height: 350,
                  borderRadius: 10,
                }}>
                <View style={{flex: 1}}>
                  <FlatList
                    nestedScrollEnabled={true}
                    style={{borderRadius: 10, backgroundColor: '#F2F2F2'}}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separatorDown} />
                    )}
                    data={this.state.newImageList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          height: 120,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            height: '100%',
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={{uri: item.image.uri}}
                            style={{
                              width: 150,
                              height: '100%',
                              borderRadius: 10,
                              marginRight: 10,
                            }}
                          />
                          <Text
                            style={{flex: 1, flexWrap: 'wrap', marginTop: 30}}
                            multiline
                            numberOfLines={3}>
                            {item.image.name}
                          </Text>
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
                </View>

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

            <View style={{marginTop: 50, width: '100%'}}>
              <Button
                title="Salvar Serviço"
                onPress={() => this._saveService()}
              />
            </View>
            <View style={{marginTop: 50, width: '100%'}}>
              <Button title="Limpar campos" onPress={() => this._clearForm()} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  handleChangeImgPrincipal = () => {
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

        this.setState({newImage: newImage});
      })
      .catch(err => {
        ToastAndroid.show(
          'Seleção de imagem principal cancelada.',
          ToastAndroid.SHORT,
        );
      });
  };

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

  _clearForm = () => {
    this.setState({
      loadingPage: false,
      user: this.props.user.user,
      service: {
        _id: this.props.service ? this.props.service._id : '',
        nome: '',
        descricao: '',
        fotoPrincipal: '',
        fotos: [String],
        valor: '',
        createdAt: '',
      },
      newImage: '',
      newImageList: [],
    });
  };

  _validateFields = () => {
    if (
      this.state.newImageList.length + this.state.service.fotos.length > 5 ||
      this.state.newImageList.length > 5
    ) {
      ToastAndroid.show(
        'Não é possível salvar mais de 5 imagens.',
        ToastAndroid.SHORT,
      );

      return false;
    } else if (this.state.newImage.length === 0) {
      ToastAndroid.show(
        'É necessário adicionar uma foto principal.',
        ToastAndroid.SHORT,
      );

      return false;
    } else if (this.state.newImageList.length === 0) {
      ToastAndroid.show(
        'É necessário adicionar pelo menos uma foto à galeria.',
        ToastAndroid.SHORT,
      );

      return false;
    } else if (!this.state.service.nome) {
      ToastAndroid.show(
        'É necessário adicionar um nome à este serviço.',
        ToastAndroid.SHORT,
      );

      return false;
    } else if (!this.state.service.descricao) {
      ToastAndroid.show(
        'É necessário adicionar uma descrição ao serviço.',
        ToastAndroid.SHORT,
      );

      return false;
    }

    return true;
  };

  _saveService = async () => {
    if (!this._validateFields()) return false;

    let serviceInsert = {
      ...this.state.service,
    };
    serviceInsert.valor = serviceInsert.valor
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.');

    let formService = new FormData();
    this.state.newImageList.map((value, index) => {
      formService.append('files[]', value.image);
    });
    formService.append('imagePrincipal', this.state.newImage);
    formService.append('service', JSON.stringify(this.state.service));
    formService.append('user', JSON.stringify(this.state.user));

    try {
      await api
        .post('/service/store', formService, {
          headers: {
            Accept: 'application/json',
            'Content-Type': `multipart/form-data; boundary=${formService._boundary}`,
          },
        })
        .then(response => {
          this._clearForm();
          ToastAndroid.show(
            'Cadastro de serviço realizado com sucesso!',
            ToastAndroid.SHORT,
          );
        })
        .catch(err => {
          ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show(
        'Erro ao enviar requisição de upload.',
        ToastAndroid.SHORT,
      );
    }
  };
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

export default connect(mapStateToProps)(DivulgarServico);
