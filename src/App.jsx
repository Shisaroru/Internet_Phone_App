import { useState, useRef, useEffect } from 'react'
import { KeyPad } from './KeyPad/KeyPad'
import { MdPhone, MdBackspace, MdPhoneDisabled, MdMicOff, MdDialpad, MdPause, MdPhoneForwarded, MdMic, MdPlayArrow } from 'react-icons/md'
import { phone } from './SIP.config'
import './App.css'

function App() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [callState, setCallState] = useState(false)
  const [muteState, setMuteState] = useState(false)
  const [pauseState, setPauseState] = useState(false)
  // Audio of the call
  const audioElement = useRef()

  // Configuration
  const [session, setSession] = useState()
  const [eventHandlers, setEventHandlers] = useState()
  const [options, setOptions] = useState()

  // This useEffect use to initialize data
  useEffect(() => {
    phone.start()

    phone.on("connected", (data) => {
      console.log("phone connected")
    })

    phone.on("newRTCSession", (data) => {
      console.log("New call")
    })

    setEventHandlers({
      'progress': function(e) {
        console.log('call is in progress');
      },
      'failed': function(e) {
        console.log('call failed with cause: ', e);
        setCallState(false)
        phone.terminateSessions()
      },
      'ended': function(e) {
        console.log('call ended with cause: ', e);
        setCallState(false)
        phone.terminateSessions()
      },
      'confirmed': function(e) {
        console.log('call confirmed');
      },
      'hold': function(e) {
        console.log("hold called");
      },
      'unhold': function(e) {
        console.log("unhold called");
      }
    })

    setOptions({
      'eventHandlers'    : eventHandlers,
      'mediaConstraints' : { 'audio': true, 'video': false },
      'sessionTimersExpires': 120,
    })
  }, [])

  // Modify phoneNumber after user click on keypad
  function handleClick (value) {
    if (phoneNumber.length >= 11) {
      return;
    }
    setPhoneNumber(phoneNumber + value)
  }

  // Make the call
  function submitHandler (e) {
    e.preventDefault()
    let temp = phone.call(phoneNumber, options)
    setCallState(true)
    // Attach audio stream to audio element
    temp.connection.addEventListener('track', (e) => {
        audioElement.current.srcObject = e.streams[0]
        audioElement.current.play()
    })
    setSession(temp)
  }

  // Delete the last number from phoneNumber
  function inputBackspace () {
    setPhoneNumber(phoneNumber.substring(0, phoneNumber.length - 1))
  }

  function toggleMute () {
    if (muteState === false) {
      session.mute()
      setMuteState(true)
    } else {
      session.unmute()
      setMuteState(false)
    }
  }

  /* Fix me
  What happen is when holding the call instead of hold, the call just ended
  */
  function togglePause () {
    if (muteState === false) {
      //session.hold()
      setPauseState(true)
    } else {
      //session.unhold()
      setPauseState(false)
    }
  }

  return (
    <>
    {callState === false ? 
      <form action="#" onSubmit={submitHandler}>
        <div id="inputContainer">
          <input id="phoneInput" type="text" name="phoneNumber" value={phoneNumber} readOnly={true}/>
          <button type="button" id="backspace" onClick={inputBackspace}>
            <MdBackspace></MdBackspace>
          </button>
        </div>
        <div className="container">
          <KeyPad title="1" clickHandler={handleClick}></KeyPad>
          <KeyPad title="2" subTitle="ABC" clickHandler={handleClick}></KeyPad>
          <KeyPad title="3" subTitle="DEF" clickHandler={handleClick}></KeyPad>
          <KeyPad title="4" subTitle="GHI" clickHandler={handleClick}></KeyPad>
          <KeyPad title="5" subTitle="JKL" clickHandler={handleClick}></KeyPad>
          <KeyPad title="6" subTitle="MNO" clickHandler={handleClick}></KeyPad>
          <KeyPad title="7" subTitle="PQRS" clickHandler={handleClick}></KeyPad>
          <KeyPad title="8" subTitle="TUV" clickHandler={handleClick}></KeyPad>
          <KeyPad title="9" subTitle="WXYZ" clickHandler={handleClick}></KeyPad>
          <KeyPad title="*" clickHandler={handleClick}></KeyPad>
          <KeyPad title="0" subTitle="+" clickHandler={handleClick}></KeyPad>
          <KeyPad title="#" clickHandler={handleClick}></KeyPad>
        </div>
        <button id="call" type="submit"><MdPhone></MdPhone></button>
      </form>


      : <div id='call-in-progress-container'>
          <h1>{phoneNumber}</h1>
          <p>Calling</p>
          <section id='call-in-progress-keypad'>
            <div className={muteState === false ? 'btn-container btn-container-opacity' : 'btn-container'}>
              <button type='button' onClick={toggleMute}>
                {
                  muteState === false ?
                  <MdMicOff></MdMicOff>
                  :<MdMic></MdMic>
                }
              </button>
              <p>
                {
                  muteState === false ?
                  "Mute"
                  : "Unmute"
                }
              </p>
            </div>
            <div className='btn-container btn-container-opacity'>
              <button type='button'>
                <MdDialpad></MdDialpad>
              </button>
              <p>Keypad</p>
            </div>
            <div className={pauseState === false ? 'btn-container btn-container-opacity' : 'btn-container'}>
              <button type='button' onClick={togglePause}>
                {
                  pauseState === false ?
                  <MdPause></MdPause>
                  : <MdPlayArrow></MdPlayArrow>
                }
              </button>
              <p>
                {
                  pauseState === false ?
                  "Pause"
                  : "Unpause"
                }
              </p>
            </div>
            <div className='btn-container btn-container-opacity'>
              <button type='button'>
                <MdPhoneForwarded></MdPhoneForwarded>
              </button>
              <p>Forward</p>
            </div>
          </section>
          <button id='hang-up' type='button' onClick={() => {
            setCallState(false)
            phone.terminateSessions()
          }}>
            <MdPhoneDisabled></MdPhoneDisabled>
          </button>
          <audio src='' ref={audioElement}>
          </audio>
        </div>
    }
    </>
  )
}

export default App
