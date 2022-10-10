/** @format */

// BASE
import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';
import BodyTwo from '../../type/BodyTwo';
import Caption from '../../type/Caption';

// TYPE
import SubtitleOne from '../../type/SubtitleOne';

// COMPONENTS
import ListItem from '../ListItem/ListItem';

const TwoLineWithRadio = ({ options = [], onChangeSelect, selected }) => {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <>
      {options.map((option, index) => (
        <ListItem onPress={() => onChangeSelect(option, index)} key={index}>
          <View style={Styles.listDoubleContainer}>
            <View style={Styles.listDoubleContent}>
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
              <BodyTwo
                style={{
                  color:
                    selected === index
                      ? darkMode
                        ? Colors.dark.OnBackgroundUnfocused
                        : Colors.light.OnBackgroundUnfocused
                      : !darkMode
                      ? Colors.light.OnSurfaceDisabled
                      : Colors.dark.OnSurfaceUnfocused,
                }}
              >
                {option.description}
              </BodyTwo>
            </View>
            <View style={Styles.listSwitchView}>
              <Image
                style={{
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
                    ? require('../../../assets/images/icons/radio_button_on.png')
                    : require('../../../assets/images/icons/radio_button_off.png')
                }
              />
            </View>
          </View>
        </ListItem>
      ))}
    </>
  );
};

export default TwoLineWithRadio;
