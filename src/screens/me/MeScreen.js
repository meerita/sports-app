/** @format */
import { View, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../services/i18n';
import convert from 'convert-units';
import moment from 'moment';

// COMPONENTS
import BodyOne from '../../components/type/BodyOne';
import SingleLineWithCaption from '../../components/Lists/OneLine/SingleLineWithCaption';
import Spacer from '../../components/Spacer/Spacer';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function MeScreen(props) {
  const me = useSelector(state => state.me.myData);

  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );

  const characteristics = useSelector(state => state.me.myData.characteristics);

  return (
    <ScrollViewLayout style={{ paddingTop: 0 }}>
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
          `settings:profile.basicInformation.${characteristics.gender}`
        )}
        onPress={() =>
          props.navigation.navigate('BasicInformationGenderScreen')
        }
      />
      <SingleLineWithCaption
        title={t('common:weight.weight')}
        caption={
          preferences.weights === 'imperial'
            ? t('common:weight.lb', {
                weight: convert(characteristics.weight)
                  .from('kg')
                  .to('lb')
                  .toFixed(0),
              })
            : t('common:weight.kg', {
                weight: characteristics.weight.toFixed(0),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationWeightSelectorScreen')
        }
      />
      <SingleLineWithCaption
        title={t('common:height.height')}
        caption={
          preferences.dimensions === 'imperial'
            ? t('common:height.ft-us', {
                ft: convert(characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(0),
                in: convert(characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(1)
                  .slice(2),
              })
            : t('common:height.m', {
                height: convert(characteristics.height)
                  .from('cm')
                  .to('m')
                  .toFixed(2),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationHeightSelectorScreen')
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
      <Spacer height='16' />
    </ScrollViewLayout>
  );
}
