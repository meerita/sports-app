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

// STORE & ACTIONS
import { fetchVisibleSports } from '../../store/actions/explore';
import { EVENTS } from '../../data/dummy-data-events';

export default function ExploreScreen(props) {
  const dispatch = useDispatch();

  const myEvents = EVENTS;

  // fetch all sports
  useEffect(() => {
    dispatch(fetchVisibleSports());
  }, [allSports]);

  const allSports = useSelector(state => state.explore.sports);

  if (allSports.length === 0) {
    return (
      <View>
        <SubtitleOne>No hay deportes</SubtitleOne>
      </View>
    );
  }

  return (
    <ScrollView>
      <SubHeader title='Latest events' />
      <ScrollView
        horizontal={true}
        style={{ paddingLeft: 8, paddingRight: 16 }}
      >
        {myEvents.map(event => (
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
                source={{ uri: event.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
            </View>
            <View style={{}}>
              <TwoLineWithIcon
                title={event.title}
                icon={event.sport.iconUrl}
                subtitle={`Participantes: ${event.players}/${event.maxPlayers}`}
              />
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
          onPress={() => props.navigation.navigate('ExploreGroupsBySport')}
        />
      ))}
    </ScrollView>
  );
}
