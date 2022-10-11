/** @format */

import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// components
import SubtitleOne from '../../components/type/SubtitleOne';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function GroupTestScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);
  // currentGroup
  const group = useSelector(state => state.group.groupDetail);
  // events in the grouo
  const events = useSelector(state => state.group.groupDetail.events);

  if (events.length < 1) {
    return (
      <ScrollViewLayout>
        <SubtitleOne>This groups hasn't any event yet</SubtitleOne>
      </ScrollViewLayout>
    );
  }

  return (
    <View>
      <Text>GroupEventsScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Test',
  };
};
