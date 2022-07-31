import React, {useRef, useEffect} from 'react';
import {Animated, View, Image, Easing} from 'react-native';

import styles from './styles';

const TimingIcon = ({item, index, MaxDistance, images}) => {
  const DJFloor = useRef(new Animated.Value(0)).current;
  const CURRENT_POSITION = index * (MaxDistance / images.length);
  const PeaceOfCake = MaxDistance / images.length;
  const WALK_TIME = 500;
  const SPOT_LIGHT_TIME = 500;
  const fromEnd = images.length; //see this again
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
          easing: Easing.linear,
          // delay: CURRENT_POSITION === 0 ? 10 : 0, //Do We Need This Dely
          duration: CURRENT_POSITION === 0 ? 0 : INITIAL_WALKTIME,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(DJFloor, {
            toValue: 1,
            easing: Easing.linear,
            duration: SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(TrainValue, {
            toValue: {
              x: MIDDLE_POINT_X, //see This Again
              easing: Easing.linear,
              // x: -CURRENT_POSITION + CURRENT_POSITION + 100,
              y: MIDDLE_POINT_Y,
            },
            // delay: 1000,
            duration: SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(SpotLight, {
            toValue: 2.2,
            easing: Easing.linear,
            duration: SPOT_LIGHT_TIME,
            // delay: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(DJFloor, {
            toValue: 0,
            easing: Easing.linear,
            duration: SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(TrainValue, {
            toValue: {
              x: MIDDLE_POINT_X_TOEND,
              y: 0,
            },
            easing: Easing.linear,
            // delay: 1000,
            duration: CURRENT_POSITION == 0 ? SPOT_LIGHT_TIME : SPOT_LIGHT_TIME,
            useNativeDriver: true,
          }),
          Animated.timing(SpotLight, {
            toValue: 1,
            duration: SPOT_LIGHT_TIME,
            easing: Easing.linear,
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
          easing: Easing.linear,
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

export default TimingIcon;
