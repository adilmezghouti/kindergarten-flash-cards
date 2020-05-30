import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPlay, faArrowLeft, faArrowRight, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

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

  return (<div className="grid">
      <div className={cx("card", level)}>
        <div className="actions">
          <div className="hexagon-wrapper">
            <button className="hexagon bronze" onClick={ async () => {
              setLevel('bronze')
              await readWord('level one')
            }}>
              <FontAwesomeIcon
                icon={faShieldAlt}
                size="3x"
              />
            </button>
          </div>
          <div className={cx('hexagon-wrapper',speaking && 'microphone')}>
            <button className="hexagon silver" onClick={ async () => {
              setLevel('silver')
              await readWord('level two')
            }}>
              <FontAwesomeIcon
                icon={faShieldAlt}
                size="3x"
              />
            </button>
          </div>
          <div className="hexagon-wrapper">
            <button className="hexagon gold" onClick={ async () => {
              setLevel('gold')
              await readWord('level three')
            }}>
              <FontAwesomeIcon
                icon={faShieldAlt}
                size="3x"
              />
            </button>
          </div>
        </div>
        <p>{words[count]}</p>
        <p>{word}</p>
        <div className="actions">
          <div className="hexagon-wrapper">
            <button className="hexagon" onClick={() => {
              count > 0 && setCount(count - 1)
              setWord('')
            }}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="3x"
              />
            </button>
          </div>
          <div className={cx('hexagon-wrapper',speaking && 'microphone')}>
            <button className="hexagon" onClick={async () => {
              await listenToWord(setWord, setSpeaking)
            }}>
              <FontAwesomeIcon
                icon={faMicrophone}
                size="3x"
                color={speaking ? 'red' : '#69f9e1'}
              />
            </button>
          </div>
          <div className="hexagon-wrapper">
            <button className="hexagon" onClick={async () => await readWord(words[count])}>
              <FontAwesomeIcon
                icon={faPlay}
                size="3x"
              />
            </button>
          </div>
          <div className="hexagon-wrapper">
            <button className="hexagon" onClick={() => {
              count < words.length - 1 && setCount(count + 1)
              setWord('')
            }}>
              <FontAwesomeIcon
                icon={faArrowRight}
                size="3x"
              />
            </button>
          </div>
        </div>
      </div>


      <style jsx>{`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          background-color: #69f9e1;
        }
        
        .card {
          background-color: #ffffff;
          display: flex;
          // flex-basis: 45%;
          flex-direction: column;
          width: 380px;
          height: 570px;
          margin: 1rem;
          padding: 1.5rem;
          color: #fcbf29;
          border: 1px solid #0070f3;
          border-radius: 17px;
          box-shadow: 3px 5px #888888;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        
        .card.bronze {
          border: 3px solid #cd7f32;
        }
        
        .card.silver {
          border: 3px solid #c0c0c0;
        }
        
        .card.gold {
          border: 3px solid #ffd700;
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
        }
        
        button {
          border: none;
          background: none;
          position: relative;
          width: 46%;
          height: 80%;
          margin: auto;
          color: #69f9e1;
          display: flex;
          align-content: center;
          justify-content: center;
          transition: 0.5s;
        }
         
        button:active, button:hover {
          color: #0070f3;
        }

        button:focus {
          color: #0070f3;
          outline:0;
        }

        .logo {
          height: 1em;
        }
        
        .actions {
          height: 100px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
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
              box-shadow: 0 0 0 0px rgba(105, 249, 225, 0.2);
             }
             100% {
              box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
             }
          }
        
        .microphone {
          background: rgba(105, 249, 225, 0.6);
          border-radius: 50%;
          animation: shadow-pulse 1s infinite;
        }
        
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default SightWords