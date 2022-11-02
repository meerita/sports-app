/** @format */

import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

import { changeMyDarkMode } from '../../store/actions/theme';
import { meActions } from '../../store/slices/me';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyOne from '../../components/type/BodyOne';
import { allowAnalyticsCookies } from '../../store/actions/me';

export default function MeEventsScreen() {
  const me = useSelector(state => state.me.myData);

  const characteristics = me.characteristics;

  const cookies = me.settings.privacy.cookies;

  const darkMode = useSelector(state => state.theme.darkMode);

  const dispatch = useDispatch();

  const changeThemeHandler = () => {
    // dispatch(meActions.allowAnalytics({ analytics: true }));
  };

  return (
    <ScrollViewLayout>
      <BodyOne style={{ paddingBottom: 16 }}>
        analytics: {cookies.analytics ? 'true' : 'false'}
      </BodyOne>
      <Button
        onPress={() => changeThemeHandler()}
        title={darkMode ? 'change to light theme' : 'change to dark theme'}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:create.form.resume'),
  };
};
