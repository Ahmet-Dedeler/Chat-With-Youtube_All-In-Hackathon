
import { useState } from 'react'
import './App.css'
import { DefaultInput } from './Components/Input'
import { TrailingIconButtons } from './Components/Button';
import { SuccessBanner } from './Components/Output';
import Header from './Components/Heder';
import { Hero } from './Components/Hero';
import { AlertBanner } from './Components/FialedOutput';
import { client } from "@gradio/client";
import axios from 'axios';


function App() {
let [response , setResponse] = useState(null);
const [isHidden, setIsHidden] = useState(true);
const [outPut , setOutput] = useState("")
const [youtubeURL , setYoutubeURL] = useState("")
const [question , setQuestion] = useState("")
let [resultData, setResultData] = useState("");

  function  HandleClick() {
    setIsHidden(false)

   

    const fetchData = async () => {
      const app = await client("https://chai182-chat-with-youtube.hf.space/--replicas/jwzlp/");
      const result = await app.predict("/predict", [		
				{youtubeURL}, // string  in 'youtube_url' Textbox component		
				{question}, // string  in 'question' Textbox component
	]);

console.log(result.data);

setResponse(response = result.data)
console.log(response)

    if (response === null) {
      setOutput(<AlertBanner/>)
    } else {
      setOutput( <SuccessBanner showResponse={response} />)
    }


    };
    fetchData()
  } 

// const apiInput = {
//   "youtube_url" : {youtubeURL},
//   "question": {question}
// }



  return (
    <>
  <Header/>
  <div className="align">
    <DefaultInput input={youtubeURL} setInput={setYoutubeURL} classN="input1"  placeholder="Youtube URL"/>
    <DefaultInput input={question} setInput={setQuestion} classN="input2" placeholder="Question"/>
  </div>

  <div  className='button'>
    <TrailingIconButtons onClick={HandleClick} />
  </div>
  <div id='output' className={isHidden ? 'hidden' : ''}>
    {outPut}
  </div>

  <div className='mt-10'>
    <Hero/>
  </div>

  <p >build by <a className='text-green-500' href="https://github.com/Ahmet-Dedeler">ahmet🌱</a> and <a className='text-green-500'  href="https://github.com/arhaamwanii">arham🌱</a>.</p>
  
    </>
  )
}

export default App