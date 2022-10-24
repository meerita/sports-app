/** @format */

import { View, Text, Image, Dimensions, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeEvent, fetchEventDetail } from '../../store/actions/event';

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
import { FloatingAction } from 'react-native-floating-action';
import user from '../../store/slices/user';

export default function EventDetailScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  const eventId = props.route.params._id;
  const me = useSelector(state => state.me.myData);
  const groupDetail = useSelector(state => state.group.groupDetail);

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

  // we purge the organizer
  const participants = eventDetail.participants.filter(
    participant => participant._id != eventDetail.organizer._id
  );

  const amIParticipanting = eventDetail.participants.find(
    participant => participant._id === me._id
  );

  // these will be the core actions of the main button, depending the user
  // who views the detail and the type of user.
  const coreActions = {
    close: {
      text: 'Close event',
      icon: require('../../assets/images/icons/close.png'),
      name: 'bt_close',
      position: 1,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    share: {
      text: 'Join event',
      icon: require('../../assets/images/icons/share.png'),
      name: 'bt_share',
      position: 2,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    join: {
      text: 'Join event',
      icon: require('../../assets/images/icons/suspense.png'),
      name: 'bt_join',
      position: 2,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    open: {
      text: 'Open event',
      icon: require('../../assets/images/icons/restart.png'),
      name: 'bt_close',
      position: 1,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    leave: {
      text: 'Leave the event',
      icon: require('../../assets/images/icons/event_out.png'),
      name: 'bt_leave',
      position: 4,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    edit: {
      text: 'Edit event',
      icon: require('../../assets/images/icons/event_edit.png'),
      name: 'bt_edit',
      position: 3,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    guest: {
      text: 'Sign me as guest',
      icon: require('../../assets/images/icons/rsvp.png'),
      name: 'bt_petition',
      position: 1,
      color: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
  };

  // We must know how to trigger everything on this event, depending
  // of the event policy, the people, etc.

  // If the event is older than today, it can be closed
  const canBeClosed = new Date(eventDetail.when) > new Date();
  console.log('Can be closed? ' + canBeClosed);

  // see if I am admin of the group
  const amIAdminOfThisGroup = groupDetail.admins.find(
    admin => admin._id === me._id
  );

  const amIMemberOfThisGroup = me.groups.find(
    myGroup => myGroup._id === eventDetail.group
  );

  const amIanAdminOrOrganizer =
    me._id === eventDetail.organizer._id || amIAdminOfThisGroup;

  // if the user is not member of the group and the status of the eventdetail
  // is invisible
  if (!amIMemberOfThisGroup && !eventDetail.visible) {
    return (
      <View>
        <Text>Este evento es visible sólo para miembros del grupo</Text>
      </View>
    );
  }

  let actions = [];

  const newActions = [];

  const testcases = amIAdminOfThisGroup
    ? eventDetail.open
      ? amIParticipanting
        ? canBeClosed
          ? 'Soy admin del grupo, y soy participante: cerrar'
          : 'Soy admin del grupo, y soy participante: cerrar, editar, salir del evento'
        : 'soy admin, pero no estoy en la lista de participantes: cerrar , editar, unirme al evento'
      : 'Soy admin, puedo reabrir el evento'
    : 'no, i am not admin';

  console.log(testcases);

  const eventFloatingButtonActions = name => {
    switch (name) {
      case 'bt_close':
        dispatch(
          closeEvent({ eventId: eventDetail._id, groupId: eventDetail.group })
        );
        break;
      case 'bt_lol':
        alert('btlol pressed');
        break;
    }
  };

  const goToExternalLink = url => {
    Linking.openURL(url);
  };

  return (
    <>
      <View
        style={{
          shadowColor: darkMode ? Colors.dark.shadow : Colors.light.shadow,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          backgroundColor: darkMode
            ? Colors.dark.surface
            : Colors.light.surface,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 24,
          zIndex: 24,
          borderRadius: 0,
        }}
      >
        <HeadlineFive
          style={{
            color: darkMode
              ? Colors.dark.OnSurfaceActive
              : Colors.light.OnSurfaceActive,
          }}
        >
          {eventDetail.title}
        </HeadlineFive>
      </View>
      <ScrollViewLayout>
        {!eventDetail.open && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: darkMode
                ? Colors.dark.primary
                : Colors.light.primary,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                marginRight: 16,
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/icons/event_out.png')}
                height={16}
                width={16}
                style={{
                  tintColor: darkMode
                    ? Colors.dark.OnPrimaryActive
                    : Colors.light.OnPrimaryActive,
                }}
              />
            </View>
            <View>
              <SubtitleOne
                style={{
                  color: darkMode
                    ? Colors.dark.OnPrimaryActive
                    : Colors.light.OnPrimaryActive,
                }}
              >
                Este evento ha finalizado y está cerrado.
              </SubtitleOne>
            </View>
          </View>
        )}
        <BodyOne style={{ padding: 16, paddingBottom: 24 }}>
          Salida en patinete desde Argentona hasta Barcelona. Vamos en tren
          hasta Matarò, de ahí subimos a Argentona y entramos en el parque,
          vamos por la montaña hasta Tiana, bajamos por ahí y llegamos a
          Badalona.
        </BodyOne>
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/visibility_on.png')}
          title={t('settings:profile.basicInformation.visibility.visibility')}
          caption={
            eventDetail.visibility
              ? t('groups:settings.events.types.anyone')
              : t('groups:settings.events.types.only-my-group')
          }
          onPress={() =>
            props.navigation.navigate('EventOptionsVisibilitySelectorScreen', {
              editEvent: true,
              eventId: eventDetail._id,
              groupId: eventDetail.group,
            })
          }
        />
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/manage_accounts.png')}
          title={'Participation…'}
          caption={t(
            `groups:settings.events.types.${eventDetail.allowedParticipants}`
          )}
          onPress={() =>
            props.navigation.navigate(
              'EventOptionsParticipationSelectorScreen',
              {
                editEvent: true,
                eventId: eventDetail._id,
                groupId: eventDetail.group,
              }
            )
          }
        />
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/group.png')}
          title='Max participants'
          caption={eventDetail.maxParticipants}
          onPress={() => props.navigation.navigate('MaxPlayersScreen')}
        />
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/person_pin_circle.png')}
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
          caption={t(
            `typesOfActivity:${eventDetail.sport.title}.${eventDetail.activity}.label`
          )}
          onPress={() =>
            props.navigation.navigate(
              'EventOptionsTypeOfActivitySelectorScreen',
              {
                editEvent: true,
                eventId: eventDetail._id,
                groupId: eventDetail.group,
              }
            )
          }
        />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/verified.png')}
          title={'Dificultad'}
          caption={t(`skills:${eventDetail.skill}.title`)}
          onPress={() =>
            props.navigation.navigate('EventOptionsSkillsSelectorScreen', {
              editEvent: true,
              eventId: eventDetail._id,
              groupId: eventDetail.group,
            })
          }
        />
        <SingleLineWithIcon
          icon={
            eventDetail.allowedGender === 'other'
              ? require('../../assets/images/icons/question_mark.png')
              : eventDetail.allowedGender === 'male'
              ? require('../../assets/images/icons/male.png')
              : require('../../assets/images/icons/female.png')
          }
          title={'Evento para…'}
          caption={t(
            `groups:settings.gender.${
              eventDetail.allowedGender === 'other'
                ? 'other'
                : eventDetail.allowedGender === 'male'
                ? 'male'
                : 'female'
            }`
          )}
          onPress={() =>
            props.navigation.navigate('EventOptionsGenderSelectorScreen', {
              editEvent: true,
              eventId: eventDetail._id,
              groupId: eventDetail.group,
            })
          }
        />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/timer.png')}
          title={'Duración'}
          caption={'2hs'}
        />
        {eventDetail.costPerParticipant ? (
          <SingleLineWithIcon
            icon={require('../../assets/images/icons/payments.png')}
            title={'Coste por persona'}
            caption={eventDetail.costPerParticipant + '€'}
          />
        ) : null}
        {eventDetail.externalLink && (
          <SingleLineWithIcon
            icon={require('../../assets/images/icons/open_url.png')}
            title={'Enlace externo'}
            caption={eventDetail.externalLink.substring(8, 25) + '…'}
            onPress={() => goToExternalLink(eventDetail.externalLink)}
          />
        )}

        <SubHeader title={t('events:whoGoes')} style={{ marginBottom: 8 }} />

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
          {participants.map(participant => (
            <Participant
              key={participant._id}
              onPress={() => {
                props.navigation.navigate('UserDetailScreen', {
                  userId: participant._id,
                  username: participant.username,
                });
              }}
              avatar={participant.avatar}
              username={participant.username}
              tag={participant.tag}
            />
          ))}
          {/* ) */}
        </ParticipantContainer>
        {eventDetail.allowReplacementsType != 'no-replacements' ? (
          eventDetail.replacements <= 0 ? (
            <>
              <BodyTwo style={{ paddingHorizontal: 16 }}>
                No replacements registered yet for this event.
              </BodyTwo>
            </>
          ) : (
            <View style={{ marginBottom: 16 }}>
              <SubHeader title='Reemplazos' />
              {eventDetail.replacements.map(replacement => (
                <TwoLineWithAvatar
                  avatar={{ uri: replacement.avatar }}
                  title={replacement.username}
                  subtitle={replacement.tag}
                  onPress={() =>
                    props.navigation.navigate('UserDetailScreen', {
                      userId: replacement._id,
                      username: replacement.username,
                    })
                  }
                />
              ))}
            </View>
          )
        ) : (
          <BodyTwo style={{ paddingHorizontal: 16 }}>
            Replacements aren't allowed for this event
          </BodyTwo>
        )}
        {eventDetail.allowInvitations ? (
          eventDetail.invitations <= 0 ? (
            <>
              <BodyTwo style={{ paddingHorizontal: 16 }}>
                No guests registered yet for this event
              </BodyTwo>
            </>
          ) : (
            <>
              <SubHeader title='Lista de invitados' />
              {eventDetail.invitations.map(invited => (
                <TwoLineWithAvatar
                  key={invited._id}
                  avatar={{ uri: invited.avatar }}
                  title={invited.username}
                  subtitle={invited.tag}
                />
              ))}
            </>
          )
        ) : (
          <BodyTwo>We don't guesting on this event</BodyTwo>
        )}
        <BodyTwo style={{ padding: 16 }}>
          Last update{' '}
          {moment(eventDetail.updatedAt).startOf('seconds').fromNow()}
        </BodyTwo>
        <Spacer height={64} />
      </ScrollViewLayout>
      {eventDetail.open || amIanAdminOrOrganizer || amIAdminOfThisGroup ? (
        <FloatingAction
          actions={newActions}
          onPressItem={name => eventFloatingButtonActions(name)}
          color={darkMode ? Colors.dark.primary : Colors.light.primary}
          iconWidth={24}
          iconHeight={24}
          iconColor={
            darkMode
              ? Colors.dark.OnPrimaryActive
              : Colors.light.OnPrimaryActive
          }
          floatingIcon={require('../../assets/images/icons/event.png')}
          actionsPaddingTopBottom={0}
        />
      ) : (
        false
      )}
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
