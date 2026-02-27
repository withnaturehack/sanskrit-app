import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export const OpeningAnimation = (): JSX.Element => {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp)
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true
        })
      ]),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, [logoOpacity, logoScale, subtitleOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.glow} />
      <Animated.Text style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>🕉️</Animated.Text>
      <Animated.Text style={[styles.title, { opacity: logoOpacity }]}>Vedamitra</Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>Chant. Reflect. Evolve.</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    justifyContent: 'center',
    alignItems: 'center'
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#F59E0B22'
  },
  logo: {
    fontSize: 82,
    marginBottom: 10
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#CBD5E1',
    marginTop: 10,
    fontSize: 15
  }
});
