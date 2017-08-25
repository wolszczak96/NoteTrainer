import React from 'react'
import Key from './Key.jsx'

const Keyboard = props => {
  const whiteKeys = []
  for(let i=29; i<=95; i++) {
    const color = !props.active && props.correct === i ? 'correctWhite' :
      !props.active && props.wrong === i ? 'wrongWhite' : ''
    const spacer = i !== 95 ? true : false
    whiteKeys.push(
      <Key
        key={Math.random()}
        active={props.active}
        midi={i}
        keyType='keyWhite'
        sendAnswer={props.sendAnswer}
        color={color}
        spacer={spacer}
      />
    )
    if(i%12 !== 4 && i%12 !== 11) i+=1
  }
  const blackKeys = []
  let left = 13
  for(let i=30; i<=94; i+=2) {
    const color = !props.active && props.correct === i ? 'correctBlack' :
      !props.active && props.wrong === i ? 'wrongBlack' : ''
    blackKeys.push(
      <Key
        key={Math.random()}
        active={props.active}
        midi={i}
        keyType='keyBlack'
        sendAnswer={props.sendAnswer}
        color={color}
        left={`${left}px`}
      />
    )
    if(i%12 === 3 || i%12 === 10){
      i+=1
      left+=15
    }
    left+=22
  }
  return (
    <div className='keyboard'>
      {whiteKeys}
      {blackKeys}
      <img className='hidden' src='media/keywhiteactive.png' />
      <img className='hidden' src='media/keyblackactive.png' />
      <img className='hidden' src='media/keywhitecorrect.png' />
      <img className='hidden' src='media/keyblackcorrect.png' />
      <img className='hidden' src='media/keywhitewrong.png' />
      <img className='hidden' src='media/keyblackwrong.png' />
    </div>
  )
}

export default Keyboard
