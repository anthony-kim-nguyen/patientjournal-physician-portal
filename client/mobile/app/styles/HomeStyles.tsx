import { StyleSheet } from 'react-native';

const homestyles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF'
  },
  greeting: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: -75
  },
  logo: {
      width: 270,
      height: 270,
      marginTop: -70,
      marginBottom: -70
  },
  largeButton: {
      width: '95%',
      backgroundColor: '#000080',
      paddingVertical: 30,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 5
  },
  smallButton: {
      flex: 1.5,
      backgroundColor: '#B3E5FC',
      paddingVertical: 30,
      padding: 2,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 3
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '95%',
      marginVertical: 5
  },
  buttonText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff'
  },
  signOutButton: {
      width: '95%',
      backgroundColor: '#bfc9ca',
      paddingVertical: 30,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10
  },
  signOutText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#fff'
  }
});
export default homestyles;