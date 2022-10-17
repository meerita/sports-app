/** @format */

import { View, Text, Image, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/actions/user';
import ScrollViewLayout from '../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyOne from '../components/type/BodyOne';
import SingleLineWithCaption from '../components/Lists/OneLine/SingleLineWithCaption';
import { t } from '../services/i18n';
import Spacer from '../components/Spacer/Spacer';
import convert from 'convert-units';
import moment from 'moment';
import SubHeader from '../components/SubHeader/SubHeader';

export default function UserDetailNavigator(props) {
  // current UserId visited
  const userId = props.route.params.userId;

  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.user.userProfileData);

  useEffect(() => {
    console.log('dispatching');
    dispatch(fetchUserProfile(userId));
  }, [userId]);

  if (!userProfile) {
    return (
      <View>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollViewLayout style={{ paddingTop: 0 }}>
      <View style={{ width: '100%', height: Dimensions.get('window').width }}>
        <Image
          source={{ uri: userProfile.avatar }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {userProfile.description && (
        <BodyOne style={{ padding: 16 }}>{userProfile.description}</BodyOne>
      )}
      <SubHeader title={t('profile:info')} />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.userName')}
        caption={userProfile.username}
        onPress={() =>
          props.navigation.navigate('BasicInformationUsernameScreen')
        }
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.tag')}
        caption={userProfile.tag}
        onPress={() => props.navigation.navigate('BasicInformationTagScreen')}
      />
      <SingleLineWithCaption
        title={t('profile:memberSince')}
        caption={moment(userProfile.createdAt).startOf('day').fromNow()}
      />
      <SingleLineWithCaption
        title={t('profile:memberNumber')}
        caption={'#' + userProfile.userNumber}
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.localization')}
        caption={t('settings:profile.basicInformation.countryProvince', {
          country: 'España',
          province: 'Barcelona',
        })}
      />
      <SubHeader title='Vitales' />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.gender')}
        caption={t(
          `settings:profile.basicInformation.${userProfile.characteristics.gender}`
        )}
        onPress={() =>
          props.navigation.navigate('BasicInformationGenderScreen')
        }
      />
      <SingleLineWithCaption
        title={t('common:weight.weight')}
        caption={
          userProfile.settings.preferences.weights === 'imperial'
            ? t('common:weight.lb', {
                weight: convert(userProfile.characteristics.weight)
                  .from('kg')
                  .to('lb')
                  .toFixed(0),
              })
            : t('common:weight.kg', {
                weight: userProfile.characteristics.weight.toFixed(0),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationWeightSelectorScreen')
        }
      />

      <SingleLineWithCaption
        title={t('common:height.height')}
        caption={
          userProfile.settings.preferences.dimensions === 'imperial'
            ? t('common:height.ft-us', {
                ft: convert(userProfile.characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(0),
                in: convert(userProfile.characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(1)
                  .slice(2),
              })
            : t('common:height.m', {
                height: convert(userProfile.characteristics.height)
                  .from('cm')
                  .to('m')
                  .toFixed(2),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationHeightSelectorScreen')
        }
      />

      <SubHeader title={t('profile:memberOf')} />
      {userProfile.groups.map(group => (
        <Text>{group.title}</Text>
      ))}
      {/* 
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.visibility.visibility')}
        caption={t(
          `settings:profile.basicInformation.visibility.${
            userProfile.settings.privacy.pro.invisible ? 'true' : 'false'
          }`
        )}
        onPress={() => props.navigation.navigate('SettingsPrivacyScreen')}
      />
      
      <SingleLineWithCaption
        title={t('profile:verified.verified')}
        caption={
          userProfile.verified
            ? t('profile:verified.verified')
            : t('profile:verified.unverified')
        }
      />
      <SingleLineWithCaption
        title={t('profile:subscriber.type')}
        caption={
          userProfile.isSubscriber
            ? t('profile:subscriber.pro')
            : t('profile:subscriber.standard')
        }
      />
      {userProfile.isAdmin && (
        <SingleLineWithCaption
          title={t('common:admin')}
          caption={t('common:yes')}
        />
      )} */}
      <Spacer height='16' />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  const username = navData.route.params.username;
  return {
    headerTitle: username,
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
