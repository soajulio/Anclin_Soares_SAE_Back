import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <FontAwesome name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/')}>
        <FontAwesome name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/connexion')}>
        <FontAwesome name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
  },
});

export default Footer;
