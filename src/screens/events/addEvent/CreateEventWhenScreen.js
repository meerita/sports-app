/** @format */

import { View, Text, Platform } from 'react-native';
import React from 'react';
import { useState } from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';
import BodyTwo from '../../../components/type/BodyTwo';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';
import moment from 'moment';

export default function CreateEventWhenScreen(props) {
  const eventDetail = useSelector(state => state.event.eventDetail);
  const darkMode = useSelector(state => state.theme.darkMode);
  const editEvent = props.route.params.editEvent;

  // const eventSelectedDate = editEvent
  //   ? useSelector(state => state.event.eventDetail.when)
  //   : useSelector(state => state.event.createEvent.when);

  const eventSelectedDate = useSelector(state => state.event.eventDetail.when);

  const [date, setDate] = useState(new Date(eventSelectedDate));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const teta = new Date();

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        Current selected date: {date.toLocaleString('es-ES')}
      </BodyTwo>
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/event.png')}
        onPress={showDatepicker}
        title='Date'
        caption={moment(date).startOf('day').fromNow()}
      />
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/time.png')}
        onPress={showTimepicker}
        title='Time of the event'
        caption={date.getHours() + ':' + date.getMinutes()}
      />
      {Platform.OS === 'ios' && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={Platform.OS === 'ios' ? 'datetime' : mode}
          is24Hour={true}
          themeVariant={darkMode ? 'dark' : 'light'}
          accentColor={
            darkMode ? Colors.dark.primaryVariant : Colors.light.primaryVariant
          }
          style={{
            borderWidth: 1,
            borderColor: Colors.dark.primaryVariant,
            fontSize: 24,
          }}
          onChange={onChange}
        />
      )}
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Date and hour of the event',
    presentation: 'modal',
  };
};
