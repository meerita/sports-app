/** @format */
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/auth';
import { t } from '../../services/i18n';

// COMPONENTS
import Card from '../../components/Card/';
import SubtitleOne from '../../components/type/SubtitleOne';
import Caption from '../../components/type/Caption';
import { useEffect } from 'react';

import { fetchCurrentGroup } from '../../store/actions/group';

export default function MyGroupsScreen(props) {
  const me = useSelector(state => state.me.myData);
  const myGroups = useSelector(state => state.me.myGroups);
  const isAuth = useSelector(state => state.auth);
  const firstGroup = myGroups[0]._id;
  console.log(firstGroup);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentGroup(firstGroup));
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
    >
      {myGroups.map(group => (
        <Card
          key={group._id}
          onPress={() =>
            props.navigation.navigate('GroupDetailScreen', {
              title: group.title,
              id: group._id,
            })
          }
          style={{ marginBottom: 16 }}
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
          <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
            <Caption>{group._id}</Caption>
            <SubtitleOne>{group.title}</SubtitleOne>
            <Caption>
              {group.members.length > 1
                ? t('groups:manyMembers_other', { count: group.members.length })
                : t('groups:manyMembers_one', {
                    count: group.members.length,
                  })}
            </Caption>
          </View>
        </Card>
      ))}
      <Card
        key={'623b75447e4216025e721121'}
        onPress={() =>
          props.navigation.navigate('GroupDetailScreen', {
            title: 'San Antonio Spurs',
            id: '6235c2d5b14e2c9b6906f5d8',
          })
        }
        style={{ marginBottom: 16 }}
      >
        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').width / 2,
          }}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1605021132832-3d59e5ce90f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
            }}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
          <SubtitleOne>San Antonio Spurs</SubtitleOne>
          <Caption>
            {me > 1
              ? t('groups:manyMembers_other', { count: 4 })
              : t('groups:manyMembers_one', {
                  count: 4,
                })}
          </Caption>
        </View>
      </Card>
    </ScrollView>
  );
}
