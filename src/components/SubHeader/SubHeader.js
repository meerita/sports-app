/** @format */

// GENERICS
import { View } from 'react-native';
import React from 'react';

// CONSTANTS
import Styles from '../../../constants/Styles';

// COMPONENTS
import Overline from '../../../components/type/Overline';

export default function SubHeader(props) {
  return (
    <View style={{ ...Styles.subHeader, ...props.style }}>
      <Overline>{props.title}</Overline>
    </View>
  );
}
