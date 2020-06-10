import React, {useEffect, useState} from 'react'
import cx from 'classnames'
import Head from "next/head";

const levels = {
  bronze: ['I', 'a', 'The', 'go', 'up', 'to', 'see', 'and', 'is', 'in', 'can', 'you', 'he', 'it', 'she', 'look', 'my', 'like', 'on', 'will'],
  silver: ['for', 'was', 'That', 'are', 'with', 'of', 'no', 'me', 'or', 'make', 'we', 'his', 'her', 'by', 'said', 'am', 'day', 'have', 'who', 'many'],
  gold: ['be', 'new', 'could', 'use', 'walk', 'do', 'way', 'again', 'goes', 'say', 'about', 'little', 'come', 'more', 'want', 'your', 'some', 'from', 'they', 'each']
}

const getVoices = () => {
  const speechSynthesis = window.speechSynthesis
  return new Promise(resolve => {
    let voices = speechSynthesis.getVoices()
    if (voices.length) resolve(voices)
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      resolve(voices)
    }
  })
}

const readWord = async word => {
  const utterance = new SpeechSynthesisUtterance(word);
  const voices = await getVoices()
  utterance.voice = voices.find(v => v.name === 'Samantha')
  window.speechSynthesis.speak(utterance);
}

const listenToWord = (setWord, setSpeaking) => {
  setSpeaking(true)
  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.start()

  recognition.onresult = event => {
    const speechToText = event.results[0][0].transcript
    setWord(speechToText)
    setSpeaking(false)
  }
}

const SightWords = (props) => {
  const [level, setLevel] = useState('bronze')
  const [count, setCount] = useState(0)
  const [word, setWord] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const words = levels[level]

  useEffect(() => {
    setCount(0)
  }, [level])

  return (
    <div className="container">
      <Head>
        <title>Sight Words</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className={cx("card", level)}>
          <div className="actions">
            <div className="hexagon-wrapper">
              <button className="hexagon bronze" onClick={ async () => {
                setLevel('bronze')
                await readWord('level one')
              }}>
                Bronze
              </button>
            </div>
            <div className={cx('hexagon-wrapper',speaking && 'microphone')}>
              <button className="hexagon silver" onClick={ async () => {
                setLevel('silver')
                await readWord('level two')
              }}>
                Silver
              </button>
            </div>
            <div className="hexagon-wrapper">
              <button className="hexagon gold" onClick={ async () => {
                setLevel('gold')
                await readWord('level three')
              }}>
                Gold
              </button>
            </div>
          </div>
          <div className="word-holder">{words[count]}</div>
          <p>{word}</p>
          <div className="actions">
            <div className="hexagon-wrapper">
              <button className="hexagon back" onClick={() => {
                count > 0 && setCount(count - 1)
                setWord('')
              }}>
              </button>
            </div>
            <div className={cx('hexagon-wrapper',speaking && 'microphone')}>
              <button className="hexagon micro" onClick={async () => {
                await listenToWord(setWord, setSpeaking)
              }}>
              </button>
            </div>
            <div className="hexagon-wrapper">
              <button className="hexagon play" onClick={async () => await readWord(words[count])}>
              </button>
            </div>
            <div className="hexagon-wrapper">
              <button className="hexagon next" onClick={() => {
                count < words.length - 1 && setCount(count + 1)
                setWord('')
              }}>
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          border: 1px solid #eaeaea;
          border-radius: 10px;
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      
        .main {
          border: 1px solid #000000;
          border-radius: 10px;
          background-repeat: no-repeat;
          max-width: 500px;
          max-height: 800px;
          width: 500px;
          height: 800px;
          margin: auto;
          background-image: url('/background.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          flex: 1;
          display: flex;
        }
  
        .card {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          color: #fcbf29;
          margin: 1rem;
          padding: 1.5rem;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
  
        .card p {
          margin: auto;
          text-align: center;
          font-size: 7.25rem;
          line-height: 1.5;
          background-image: url('/word-holder.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        .card .word-holder {
            color: #f4f0e9;
            font-weight: 600;
            text-align: center;
            font-size: 5.25rem;
            line-height: 150px;
            height: 170px;
            background-image: url('/word-holder.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .actions {
          height: 100px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
        }
       
        button {
          border: none;
          background: none;
          position: relative;
          width: 100%;
          height: 100%;
          margin: auto;
          color: #69f9e1;
          display: flex;
          align-content: center;
          justify-content: center;
          transition: 0.5s;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        .next {
          background-image: url('/next-inactive.png');
        }
         
       .back {
          background-image: url('/back-inactive.png');
        }
       .play {
          background-image: url('/play-inactive.png');
        }
       .micro {
          background-image: url('/microphone-inactive.png');
        }

      .next:hover {
          background-image: url('/next-active.png');
        }
         
       .back:hover {
          background-image: url('/back-active.png');
        }
       .play:hover {
          background-image: url('/play-active.png');
        }
       .micro:hover {
          background-image: url('/microphone-active.png');
        }

        button:focus {
          outline:0;
        }
  
        .logo {
          height: 1em;
        }
        
        .hexagon-wrapper {
          margin: auto;
          display: flex;
          text-align: initial;
          width: 60px;
          height: 60px;
          cursor: pointer;
        }
        
        button.bronze {
          color: #cd7f32;
        }
        button.silver {
          color: #c0c0c0;
        }
        button.gold {
          color: #ffd700;
        }
        
        @keyframes shadow-pulse
          {
             0% {
              box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
             }
             100% {
              box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
             }
          }
        
        .microphone {
          background: rgba(0, 0, 0  , 0.6);
          border-radius: 50%;
          animation: shadow-pulse 1s infinite;
        }
        
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}
      </style>
    </div>
  )
}

export default SightWords