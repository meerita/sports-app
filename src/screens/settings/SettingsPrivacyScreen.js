/** @format */

import { Controller, useForm } from 'react-hook-form';
import { t } from '../../services/i18n';
import { ScrollView, Switch, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  allowAnalyticsCookies,
  allowMarketingCookies,
  hideUserGroups,
  hideMeFromSearchResults,
  makeMeInvisible,
  hideUserActivity,
} from '../../store/actions/me';

export default function SettingsPrivacyScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  const cookies = useSelector(
    state => state.me.myData.settings.privacy.cookies
  );
  const tag = useSelector(
    state => state.me.myData.settings.privacy.pro.invisible
  );

  const analyticsCookiesPreferences = useSelector(
    state => state.me.myData.settings.privacy.cookies.analytics
  );

  const marketingCookiesPreferences = useSelector(
    state => state.me.myData.settings.privacy.cookies.marketing
  );

  const generalOptions = useSelector(
    state => state.me.myData.settings.privacy.general
  );

  const proOptions = useSelector(state => state.me.myData.settings.privacy.pro);

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // setup of our form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [analyticsCookies, setAnalyticsCookies] = useState(
    analyticsCookiesPreferences
  );
  const [marketingCookies, setMarketingCookies] = useState(
    marketingCookiesPreferences
  );

  const [hideMyGroups, setHideMyGroups] = useState(generalOptions.hideMyGroups);
  const [hideMyselfFromSearch, setHideMyselfFromSearch] = useState(
    generalOptions.hiddenInSearch
  );
  const [invisibility, setInvisibility] = useState(proOptions.invisible);
  const [hideActivity, setHideActivity] = useState(proOptions.hideActivity);

  const toogleAnalyticsCookies = () => {
    if (analyticsCookies === false) {
      setAnalyticsCookies(true);
      dispatch(allowAnalyticsCookies(true));
    } else {
      setAnalyticsCookies(false);
      dispatch(allowAnalyticsCookies(false));
    }
  };

  const toogleMarketingCookies = () => {
    if (marketingCookies === false) {
      setMarketingCookies(true);
      dispatch(allowMarketingCookies(true));
    } else {
      setMarketingCookies(false);
      dispatch(allowMarketingCookies(false));
    }
  };

  const toogleHideMyGroups = () => {
    if (hideMyGroups === false) {
      setHideMyGroups(true);
      dispatch(hideUserGroups(true));
    } else {
      setHideMyGroups(false);
      dispatch(hideUserGroups(false));
    }
  };

  const toogleHideSearchs = () => {
    if (hideMyselfFromSearch === false) {
      setHideMyselfFromSearch(true);
      dispatch(hideMeFromSearchResults(true));
    } else {
      setHideMyselfFromSearch(false);
      dispatch(hideMeFromSearchResults(false));
    }
  };

  const toogleInvisibility = () => {
    if (invisibility === false) {
      setInvisibility(true);
      dispatch(makeMeInvisible(true));
    } else {
      setInvisibility(false);
      dispatch(makeMeInvisible(false));
    }
  };

  const toogleHideActivity = () => {
    if (hideActivity === false) {
      setHideActivity(true);
      dispatch(hideUserActivity(true));
    } else {
      setHideActivity(false);
      dispatch(hideUserActivity(false));
    }
  };

  return (
    <ScrollViewLayout>
      <SubHeader title={t('settings:privacy.proOptions.proOptions')} />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.proOptions.invisible')}
        subtitle={t('settings:privacy.proOptions.invisibleDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={invisibility}
          onChange={toogleInvisibility}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('settings:privacy.proOptions.hideActivity')}
        subtitle={t('settings:privacy.proOptions.hideActivityDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={hideActivity}
          onChange={toogleHideActivity}
        />
      </TwoLineItemWithSwitch>
      <SubHeader title={t('settings:privacy.generalOptions.general')} />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.generalOptions.hideSearch')}
        subtitle={t('settings:privacy.generalOptions.hideSearchDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={hideMyselfFromSearch}
          onChange={toogleHideSearchs}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('settings:privacy.generalOptions.groupless')}
        subtitle={t('settings:privacy.generalOptions.grouplessDesc')}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={hideMyGroups}
          onChange={toogleHideMyGroups}
        />
      </TwoLineItemWithSwitch>
      <SubHeader title={t('settings:privacy.cookies.cookies')} />
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('settings:privacy.cookies.cookiesDesc')}
      </BodyTwo>

      <TwoLineItemWithIconAction
        title={t('settings:privacy.cookies.basicCookies')}
        subtitle={t('settings:privacy.cookies.basicCookiesDesc')}
        onPress={() => props.navigation.navigate('BasicCoockiesInfoScreen')}
      />
      <TwoLineItemWithSwitch
        title={t('settings:privacy.cookies.analyticsCookies')}
        subtitle={t('settings:privacy.cookies.analyticsCookiesDesc')}
        onPress={() => toogleAnalyticsCookies()}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={analyticsCookies}
          onChange={toogleAnalyticsCookies}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('settings:privacy.cookies.marketingCookies')}
        subtitle={t('settings:privacy.cookies.marketingCookiesDesc')}
        onPress={() => toogleMarketingCookies()}
      >
        <Switch
          thumbColor={props.thumbColor}
          trackColor={props.trackColor}
          style={Styles.switchControl}
          value={marketingCookies}
          onChange={toogleMarketingCookies}
        />
      </TwoLineItemWithSwitch>
      <Spacer height={64} />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('settings:privacy.privacy'),
    presentation: 'modal',
  };
};
