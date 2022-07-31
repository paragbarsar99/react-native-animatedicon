import {View, StyleSheet, Image, Button} from 'react-native';
import React from 'react';
import Animated, {
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  Easing,
  useAnimatedSensor,
} from 'react-native-reanimated';

const ReanimatedSocialIcon = ({item, index, MaxDistance, images}) => {
  const DJFloor = useSharedValue(0);
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

  const TrainValue_1 = useSharedValue(CURRENT_POSITION);
  const TrainValue_2 = useSharedValue(0);
  const SpotLight = useSharedValue(1);

  const Scaling = useAnimatedStyle(() => {
    const scale = interpolate(DJFloor.value, [0, 1], [0, 0.8], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      // backgroundColor: backgroundColor,
      transform: [
        {
          scale: scale,
        },
        {
          rotateX: `-80deg`,
        },
        {
          perspective: 800,
        },
      ],
    };
  }, []);

  const config = {
    duration: SPOT_LIGHT_TIME,
    easing: Easing.linear,
  };

  withRepeat(
    withSequence(withTiming(SpotLight.value, config), withTiming(0, config)),
    10,
    false,
    (finished, current) => {
      console.log(finished);
    },
  );

  return (
    <View>
      <Animated.View
        key={index.toString()}
        style={[
          styles.socialIcon,
          {
            transform: [
              {
                translateX: TrainValue_1.value,
              },
              {
                translateY: TrainValue_2.value,
              },
            ],
            width: PeaceOfCake,
            borderWidth: 1,
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
        style={[
          {
            transform: [
              {
                scale: SpotLight.value,
              },
            ],
            position: 'absolute',
            top: MaxDistance / 3,
            backgroundColor: item.color,
            width: MaxDistance,
            height: MaxDistance,
            borderRadius: MaxDistance / 2,
            alignSelf: 'center',
          },
        ]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialIcon: {
    padding: 5,
    position: 'absolute',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ReanimatedSocialIcon;
