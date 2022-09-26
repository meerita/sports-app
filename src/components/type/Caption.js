/** @format */

// GENERICS
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

// CONSTANTS
import Styles from '../../constants/Styles';

export default function Caption(props) {
  // darkMode ?
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Text
      style={{
        ...Styles.caption,
        color: darkMode
          ? Colors.dark.OnSurfaceUnfocused
          : Colors.light.OnSurfaceUnfocused,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
}
