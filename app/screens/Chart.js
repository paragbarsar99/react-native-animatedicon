import React from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {DebugInstructions} from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('window');
/*
 * So we need to find the total sales value done in every month from TotalTarget take big picture
 */

const data = [
  {Month: 'jan', income: 30},
  {Month: 'feb', income: 100},
  {Month: 'mar', income: 0},
  {Month: 'apr', income: 50},
  {Month: 'may', income: 40},
  {Month: 'jun', income: 20},
  {Month: 'jul', income: 80},
  {Month: 'aug', income: 90},
];
const TARGET_VALUE = 100;
const PRIMARY_COLOR = '#DE649D';
const PRIMARY_COLOR_LIGHT = '#DE649D1A';
const CONTAINER_WIDTH = width * 0.9;

function LineChart({...props}) {
  return (
    <Svg width={'100%'} height={'100%'} style={{borderWidth: 0}}>
      <Line
        x1={'50%'}
        y1={'0%'}
        x2={'50%'}
        y2={'90%'}
        strokeWidth={10}
        stroke={PRIMARY_COLOR_LIGHT}
        strokeLinecap={'round'}
      />
      <Line
        strokeWidth={10}
        x1={'50%'}
        y1={'0%'}
        x2={'50%'}
        y2={'80%'}
        // strokeDasharray={'100%'}
        // strokeDashoffset={'20%'}
        stroke={PRIMARY_COLOR}
        strokeLinecap={'round'}
      />
    </Svg>
  );
}

const Chart = ({TARGET_VALUE}) => {
  //   useMemo(() => {}, [TARGET_VALUE, data]);

  return (
    <View style={styles.container}>
      <View style={[styles.mainContainer, {width: CONTAINER_WIDTH}]}>
        {data.map((item, index) => {
          return (
            <View
              key={item.Month}
              style={{
                width: CONTAINER_WIDTH / data.length,
                borderWidth: 0,
              }}>
              <LineChart style={{alignSelf: 'center'}} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    borderRadius: 15,
    height: 200,
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'row',
  },
});
