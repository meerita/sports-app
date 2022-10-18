/** @format */

import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetail } from '../../store/actions/event';

// COMPONENTS
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import HeadlineFive from '../../components/type/HeadlineFive';
import SingleLineWithIcon from '../../components/Lists/OneLine/SingleLineWithIcon';
import { t } from '../../services/i18n';
import Line from '../../components/Line/Line';
import TwoLineWithAvatar from '../../components/Lists/TwoLines/TwoLineWithAvatar';
import TwoLineItemLongerText from '../../components/Lists/TwoLines/TwoLineItemLongerText';
import SubHeader from '../../components/SubHeader/SubHeader';
import BodyOne from '../../components/type/BodyOne';
import BodyTwo from '../../components/type/BodyTwo';
import SubtitleOne from '../../components/type/SubtitleOne';
import Caption from '../../components/type/Caption';

import moment from 'moment';
import Card from '../../components/Card/';
import ParticipantContainer from '../../components/Layouts/ParticipantContainer/ParticipantContainer';
import Participant from '../../components/Lists/Participant/Participant';
import Spacer from '../../components/Spacer/Spacer';

export default function EventDetailScreen(props) {
  const eventId = props.route.params._id;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchEventDetail(eventId));
    setIsLoading(false);
  }, [eventDetail]);

  const eventDetail = useSelector(state => state.event.eventDetail);

  if (isLoading || !eventDetail) {
    return (
      <View>
        <Text>Cargando evento</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          ...Styles.cards,
          backgroundColor: Colors.light.surface,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 24,
          zIndex: 24,
        }}
      >
        <HeadlineFive>{eventDetail.title}</HeadlineFive>
      </View>
      <ScrollViewLayout>
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/visibility_on.png')}
          title={t('settings:profile.basicInformation.visibility.visibility')}
          caption={t(
            `settings:profile.basicInformation.visibility.${
              eventDetail.visibility ? 'true' : 'false'
            }`
          )}
        />
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/meeting_place.png')}
          title={'Punto de encuentro'}
          caption={'Carrer Muntaner 16'}
        />
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/event.png')}
          title={'Cuándo'}
          caption={moment(eventDetail.when).calendar()}
        />
        <Line />
        <SingleLineWithIcon
          icon={{ uri: eventDetail.sport.iconUrl }}
          title={'Tipo de evento'}
          caption={'Offroad'}
        />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/skill.png')}
          title={'Dificultad'}
          caption={t(`skills:${eventDetail.skill}.title`)}
        />
        <SingleLineWithIcon
          icon={
            eventDetail.allowedGender || eventDetail.allowedGender === 'mixed'
              ? require('../../assets/images/icons/question_mark.png')
              : eventDetail.allowedGender === 'male'
              ? require('../../assets/images/icons/male.png')
              : require('../../assets/images/icons/female.png')
          }
          title={'Evento para…'}
          caption={t(
            `groups:settings.gender.${
              eventDetail.allowedGender ? 'mixed' : 'male'
            }`
          )}
        />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/Duration.png')}
          title={'Duración'}
          caption={'2hs'}
        />
        <Line />
        <SubHeader title='Descripción' />
        <BodyOne style={{ paddingHorizontal: 16 }}>
          Salida en patinete desde Argentona hasta Barcelona. Vamos en tren
          hasta Matarò, de ahí subimos a Argentona y entramos en el parque,
          vamos por la montaña hasta Tiana, bajamos por ahí y llegamos a
          Badalona.
        </BodyOne>
        <SubHeader title={t('events:whoGoes')} />
        <ParticipantContainer>
          <Participant
            onPress={() => {
              props.navigation.navigate('UserDetailScreen', {
                userId: eventDetail.organizer._id,
                username: eventDetail.organizer.username,
              });
            }}
            avatar={eventDetail.organizer.avatar}
            username={eventDetail.organizer.username}
            tag={eventDetail.organizer.tag}
            organizer={true}
          />
          <Participant
            onPress={() => {
              props.navigation.navigate('UserDetailScreen', {
                userId: eventDetail.organizer._id,
                username: eventDetail.organizer.username,
              });
            }}
            avatar={eventDetail.organizer.avatar}
            username={eventDetail.organizer.username}
            tag={eventDetail.organizer.tag}
          />
          <Participant
            onPress={() => {
              props.navigation.navigate('UserDetailScreen', {
                userId: eventDetail.organizer._id,
                username: eventDetail.organizer.username,
              });
            }}
            avatar={eventDetail.organizer.avatar}
            username={eventDetail.organizer.username}
            tag={eventDetail.organizer.tag}
          />
          <Participant
            onPress={() => {
              props.navigation.navigate('UserDetailScreen', {
                userId: eventDetail.organizer._id,
                username: eventDetail.organizer.username,
              });
            }}
            avatar={eventDetail.organizer.avatar}
            username={eventDetail.organizer.username}
            tag={eventDetail.organizer.tag}
          />
          <Participant
            onPress={() => {
              props.navigation.navigate('UserDetailScreen', {
                userId: eventDetail.organizer._id,
                username: eventDetail.organizer.username,
              });
            }}
            avatar={eventDetail.organizer.avatar}
            username={eventDetail.organizer.username}
            tag={eventDetail.organizer.tag}
          />
        </ParticipantContainer>
        <SubHeader title='Reemplazos' />
        <TwoLineWithAvatar
          avatar={{ uri: eventDetail.organizer.avatar }}
          title={eventDetail.organizer.username}
          subtitle={eventDetail.organizer.tag}
        />
        <BodyTwo style={{ paddingHorizontal: 16 }}>
          No hay reemplazos anotados todavía
        </BodyTwo>
        <Spacer height={64} />
      </ScrollViewLayout>
    </>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: '',
    headerShadowVisible: false,
  };
};
