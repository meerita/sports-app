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

export default function GroupInfoScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);
  // currentGroup
  const group = useSelector(state => state.group.groupDetail);

  // how many members this community has?
  const memberCount =
    group.members.length + group.admins.length + group.noobs.length;

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
      <SingleLineWithCaption title='Location' caption={`Barcelona, España`} />
      <SingleLineWithCaption
        title='Miembros'
        caption={
          memberCount > 1
            ? t('groups:manyMembers_other', { count: memberCount })
            : t('groups:manyMembers_one', {
                count: memberCount,
              })
        }
      />
      <SingleLineWithCaption
        title='Group Policy'
        caption={
          group.preferences.group.membership.noRegistration
            ? 'Registration needed'
            : 'No registration'
        }
      />
      <SingleLineWithCaption
        title='Diversity'
        caption={
          group.preferences.group.membership.diversity === 'male'
            ? 'Sólo hombres'
            : group.preferences.group.membership.diversity === 'female'
            ? 'Sólo mujeres'
            : 'Hombres y mujeres'
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
