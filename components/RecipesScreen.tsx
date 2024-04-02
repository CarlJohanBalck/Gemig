import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { StyleSheet, FlatList, RefreshControl, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Card from './Card'

import { View } from './Themed';

export interface Recipe {
  id: number;
  name: string;
  url: string[];
  helg: string;
  price: number,
  image: string
}

export default function RecipesScreen({ path }: { path: string }) {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [marked, setMarked] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    console.log("REFRESHING-----")
}
  useEffect(() => {
    fetchRecipes()
  }, [])
  const addToList = (recipe: Recipe) => {
    setMarked(prevRecipeList => [...prevRecipeList, recipe]);
    console.log("ADDED TO LIST", marked)
  }
  const confirmSelection = () => {
    console.log("CONFIRMATION COMPLETE----", marked[0])
  }

  async function fetchRecipes() {
    try {
      await axios.get('http://192.168.0.50:5002/Siri/Recipes').then(response => {
        const mappedRecipes: Recipe[] = response.data.map((recipeData: any) => ({
          id: recipeData[0],
          name: recipeData[1],
          url: recipeData[2],
          helg: recipeData[3],
          price: recipeData[4],
          image: recipeData[5]
        }))
        setRecipes(mappedRecipes)
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
      // Process the response data or update your application state
  } catch (error) {
      // If an error occurred during the request, handle the error
      console.error('Error fetching recipes:', error);
      // Optionally, you can throw the error to be handled by the caller
      throw error;
  }
  }
  return (
    <View>
      {marked.length > 0 && (
        <Button title="Confirm Selection" onPress={confirmSelection} />
      )}
      <FlatList
          data={recipes}
          renderItem={({item}) => <Card index={item.id} onClick={(recipe: Recipe) => addToList(recipe)} recipe={item} />}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
