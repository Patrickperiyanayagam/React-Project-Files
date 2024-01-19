import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./App.css";


const App = () => {
    const [textToCopy, setTextToCopy] = useState('');
    const [isCopied,setCopied] = useState(false);
    const toCopy = ()=>{
      setCopied(!isCopied);
    }
    
    
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    
    return (
      <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>
                
                <div className="btn-style">
                    <CopyToClipboard text={textToCopy}>
                      <button onClick={toCopy}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    </CopyToClipboard>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

                </div>

            </div>

        </>
    );
};

export default App;