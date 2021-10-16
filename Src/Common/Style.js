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
    paddingHorizontal: '6%',
  },
});

export default Styles;
