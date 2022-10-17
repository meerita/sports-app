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
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

// STORE
import { fetchCurrentGroup } from '../../store/actions/group';
import { fetchMyUser } from '../../store/actions/me';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';

export default function MyGroupsScreen(props) {
  const me = useSelector(state => state.me.myData);
  const myGroups = useSelector(state => state.me.myGroups);
  const isAuth = useSelector(state => state.auth);
  const firstGroup = myGroups.length > 0 ? myGroups[0]._id : false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstGroup) {
      dispatch(fetchCurrentGroup(firstGroup));
    }
  }, []);

  // useEffect(() => {
  //   if (myGroups) {
  //     dispatch(fetchMyUser(me._id));
  //   }
  // }, [myGroups]);

  if (myGroups.length === 0) {
    return (
      <View>
        <Text>No hay grupos</Text>
        <ButtonFilled>Crea un grupo</ButtonFilled>
      </View>
    );
  }

  return (
    <ScrollViewLayout
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
                ? t('groups:members.manyMembers_other', {
                    count: group.members.length,
                  })
                : t('groups:members.manyMembers_one', {
                    count: group.members.length,
                  })}
            </Caption>
          </View>
        </Card>
      ))}
    </ScrollViewLayout>
  );
}
