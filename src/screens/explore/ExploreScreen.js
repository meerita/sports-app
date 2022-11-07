/** @format */

import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// COMPONENTS
import Caption from '../../components/type/Caption';
import Card from '../../components/Card/';
import SingleLineWithIcon from '../../components/Lists/OneLine/SingleLineWithIcon';
import SubHeader from '../../components/SubHeader/SubHeader';
import SubtitleOne from '../../components/type/SubtitleOne';
import TwoLineWithIcon from '../../components/Lists/TwoLines/TwoLineWithIcon';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

// STORE & ACTIONS
import { fetchVisibleSports } from '../../store/actions/explore';
import { EVENTS } from '../../data/dummy-data-events';
import { fetchLatestEvents } from '../../store/actions/event';
import Colors from '../../constants/Colors';
import BodyTwo from '../../components/type/BodyTwo';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';

export default function ExploreScreen(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);

  const [loading, setLoading] = useState(true);

  // fetch all sports
  useEffect(() => {
    dispatch(fetchLatestEvents());
    dispatch(fetchVisibleSports());
    setLoading(false);
  }, [allSports, latestEvents]);

  const latestEvents = useSelector(state => state.event.latestEvents);

  const allSports = useSelector(state => state.explore.sports);

  if (loading) {
    return <Loading />;
  }

  if (allSports.length === 0) {
    return (
      <View>
        <SubtitleOne>No hay deportes</SubtitleOne>
      </View>
    );
  }

  return (
    <ScrollViewLayout>
      <SubHeader title='Latest events' />
      <ScrollView
        horizontal={true}
        style={{ paddingLeft: 8, paddingRight: 16 }}
      >
        {latestEvents.map(event => (
          <Card
            key={event._id}
            style={{
              marginRight: 8,
              marginLeft: 8,
              marginBottom: 16,
              width: 298,
            }}
          >
            <View
              style={{
                width: '100%',
                height: Dimensions.get('window').width / 2,
              }}
            >
              <Image
                source={{ uri: event.group.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
            </View>
            <View
              style={{
                minHeight: 56,
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 32,
                  flexGrow: 0,
                  tintColor: darkMode
                    ? Colors.dark.OnSurfaceUnfocused
                    : Colors.light.OnSurfaceUnfocused,
                }}
                source={{ uri: event.sport.iconUrl }}
              />
              <View style={{ flexShrink: 5, flexGrow: 5, marginRight: 16 }}>
                <SubtitleOne>{event.title.slice(0, 24) + '…'}</SubtitleOne>
                <BodyTwo>{event.group.title}</BodyTwo>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
      <SubHeader title='All sports' />
      {allSports.map(sport => (
        <SingleLineWithIcon
          key={sport._id}
          icon={{
            uri: `${sport.iconUrl}`,
          }}
          title={t(`sports:${sport.title}`)}
          caption={
            sport.groups === 1
              ? t('explore:countGroups_one', { count: sport.groups })
              : t('explore:countGroups_other', { count: sport.groups })
          }
          onPress={() =>
            props.navigation.navigate('ExploreGroupsBySport', {
              sportId: sport._id,
              title: sport.title,
            })
          }
        />
      ))}
    </ScrollViewLayout>
  );
}
