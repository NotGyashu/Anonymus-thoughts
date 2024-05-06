import React, { useState, useRef, useEffect, useContext } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios"
import { AuthContext } from "../context/authcontext";
const Record = () => {
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [progress, setProgress] = useState(0); // State for progress
  const [isPaused, setIsPaused] = useState(false); // State for pause
  const [isRecordingFinished, setIsRecordingFinished] = useState(false);    
  const mediaRecorderRef = useRef(null);
  const intervalRef = useRef(null);
  const pauseTimeRef = useRef(0);
const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    author:user._id,
    category:"voice",
    title:"voice notes",
    falseName:user.username
  });
  const startRecording = () => {  
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });

        mediaRecorder.addEventListener("stop", () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          setRecordedBlob(blob);
          clearInterval(intervalRef.current); // Clear progress interval
          setProgress(0); // Reset progress
        });

        mediaRecorder.start();
        setRecording(true);
        setIsPaused(false); // Reset pause state
        // Start progress interval
        intervalRef.current = setInterval(() => {
          setProgress((prevProgress) => prevProgress + 1);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        // Handle microphone permission denied or other errors gracefully (e.g., display an error message to the user)
        setRecordedBlob(null);
      });
  };

  const pauseRecording = () => {
    if (recording) {
      mediaRecorderRef.current?.pause();
      clearInterval(intervalRef.current); // Clear progress interval
      setIsPaused(true);
      pauseTimeRef.current = progress; // Save current progress
    }
  };

  const resumeRecording = () => {
    if (recording && isPaused) {
      mediaRecorderRef.current?.resume();
      setIsPaused(false);
      // Resume progress interval
      intervalRef.current = setInterval(() => {
        setProgress(pauseTimeRef.current + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
      clearInterval(intervalRef.current); // Clear progress interval
    }
  };

  const saveBlob = async () => {
    console.log(recording, isRecordingFinished);
    if (!recording && isRecordingFinished) {
      // Create a FormData object
      const formData = new FormData();
      // Append the recordedBlob to the FormData object
      formData.append("voiceRecording", recordedBlob, "recorded_audio.webm");

      // Append other data to the FormData object if needed
      formData.append("author", data.author);
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("falseName", data.falseName);

      if (recordedBlob) {
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        try {
          const response = await axios.post("api/add", formData,{
            headers:{
              "Content-Type":"multipart/from-data"
            }
          });
          console.log("Recording saved successfully:", response.data);
        } catch (error) {
          console.error("Error saving recording:", error);
        }
      } else {
        console.warn("No recorded audio to save.");
      }
      // Reset recording state and clear recorded blob
      setRecordedBlob(null);
      setIsRecordingFinished(false);
    } else {
      console.warn("No recorded audio to save.");
    }
  };

  const saveRecording = async () => {
   if (recording) {
     stopRecording(); // Ensure recording is stopped
     await new Promise((resolve) => setTimeout(resolve, 10)); // Wait for recording to stop
     setIsRecordingFinished(true)
     
   }};



  return (
    <div className="flex flex-col items-center justify-center  lg:w-[50vw] md:w-[70vw]  w-[90vw] box-shadow  mt-3 rounded bg-white ">
      <div className="flex flex-col items-center bg-white rounded-lg p-8 lg:w-[50vw] md:w-[70vw]  w-[90vw] box-shadow lg:p-5 md:p-4 mt-3  shadow-md">
        <h1 className="text-lg font-semibold mb-4">Record Note</h1>
        {!recording ? (
          <button
            onClick={startRecording}
            className="flex items-center justify-center px-6 py-3 bg-[#3e2158] text-white rounded-md hover:bg-[#4b276a] focus:outline-none"
          >
            <MicIcon className="mr-2" />
            Start Recording
          </button>
        ) : (
          <div className="flex items-center justify-center">
            {isPaused ? (
              <button
                onClick={resumeRecording}
                className="flex items-center justify-center px-6 py-3 bg-[#3e2158] text-white rounded-md hover:bg-[#502873] focus:outline-none mr-4"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={pauseRecording}
                className="flex items-center justify-center px-6 py-3 bg-[#3e2158] text-white rounded-md hover:bg-[#502873] focus:outline-none mr-4"
              >
                Pause
              </button>
            )}

            <button
              onClick={() => {
                saveRecording();
              }}
              className="flex items-center justify-center px-6 py-3 bg-[#3e2158] text-white rounded-md hover:bg-[#502873] focus:outline-none"
            >
              <SaveIcon className="mr-2" />
              Finish
            </button>
          </div>
        )}
        {recording && (
          <div className="flex items-center justify-center mt-4">
            <div className="w-48 bg-gray-300 h-2 rounded-full relative overflow-hidden">
              <div
                className="bg-blue-600 absolute h-full"
                style={{ width: `${(progress / 60) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2 text-gray-600">{progress}s</span>
          </div>
        )}
        {recordedBlob && (
          <div className="flex flex-col gap-4 justify-between items-center">
            <audio
              className="mt-4"
              controls
              src={URL.createObjectURL(recordedBlob)}
            />
            <button
              onClick={() => {
                saveBlob();
              }}
              className="flex items-center justify-center px-6 py-3 bg-[#3e2158] text-white rounded-md hover:bg-[#502873] focus:outline-none"
            >
              <SaveIcon className="mr-2" />
              save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
