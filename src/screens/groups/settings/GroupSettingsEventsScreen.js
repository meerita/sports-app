/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../services/i18n';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';
import BodyTwo from '../../../components/type/BodyTwo';
import { useSelector } from 'react-redux';

export default function GroupSettingsEventsScreen(props) {
  // groupDetails
  const eventPreferences = useSelector(
    state => state.group.groupDetail.preferences.events
  );

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('groups:settings.events.explanation')}
      </BodyTwo>
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/events.png')}
        title={t('groups:settings.events.creation')}
        caption={t(`groups:settings.events.types.${eventPreferences.creation}`)}
        onPress={() =>
          props.navigation.navigate('EventOptionsCreationSelectorScreen')
        }
      />
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/groups.png')}
        title={t('groups:settings.events.participation')}
        caption={t(
          `groups:settings.events.types.${eventPreferences.participation}`
        )}
        onPress={() =>
          props.navigation.navigate('EventOptionsParticipationSelectorScreen')
        }
      />
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/visibility_on.png')}
        title={t('groups:settings.events.visibility')}
        caption={t(
          `groups:settings.events.types.${eventPreferences.visibility}`
        )}
        onPress={() =>
          props.navigation.navigate('EventOptionsVisibilitySelectorScreen')
        }
      />
      <SingleLineWithIcon
        // poner siempre el icono del deporte oficial del grupo
        icon={require('../../../assets/images/icons/soccer.png')}
        title={t('groups:settings.events.typeOfEvent')}
        caption='3v3'
        onPress={() =>
          props.navigation.navigate('GroupEventsTypeSettingsScreen')
        }
      />
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/skill.png')}
        title={t('groups:settings.events.skill')}
        caption={t(`skills:${eventPreferences.skill}.title`)}
        onPress={() =>
          props.navigation.navigate('EventOptionsSkillsSelectorScreen')
        }
      />
      {/* <SingleLineWithIcon
        icon={require('../../../assets/images/icons/meeting_place.png')}
        title={t('groups:settings.events.meetingPoint')}
        caption='Icaria 22, Barcelona'
        onPress={() =>
          props.navigation.navigate('GroupEventsMeetingPointSettingsScreen')
        }
      /> */}
      <SingleLineWithIcon
        icon={require('../../../assets/images/icons/replace.png')}
        title={t('groups:settings.events.replacements')}
        caption={t(
          `groups:settings.events.types.${eventPreferences.replacements}.title`
        )}
        onPress={() =>
          props.navigation.navigate('EventOptionsReplacementsSelectorScreen')
        }
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.events.events'),
  };
};
