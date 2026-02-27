import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import formatTimeAgo from '@/utils/formatTimeAgo';

interface PostImage {
    id: number,
    post_id: number,
    image_path: string,
    created_at: string,
    updated_at: string
};

interface Post {
    id: number,
    title: string,
    content: string,
    created_at: string,
    updated_at: string,
    images: PostImage[],
};

export default function PostDetailScreen() {
    const { id } = useLocalSearchParams(); 
    const [post, setPost] = useState<Post | null>(null);

    const API_URL = 'http://192.168.50.203:8000/api';
    const STORAGE_URL = 'http://192.168.50.203:8000/Storage/'

    useEffect(()=> {
        const fetchPost = async() => {
            try {
                const response = await fetch(`${API_URL}/posts/${id}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setPost(data);
            } catch (error){
                console.error(error);
            }
        }
        fetchPost();
    },[]);

    if (post === null) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <ScrollView style={styles.body}>
            {post.images?.[0]?.image_path && <Image source={{ uri: `${STORAGE_URL}${post.images?.[0]?.image_path}`}} style={styles.postImage}/>}
            
            <View style={styles.container}>
                <Text style={styles.title}>{post.title}</Text>

                <View style={styles.metadataRow}>
                    <View style={styles.authorBox}>
                        <Image source={require('../../assets/images/aucss_logo.jpg')} style={styles.authorIcon} />
                        <Text>AUCSS</Text>
                    </View>

                    <Text>{formatTimeAgo(post.updated_at)}</Text>
                </View>
            <Text style={styles.content}>{post.content}</Text>
            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',       
    },

    container: { 
        marginHorizontal: 10,
        marginBottom: 15,
    },

    title: { 
        fontSize: 22 ,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
    },

    authorBox: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    authorIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 5,
    },

    metadataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    content: {
        marginTop: 10,
    },

    postImage:{
        width: '100%',
        aspectRatio: '3/4'
    }
});