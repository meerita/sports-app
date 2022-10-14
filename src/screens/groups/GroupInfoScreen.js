/** @format */

import { View, Image, ScrollView, Dimensions, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';
// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import BodyOne from '../../components/type/BodyOne';
import SubHeader from '../../components/SubHeader/SubHeader';
import SingleLineWithCaption from '../../components/Lists/OneLine/SingleLineWithCaption';
import moment from 'moment';

export default function GroupInfoScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);
  // currentGroup
  const group = useSelector(state => state.group.groupDetail);

  // how many members this community has?
  const memberCount = group.members.length + group.noobs.length;

  return (
    <ScrollView
      style={{
        ...Styles.body,
        marginBottom: 0,
        backgroundColor: darkMode
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      <View style={{ width: '100%', height: Dimensions.get('window').width }}>
        <Image
          source={{ uri: group.image }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {group.description && (
        <BodyOne style={{ padding: 16 }}>{group.description}</BodyOne>
      )}
      <SubHeader title='Info' />
      <SingleLineWithCaption
        title={t('common:localization')}
        caption={`Barcelona, España`}
      />
      <SingleLineWithCaption
        title={t('groups:founded')}
        caption={moment(group.createdAt).startOf('day').fromNow()}
      />
      <SingleLineWithCaption
        title={t('groups:settings.privacy.membership')}
        caption={
          group.preferences.group.membership.noRegistration
            ? t('groups:settings.privacy.freeJoin')
            : t('groups:settings.privacy.noRegister')
        }
      />
      <SingleLineWithCaption
        title={t('groups:settings.privacy.diversity')}
        caption={
          group.preferences.group.membership.diversity === 'male'
            ? t('groups:settings.gender.male')
            : group.preferences.group.membership.diversity === 'female'
            ? t('groups:settings.gender.female')
            : t('groups:settings.gender.mixed')
        }
      />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Information',
  };
};
