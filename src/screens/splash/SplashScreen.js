import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]} >
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/splash.png')} style={styles.image}>
          <Text style={styles.text}>TodoTechCret</Text>
        </ImageBackground>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold"
  }
});
