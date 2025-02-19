import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Footer from '../component/footer';

const Connexion: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setAlertMessage('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setAlertMessage('');

    try {
      const response = await axios.post('http://192.168.x.x:5000/check_credentials', { // Remplace par l'IP de ton PC
        username: username,
        password: password,
      });

      if (response.status === 200) {
        setAlertMessage('Connexion réussie !');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setAlertMessage("Nom d'utilisateur ou mot de passe incorrect");
        } else {
          setAlertMessage('Erreur lors de la connexion. Veuillez réessayer.');
        }
      } else {
        setAlertMessage('Erreur inattendue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
          accessible
          accessibilityLabel="Nom d'utilisateur"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessible
          accessibilityLabel="Mot de passe"
        />
        <Button title="Se connecter" onPress={handleLogin} disabled={loading} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      {alertMessage ? <Text style={styles.alertText}>{alertMessage}</Text> : null}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  alertText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Connexion;
