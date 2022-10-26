/** @format */

import {
  View,
  Text,
  Image,
  Dimensions,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeEvent,
  fetchEventDetail,
  joinMeThisEventAsParticipant,
  joinThisEventAsParticipant,
  leaveMeThisEventAsParticipant,
} from '../../store/actions/event';

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
import { fetchCurrentGroup } from '../../store/actions/group';
import SuperHeader from '../../components/Headers/SuperHeader/SuperHeader';

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

  if (isLoading || !eventDetail || !groupDetail) {
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

  // my id is participating in the event?
  const amIParticipanting =
    eventDetail.participants.find(participant => participant._id === me._id) ||
    eventDetail.replacements.find(participant => participant._id === me._id);

  const amIInvitedToEvent = eventDetail.invitations.find(
    participant => participant._id === me._id
  );

  // these will be the core actions of the main button, depending the user
  // who views the detail and the type of user.

  const darkModeOption = darkMode
    ? Colors.dark.secondary
    : Colors.light.secondary;

  const coreActions = {
    close: {
      text: 'Close',
      icon: require('../../assets/images/icons/close.png'),
      name: 'bt_close',
      position: 1,
      color: darkModeOption,
    },
    share: {
      text: 'Share',
      icon:
        Platform.OS === 'android'
          ? require('../../assets/images/icons/share.png')
          : require('../../assets/images/icons/ios_share.png'),
      name: 'bt_share',
      position: 2,
      color: darkModeOption,
    },
    join: {
      text: 'Participate',
      icon: require('../../assets/images/icons/suspense.png'),
      name: 'bt_join',
      position: 2,
      color: darkModeOption,
    },
    open: {
      text: 'Re-open',
      icon: require('../../assets/images/icons/restart.png'),
      name: 'bt_open',
      position: 1,
      color: darkModeOption,
    },
    leave: {
      text: 'Leave the event',
      icon: require('../../assets/images/icons/event_out.png'),
      name: 'bt_leave',
      position: 4,
      color: darkModeOption,
    },
    leaveGuest: {
      text: 'Leave as guest',
      icon: require('../../assets/images/icons/event_out.png'),
      name: 'bt_leave_guest',
      position: 4,
      color: darkModeOption,
    },
    edit: {
      text: 'Edit',
      icon: require('../../assets/images/icons/event_edit.png'),
      name: 'bt_edit',
      position: 3,
      color: darkModeOption,
    },
    guest: {
      text: 'Sign me as guest',
      icon: require('../../assets/images/icons/rsvp.png'),
      name: 'bt_petition',
      position: 1,
      color: darkModeOption,
    },
    delete: {
      text: 'Delete',
      icon: require('../../assets/images/icons/delete.png'),
      name: 'bt_delete',
      position: 1,
      color: darkModeOption,
    },
  };

  // We must know how to trigger everything on this event, depending
  // of the event policy, the people, etc.

  // If the event is older than today, it can be closed
  const canBeClosed = new Date(eventDetail.when) > new Date();
  // console.log(canBeClosed ? 'CANNOT BE CLOSED' : 'CAN BE CLOSED');

  // see if I am admin of the group
  const amIAdminOfThisGroup = groupDetail.admins.find(
    admin => admin._id === me._id
  );
  // console.log(amIAdminOfThisGroup ? 'I AM ADMIN' : 'I AM NOT ADMIN');

  // am I a member of the group who organizes the event?
  const amIMemberOfThisGroup = groupDetail.members.find(
    member => member._id === me._id
  );
  // console.log(amIMemberOfThisGroup ? 'I AM MEMBER' : 'I AM NOT MEMBER');

  // am I a member of the group who organizes the event?
  const amINoobOfThisGroup = groupDetail.noobs.find(
    noob => noob._id === me._id
  );

  // console.log(amINoobOfThisGroup ? 'I AM NOOB' : 'I AM NOT NOOB');

  // Am I the organizer of the event
  const amITheOrganizer = me._id === eventDetail.organizer._id;
  // console.log(amITheOrganizer ? 'I AM ORGANIZER' : 'I AM NOT ORGANIZER');

  // what is the event participation policy?
  const eventParticipationPolicy = eventDetail.allowedParticipants;
  // console.log('EVENT POLICY: ' + eventParticipationPolicy);

  // Am I one of both?
  const amIanAdminOrOrganizer = amITheOrganizer || amIAdminOfThisGroup;

  // I belong to this group?
  const iBelongToThisGroup = amINoobOfThisGroup || amIMemberOfThisGroup;

  // if the user is not member of the group and the status of the eventdetail
  // is invisible
  if (!iBelongToThisGroup && !eventDetail.visibility) {
    return (
      <View>
        <Text>Este evento es visible sólo para miembros del grupo</Text>
      </View>
    );
  }

  let actions = [];

  const myActions = amIanAdminOrOrganizer
    ? eventDetail.open
      ? amIParticipanting
        ? (actions = actions.concat(
            coreActions.leave,
            coreActions.edit,
            coreActions.close,
            coreActions.delete,
            coreActions.share
          )) // 'Soy el puto amo y ya estoy participando'
        : (actions = actions.concat(
            coreActions.join,
            coreActions.edit,
            coreActions.close,
            coreActions.delete,
            coreActions.share
          )) //'soy el puto amo y no estoy participando, puedo registrarme'
      : (actions = actions.concat(
          coreActions.open,
          coreActions.delete,
          coreActions.share
        )) //'soy el puto amog y el evento está cerrado'
    : iBelongToThisGroup
    ? amIMemberOfThisGroup
      ? eventParticipationPolicy != 'only-admins'
        ? eventDetail.open
          ? amIParticipanting
            ? (actions = actions.concat(coreActions.leave, coreActions.share)) // 'soy miembro, y ya estoy participando'
            : (actions = actions.concat(coreActions.join, coreActions.share)) //'Soy miembro, no estoy participando y puedo registrarme'
          : (actions = actions.concat(coreActions.share)) // 'soy miembro no puedo registrarme porque el evento está cerrado'
        : eventDetail.allowInvitations
        ? eventDetail.open
          ? amIInvitedToEvent || amIParticipanting
            ? (actions = actions.concat(
                coreActions.leaveGuest,
                coreActions.share
              )) // 'Soy miembro y ya estoy invitado'
            : (actions = actions.concat(coreActions.guest, coreActions.share)) //'soy miembro y puedo registrame como invitado porque el evento está abierto y sólo para admins'
          : (actions = actions.concat(coreActions.share)) // 'soy miembro y como invitado podría registrarme pero el evento está cerrado'
        : (actions = actions.concat(coreActions.share)) //'soy miembro pero no puedo registrarme como nada porque está cerrado el evento'
      : eventParticipationPolicy === 'any-member' ||
        eventParticipationPolicy === 'anyone'
      ? eventDetail.open
        ? amIParticipanting
          ? (actions = actions.concat(coreActions.leave, coreActions.share))
          : (actions = actions.concat(coreActions.join, coreActions.share))
        : (actions = actions.concat(coreActions.share))
      : eventDetail.allowInvitations
      ? eventDetail.open
        ? amIInvitedToEvent || amIParticipanting
          ? (actions = actions.concat(coreActions.leave, coreActions.share)) // 'Soy noob, podría registrarme como invitado pero ya estoy en la lista de invitados o miembros'
          : (actions = actions.concat(coreActions.guest, coreActions.share)) //
        : (actions = actions.concat(coreActions.share))
      : (actions = actions.concat(coreActions.share)) // 'soy noob y no puedo registrarme para nada'
    : eventParticipationPolicy === 'anyone'
    ? eventDetail.open
      ? amIParticipanting
        ? (actions = actions.concat(coreActions.leave, coreActions.share))
        : (actions = actions.concat(coreActions.join, coreActions.share))
      : (actions = actions.concat(coreActions.share))
    : eventDetail.allowInvitations
    ? eventDetail.open
      ? amIInvitedToEvent || amIParticipanting
        ? (actions = actions.concat(coreActions.leave, coreActions.share))
        : (actions = actions.concat(coreActions.guest, coreActions.share)) // could register as a guest because i am not member or anythnig
      : (actions = actions.concat(coreActions.share)) // could not register as a guest because event is closed
    : (actions = actions.concat(coreActions.share)); // can't register not even as guest

  // console.log(myActions);

  const eventFloatingButtonActions = name => {
    switch (name) {
      case 'bt_close':
        askMeBeforeExcecute({
          message: 'Are you sure you want to close this event?',
          action: () =>
            dispatch(
              closeEvent({
                eventId: eventId,
                groupId: eventDetail.group,
              })
            ),
        });
        break;
      case 'bt_open':
        askMeBeforeExcecute({
          message: 'Are you sure you want to re-open this event?',
          action: () =>
            dispatch(
              closeEvent({
                eventId: eventId,
                groupId: eventDetail.group,
              })
            ),
        });
        break;
      case 'bt_join':
        try {
          dispatch(
            joinMeThisEventAsParticipant({
              proposerId: me._id,
              groupId: eventDetail.group,
              gender: me.characteristics.gender,
              participantId: me._id,
              eventId: eventDetail._id,
            })
          );
        } catch (error) {
          console.log(error);
        }
        break;
      case 'bt_leave':
        try {
          dispatch(
            leaveMeThisEventAsParticipant({
              proposerId: me._id,
              groupId: eventDetail.group,
              participantId: me._id,
              eventId: eventDetail._id,
            })
          );
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  const askMeBeforeExcecute = alert => {
    Alert.alert(
      '',
      alert.message,
      [
        {
          text: t('common:cancel'),
          style: 'cancel',
        },
        {
          text: t('common:accept'),
          onPress: alert.action,
        },
      ],
      { cancelable: true, userInterfaceStyle: darkMode ? 'dark' : 'light' }
    );
  };

  const goToExternalLink = url => {
    Linking.openURL(url);
  };

  return (
    <>
      <SuperHeader>
        <HeadlineFive
          style={{
            color: darkMode
              ? Colors.dark.OnSurfaceActive
              : Colors.light.OnSurfaceActive,
          }}
        >
          {eventDetail.title}
        </HeadlineFive>
      </SuperHeader>
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

        {amIanAdminOrOrganizer ? (
          <>
            <Line />
            <SingleLineWithIcon
              icon={require('../../assets/images/icons/visibility_on.png')}
              title={t(
                'settings:profile.basicInformation.visibility.visibility'
              )}
              caption={
                eventDetail.visibility
                  ? t('groups:settings.events.types.anyone')
                  : t('groups:settings.events.types.only-my-group')
              }
              onPress={() =>
                props.navigation.navigate(
                  'EventOptionsVisibilitySelectorScreen',
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
              icon={require('../../assets/images/icons/manage_accounts.png')}
              title={'Invitados?'}
              caption={
                eventDetail.allowInvitations ? 'se permiten invitados' : 'no'
              }
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
          </>
        ) : (
          false
        )}
        <Line />
        <SingleLineWithIcon
          icon={require('../../assets/images/icons/group.png')}
          title='Max participants'
          caption={eventDetail.maxParticipants}
          onPress={() =>
            amIanAdminOrOrganizer &&
            props.navigation.navigate('MaxPlayersScreen')
          }
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
            amIanAdminOrOrganizer &&
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
            amIanAdminOrOrganizer &&
            props.navigation.navigate('EventOptionsSkillsSelectorScreen', {
              editEvent: true,
              eventId: eventDetail._id,
              groupId: eventDetail.group,
            })
          }
        />
        {amIanAdminOrOrganizer ? (
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
        ) : eventDetail.allowedGender != 'other' ? (
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
          />
        ) : (
          false
        )}
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
      <FloatingAction
        actions={myActions}
        onPressItem={name => eventFloatingButtonActions(name)}
        color={darkMode ? Colors.dark.primary : Colors.light.primary}
        iconWidth={24}
        iconHeight={24}
        iconColor={
          darkMode ? Colors.dark.OnPrimaryActive : Colors.light.OnPrimaryActive
        }
        floatingIcon={require('../../assets/images/icons/event.png')}
        actionsPaddingTopBottom={0}
      />
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
