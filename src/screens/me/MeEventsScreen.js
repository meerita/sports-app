/** @format */

import { View, Text, Button, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

import { changeMyDarkMode } from '../../store/actions/theme';
import { meActions } from '../../store/slices/me';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyOne from '../../components/type/BodyOne';
import { allowAnalyticsCookies, fetchMyEvents } from '../../store/actions/me';
import PlaceholderLayout from '../../components/Layouts/PlaceholderLayout/PlaceholderLayout';
import HeadlineFive from '../../components/type/HeadlineFive';
import Colors from '../../constants/Colors';
import { useEffect } from 'react';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { useState } from 'react';
import SubHeader from '../../components/SubHeader/SubHeader';
import TwoLineWithIcon from '../../components/Lists/TwoLines/TwoLineWithIcon';
import moment from 'moment';
import ThreeLinesWithIcon from '../../components/Lists/ThreeLines/ThreeLinesWithIcon';

export default function MeEventsScreen(props) {
  const me = useSelector(state => state.me.myData);

  const myEvents = useSelector(state => state.me.myEvents);

  const openEvents = myEvents.filter(event => event.open === true);

  const closedEvents = myEvents.filter(event => event.open != true);

  const characteristics = me.characteristics;

  const cookies = me.settings.privacy.cookies;

  const darkMode = useSelector(state => state.theme.darkMode);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState();

  useEffect(() => {
    try {
      setLoading(true);
      dispatch(fetchMyEvents(me._id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const changeThemeHandler = () => {
    // dispatch(meActions.allowAnalytics({ analytics: true }));
  };

  if (loading) {
    <View>
      <Text>Loading…</Text>
    </View>;
  }

  if (myEvents >= 0) {
    return (
      <>
        <PlaceholderLayout>
          <Image
            source={require('../../assets/images/placeholders/event_placeholder.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnBackgroundUnfocused
                : Colors.light.OnBackgroundUnfocused,
              marginBottom: 16,
            }}
          />
          <HeadlineFive
            style={{
              textAlign: 'center',
              color: darkMode
                ? Colors.dark.OnBackgroundUnfocused
                : Colors.light.OnBackgroundUnfocused,
            }}
          >
            You didn't join any event yet
          </HeadlineFive>
        </PlaceholderLayout>
      </>
    );
  }

  return (
    <ScrollViewLayout>
      <SubHeader title='Nuevos eventos' />
      {openEvents.map(event => (
        <>
          <ThreeLinesWithIcon
            key={event._id}
            icon={{ uri: event.sport.iconUrl }}
            title={event.title}
            subtitle={event.group.title}
            caption={moment(event.when).calendar()}
          />
        </>
      ))}
      <SubHeader title='Eventos pasados' />
      {closedEvents.map(event => (
        <ThreeLinesWithIcon
          key={event._id}
          icon={{ uri: event.sport.iconUrl }}
          title={event.title}
          subtitle={event.group.title}
          caption={moment(event.when).calendar()}
        />
      ))}
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:create.form.resume'),
  };
};
