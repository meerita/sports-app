/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import BodyTwo from '../../../components/type/BodyTwo';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SubtitleOne from '../../../components/type/SubtitleOne';
import { changeEventMaxParticipants } from '../../../store/actions/event';
import Colors from '../../../constants/Colors';
import { t } from '../../../services/i18n';

export default function MaxPlayersScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  const eventDetail = useSelector(state => state.event.eventDetail);

  const dispatch = useDispatch();

  const [value, setValue] = useState(eventDetail.maxParticipants);

  const setMaxParticipantsHandler = value => {
    dispatch(
      changeEventMaxParticipants({
        eventId: eventDetail._id,
        groupId: eventDetail.group,
        maxParticipants: value,
      })
    );
  };

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <BodyTwo style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        Each type of activity preselects the amount of maximum participants, but
        you can change it from here if you want to do a custom event. If you
        want to do a really customized we suggest you to change the type of
        activity to 'other'.
      </BodyTwo>

      <Slider
        style={{ height: 40 }}
        minimumValue={eventDetail.minParticipants}
        maximumValue={30}
        value={eventDetail.maxParticipants}
        minimumTrackTintColor={
          darkMode ? Colors.dark.primary : Colors.light.primary
        }
        maximumTrackTintColor={
          darkMode
            ? Colors.dark.OnBackgroundUnfocused
            : Colors.light.OnBackgroundUnfocused
        }
        thumbTintColor={darkMode ? Colors.dark.primary : Colors.light.primary}
        step={1}
        tapToSeek={true}
        onValueChange={value => setValue(value)}
        onSlidingComplete={value => setMaxParticipantsHandler(value)}
      />
      <SubtitleOne style={{ textAlign: 'center', marginVertical: 16 }}>
        {value} participants
      </SubtitleOne>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Select the maximum participants',
    headerShadowVisible: false,
  };
};
