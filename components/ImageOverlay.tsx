import React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';

interface ImageOverlayProps {
  imageUrl: string;
  title: string;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl, title }) => {
  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ImageOverlay;
