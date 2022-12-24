/** @format */

import { Image } from 'react-native';
import { t } from '../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { fetchMyEvents } from '../../store/actions/me';
import { useEffect } from 'react';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import HeadlineFive from '../../components/type/HeadlineFive';
import Loading from '../../components/Loading/Loading';
import moment from 'moment';
import PlaceholderLayout from '../../components/Layouts/PlaceholderLayout/PlaceholderLayout';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SubHeader from '../../components/SubHeader/SubHeader';
import ThreeLinesWithIcon from '../../components/Lists/ThreeLines/ThreeLinesWithIcon';

export default function MeEventsScreen(props) {
  const me = useSelector(state => state.me.myData);

  const myEvents = useSelector(state => state.me.myEvents);

  const openEvents = myEvents.filter(event => event.open === true);

  const closedEvents = myEvents.filter(event => event.open != true);

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
    <Loading />;
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
            {t('events:noEvents')}
          </HeadlineFive>
        </PlaceholderLayout>
      </>
    );
  }

  return (
    <ScrollViewLayout>
      <SubHeader title={t('events:incomingEvents')} />
      {openEvents.map(event => (
        <ThreeLinesWithIcon
          key={event._id}
          icon={{ uri: event.sport.iconUrl }}
          title={event.title}
          subtitle={event.group.title}
          caption={moment(event.when).calendar()}
        />
      ))}
      <SubHeader title={t('events:pastEvents')} />
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
