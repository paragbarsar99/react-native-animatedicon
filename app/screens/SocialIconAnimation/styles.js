import {StyleSheet} from 'react-native';
import {
  FONT_BOLD,
  FONT_FAMILY_MEDIUM,
  _WHITE,
} from '../../styles/FontsandColors';

const MAX_DISTANCE = 200;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _WHITE,
  },
  mainContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 130,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '100%', height: '100%'},
  welcomeContainer: {marginTop: 20, paddingHorizontal: 20, flex: 1},
  welcomeContainerHeaderTxt: {
    alignSelf: 'center',
    fontFamily: FONT_BOLD,
    fontSize: 20,
    color: 'rgb(35, 38, 39)',
    marginBottom: 10,
  },
  welcomeRowContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  welcomeContainerSubHeaderTxt: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 18,
    color: 'rgb(35, 38, 39)',
  },
  welcomeContainerDotSeperator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgb(35,38,39)',
  },
  welcomeTxt: {
    alignSelf: 'center',
    color: 'rgb(35,38,39)',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 14,
  },
  socialIconContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconMainContainer: {
    width: MAX_DISTANCE,
    marginTop: 20,
    height: MAX_DISTANCE,
  },
  socialIcon: {
    padding: 5,
    position: 'absolute',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  signbtnContainer: {
    backgroundColor: 'rgb(35, 38, 39)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  signinBtnTxt: {
    fontFamily: FONT_FAMILY_MEDIUM,
    color: _WHITE,
    fontSize: 13,
  },
});
