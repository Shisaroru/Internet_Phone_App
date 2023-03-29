import { useState } from 'react'
import { KeyPad } from './KeyPad/KeyPad'
import { MdPhone, MdBackspace } from 'react-icons/md'
import './App.css'

function App() {
  const [phoneNumber, setPhoneNumber] = useState("")

  function handleClick (value) {
    if (phoneNumber.length >= 11) {
      return;
    }
    setPhoneNumber(phoneNumber + value)
  }

  function submitHandler (e) {
    e.preventDefault()
    console.log(e.target);
  }

  function inputBackspace () {
    setPhoneNumber(phoneNumber.substring(0, phoneNumber.length - 1))
  }

  return (
    <>
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
    </>
  )
}

export default App
