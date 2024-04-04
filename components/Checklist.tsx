import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
interface Props {

}
interface ChildProps {
    ingredients: string[];
  }


const Checklist: React.FC<ChildProps> = ({ ingredients }) => {

  const handleToggleCheckbox = (index: number) => {
    setCheckedItems(prevState => {
      const updatedState = { ...prevState };
      updatedState[ingredients[index]] = !prevState[ingredients[index]]; // Toggle the state of the ingredient
      return updatedState;
    });
  };

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  return (
    <View style={styles.container}>
    {ingredients.map((ingredient, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BouncyCheckbox
          value={checkedItems[ingredient] || false}
          onValueChange={() => handleToggleCheckbox(index)}
        />
        <Text>{ingredient}</Text>
      </View>
    ))}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checklist;