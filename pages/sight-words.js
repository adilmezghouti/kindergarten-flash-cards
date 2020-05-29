import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPlay, faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const words = ['This', 'That', 'They', 'There']

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

const SightWords = (props) => {
  const [count, setCount] = useState(0)

  return (<div className="grid">
      <div className="card">
        <p>{words[count]}</p>
        <div className="actions">
          <div className="hexagon-wrapper">
            <button className="hexagon">
              <FontAwesomeIcon
                icon={faMicrophone}
                size="3x"
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
            <button className="hexagon" onClick={() => count < words.length - 1 && setCount(count + 1)}>
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

          // max-width: 800px;
          // max-height: 1288px;
          // margin-top: 3rem;
          // margin: auto;
                    
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
        
        .card button:hover {
          color: #0070f3;
        }

        .logo {
          height: 1em;
        }
        
        .actions {
          overflow: hidden;
          // background: linear-gradient(18deg, #e37682, #a58fe9);
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
        
        .hexagon {
          position: relative;
          width: 46%;
          height: 80%;
          margin: auto;
          color: #69f9e1;
          // background: linear-gradient(-180deg, white, #fda3b2);
          display: flex;
          align-content: center;
          justify-content: center;
          transition: 0.5s;
        }
        
        // .icon {
        //   z-index: 1;
        //   margin: auto;
        //   font-size: 50px;
        //   color: transparent;
        //   background: linear-gradient(45deg, #a58fe9, #e37682);
        //   background-clip: text;
        //   -webkit-background-clip: text;
        // }
        
        // .hexagon:before,
        // .hexagon:after {
        //   position: absolute;
        //   content: "";
        //   background: inherit;
        //   height: 100%;
        //   width: 100%;
        //   border-radius: 0;
        //   transition: 0.5s;
        //   transform-origin: center;
        // }
        // .hexagon:before {
        //   transform: rotateZ(60deg);
        // }
        // .hexagon:after {
        //   transform: rotateZ(-60deg);
        // }
        // .hexagon:hover {
        //   border-radius: 50px;
        //   transition: 0.5s;
        // }
        // .hexagon:hover:before {
        //   border-radius: 50px;
        //   transition: 0.5s;
        // }
        // .hexagon:hover:after {
        //   border-radius: 50px;
        //   transition: 0.5s;
        // }

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