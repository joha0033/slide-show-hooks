import React, { useState, useEffect, useReducer, useRef} from 'react';
import './App.css';
import {DATA as slides} from './data'

import {
  FaPlay,
  FaPause,
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaCircle
} from 'react-icons/fa'
const SLIDE_DURATION = 3000
const TIME_DURATION = 3000

function Slide({
  isCurrent,
  takeFocus,
  slide,
  id, 
  title,
  children
}){
  let ref = useRef()
  useEffect(() => {
    if(isCurrent && takeFocus){
      ref.current.focus()
    }
  }, [isCurrent, takeFocus])

  return (
    <li
      ref={ref}
      aria-hidden={!isCurrent}
      tabIndex="-1"
      className="Slide"
      style={{backgroundImage:`url(${slide.hdurl})`}}
    >
      <div className="SlideContent">
        <h2 id={id} className="Title">
          {slide.title}
        </h2>
        <div className="Explanation">
          {children}
        </div>
      </div>
    </li>
   
  )
}
function Slides(props){
  return (
    <ul className='Slides' {...props} />
  )
}

function Carousel(props){
  return (
    <section className='Carousel' {...props} />
  )
}

function Controls(props) {
  return <div className='Controls' {...props}/>
}

function SlideNav(props) {
  return <div className='SlideNav' {...props}/>
}

function SlideNavItem(props) {
  const { isCurrent } = props
  return isCurrent
    ? <button className='SlideNavItemOn' {...props}/>
    : <button className='SlideNavItemOff' {...props}/>
}

function IconButton(props) {
  return <button className='IconButton' {...props}/>
}

function SpacerGif({width}){
  return (
    <div
      style={{display:'inline-block', width}}
    />
  )
}

function ProgressBar({animate, time}) {
  let progress = useProgress(animate, time)

  return (
  <div className='ProgressBar'>
    <div 
      style={{
        width: `${progress * 100}%`}}
      />
  </div>)
}

let useProgress = (animate, time) => {
  let [ progress, setProgress ] = useState(0)

  useEffect(( ) => {
      if(animate){
          let rafId = null
          let start = null
          let step = timestamp => {
              if(!start) start = timestamp
              let progress = timestamp - start
              setProgress(progress)
              if(progress < time) {
                  rafId = requestAnimationFrame(step)
              }
          }
          rafId = requestAnimationFrame(step)
          return () => cancelAnimationFrame(rafId)
      }
  }, [time, animate])
  return animate 
      ? Math.min(progress/time, time)
      : 0
}

function App() {
  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'PROGRESS':
      case 'NEXT': return {
        ...state,
        isPlaying: action.type === 'PROGRESS',
        takeFocus: false,
        currentIndex: (state.currentIndex + 1) % slides.length
      }
      case 'PREV': return {
        ...state,
        isPlaying: false,
        takeFocus: false,
        currentIndex: (state.currentIndex - 1 + slides.length) % slides.length
      }
      case 'PLAY': return {
        ...state,
        takeFocus: false,
        isPlaying: true,
      }
      case 'PAUSE': return {
        ...state,
        takeFocus: false,
        isPlaying: false,
      }
      case 'GOTO': return {
        ...state,
        takeFocus: true,
        currentIndex: action.index
      }
      default: return state
    }
  }, {
    currentIndex: 0,
    isPlaying: false,
    takeFocus: false
  })

  useEffect(() => {
    if(state.isPlaying){
      let timeout = setTimeout(() => {
        dispatch({type: 'PROGRESS'})
      }, SLIDE_DURATION)
      return () => {clearTimeout(timeout)}
    }
  }, [state.currentIndex, state.isPlaying])
    return (
      <div className="App">
        <header className="App-header">
          <Carousel>
            <Slides>
              {
                slides.map((slide, index) => {
                  return (
                    <Slide 
                      isCurrent={index===state.currentIndex}
                      key={index}
                      slide={slide}
                      takeFocus={state.takeFocus}
                      children={slide.explanation}
                    />
                  )
                })
              }
            
            </Slides>
            <SlideNav>
              {
                slides.map((slide, index) => {
                  return index === state.currentIndex
                    ? (<SlideNavItem
                      key={index}
                      children={<FaCircle style={{opacity: 1}}/>}
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => {
                        dispatch({type: 'GOTO', index})
                      }}
                    />)
                    : (<SlideNavItem
                      key={index}
                      children={<FaCircle style={{opacity: .6}} />}
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => {
                        dispatch({type: 'GOTO', index})
                      }}
                    />)
                })
              }
            </SlideNav>

            <Controls>
              {
                state.isPlaying
                  ? (
                    <IconButton
                      aria-label="pause"
                      onClick={() => {dispatch({type: 'PAUSE'})}}
                      children={<FaPause />}
                    />
                  )
                  : (
                    <IconButton
                      aria-label="Play"
                      onClick={() => {
                        dispatch({type: 'PLAY'})
                      }}
                      children={<FaPlay />}
                    />
                  )
              }
              <SpacerGif width="10px"/>
              <IconButton
                aria-label="Previous Slide"
                onClick={() => {
                  dispatch({type: 'PREV'})
                }}
                children={<FaChevronCircleLeft />}
              />
              <SpacerGif width="10px"/>
              <IconButton
                aria-label="Next Slide"
                onClick={() => {
                  dispatch({type: 'NEXT'})
                }}
                children={<FaChevronCircleRight />}
              />
            </Controls>

            <ProgressBar 
              key={state.currentIndex + state.isPlaying}
              time={TIME_DURATION}
              animate={state.isPlaying}
            />

          </Carousel>
        </header>
      </div>
    );
  }


export default App;
