/** @format */

import { t } from '../../../services/i18n';
import React from 'react';
import TwoLineWithIcon from '../../../components/Lists/TwoLines/TwoLineWithIcon';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function BasicInformationScreen(props) {
  const me = useSelector(state => state.me.myData);

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollViewLayout style={{ paddingTop: 16 }}>
      <TwoLineWithIcon
        icon={
          me === null
            ? require('../../../assets/images/icons/face_male.png')
            : me.characteristics.gender === 'male'
            ? require('../../../assets/images/icons/face_male.png')
            : me.characteristics.gender === 'female'
            ? require('../../../assets/images/icons/face_female.png')
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
        icon={require('../../../assets/images/icons/subject.png')}
        title={t('settings:profile.basicInformation.description')}
        subtitle={t('settings:profile.basicInformation.descriptionDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationDescriptionScreen');
        }}
      />
      <TwoLineWithIcon
        icon={require('../../../assets/images/icons/person_pin_circle.png')}
        title='Localizaci??n'
        subtitle='Cambia la localizaci??n de tu cuenta'
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
        icon={require('../../../assets/images/icons/scale.png')}
        title={t('settings:profile.basicInformation.weightHeight')}
        subtitle={t('settings:profile.basicInformation.weightHeightDesc')}
        onPress={() => {
          props.navigation.navigate('BasicInformationWeightHeightScreen');
        }}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.basicInformation.basicInformation'),
    presentation: 'modal',
  };
};
