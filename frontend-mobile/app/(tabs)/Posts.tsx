import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import formatTimeAgo from '@/utils/formatTimeAgo';

const API_URL = "http://192.168.50.203:8000/api";

interface Post {
  id: number;
  title: string;
  content: string;
  updated_at: string;
};

export default function PostsScreen() {
    const [posts, setPosts] = useState<Post[]>();

    const router = useRouter();

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
        <Text style={styles.title}>Latest Posts</Text>

        <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={()=> (router.push({pathname: "/post/[id]", params: { id: item.id }}))}>
            <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.metadataRow}>
                    <View style={styles.author}>
                        <Image source={require('../../assets/images/aucss_logo.jpg')} style={styles.authorIcon}/>
                        <Text style={styles.text}>AUCSS</Text>
                    </View>

                    <Text style={styles.text}>{formatTimeAgo(item.updated_at)}</Text>
                </View>

                <Text style={styles.text}
                numberOfLines={4}
                >{item.content}</Text>
            </View>
          </TouchableOpacity>
            
        )}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#faf7f7',
    borderRadius: 10,
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0 , height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },

  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  author: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  authorIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },

  text: {
    color: '#242838',
  },
});