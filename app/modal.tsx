import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import axios from 'axios';
import Checklist from '@/components/Checklist';
import EditScreenInfo from '@/components/RecipesScreen';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';



const ModalScreen: React.FC = () => {

  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    fetchIngredients()
  }, [])

  async function fetchIngredients() {
    try {
      await axios.get('http://192.168.0.50:5003/Siri/GetCurrentIngredients').then(response => {
        setIngredients(response.data)
       
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
      // Process the response data or update your application state
  } catch (error) {
      // If an error occurred during the request, handle the error
     
      // Optionally, you can throw the error to be handled by the caller
      throw error;
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Checklist ingredients={ingredients}></Checklist>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
export default ModalScreen;
