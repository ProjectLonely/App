import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from './Button';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Styles from './Style';
const {height, width} = Dimensions.get('window');

const CalendarModal = ({
  calendarValue,
  closeModal,
  lastWeek,
  lastMonth,
  lastYear,
  startDateFromParent,
  endDateFromParent,
  durationStatus,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      endDateFromParent(date);
    } else {
      startDateFromParent(date);
      setSelectedStartDate(date), setSelectedEndDate(null);
    }
  };

  return (
    <View>
      <Modal
        isVisible={calendarValue}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          marign: 0,
          bottom: -20,
        }}>
        <View
          style={{
            height: height / 1.1,
            width: width,
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode="cover">
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              padding: '2.5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View />

              <TouchableOpacity onPress={closeModal}>
                <Image
                  source={require('../Assets/Images/cross.png')}
                  style={{height: 15, width: 15, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={lastWeek}
              style={[
                styles.tabView,
                durationStatus == 'week' ? {backgroundColor: '#004ACE'} : null,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  durationStatus == 'week' ? {color: '#FFF'} : null,
                ]}>
                Last Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={lastMonth}
              style={[
                styles.tabView,
                durationStatus == 'month' ? {backgroundColor: '#004ACE'} : null,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  durationStatus == 'month' ? {color: '#FFF'} : null,
                ]}>
                Last Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={lastYear}
              style={[
                styles.tabView,
                durationStatus == 'year' ? {backgroundColor: '#004ACE'} : null,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  durationStatus == 'year' ? {color: '#FFF'} : null,
                ]}>
                Last Year
              </Text>
            </TouchableOpacity>

            <View style={styles.calendarContainer}>
              <CalendarPicker
                todayBackgroundColor="#004ACE"
                selectedDayColor="#004ACE"
                selectedDayTextColor="#FFFFFF"
                allowRangeSelection={true}
                onDateChange={onDateChange}
              />
              <Text
                style={{
                  fontFamily: FontStyle.medium,
                  fontSize: 15,
                  color: '#004ACE',
                  alignSelf: 'center',
                }}>
                Drag circles to change date range.
              </Text>
            </View>

            <Button onPress={closeModal}>APPLY</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    height: 30,
    width: '90%',
    borderWidth: 1,
    borderColor: '#004ACE',
    marginVertical: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  tabText: {
    fontFamily: FontStyle.bold,
    color: '#525F77',
    fontSize: 15,
  },
  calendarContainer: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: '5%',
    paddingVertical: '5%',
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
});

export default CalendarModal;
