/** @format */

import { useForm } from 'react-hook-form';
import { t } from '../../services/i18n';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

// COMPONENTS
import SubHeader from '../../components/SubHeader/SubHeader';
import TwoLineItemWithSwitch from '../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import TwoLineItemWithIconAction from '../../components/Lists/TwoLines/TwoLineItemWithIconAction';
import Spacer from '../../components/Spacer/Spacer';
import BodyTwo from '../../components/type/BodyTwo';

export default function SettingsPrivacyScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
      <SubHeader title={t('settings:privacy.proOptions.proOptions')} />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.proOptions.invisible')}
        subtitle={t('settings:privacy.proOptions.invisibleDesc')}
      />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.proOptions.hideActivity')}
        subtitle={t('settings:privacy.proOptions.hideActivityDesc')}
      />
      <SubHeader title={t('settings:privacy.generalOptions.general')} />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.generalOptions.hideSearch')}
        subtitle={t('settings:privacy.generalOptions.hideSearchDesc')}
      />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.generalOptions.groupless')}
        subtitle={t('settings:privacy.generalOptions.grouplessDesc')}
      />
      <SubHeader title={t('settings:privacy.cookies.cookies')} />
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('settings:privacy.cookies.cookiesDesc')}
      </BodyTwo>
      <TwoLineItemWithIconAction
        title={t('settings:privacy.cookies.basicCookies')}
        subtitle={t('settings:privacy.cookies.basicCookiesDesc')}
      />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.cookies.analyticsCookies')}
        subtitle={t('settings:privacy.cookies.analyticsCookiesDesc')}
      />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.cookies.marketingCookies')}
        subtitle={t('settings:privacy.cookies.marketingCookiesDesc')}
      />
      <Spacer height={64} />
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:privacy.privacy'),
    presentation: 'modal',
  };
};
