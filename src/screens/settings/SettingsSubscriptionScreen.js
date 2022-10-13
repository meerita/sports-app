/** @format */

import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

// COMPONENTS
import HeadlineFour from '../../components/type/HeadlineFour';
import SingleLineWithIcon from '../../components/Lists/OneLine/SingleLineWithIcon';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function SettingsSubscriptionScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <ScrollViewLayout
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.primary : Colors.light.primary,
      }}
    >
      <HeadlineFour
        style={{
          padding: 16,
          textAlign: 'center',
          color: darkMode
            ? Colors.dark.OnPrimaryActive
            : Colors.light.OnPrimaryActive,
        }}
      >
        {t('settings:subscription.getMore')}
      </HeadlineFour>
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/PRO.png')}
        title={t('settings:subscription.proBadge')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/Admin.png')}
        title={t('settings:subscription.multiple')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/visibility_off.png')}
        title={t('settings:subscription.incognito')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/storage.png')}
        title={t('settings:subscription.stats')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/discount.png')}
        title={t('settings:subscription.discounts')}
      />
      <SingleLineWithIcon
        icon={require('../../assets/images/icons/skill.png')}
        title={t('settings:subscription.prize')}
      />
      <ButtonFilled
        style={{ margin: 16 }}
        onPress={() => {
          props.navigation.navigate('SettingsSubscriptionConfirmationScreen');
        }}
      >
        {t('settings:subscription.startTrial')}
      </ButtonFilled>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:subscription'),
    headerBackTitle: t('common:back'),
    presentation: 'modal',
  };
};
