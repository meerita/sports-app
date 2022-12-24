/** @format */
import { t } from '../../services/i18n';
import { useSelector } from 'react-redux';
import { View, Image, Dimensions } from 'react-native';
import convert from 'convert-units';
import moment from 'moment';
import React from 'react';

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
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.userName')}
        caption={me.username}
        onPress={() =>
          props.navigation.navigate('BasicInformationUsernameScreen')
        }
      />
      <SingleLineWithCaption
        title={t('settings:profile.basicInformation.tag')}
        caption={me.tag}
        onPress={() => props.navigation.navigate('BasicInformationTagScreen')}
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
            me.settings.privacy.pro.invisible ? 'true' : 'false'
          }`
        )}
        onPress={() => props.navigation.navigate('SettingsPrivacyScreen')}
      />
      <SingleLineWithCaption
        title={t('profile:memberSince')}
        caption={moment(me.createdAt).startOf('day').fromNow()}
      />
      <SingleLineWithCaption
        title={t('profile:memberNumber')}
        caption={'#' + me.userNumber}
      />
      <SingleLineWithCaption
        title={t('profile:verified.verified')}
        caption={
          me.verified
            ? t('profile:verified.verified')
            : t('profile:verified.unverified')
        }
      />
      <SingleLineWithCaption
        title={t('profile:subscriber.type')}
        caption={
          me.isSubscriber
            ? t('profile:subscriber.pro')
            : t('profile:subscriber.standard')
        }
      />
      {me.isAdmin && (
        <SingleLineWithCaption
          title={t('common:admin')}
          caption={t('common:yes')}
        />
      )}
      <Spacer height='16' />
    </ScrollViewLayout>
  );
}
