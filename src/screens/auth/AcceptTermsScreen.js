/** @format */

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Card from '../../components/Card';
import CheckBox from 'expo-checkbox';
import SingleLineWithSwitch from '../../components/Lists/OneLine/SingleLineWithSwitch';
import SingleLineWithRadio from '../../components/Lists/OneLine/SingleLineWithRadio';
import Caption from '../../components/type/Caption';
import TwoLineItemWithSwitch from '../../components/Lists/TwoLines/TwoLineItemWithSwitch';
import BodyTwo from '../../components/type/BodyTwo';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { t } from '../../services/i18n';
import Line from '../../components/Line/Line';
import TwoLineItemLongerText from '../../components/Lists/TwoLines/TwoLineItemLongerText';
import ListItem from '../../components/Lists/ListItem/ListItem';
import SingleLineWithCaption from '../../components/Lists/OneLine/SingleLineWithCaption';
import { authActions } from '../../store/slices/auth';

export default function AcceptTermsScreen(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  const acceptation = useSelector(state => state.auth.signUp);
  const dispatch = useDispatch();

  console.log(acceptation);

  const [toggleCheckBox, setToggleCheckBox] = useState(acceptation.docs.terms);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(
    acceptation.docs.privacy
  );
  const [toggleCheckBox3, setToggleCheckBox3] = useState(
    acceptation.docs.subscription
  );

  const acceptTermsHandler = () => {
    setToggleCheckBox(!toggleCheckBox);
    dispatch(authActions.signUpAcceptTerms());
    if (toggleCheckBox === false) {
      props.navigation.navigate('TermsAndConditions');
    }
  };

  const acceptPrivacyHandler = () => {
    setToggleCheckBox2(!toggleCheckBox2);
    dispatch(authActions.signUpAcceptPrivacy());
    if (toggleCheckBox2 === false) {
      props.navigation.navigate('PrivacyPolicy');
    }
  };

  const acceptSubscriptionHandler = () => {
    setToggleCheckBox3(!toggleCheckBox3);
    dispatch(authActions.signUpAcceptSubscription());
    if (toggleCheckBox3 === false) {
      props.navigation.navigate('PrivacyPolicy');
    }
  };

  return (
    <View>
      <BodyTwo style={{ padding: 16 }}>
        {t('auth:register.acceptTerms.acceptTermsDesc')}
      </BodyTwo>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptTerms.termsAndConditions.title')}
        subtitle={t('auth:register.acceptTerms.termsAndConditions.description')}
        onPress={() => acceptTermsHandler()}
      >
        <CheckBox
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptTerms.privacyPolicy.title')}
        subtitle={t('auth:register.acceptTerms.privacyPolicy.description')}
        onPress={() => acceptPrivacyHandler()}
      >
        <CheckBox
          value={toggleCheckBox2}
          onValueChange={newValue => setToggleCheckBox2(newValue)}
        />
      </TwoLineItemWithSwitch>
      <TwoLineItemWithSwitch
        title={t('auth:register.acceptTerms.subTerms.title')}
        subtitle={t('auth:register.acceptTerms.subTerms.description')}
        onPress={() => acceptSubscriptionHandler()}
      >
        <CheckBox
          value={toggleCheckBox3}
          onValueChange={newValue => setToggleCheckBox3(newValue)}
        />
      </TwoLineItemWithSwitch>

      <View style={{ padding: 16 }}>
        <ButtonFilled
          disabled={
            toggleCheckBox !== true ||
            toggleCheckBox2 !== true ||
            toggleCheckBox3 !== true
              ? true
              : false
          }
          onPress={() => props.navigation.navigate('AcceptCookies')}
        >
          {t('common:nextStep')}
        </ButtonFilled>
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('auth:register.acceptTerms.title'),
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
