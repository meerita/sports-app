/** @format */

import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// COMPONENTS
import Overline from '../../type/Overline';
import Caption from '../../type/Caption';

export default function Input(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // states for hovers
  const [hover, setHover] = useState(false);

  const activateHover = event => {
    setHover(event);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: darkMode
            ? Colors.dark.surface
            : Colors.light.surface,
          paddingTop: props.error ? 5 : hover ? 7 : 8,
          paddingHorizontal: props.error ? 7 : hover ? 7 : 8,
          paddingBottom: props.error ? 8 : hover ? 9 : 10,
          borderWidth: props.error ? 1 : hover ? 1 : 0,
          borderColor: props.error
            ? darkMode
              ? Colors.dark.error
              : Colors.light.error
            : hover
            ? darkMode
              ? Colors.dark.OnSurfaceDisabled
              : Colors.light.OnSurfaceDisabled
            : darkMode
            ? false
            : false,
          borderRadius: props.error ? 4 : hover ? 4 : 0,
          marginBottom: 4,
          marginHorizontal: 0,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.41,
          elevation: 4,
          shadowColor: hover
            ? darkMode
              ? Colors.dark.black
              : Colors.light.OnBackgroundActive
            : darkMode
            ? Colors.dark.surface
            : Colors.light.surface,
        }}
      >
        <Overline
          style={{
            marginBottom: 4,
            color: props.error
              ? darkMode
                ? Colors.dark.error
                : Colors.light.error
              : hover
              ? darkMode
                ? Colors.dark.OnSurfaceActive
                : Colors.light.OnSurfaceActive
              : darkMode
              ? Colors.dark.OnSurfaceUnfocused
              : Colors.light.OnSurfaceUnfocused,
          }}
        >
          {props.name}
        </Overline>
        <TextInput
          {...props}
          color={
            props.error
              ? darkMode
                ? Colors.dark.error
                : Colors.light.error
              : darkMode
              ? Colors.dark.OnSurfaceActive
              : Colors.light.OnSurfaceActive
          }
          placeholder={props.placeholder}
          placeholderTextColor={
            darkMode
              ? Colors.dark.OnSurfaceDisabled
              : Colors.light.OnSurfaceDisabled
          }
          autoCapitalize='none'
          style={{ ...Styles.formInputContent, ...props.style }}
          onFocus={() => activateHover(true)}
          onBlur={() => activateHover(false)}
        />
      </View>
      {props.helper && (
        <View
          style={{ paddingTop: 0, paddingHorizontal: 10, paddingBottom: 8 }}
        >
          <Caption
            style={{
              color: props.error
                ? darkMode
                  ? Colors.dark.error
                  : Colors.light.error
                : darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          >
            {props.helper}
          </Caption>
        </View>
      )}
    </>
  );
}
