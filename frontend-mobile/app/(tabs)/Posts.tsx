import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = "http://192.168.50.203:8000/api";

interface Post {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

const formatTimeAgo = (date: string) => {
    const now = new Date();
    const updateTime = new Date(date);
    const diff = now.getTime() - updateTime.getTime();

    if (diff < 60000) {
        return 'Just Now';
    };

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
        return `${minutes} mins ago`;
    };

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours ago`;
    };

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
};

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
        <Text style={styles.title}>Latest Posts</Text>

        <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.metadataRow}>
                    <View style={styles.author}>
                        <Image source={require('../../assets/images/aucss_logo.jpg')} style={styles.authorIcon}/>
                        <Text style={styles.text}>AUCSS</Text>
                    </View>

                    <Text style={styles.text}>{formatTimeAgo(item.updated_at)}</Text>
                </View>

                <Text style={styles.text}>{item.content}</Text>
            </View>
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