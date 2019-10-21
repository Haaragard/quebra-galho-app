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
    backgroundColor: '#000',
    height: 50,
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
    flex: 1,
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
    backgroundColor: '#80CCFF',
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
    backgroundColor: '#000',
    marginRight: 10,
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
  },
  containerMenuLine: {
    height: 40,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  textUserDataLabel: {
    width: 45,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
  textUserData: {
    flex: 1,
    marginTop: 5,
  },
  textMenu: {
    marginLeft: 20,
  },
});
