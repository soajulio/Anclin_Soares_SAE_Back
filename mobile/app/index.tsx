import React, { useState } from 'react';
import axios from 'axios';
import { View, Button, StyleSheet, Image, Alert, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CameraComponent from '../component/camera';
import Footer from '../component/footer';
import { Linking } from 'react-native';


export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);

      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const base64data = reader.result.toString().split(',')[1];
          setBase64Image(base64data);
          setConversionSuccess(true);
          Alert.alert('Conversion réussie', "L'image a été convertie en Base64 !");
          //Conversion de l'image en base64 pour envoyer à l'api
          //ensuite reconvertir l'image en binry pour mettre dans la table
        } else {
          console.error('Erreur : reader.result est null');
        }
      };

      reader.readAsDataURL(blob);
    }
  };
 
  

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraComponent onBack={() => setShowCamera(false)} />
      ) : (
        <>
          <Button title="Open Camera" onPress={() => setShowCamera(true)} />
          <Button title="Ouvrir une image" onPress={pickImage} />
        </>
      )}

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      {conversionSuccess && <Text style={styles.successMessage}>Conversion en Base64 réussie !</Text>}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView style={styles.resultContainer}>
        {predictionResult ? (
          <>
            <Text style={styles.resultTitle}>Résultats de l'identification :</Text>
            {predictionResult.suggestions.map((suggestion: any, index: number) => (
              <View key={index} style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>Nom Commun: {suggestion.plant_name}</Text>
                <Text style={styles.suggestionText}>Précision: {Math.round(suggestion.probability * 100)}%</Text>
                {suggestion.plant_details && suggestion.plant_details.url && (
                  <Text
                    style={styles.suggestionLink}
                    onPress={() => Linking.openURL(suggestion.plant_details.url)}
                  >
                    Plus d'infos
                  </Text>
                )}
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noResult}>Aucun résultat pour cette image.</Text>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  image: { width: 200, height: 200, marginTop: 20, borderRadius: 10 },
  successMessage: { marginTop: 20, color: 'green', fontSize: 16 },
  resultContainer: { width: '100%', marginTop: 20, paddingHorizontal: 10 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  suggestionContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  suggestionText: { fontSize: 14, color: '#333' },
  suggestionLink: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  noResult: { color: 'red', textAlign: 'center', marginTop: 20 },
});
