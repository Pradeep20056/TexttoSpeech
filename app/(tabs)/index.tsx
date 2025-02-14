import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      const availableVoices = await Speech.getAvailableVoicesAsync();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].identifier); // Set the first available voice as default
      }
    };
    fetchVoices();

    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        setText(event.value[0]); // Capture recognized speech text
      }
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  const speakText = () => {
    Speech.speak(text, { language: 'en-US', voice: selectedVoice || undefined });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: 'blue', light: 'lightblue' }}
      headerImage={
        <View style={styles.headerContainer}>
          <ThemedText style={styles.headerText}>Welcome to My App</ThemedText>
        </View>
      }
    >
      <ThemedView style={styles.contentContainer}>
        <HelloWave />
        <ThemedText style={styles.welcomeText}>
          Hi, I am Pradeep. This is a pretty landing page.
        </ThemedText>
        
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Speak something..."
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micActive]}
            onPress={isListening ? stopListening : startListening}
          >
            <FontAwesome name="microphone" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.speakButton} onPress={speakText}>
            <FontAwesome name="volume-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
  },
  contentContainer: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  micButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  micActive: {
    backgroundColor: 'red',
  },
  speakButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
});
