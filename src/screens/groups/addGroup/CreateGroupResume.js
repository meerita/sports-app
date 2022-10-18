/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';
import ScrollViewLayout from '../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../components/type/BodyTwo';
import SingleLineWithIcon from '../../../components/Lists/OneLine/SingleLineWithIcon';
import SingleLineWithCaption from '../../../components/Lists/OneLine/SingleLineWithCaption';
import SubHeader from '../../../components/SubHeader/SubHeader';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../../services/i18n';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';

import { createANewGroup } from '../../../store/actions/group';

export default function CreateGroupResume(props) {
  // we initialize Toasts
  const toast = useToast();

  // We select the admin data for the group
  const admin = useSelector(state => state.me.myData);

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // state
  const createGroupInfo = useSelector(state => state.group.createNewGroup);

  const onSubmit = async () => {
    try {
      setLoading(true);
      dispatch(createANewGroup());
    } catch (err) {
      toast.show(err.message);
      setLoading(false);
    }
    props.navigation.popToTop();
  };

  return (
    <ScrollViewLayout style={{ paddingTop: 16 }}>
      <BodyTwo style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        {t('groups:create.form.resumeDesc')}
      </BodyTwo>
      <View style={{ paddingBottom: 16 }}>
        <SingleLineWithCaption
          title={t('common:sport')}
          caption={t(`sports:${createGroupInfo.sportName}`)}
        />
        <SingleLineWithCaption
          title={t('groups:create.form.title.name')}
          caption={createGroupInfo.title}
        />
        <SingleLineWithCaption
          title={t('common:admin')}
          caption={admin.username}
        />
        <SingleLineWithCaption
          title={t('common:localization')}
          caption={createGroupInfo.city}
        />
        <SubHeader title='Descripción' />
        <BodyTwo style={{ paddingHorizontal: 16 }}>
          {createGroupInfo.description}
        </BodyTwo>
      </View>

      <ButtonFilled
        loading={loading ? true : false}
        style={{ marginHorizontal: 8, marginBottom: 32, marginTop: 4 }}
        onPress={() => onSubmit()}
      >
        {loading
          ? t('loaders:changing')
          : t('groups:create.form.createNewGroup')}
      </ButtonFilled>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:create.form.resume'),
  };
};
