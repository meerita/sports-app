/** @format */

// BASE
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Styles from '../../../../constants/Styles';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';
import Caption from '../../../type/Caption';
import ListItem from '../ListItem/ListItem';
import Colors from '../../../../constants/Colors';

export default function SingleLineWithIcon(props) {
  // darkMode ?
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ListItem onPress={props.onPress}>
      <View style={Styles.listSingleCointainer}>
        <Image
          style={{
            ...Styles.listLeadingIcon,
            tintColor: darkMode
              ? Colors.dark.OnSurfaceUnfocused
              : Colors.light.OnSurfaceUnfocused,
          }}
          source={props.icon}
        />
        <SubtitleOne>{props.title}</SubtitleOne>
        <Caption style={Styles.listCaption}>{props.caption}</Caption>
      </View>
    </ListItem>
  );
}
