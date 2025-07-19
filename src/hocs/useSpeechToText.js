import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const useSpeechToText = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true, // <- Keep listening until manually stopped
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Browser does not support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  return {
    transcript,
    isListening: listening,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
