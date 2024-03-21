import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

export const mimeType = "audio/webm";

function Recorder({uploadVoice} : {uploadVoice : (blob: Blob) => void}) {
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const {pending} = useFormStatus()
  const [recordingStatus, setRecordingStatus] = useState("inactive")
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => { 
    microphonePermission();
  }, [])

  const microphonePermission = async() => {
    if("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,        
        })
        setPermission(true);
        setStream(streamData)
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      alert("may be it doesnt support the microphone")
    }
  }

  const startRecording = async() => {
    if(stream === null || pending || mediaRecorder === null) return;
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, {mimeType})
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) =>{
      if(typeof event.data === "undefined") return;
      if(event.data.size === 0) return;

      localAudioChunks.push(event.data)
    }

    setAudioChunks(localAudioChunks);
  }

  const stopRecording = async() => {
    if(mediaRecorder.current === null || pending) return;
    
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      uploadVoice(audioBlob);
      setAudioChunks([])
    }
  }
  return (
    <div className='flex items-center justify-center text-white'>
      {!permission && (
        <button onClick={microphonePermission}>get microphone permission</button>
      )}

      {pending && (
        <Image src={"/active.gif"} height={150} width={150} priority alt='now recording' className='rounded-full' />
      )}

      {permission && recordingStatus === "inactive" && !pending && (
        <Image 
          src={"/notactive.png"} 
          height={150} 
          width={150} 
          onClick={startRecording}
          priority={true}
          className='assistant cursor-pointer rounded-full'
          alt='click to record' />
      )}
      
      {}
      
    </div>
  )
}

export default Recorder
