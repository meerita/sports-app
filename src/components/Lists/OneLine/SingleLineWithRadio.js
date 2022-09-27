/** @format */

// BASE
import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../../../constants/Colors';
import Styles from '../../../../constants/Styles';
import Caption from '../../../type/Caption';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';

// COMPONENTS
import ListItem from '../ListItem/ListItem';

const SingleLineWithRadio = ({ options = [], onChangeSelect, selected }) => {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <>
      {options.map((option, index) => (
        <ListItem onPress={() => onChangeSelect(option, index)} key={index}>
          <View style={Styles.listSingleCointainer}>
            <Image
              style={{
                ...Styles.listLeadingIcon,
                tintColor:
                  selected === index
                    ? darkMode
                      ? Colors.dark.primary
                      : Colors.light.primary
                    : !darkMode
                    ? Colors.light.OnSurfaceDisabled
                    : Colors.dark.OnSurfaceUnfocused,
              }}
              source={
                selected === index
                  ? require('../../../../assets/images/icons/radio_button_on.png')
                  : require('../../../../assets/images/icons/radio_button_off.png')
              }
            />
            <SubtitleOne
              style={{
                ...Styles.listTitle,
                color:
                  selected === index
                    ? darkMode
                      ? Colors.dark.OnSurfaceActive
                      : Colors.light.OnSurfaceActive
                    : !darkMode
                    ? Colors.light.OnSurfaceDisabled
                    : Colors.dark.OnSurfaceUnfocused,
              }}
            >
              {option.label}
            </SubtitleOne>
            <Caption style={Styles.listCaption}></Caption>
          </View>
        </ListItem>
      ))}
    </>
  );
};

export default SingleLineWithRadio;
