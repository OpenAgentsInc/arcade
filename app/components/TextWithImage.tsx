import React from 'react';
import { Text, Image, StyleSheet, Dimensions } from 'react-native';

const parseText = (text, textStyle, imageStyle) => {
  const words = text.split(' ');
  return words.map((word, index) => {
    if (word) {
        try {
          new URL(word);
          if ([".jpg", ".png", ".jpeg"].some((suff)=>word.endsWith(suff))) {
            return <Image key={index} style={imageStyle} source={{ uri: word }} />;
          } else {
            return <Text key={index} style={textStyle}>{word} </Text>;
          }
        } catch (e) {
          // if an error is thrown, then the word is not a valid URL
          return <Text key={index} style={textStyle}>{word} </Text>;
        }
    }
  });
};

const TextWithImage = ({ text, textStyle, imageStyle }) => (
  <Text style={styles.container}>
    {parseText(text, textStyle||styles.text, imageStyle||styles.image)}
  </Text>
);

const screenWidth = Dimensions.get('window').width/1.3;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 14,
    color: "#fff"
  },
  image: {
    width: screenWidth,
    height: screenWidth, // keeping aspect ratio 1:1, adjust this if your images have different aspect ratios
    resizeMode: 'contain', // this will ensure the image scales and fits within the given dimensions
  },
});

export default TextWithImage;
