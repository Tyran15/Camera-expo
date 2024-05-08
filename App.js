import React, { useState, useRef, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);
  const cameraRef = useRef(null);

  const autorizar = () => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })(); // Adicione os parênteses para chamar a função imediatamente
  };

  const takePicture = async () => {
    // Tirar a foto com base64
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true }; // Defina a qualidade desejada (0.5 é um exemplo)
        const data = await cameraRef.current.takePictureAsync(options);
        setImage64(data.base64);
        console.log(data.base64);
      } catch (error) {
        console.log(error);
      }
    }
    
    // Tirar a foto normal
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true }; // Defina a qualidade desejada (0.5 é um exemplo)
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef} />
      <Pressable onPress={() => autorizar()} style={styles.btn}>
        <Text>Autorizar</Text>
      </Pressable>
      <Pressable onPress={() => takePicture()} style={styles.btn}>
        <Text>Tirar Foto</Text>
      </Pressable>
      <StatusBar style="auto" />
      <Image source={image ? { uri: image } : require("./assets/gumba.gif")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 250,
    height: 250,
    resizeMode: 'cover', 
    overflow: 'hidden',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    padding: 10,
  },
  img: {
    width: 250,
    height: 250,
    borderWidth: 5,
    borderColor: "#ccc",
    transform: [{ scaleX: -1 }], // Correção do erro aqui
  },
});

