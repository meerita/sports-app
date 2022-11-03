/** @format */

import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyOne from '../../components/type/BodyOne';
import SubHeader from '../../components/SubHeader/SubHeader';
import { t } from '../../services/i18n';
import convert from 'convert-units';
import moment from 'moment';
import SingleLineWithCaption from '../../components/Lists/OneLine/SingleLineWithCaption';
import Card from '../../components/Card';
import SubtitleOne from '../../components/type/SubtitleOne';
import Caption from '../../components/type/Caption';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, user: '', error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function NewUserDetailScreen(props) {
  const me = useSelector(state => state.me.myData);
  const userId = props.route.params.userId;
  const users = useSelector(state => state.group.groupDetail);

  const [{ loading, user, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    user: null,
  });

  const getUserDetail = async userId => {
    const fetchData = async () => {
      // we call the API
      const response = await fetch(
        `http://192.168.1.42:9000/v1/users/${userId}`
      );
      // we check if there's an error
      if (!response.ok) {
        throw new Error('could not fetch any data');
      }
      // if OK then we get the response
      const data = await response.json();
      // we return data

      return data;
    };

    // Once we have the data, we will dispatch it
    try {
      // we will
      const userData = await fetchData();
      dispatch({ type: 'FETCH_SUCCESS', payload: userData.user });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetail(userId);
  }, [userId]);

  if (loading) {
    return (
      <View>
        <Text> loading…</Text>
      </View>
    );
  }

  // Am I visiting my own profile?
  const myOwnProfile = me._id === userId;

  // is user invisible?
  const userInvisible = user.settings.privacy.pro.invisible;

  // wants to show his groups?
  const hideMyGroups = user.settings.privacy.general.hideMyGroups;

  return (
    <ScrollViewLayout style={{ paddingTop: 0 }}>
      <View style={{ width: '100%', height: Dimensions.get('window').width }}>
        <Image
          source={{ uri: user.avatar }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {user.description && (
        <BodyOne style={{ padding: 16 }}>{user.description}</BodyOne>
      )}
      <SubHeader title={t('profile:info')} />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.userName')}
        caption={user.username}
        onPress={() =>
          props.navigation.navigate('BasicInformationUsernameScreen')
        }
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.tag')}
        caption={user.tag}
        onPress={() => props.navigation.navigate('BasicInformationTagScreen')}
      />
      <SingleLineWithCaption
        title={t('profile:memberSince')}
        caption={moment(user.createdAt).startOf('day').fromNow()}
      />
      <SingleLineWithCaption
        title={t('profile:memberNumber')}
        caption={'#' + user.userNumber}
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
          `settings:profile.basicInformation.${user.characteristics.gender}`
        )}
        onPress={() =>
          props.navigation.navigate('BasicInformationGenderScreen')
        }
      />
      <SingleLineWithCaption
        title={t('common:weight.weight')}
        caption={
          user.settings.preferences.weights === 'imperial'
            ? t('common:weight.lb', {
                weight: convert(user.characteristics.weight)
                  .from('kg')
                  .to('lb')
                  .toFixed(0),
              })
            : t('common:weight.kg', {
                weight: user.characteristics.weight.toFixed(0),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationWeightSelectorScreen')
        }
      />

      <SingleLineWithCaption
        title={t('common:height.height')}
        caption={
          user.settings.preferences.dimensions === 'imperial'
            ? t('common:height.ft-us', {
                ft: convert(user.characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(0),
                in: convert(user.characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(1)
                  .slice(2),
              })
            : t('common:height.m', {
                height: convert(user.characteristics.height)
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
            {user.groups.map(group => (
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
                    props.navigation.push('GroupDetailScreen', {
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
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.username,
  };
};
