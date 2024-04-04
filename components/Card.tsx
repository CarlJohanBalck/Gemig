
import React, {useState} from 'react';
import ImageOverlay from './ImageOverlay';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Recipe } from './RecipesScreen';

interface CardProps {
  recipe: Recipe;
  index: number;
  onClick: (recept: Recipe, selected: boolean) => void;
}

const Card: React.FC<CardProps> = ({ recipe, onClick }) => {
    const [card, setCard] = useState({
        selected: false,
        selectionComplete: false,
        groceryList: []
        });
    const handleClick = (recept: Recipe, selected: boolean) => {
        setCard({ ...card, selected: !selected });
        onClick(recept, selected);
    };
    const {selected} = card
    const recipeName = recipe.name
    const img = recipe.image
  
    let buttonColor = selected ? "red" : "green";
  
    return (
        <View style={styles.card}>
        <View style={styles.cardimage}>
          <ImageOverlay imageUrl={img} title={recipeName}/>
            <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={() => handleClick(recipe, selected)}
          >
          </TouchableOpacity>
        </View>
        
        
      </View>
    );
};

const styles = StyleSheet.create({
    
    item: {
      backgroundColor: '#D3D3D3',
      padding: 20,
      marginVertical: 8,
  
      // justifyContent: 'space-between', 
      // alignItems: 'flex-end'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      margin: 10,
      overflow: 'hidden'
    },
    button: {
     height: "20%"
    },
    selectedItem: {
        backgroundColor: '#00FF00',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    cardimage: {
        width: '100%',
        height: 170,
        borderRadius: 20,
    },
    image: {
      height: 200,
      width: '100%'
    },
    
    title: {
      fontSize: 32,
    },
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'green',
      alignSelf: 'flex-end'
      
    },
    removeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'red',
      alignSelf: 'flex-end'
    },

    text: {
      fontSize: 40,
      color: 'black',
      fontFamily: "Cochin"
    },
  });

export default Card;
