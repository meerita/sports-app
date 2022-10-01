/** @format */

import { t } from '../../../services/i18n';
import React from 'react';
import TwoLineWithIcon from '../../../components/Lists/TwoLines/TwoLineWithIcon';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

export default function BasicInformationScreen(props) {
  const me = useSelector(state => state.me.myData);

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
      <TwoLineWithIcon
        icon={
          me === null
            ? require('../../../assets/images/icons/el.png')
            : me.characteristics.gender === 'male'
            ? require('../../../assets/images/icons/el.png')
            : me.characteristics.gender === 'female'
            ? require('../../../assets/images/icons/ella.png')
            : require('../../../assets/images/icons/question_mark.png')
        }
        title={t('settings:profile.basicInformation.userName')}
        subtitle={t('settings:profile.basicInformation.userNameDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationUsernameScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/tag.png')}
        title={t('settings:profile.basicInformation.tag')}
        subtitle={t('settings:profile.basicInformation.tagDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationTagScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/profile.png')}
        title={t('settings:profile.basicInformation.description')}
        subtitle={t('settings:profile.basicInformation.descriptionDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationDescriptionScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/meeting_place.png')}
        title='Localización'
        subtitle='Cambia la localización de tu cuenta'
        onPress={() => {
          props.navigation.navigate('SettingsAccountScreen');
        }}
      />
      <TwoLineWithIcon
        icon={
          me.characteristics.gender === 'male'
            ? require('../../../assets/images/icons/male.png')
            : me.characteristics.gender === 'female'
            ? require('../../../assets/images/icons/female.png')
            : require('../../../assets/images/icons/question_mark.png')
        }
        title={t('settings:profile.basicInformation.gender')}
        subtitle={t('settings:profile.basicInformation.genderDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationGenderScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/weight.png')}
        title={t('settings:profile.basicInformation.weightHeight')}
        subtitle={t('settings:profile.basicInformation.weightHeightDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationWeightHeightScreen');
        }}
      />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.basicInformation.basicInformation'),
    presentation: 'modal',
  };
};
