import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {View, Animated, Image, Text, StyleSheet} from 'react-native';
import {
  Fb,
  Insta,
  Internet,
  LinkedIn,
  snapchat,
  twitter,
} from '../constants/IconConstant';
import {WINDOW_WIDTH} from '../styles/Dimensions';
import {
  FONT_BOLD,
  FONT_FAMILY_MEDIUM,
  _BLACK,
  _WHITE,
} from '../styles/FontsandColors';

const PRODUCT_IMAGE = 'https://myda.co.in/myda_logo_black.png';
const MAX_DISTANCE = 250;

const imgaeChain = [
  {
    source: Insta,
    color: '#8a3ab9',
  },
  {
    source: Fb,
    color: '#3b5998',
  },
  {
    source: LinkedIn,
    color: '#0072b1',
  },
  {
    source: snapchat,
    color: '#FFFC00',
  },
  {
    source: twitter,
    color: '#00acee',
  },
  {
    source: Internet,
    color: '#000',
  },
];

const Icon = ({item, index, MaxDistance}) => {
  const DJFloor = useRef(new Animated.Value(0)).current;
  const CURRENT_POSITION = index * (MaxDistance / imgaeChain.length);
  const PeaceOfCake = MaxDistance / imgaeChain.length;
  const WALK_TIME = 350;
  const SPOT_LIGHT_TIME = 500;
  const fromEnd = imgaeChain.length; //see this again
  const INITIAL_WALKTIME = index * WALK_TIME;
  const REVERSE_INDEX_DURATION = (fromEnd - index) * WALK_TIME;
  const MIDDLE_POINT_X = (MaxDistance - PeaceOfCake) / 2;
  const MIDDLE_POINT_X_TOEND =
    (MaxDistance - PeaceOfCake) / 2 + (MaxDistance - PeaceOfCake) / 2;
  const MIDDLE_POINT_Y = MaxDistance / 2;
  const delay = fromEnd * 30;
  const TrainValue = useRef(
    new Animated.ValueXY({x: CURRENT_POSITION, y: 0}),
  ).current;
  const SpotLight = useRef(new Animated.Value(1)).current;
  const scale = DJFloor.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
    extrapolate: 'clamp',
  });

  const LoopAnimation_OtherPostion = useRef(
    Animated.loop(
      // Animated.delay(500),
      Animated.sequence([
        Animated.timing(TrainValue, {
          toValue: {x: 0, y: 0},
          // delay: index * 1000, //Do We Need This Dely
          duration: CURRENT_POSITION === 0 ? -1 : INITIAL_WALKTIME,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(DJFloor, {
            toValue: 1,
            duration: SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(TrainValue, {
            toValue: {
              x: MIDDLE_POINT_X, //see This Again
              // x: -CURRENT_POSITION + CURRENT_POSITION + 100,
              y: MIDDLE_POINT_Y,
            },
            // delay: 1000,
            duration: SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(SpotLight, {
            toValue: 2.2,
            duration: SPOT_LIGHT_TIME,
            // delay: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(DJFloor, {
            toValue: 0,
            duration: SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(TrainValue, {
            toValue: {
              x: MIDDLE_POINT_X_TOEND,
              y: 0,
            },
            // delay: 1000,
            duration: CURRENT_POSITION == 0 ? SPOT_LIGHT_TIME : SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(SpotLight, {
            toValue: 1,
            duration: SPOT_LIGHT_TIME,
            // delay: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(TrainValue, {
          toValue: {
            // x: 0, //Catch is here
            x: CURRENT_POSITION, //Catch is here
            y: 0,
          },
          // delay: index === 0 ? 3000 : 0,
          duration: REVERSE_INDEX_DURATION,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    ),
  );

  useEffect(() => {
    LoopAnimation_OtherPostion.current.start();
  }, []);

  return (
    <View>
      <Animated.View
        key={index.toString()}
        style={[
          styles.socialIcon,
          {
            width: PeaceOfCake,
            // borderWidth: 1,
            transform: [
              {
                translateX: TrainValue.x,
              },
              {
                translateY: TrainValue.y,
              },
              {
                scale: SpotLight,
              },
            ],
          },
        ]}>
        <Image
          key={index.toString()}
          resizeMode="center"
          style={[
            {
              width: '100%',
              height: '100%',
            },
          ]}
          source={item.source}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: MaxDistance / 3,
          backgroundColor: item.color,
          width: MaxDistance,
          height: MaxDistance,
          borderRadius: MaxDistance / 2,
          alignSelf: 'center',
          transform: [
            {
              rotateX: '-80deg',
            },
            {
              perspective: 800,
            },
            {
              scale,
            },
          ],
        }}></Animated.View>
    </View>
  );
};

const SocialIcon = () => {
  const NUMEROFICON = imgaeChain.length;
  const ICONWIDTH = 30;
  console.log(WINDOW_WIDTH);
  console.log(ICONWIDTH * NUMEROFICON);
  // const HOWMUCH_IMAGE_TAKES =
  const SINGLE_ITME_VALUE = WINDOW_WIDTH / (ICONWIDTH * NUMEROFICON);
  const MAX_DISTANCE_1 = SINGLE_ITME_VALUE * NUMEROFICON;

  console.log(WINDOW_WIDTH / 5);
  console.log((WINDOW_WIDTH / 5) * 5);
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={{
              uri: PRODUCT_IMAGE,
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeContainerHeaderTxt}>My Digital Asset</Text>
          <View style={styles.welcomeRowContainer}>
            <Text style={styles.welcomeContainerSubHeaderTxt}>Easy</Text>
            <View style={styles.welcomeContainerDotSeperator}></View>
            <Text style={styles.welcomeContainerSubHeaderTxt}>Quick</Text>
            <View style={styles.welcomeContainerDotSeperator}></View>
            <Text style={styles.welcomeContainerSubHeaderTxt}>Convenient</Text>
          </View>
          <Text style={styles.welcomeTxt}>Welcome to MyDA</Text>
        </View>
      </View>
      <View style={styles.socialIconContainer}>
        <View style={styles.socialIconMainContainer}>
          {imgaeChain.map((item, index) => (
            <Icon
              item={item}
              MaxDistance={MAX_DISTANCE}
              index={index}
              key={index}
            />
          ))}
        </View>
      </View>
      <View style={styles.authContainer}>
        <View style={styles.signbtnContainer}>
          <Text style={styles.signinBtnTxt}>Sign in Here</Text>
        </View>
        <View style={styles.signbtnContainer}>
          <Text style={styles.signinBtnTxt}>Set up your MyDA</Text>
        </View>
        <View style={styles.signbtnContainer}>
          <Text style={styles.signinBtnTxt}>Get your MyDA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _WHITE,
  },
  mainContainer: {
    flex: 1,
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
  welcomeContainer: {marginTop: 20, paddingHorizontal: 20},
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
  },
  socialIconMainContainer: {
    width: MAX_DISTANCE,
    marginTop: 20,
  },
  socialIcon: {
    padding: 5,
    position: 'absolute',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    paddingBottom: 20,
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

export default SocialIcon;
