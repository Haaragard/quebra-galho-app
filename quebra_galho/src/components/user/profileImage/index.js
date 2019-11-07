import React, {Component} from 'react';
import {Image, TouchableOpacity, ToastAndroid} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import api, {BASEURLIMG, endereco} from '../../../api';

const imageUploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data; charset=utf-8;',
  },
};

export default class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      avatar: props.user.avatar,
      newAvatar: '',
    };
  }

  componentDidUpdate() {
    this.loadImage();
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.pressImage()}>
        <Image
          href={{uri: BASEURLIMG + this.state.avatar}}
          style={{
            backgroundColor: '#A358',
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
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          this.setState({newAvatar: image});
          // console.warn(image);
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
      originalname: 'Avatar',
      size: this.state.newAvatar.size,
    });

    // formData.append('user', this.state.user);
    console.warn(this.state);
    console.warn(this.state.user);
    console.warn(formData);

    await api
      .post(
        '/user/update/avatar',
        {
          file: {
            uri: this.state.newAvatar.path,
            path: this.state.newAvatar.path,
            mimetype: this.state.newAvatar.mime,
            originalname: 'Avatar',
            size: this.state.newAvatar.size,
          },
        },
        imageUploadConfig,
      )
      .then(response => {
        console.warn(response.data);
        // this.setState({avatar: response.data.user.avatar});
      })
      .catch(err => {
        console.warn(err.response);
        ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
      });
    // try {
    // } catch (error) {
    //   console.warn(error);
    //   ToastAndroid.show(
    //     'Erro ao enviar requisição de upload.',
    //     ToastAndroid.SHORT,
    //   );
    // }
  };
}
