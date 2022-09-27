/** @format */

import { View } from 'react-native';
import Colors from '../../../constants/Colors';

export default function Line(props) {
  return (
    <View
      {...props}
      height={1}
      style={{ backgroundColor: Colors.OnBackgroundUnfocused }}
    ></View>
  );
}
