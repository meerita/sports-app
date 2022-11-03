/** @format */

import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupsBySport } from '../../store/actions/explore';
import Card from '../../components/Card';
import SubtitleOne from '../../components/type/SubtitleOne';
import Caption from '../../components/type/Caption';
import { t } from '../../services/i18n';
import PlaceholderLayout from '../../components/Layouts/PlaceholderLayout/PlaceholderLayout';
import HeadlineFive from '../../components/type/HeadlineFive';
import Colors from '../../constants/Colors';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';

export default function ExploreGroupsBySport(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // the sportId needed to request the groups
  const sportId = props.route.params.sportId;

  const groupsBySport = useSelector(state => state.explore.groupsBySport);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setLoading(true);
      dispatch(fetchGroupsBySport(sportId));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, sportId]);

  if (loading) {
    return (
      <View>
        <Text>Loading groups…</Text>
      </View>
    );
  }

  if (groupsBySport >= 0) {
    return (
      <PlaceholderLayout>
        <Image
          source={require('../../assets/images/placeholders/important.png')}
          style={{
            tintColor: darkMode
              ? Colors.dark.OnBackgroundUnfocused
              : Colors.light.OnBackgroundUnfocused,
            marginBottom: 16,
          }}
        />
        <HeadlineFive
          style={{
            textAlign: 'center',
            color: darkMode
              ? Colors.dark.OnBackgroundUnfocused
              : Colors.light.OnBackgroundUnfocused,
          }}
        >
          There aren't groups here yet
        </HeadlineFive>
        <View style={{ paddingVertical: 32 }}>
          <ButtonFilled
            style={{ flexGrow: 0 }}
            onPress={() => props.navigation.navigate('SelectSportScreen')}
          >
            Create a new group
          </ButtonFilled>
        </View>
      </PlaceholderLayout>
    );
  }

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
    >
      {groupsBySport.map(group => (
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
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t(`sports:${navData.route.params.title}`),
  };
};
