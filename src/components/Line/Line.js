/** @format */

import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

export default function Line(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <View
      {...props}
      height={1}
      style={{
        ...props.style,
        backgroundColor: darkMode
          ? Colors.dark.OnBackgroundDisabled
          : Colors.light.OnBackgroundDisabled,
      }}
    ></View>
  );
}
