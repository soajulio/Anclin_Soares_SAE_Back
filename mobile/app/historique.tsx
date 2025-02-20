import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import CameraComponent from '../component/camera';
import Footer from '../component/footer'; 

export default function App() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <View style={styles.container}>
        <Button title="Test" onPress={() => setShowCamera(true)} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});


