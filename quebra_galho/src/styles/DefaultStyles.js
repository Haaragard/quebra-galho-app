import {StyleSheet} from 'react-native';

export const stylesMenu = {
  backgroundColor: '#1AA3FF',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export const styles = StyleSheet.create({
  appView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appHeader: {
    margin: 0,
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentScrollView: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  groupText: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    width: '70%',
    textAlign: 'left',
  },
  primaryGreatTitle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryGreatTitle: {
    fontSize: 18,
    width: 260,
    textAlign: 'center',
  },
  linksPage: {
    color: '#80CCFF',
  },
  contentServicosMaisAcessado: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  containerFlatListMaisAcessado: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#80CCFF',
  },
  contentServicosProximos: {flex: 1, backgroundColor: '#fff'},
  containerFlatListProximo: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#80CCFF',
  },
  separatorLeft: {
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  separatorDown: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  touchableServicoSmall: {
    height: '100%',
    width: 145,
    backgroundColor: '#F2F2F2',
  },
  dadosServicoSmall: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  imageServicoSmall: {
    height: 85,
    width: '100%',
    marginRight: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  descricaoServicoSmall: {
    flex: 1,
  },
  touchableServicoBig: {
    height: 110,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  dadosServicoBig: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  imageServicoBig: {
    height: '100%',
    width: 100,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  descricaoServicoBig: {
    width: 200,
    height: 28,
    fontFamily: 'Roboto Slab',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    color: '#000000',
    flex: 1,
  },
  contentFlatListEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  padraoFLatList: {
    backgroundColor: '#F2F2F2',
  },
});

export const formStyles = StyleSheet.create({
  form: {
    flex: 1,
    width: '70%',
  },
  inputGroup: {
    flex: 1,
  },
  inputGroupField: {
    textAlign: 'left',
    marginBottom: 20,
  },
  labelInput: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4A4A4A',
  },
  borderInputText: {
    height: 40,
    borderWidth: 1,
    borderColor: '#5F5F5F',
    borderRadius: 5,
    flexDirection: 'row',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  borderInputTextBox: {
    height: 120,
    borderWidth: 1,
    borderColor: '#5F5F5F',
    borderRadius: 5,
    flexDirection: 'row',
  },
  inputTextBox: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  btnRightInput: {
    marginTop: 2,
  },
  btGroup: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  btSubmit: {
    flex: 1,
    width: 200,    
  },
  btCancel: {},
  btClear: {},
});

export const colors = {
  placeHolderTextColor: '#C1C1C1',
};

export const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1AA3FF',
    height: 80,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  containerUser: {
    flex: 1,
    flexDirection: 'row',
  },
  containerUserImg: {
    width: '30%',
    height: '100%',
    marginRight: 10,
    left: 10,
    top: 10,
  },
  containerUserData: {
    flex: 1,
  },
  containerGroupUserData: {
    flex: 1,
    flexDirection: 'row',
  },
  containerIcon: {
    alignContent: 'center',
    alignItems: 'center',
    left: 5,
  },
  containerMenuLine: {
    height: 40,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  textContainerMenuLine: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: '#898989',
    marginLeft: 10,
  },
  textUserDataLabel: {
    width: 30,
    marginTop: 30,
    fontWeight: 'bold',
    color: 'white',    
  },
  textUserData: {
    color: 'white',
    flex: 1,
    marginTop: 30  ,
    fontWeight: 'bold',
  },
  textMenu: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: '#898989',
    marginLeft: 10,
  },
  separator: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#a1a1a1',
  },
});

export const MinhaContaStyles = StyleSheet.create({
  content: {
    flex: 1,
  },
  headerPerfil: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  bodyPerfil: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameEditableView: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
  },
  nameEditableText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupShowData: {flexDirection: 'row', width: '70%', marginTop: 20},
  editableView: {flex: 1, flexDirection: 'row'},
  editableTextLabel: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  editableText: {
    flex: 1,
    fontSize: 14,
  },
  editIcon: {marginLeft: 10, width: 20, height: '100%'},
});

export const DivulgarServicosStyle = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
});

export const textHomeStyle = StyleSheet.create({
  service: {    
    fontFamily: 'Roboto Slab',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 15,
    left: 6,
    textAlign: 'left',
    color: '#6A6A6A'
  },
});

export const HistoricoStyles = StyleSheet.create({
  container: {
    flex: 1,        
    backgroundColor: '#eee',
  },
  postContainer: {    
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#454545'
  },
  postDescription: {
    color: '#666',
    fontWeight: 'bold',    
  },
});
