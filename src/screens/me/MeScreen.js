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
import { t } from '../../services/i18n';
import convert from 'convert-units';
import moment from 'moment';

// COMPONENTS
import BodyOne from '../../components/type/BodyOne';
import SingleLineWithCaption from '../../components/Lists/OneLine/SingleLineWithCaption';
import Spacer from '../../components/Spacer/Spacer';

// STORE
import { authActions } from '../../store/slices/auth';

export default function MeScreen(props) {
  const me = useSelector(state => state.me.myData);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ScrollView>
      <View style={{ width: '100%', height: Dimensions.get('window').width }}>
        <Image
          source={{ uri: me.avatar }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <BodyOne style={{ padding: 16 }}>{me.description}</BodyOne>
      <SingleLineWithCaption title='Nombre de usuario' caption={me.username} />
      <SingleLineWithCaption
        title='Usuario número'
        caption={'#' + me.userNumber}
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.localization')}
        caption={t('settings:profile.basicInformation.countryProvince', {
          country: 'España',
          province: 'Barcelona',
        })}
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.gender')}
        caption={t(
          `settings:profile.basicInformation.${me.characteristics.gender}`
        )}
        onPress={() =>
          props.navigation.navigate('BasicInformationGenderScreen')
        }
      />
      <SingleLineWithCaption
        title={t('common:weight.weight')}
        caption={
          me.settings.preferences.weights === 'imperial'
            ? t('common:weight.lb', {
                weight: convert(me.characteristics.weight)
                  .from('kg')
                  .to('lb')
                  .toFixed(0),
              })
            : t('common:weight.kg', {
                weight: me.characteristics.weight.toFixed(0),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationWeightSelectorScreen')
        }
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.visibility.visibility')}
        caption={t(
          `settings:profile.basicInformation.visibility.${
            me.settings.privacy.pro.invisible === false ? 'true' : 'false'
          }`
        )}
      />
      <SingleLineWithCaption
        title='Miembro desde'
        caption={moment(me.createdAt).startOf('day').fromNow()}
      />
      <SingleLineWithCaption
        title='Verificado'
        caption={me.verified ? 'Verified' : 'Unverified'}
      />
      <SingleLineWithCaption
        title='Suscriptor'
        caption={me.isSuscriber ? 'Yes' : 'No'}
      />
      {me.isAdmin && <SingleLineWithCaption title='Admin' caption='Yes' />}
      <Button title='logout' onPress={() => logoutHandler()} />
      <Spacer height='16' />
    </ScrollView>
  );
}
