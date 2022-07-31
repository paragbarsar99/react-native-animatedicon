import React, {useRef} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {
  Fb,
  Insta,
  Internet,
  LinkedIn,
  snapchat,
  twitter,
} from '../../constants/IconConstant';
import {WINDOW_WIDTH} from '../../styles/Dimensions';
import {
  FONT_BOLD,
  FONT_FAMILY_MEDIUM,
  _BLACK,
  _WHITE,
} from '../../styles/FontsandColors';
import ReanimatedSocialIcon from './ReanimatedSocialIcon';
import styles from './styles';
import TimingIcon from './TimingIcon';
const PRODUCT_IMAGE = 'https://myda.co.in/myda_logo_black.png';
const MAX_DISTANCE = 200;

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

const SocialIcon = () => {
  const NUMEROFICON = imgaeChain.length;
  const ICONWIDTH = 30;
  const SINGLE_ITME_VALUE = WINDOW_WIDTH / (ICONWIDTH * NUMEROFICON);
  const MAX_DISTANCE_1 = SINGLE_ITME_VALUE * NUMEROFICON;

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.mainContainer]}>
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
              <Text style={styles.welcomeContainerHeaderTxt}>
                My Digital Asset
              </Text>
              <View style={styles.welcomeRowContainer}>
                <Text style={styles.welcomeContainerSubHeaderTxt}>Easy</Text>
                <View style={styles.welcomeContainerDotSeperator}></View>
                <Text style={styles.welcomeContainerSubHeaderTxt}>Quick</Text>
                <View style={styles.welcomeContainerDotSeperator}></View>
                <Text style={styles.welcomeContainerSubHeaderTxt}>
                  Convenient
                </Text>
              </View>
              <Text style={styles.welcomeTxt}>Welcome to MyDA</Text>
            </View>
          </View>
          <View style={styles.socialIconContainer}>
            <View style={styles.socialIconMainContainer}>
              {imgaeChain.map((item, index, array) => (
                <TimingIcon
                  item={item}
                  MaxDistance={MAX_DISTANCE}
                  index={index}
                  key={index}
                  images={imgaeChain}
                />
              ))}
            </View>
          </View>
          <View style={[styles.authContainer]}>
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
        </ScrollView>
      </View>
    </View>
  );
};

export default SocialIcon;
