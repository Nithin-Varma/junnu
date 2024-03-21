'use client'
import Messages from "@/components/messages";
import Recorder, { mimeType } from "@/components/recorder";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const submitButtonRef = useRef<HTMLInputElement | null>(null)
  

  const uploadVoice = (blob: Blob) => {
    // const url = URL.createObjectURL(blob);
    const file = new File([blob], 'audio,webm', {type: mimeType});
    if(fileRef.current) {
      const data = new DataTransfer();
      data.items.add(file);
      fileRef.current.files =data.files;
    } else {
      console.log("file ref not found...")
    }

    if(submitButtonRef.current) {
      submitButtonRef.current.click();
    } else {
      console.log("submit button ref not found....")
    }
  }
  return (
      <main className="bg-black h-screen overflow-y-auto">
        <header className="flex justify-between fixed top-0 text-white w-full p-5">
          <Image src={"junnu.svg"} height={80} width={80} alt="Junnu" className=""/>
          <SettingsIcon size={40} className="p-2 m-2 rounded-full cursor-pointer bg-purple-800 text-black transition-all ease-in-out duration-150 hover:bg-purple-900 hover:text-white"/>
        </header>

        <form  action={formAction} className="flex flex-col bg-black">
          <div className="flex-1 bg-gradient-to-b from-purple-700">
            {/* messages */}
            <Messages />
          </div>

          {/* hidden fields   */}
          <input type="file" hidden ref={fileRef}/>
          <input type="submit" hidden ref={submitButtonRef}/>

          <div className="fixed bottom-10 w-full overflow-hidden">
            {/* recorder */}
            <Recorder uploadVoice = {uploadVoice}/>
            <div>
              {/* voice synthesizerr */}
            </div>
          </div>
        </form>
      </main>
  );
}
