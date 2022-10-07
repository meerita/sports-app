/** @format */

import { View } from 'react-native';
import React, { useEffect } from 'react';
import { t } from '../../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../components/type/BodyTwo';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';

// ACTIONS
import { fetchVisibleSports } from '../../../store/actions/explore';
import { groupActions } from '../../../store/slices/group';

export default function SelectSportScreen(props) {
  // we check all the sports on the state
  const allSports = useSelector(state => state.explore.sports);

  const dispatch = useDispatch();

  // fetch all sports
  useEffect(() => {
    try {
      if (allSports.length === 0) {
        dispatch(fetchVisibleSports());
      }
    } catch (error) {
      console.log(error);
    }
  }, [allSports, selectedSportId]);

  // we check the selected sportId from the reducer
  const selectedSportId = useSelector(
    state => state.group.createNewGroup.sportId
  );

  // function to dispatch an _id from an selected sport,
  const chooseSport = (sportId, sportName) => {
    dispatch(groupActions.addSport({ sportId: sportId, sportName: sportName }));
    props.navigation.navigate('AddGroupInfo');
  };

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {t('groups:create.selectAnSportDesc')}
      </BodyTwo>
      <View style={{ paddingBottom: 64 }}>
        {allSports.map(sport => (
          <SingleLineWithIcon
            key={sport._id}
            icon={{ uri: sport.iconUrl }}
            title={t(`sports:${sport.title}`)}
            onPress={() => chooseSport(sport._id, sport.title)}
            caption={
              sport._id === selectedSportId ? t('common:selected') : false
            }
          />
        ))}
      </View>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:create.selectAnSport'),
  };
};
