import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E7',
    height: 60,
    padding: 5,
    paddingHorizontal: 5,
    elevation: 3,
  },

  textInputContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#000',
    paddingHorizontal: 15,
  },

  textInput: {
    display: 'flex',
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 15,
  },
});
