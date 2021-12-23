import {StyleSheet} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';

const Styles = StyleSheet.create({
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 78,
    maxHeight: 'auto',
    borderLeftWidth: 4,
    borderLeftColor: '#004ACE',
    width: '90%',
    backgroundColor: '#fff',
    marginVertical: '2%',
    padding: '2%',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 2,
  },
  calendarView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 'auto',
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 11,
  },
  labelText: {
    width: '100%',
    fontSize: 16,
    fontFamily: FontStyle.medium,
    color: '#004ACE',
    paddingHorizontal: '5%',
    paddingBottom: 3,
  },
  modal: {
    height: '100%',
    width: '100%',
    margin: 0,
  },
  modalView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    bottom: 0,
    position: 'absolute',
  },
  modalCloseIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  modalText: {
    color: '#7D7D7D',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  modalButton: {
    width: 100,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#409056',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginTop: '10%',
  },
});

export default Styles;
