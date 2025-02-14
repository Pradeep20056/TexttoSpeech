import React, { useState, useRef } from 'react';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const Project2: React.FC = () => {
    const [transcript, setTranscript] = useState<string>('');
    const recognitionRef = useRef<any>(null);

    const startListening = () => {
        recognitionRef.current = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.interimResults = false;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onresult = (event: any) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error('Speech recognition error detected: ' + event.error);
        };

        recognitionRef.current.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    return (
        <div>
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
            <p>{transcript}</p>
        </div>
    );
};

export default Project2;