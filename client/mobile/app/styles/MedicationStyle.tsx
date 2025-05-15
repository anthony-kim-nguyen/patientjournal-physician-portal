import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#B3E5FC',
    flexGrow: 1,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#003366',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 8,
    backgroundColor: '#bfc9ca',
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  columnHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#003366',
    textAlign: 'right',
  },
  medContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  medImage: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  expandedImage: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  medText: {
    flex: 1,
  },
  medName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  medDose: {
    fontSize: 16,
    color: '#555',
  },
  enlargedName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },
  enlargedDose: {
    fontSize: 18,
    color: '#333',
  },
  checkmarkBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  checkedBox: {
    borderColor: 'green',
    backgroundColor: '#e0ffe0',
  },
  checkmarkText: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#000080',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
