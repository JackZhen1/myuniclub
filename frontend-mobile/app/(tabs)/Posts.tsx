import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = "http://192.168.50.203:8000/api";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostsScreen() {
    const [posts, setPosts] = useState<Post[]>();

    useEffect(()=> {
        const fetchPosts = async() => {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                } 
            });
            if (response.ok){
                const data = await response.json();
                setPosts(data);
            }
            
        }
        fetchPosts();
    },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest Posts</Text>
      </View>
      <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
            <Text>{item.title}</Text>
        </View>
    )}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});