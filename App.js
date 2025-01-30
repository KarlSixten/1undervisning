import React, { useState, useRef, use } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Pressable } from "react-native";

export default function App() {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [number, setNumber] = useState(0)

  function pressMe() {
    setNumber(number + 1)
    console.log("Trykket " + number)
  }

  // test kommentar

  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: flipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  // Interpolations for rotation
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Front rotates normally
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"], // Back rotates inversely
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={pressMe}>
        <Text>Press me :D {number}</Text>
      </Pressable>
      <Pressable onPress={flipCard}>
        <View style={styles.cardContainer}>
          {/* FRONT SIDE */}
          <Animated.View style={[styles.card, styles.cardFront, { transform: [{ rotateY: frontInterpolate }] }]}>
            <Image 
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-yGImAQGp_5sjAyte2-ETfSMF1DGqWDZZw&s" }} 
              style={styles.avatar} 
            />
            <Text style={styles.name}>MyName</Text>
            <Text style={styles.title}>Software Engineer</Text>
          </Animated.View>

          {/* BACK SIDE */}
          <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
            <Text style={styles.backText}>🔗 mywebsite.com</Text>
            <Text style={styles.backText}>🚀 Passion for coding</Text>
            <Text style={styles.backText}>📧 myemail@example.com</Text>
            <Text style={styles.backText}>📞 +123 456 7890</Text>
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  cardContainer: {
    width: 250,
    height: 200,
  },
  card: {
    width: "100%",
    height: "100%",
    position: "absolute", // Ensures both cards overlap exactly
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden", // Ensures only one side is visible
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardFront: {
    zIndex: 2, // Ensure front is above initially
  },
  cardBack: {
    backgroundColor: "#222",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    color: "gray",
  },
  backText: {
    fontSize: 16,
    color: "#fff",
  },
});