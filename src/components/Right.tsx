"use client"
import React,{useState} from 'react'
import styles from '../../src/components/Right.module.css'
import clogo from "../../src/assets/chatgptlogo.png"
import nlogo from "../../src/assets/nouserlogo.png"
import c2logo from "../../src/assets/chatgptlogo2.png"
import Image from 'next/image'

const openAiAPI=process.env.NEXT_PUBLIC_OPENAI_API_KEY
// interface MessageObj {}
const Right = () => {
  const [message,setMessage]=useState('')

  const [allMessages,setAllMessages]=useState<any[]>([])

  const sendMessage=async ()=>{
    // console.log(message)
    let url="https://api.openai.com/v1/chat/completions"
    let token= `Bearer ${openAiAPI}`
    let model='gpt-3.5-turbo'
     
    let messagesToSend=[
      ...allMessages,
      {
        role:'user',
        content: message
      }
    ]

    let res=await fetch (url,{
      method:'POST',
      headers:{
        'Authorization':token,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        model:model,
        messages:messagesToSend
      })
    })

    let resjson=await res.json()

    if(resjson){
      // console.log(resjson.choices[0].message);
      let newAllMessages=[
        ...messagesToSend,
        resjson.choices[0].message
      ]
      // console.log(newAllMessages)
      setAllMessages(newAllMessages)
      setMessage('')
    }
  }
  return (
    <div className={styles.rights}>
      <div className={styles.chatgptv}>

        <p className={styles.text1}>ChatGPT 3.5</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>

      
      </div>
      
    {
      allMessages.length>0?


      <div className={styles.messages}>


      {
        allMessages.map((msg,index)=>(
         <div key={index} className={styles.message}>
           <Image src={msg.role === 'user' ? nlogo : c2logo} width={50} height={50} alt="" />
           <div className={styles.details}>
         <h2>{msg.role==='user' ? 'You' :'ChatGPT'}</h2>
         <p>{msg.content}</p>
           </div>
         </div>
        ))
      }
      </div>

      :
      <div className={styles.nochat}>
      <div className={styles.s1}>
        <Image src={clogo} alt='chatgpt' height={70} width={70}/>
        <h1>How can I assist you today?</h1>
      </div>
      <div className={styles.s2}>
        <div className={styles.suggestioncard}>
          <h2>Recommend activities</h2>
          <p>Psychology Behind Decision-Making</p>

        </div>
        <div className={styles.suggestioncard}>
          <h2>Recommend activities</h2>
          <p>Psychology Behind Decision-Making</p>

        </div>
        <div className={styles.suggestioncard}>
          <h2>Recommend activities</h2>
          <p>Psychology Behind Decision-Making</p>

        </div>
        <div className={styles.suggestioncard}>
          <h2>Recommend activities</h2>
          <p>Psychology Behind Decision-Making</p>

        </div>

      </div>
    </div>
    }
    
      <div className={styles.bottomsection}>
           <div className={styles.messagebar}>
              <input type='text' placeholder='Message ChatGPT'
              onChange={(e)=>setMessage(e.target.value)}
              value={message}
              />
              <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
</svg>

            </div>     
           <p>ChatGPT can make mistakes. Consider checking important information</p>   

      </div>
    </div>
  )
}

export default Right