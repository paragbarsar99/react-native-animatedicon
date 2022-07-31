import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated, Image} from 'react-native';
import {WINDOW_WIDTH} from '../../styles/Dimensions';

// const imageChain = [
//   {
//     source: Insta,
//     color: '#8a3ab9',
//   },
// ];

const WithSpring = ({maxDistance, item, index, imageChain}) => {
  const NUMEROFICON = imageChain.length;
  const ICONWIDTH = 30;
  const SINGLE_ITME_VALUE = WINDOW_WIDTH / (ICONWIDTH * NUMEROFICON);
  const DJFloor = useRef(new Animated.Value(0)).current;
  const CURRENT_POSITION = index * (maxDistance / imageChain.length);
  const PeaceOfCake = maxDistance / imageChain.length;
  const WALK_TIME = 500;
  const SPOT_LIGHT_TIME = 500;
  const fromEnd = imageChain.length; //see this again
  const INITIAL_WALKTIME = index * WALK_TIME;
  const REVERSE_INDEX_DURATION = (fromEnd - index) * WALK_TIME;
  const MIDDLE_POINT_X = (maxDistance - PeaceOfCake) / 2;
  const MIDDLE_POINT_X_TOEND =
    (maxDistance - PeaceOfCake) / 2 + (maxDistance - PeaceOfCake) / 2;
  const MIDDLE_POINT_Y = maxDistance / 2;
  const delay = fromEnd * 30;
  const TrainValue = useRef(
    new Animated.ValueXY({x: CURRENT_POSITION, y: 0}),
  ).current;
  const SpotLight = useRef(new Animated.Value(1)).current;

  const scale = SpotLight.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const startAnimation = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.spring(TrainValue, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }),
        Animated.spring(TrainValue, {
          toValue: {x: MIDDLE_POINT_X, y: MIDDLE_POINT_Y},
          useNativeDriver: true,
        }),
        Animated.spring(TrainValue, {
          toValue: {x: MIDDLE_POINT_X_TOEND, y: 0},
          useNativeDriver: true,
        }),
        Animated.spring(TrainValue, {
          toValue: {x: CURRENT_POSITION, y: 0},
          useNativeDriver: true,
        }),
      ]),
    ),
  );

  useEffect(() => {
    startAnimation.current.start();
  }, []);

  return (
    <View>
      <Animated.View
        key={index.toString()}
        style={[
          styles.socialIcon,
          {
            width: PeaceOfCake,
            transform: TrainValue.getTranslateTransform(),
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
          zIndex: index * imageChain.length,
          position: 'absolute',
          top: maxDistance / 3,
          borderWidth: 5,
          borderColor: item.color,
          backgroundColor: item.color,
          width: maxDistance,
          height: maxDistance,
          borderRadius: maxDistance / 2,
          alignSelf: 'center',
          transform: [
            {
              rotateX: '80deg',
            },
            {
              scale,
            },
            {
              perspective: 800,
            },
          ],
        }}></Animated.View>
    </View>
  );
};

export default WithSpring;

const styles = StyleSheet.create({
  socialIcon: {
    padding: 5,
    position: 'absolute',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
