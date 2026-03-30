import { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Animated, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function CardWorkspace({ item }) {
  const navigation = useNavigation();
  const handleWorkspacePress = (workspace) => {
    navigation.navigate('Workspace', {
      workspaceId: workspace.id,
    })
  };

  return (
    <TouchableOpacity onPress={() => handleWorkspacePress(item)} style={styles.card}>
      <View style={styles.thumbnail}></View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>Slug: {item.slug}</Text>
        <Text style={styles.text}>Status: {item.status ? 'Active' : 'Inactive'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function AnimatedWorkspaceCard({ item, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CardWorkspace item={item} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 42,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#5B7EE2",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginLeft: 15,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
    color: "#fff",
  },
});