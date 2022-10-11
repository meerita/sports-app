/** @format */

import { View, Text, Switch } from 'react-native';
import React from 'react';
import { t } from '../../../services/i18n';
import SubHeader from '../../../components/SubHeader/SubHeader';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../components/type/BodyTwo';
import { useSelector } from 'react-redux';
import TwoLineItemWithSwitch from '../../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import Styles from '../../../constants/Styles';

export default function GroupSettingsPrivacyScreen(props) {
  const privacy = useSelector(
    state => state.group.groupDetail.preferences.group
  );
  const groupPrivacy = privacy.visibility.private;
  const groupVisibility = privacy.visibility.visibility;

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        Aquí puedes controlar todos los ajustes de privacidad del grupo.
      </BodyTwo>
      <TwoLineItemWithSwitch
        title={t('groups:settings.privacy.private')}
        subtitle={t('groups:settings.privacy.privateDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={groupPrivacy}
          // onChange={onChange}
          // onBlur={onBlur}
          // onValueChange={toogleVisibility}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('groups:settings.privacy.visibility')}
        subtitle={t('groups:settings.privacy.visibilityDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={groupVisibility}
          // onChange={onChange}
          // onBlur={onBlur}
          // onValueChange={toogleVisibility}
        />
      </TwoLineItemWithSwitch>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.privacy.privacy'),
  };
};
