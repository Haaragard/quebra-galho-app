import React, {Component} from 'react';
import {Image, TouchableOpacity, ToastAndroid} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../../store/actions/user';

import ImagePicker from 'react-native-image-crop-picker';

import api, {BASE_URL_IMG_AVATAR_USER} from '../../../api';

const imageUploadConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data; charset=utf-8;',
  },
};
class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      newAvatar: '',
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.pressImage()}>
        <Image
          source={
            this.state.user.avatar
              ? {
                  uri: `${BASE_URL_IMG_AVATAR_USER}/${this.state.user.avatar}`,
                }
              : require('../../../img/user/defaultUser.jpg')
          }
          style={{
            width: this.props.width || 130,
            height: this.props.height || 130,
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 65,
          }}
        />
      </TouchableOpacity>
    );
  }

  loadImage = async () => {};

  pressImage = () => {
    if (!this.state.user) return false;
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          this.setState({newAvatar: image});
          this._uploadImage();
        })
        .catch(err => {
          ToastAndroid.show('Seleção de imagem cancelada.', ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show(
        'Erro ao tentar selecionar imagem.',
        ToastAndroid.SHORT,
      );
    }
  };

  _uploadImage = async () => {
    const formData = new FormData();
    let filePathSize = this.state.newAvatar.path.split('/').length;
    let fileName = this.state.newAvatar.path.split('/')[filePathSize - 1];

    formData.append('file', {
      uri: this.state.newAvatar.path,
      path: this.state.newAvatar.path,
      mimetype: this.state.newAvatar.mime,
      type: this.state.newAvatar.mime,
      originalname: fileName,
      name: fileName,
      size: this.state.newAvatar.size,
    });

    formData.append('user', JSON.stringify(this.state.user));

    try {
      await api
        .post('/user/avatar/upload', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then(response => {
          this.props.toggleUser(response.data.user);
          this.setState({user: response.data.user});
          ToastAndroid.show(
            'Seu avatar foi alterado com sucesso!',
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileImage);
