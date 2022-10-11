/** @format */

import { ScrollView } from 'react-native';
import { t } from '../../../../services/i18n';
import React from 'react';
import { useSelector } from 'react-redux';
import convert from 'convert-units';

// COMPONENTS
import BodyTwo from '../../../../components/type/BodyTwo';
import SingleLineWithIcon from '../../../../components/Lists/OneLine/SingleLineWithIcon';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

// CONSTANTS
import Styles from '../../../../constants/Styles';
import Colors from '../../../../constants/Colors';

export default function BasicInformationWeightHeightScreen(props) {
  // My Data
  const me = useSelector(state => state.me.myData);

  // preferences
  const preferences = useSelector(
    state => state.me.myData.settings.preferences
  );

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {t('settings:profile.basicInformation.weightHeightInfo')}
      </BodyTwo>
      <SingleLineWithIcon
        icon={require('../../../../assets/images/icons/weight.png')}
        title={t('common:weight.weight')}
        caption={
          preferences.weights === 'imperial'
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
      <SingleLineWithIcon
        icon={require('../../../../assets/images/icons/straighten.png')}
        title={t('common:height.height')}
        caption={
          preferences.dimensions === 'imperial'
            ? t('common:height.ft-us', {
                ft: convert(me.characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(0),
                in: convert(me.characteristics.height)
                  .from('cm')
                  .to('ft-us')
                  .toFixed(1)
                  .slice(2),
              })
            : t('common:height.m', {
                height: convert(me.characteristics.height)
                  .from('cm')
                  .to('m')
                  .toFixed(2),
              })
        }
        onPress={() =>
          props.navigation.navigate('BasicInformationHeightSelectorScreen')
        }
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:profile.basicInformation.weightHeight'),
    presentation: 'modal',
  };
};
