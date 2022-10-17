/** @format */

import { t } from '../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import convert from 'convert-units';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// STORE
import { fetchUserProfile } from '../store/actions/user';

// COMPONENTS
import BodyOne from '../components/type/BodyOne';
import Caption from '../components/type/Caption';
import Card from '../components/Card';
import ScrollViewLayout from '../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import SingleLineWithCaption from '../components/Lists/OneLine/SingleLineWithCaption';
import Spacer from '../components/Spacer/Spacer';
import SubHeader from '../components/SubHeader/SubHeader';
import SubtitleOne from '../components/type/SubtitleOne';

export default function UserDetailNavigator(props) {
  // DATA & PROPS
  const me = useSelector(state => state.me.myData);
  const userId = props.route.params.userId;

  // UTILS
  const dispatch = useDispatch();

  // STATES
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(fetchUserProfile(userId));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  // POST FETCHING
  const userProfile = useSelector(state => state.user.userProfileData);

  // IF SOMETHING IS WRONG…
  if (isLoading || !userProfile) {
    return (
      <View>
        <Text>Loading…</Text>
      </View>
    );
  }

  // Am I visiting my own profile?
  const myOwnProfile = me._id === userId;

  // is user invisible?
  const userInvisible = userProfile.settings.privacy.pro.invisible;

  // wants to show his groups?
  const hideMyGroups = userProfile.settings.privacy.general.hideMyGroups;

  // If the user has INVISIBLE activated and is not visiting his own
  // profile we must hide all the information

  if (userInvisible && !myOwnProfile) {
    return (
      <View>
        <Text>Este usuario ha decidido poner en invisible su perfil</Text>
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
      {myOwnProfile || (!myOwnProfile && !hideMyGroups) ? (
        <>
          <SubHeader
            title={t('profile:memberOf')}
            style={{ paddingBottom: 16 }}
          />
          <ScrollView
            horizontal={true}
            style={{ paddingLeft: 12, paddingRight: 16 }}
          >
            {userProfile.groups.map(group => (
              <View
                style={{
                  marginRight: 4,
                  marginLeft: 4,
                }}
              >
                <Card
                  key={group._id}
                  style={{
                    marginBottom: 16,
                    width: 298,
                  }}
                  onPress={() =>
                    props.navigation.navigate('GroupDetailScreen', {
                      title: group.title,
                      id: group._id,
                    })
                  }
                >
                  <View
                    style={{
                      width: '100%',
                      height: Dimensions.get('window').width / 2,
                    }}
                  >
                    <Image
                      source={{ uri: group.image }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                      }}
                    />
                  </View>
                  <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
                    <SubtitleOne>{group.title}</SubtitleOne>
                    <Caption>
                      {group.members.length > 1
                        ? t('groups:members.manyMembers_other', {
                            count: group.members.length,
                          })
                        : t('groups:members.manyMembers_one', {
                            count: group.members.length,
                          })}
                    </Caption>
                  </View>
                </Card>
              </View>
            ))}
          </ScrollView>
        </>
      ) : null}

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
