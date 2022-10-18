/** @format */

import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default StyleSheet.create({
  // buttons
  button: {
    borderRadius: 3,
    padding: 4,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    flexGrow: 1,
    textAlign: 'center',
  },
  // general
  borderdp: { borderColor: 'red', borderWidth: 1 },
  body: {
    backgroundColor: Colors.light.background,
  },
  bodyPadded: {
    padding: 16,
  },
  // Forms
  formPadded: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  formInput: {
    // paddingTop: 8,
    // paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 4,
  },
  formInputContent: {
    fontSize: 18,
    fontFamily: 'Barlow-Regular',
  },
  formInputHover: {
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 4,
    paddingHorizontal: 8,
    // paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.surface,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.41,
    elevation: 4,
  },
  formInputError: {
    borderColor: '#f00',
    borderWidth: 2,
    marginBottom: 4,
    paddingHorizontal: 8,
    // paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.surface,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.41,
    elevation: 4,
  },
  // lists styles
  // single line lists
  listSingleCointainer: {
    minHeight: 48,
    paddingHorizontal: 16,
    // paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#ff0000',
  },
  // double line lists
  listDoubleContainer: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listDoubleContent: {
    flexShrink: 5,
    flexGrow: 5,
    marginRight: 16,
  },
  // generics for lists
  listCaption: {
    flexGrow: 2,
    textAlign: 'right',
  },
  listLeadingIcon: {
    width: 24,
    height: 24,
    marginRight: 32,
    flexGrow: 0,
  },
  listImageContainer: {
    width: 40,
    height: 40,
    marginRight: 32,
    flexGrow: 0,
    borderRadius: 2,
    overflow: 'hidden',
  },
  listAvatarContainer: {
    width: 40,
    height: 40,
    marginRight: 32,
    flexGrow: 0,
    borderRadius: 512,
    overflow: 'hidden',
  },
  listAvatar: {
    width: '100%',
    height: '100%',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  listSwitchView: {
    flexGrow: 0,
    // borderWidth: 1,
    // borderColor: '#ff0000',
    // alignContent: 'flex-end',
  },
  listActionView: {
    flexGrow: 0,
  },
  listAction: {
    tintColor: Colors.light.OnSurfaceActive,
  },
  switchControl: {
    backgroundColor: 'transparent',
  },
  // CARDS
  cards: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  // HEADERS
  subHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  // TYPE SYSTEM
  caption: {
    fontFamily: 'Barlow-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 16,
  },
  bodyOne: {
    fontFamily: 'Barlow-Regular',
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 20,
    color: Colors.light.OnBackgroundUnfocused,
  },
  bodyTwo: {
    fontFamily: 'Barlow-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
  },
  overLine: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  subtitleOne: {
    fontFamily: 'Barlow-Medium',
    fontSize: Platform.OS === 'android' ? 16 : 18,
    letterSpacing: -0.25,
    lineHeight: 20,
  },
});
