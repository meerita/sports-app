/** @format */

import { View, Text, Switch } from 'react-native';
import React from 'react';
import { t } from '../../../services/i18n';
import SubHeader from '../../../components/SubHeader/SubHeader';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../components/type/BodyTwo';
import { useDispatch, useSelector } from 'react-redux';
import TwoLineItemWithSwitch from '../../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import Styles from '../../../constants/Styles';
import { useToast } from 'react-native-toast-notifications';
import {
  updateGroupVisibilityPrivate,
  updateGroupVisibilityVisibility,
} from '../../../store/actions/group';
import { useState } from 'react';

export default function GroupSettingsPrivacyScreen(props) {
  const privacy = useSelector(
    state => state.group.groupDetail.preferences.group.visibility
  );

  const toast = useToast();

  const dispatch = useDispatch();

  const [privateGroup, setPrivateGroup] = useState(privacy.private);
  const [groupVisibility, setGroupVisibility] = useState(privacy.visibility);

  const tooglePrivateGroup = () => {
    if (privateGroup === false) {
      setPrivateGroup(true);
      dispatch(updateGroupVisibilityPrivate(true));
    } else {
      setPrivateGroup(false);
      dispatch(updateGroupVisibilityPrivate(false));
    }
  };

  const toogleInvisibleGroup = () => {
    if (groupVisibility === false) {
      setGroupVisibility(true);
      dispatch(updateGroupVisibilityVisibility(true));
    } else {
      setGroupVisibility(false);
      dispatch(updateGroupVisibilityVisibility(false));
    }
  };

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
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
          value={privateGroup}
          onChange={tooglePrivateGroup}
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
          onChange={toogleInvisibleGroup}
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
