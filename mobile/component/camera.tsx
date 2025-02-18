import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CameraComponentProps {
  onBack: () => void;
}

export default function CameraComponent({ onBack }: CameraComponentProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>

        {/* Bouton Back en haut à droite */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { 
    width: 300,    // Exemple de largeur (ajuste selon besoin)
    height: 300,     // Hauteur spécifique
   },
  button: { alignSelf: 'flex-end', alignItems: 'center', padding: 10 },
  backButton: { 
    position: 'absolute',  // Positionnement absolu pour le placer où tu veux
    top: 40,               // Décalage depuis le haut
    right: 20,             // Décalage depuis la droite
    padding: 10,           // Espacement autour du bouton
    zIndex: 1,             // S'assurer que le bouton est au-dessus de la caméra
  },
  text: { fontSize: 18, color: 'white' },
});