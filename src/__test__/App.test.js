import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import {
  render
} from 'react-testing-library'

import {App, Slide, Slides} from '../App';
import { DATA } from '../data'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('DATA is an object(an array) with length of 3', () => {
  expect(DATA.length).toEqual(3)
  expect(typeof DATA).toEqual('object')
});

describe('Slides component', () => {
  it('returns an <ul> tag ', () => {
    const tree = renderer
        .create(<Slides />)
        .toJSON()
    expect(tree.type).toEqual('ul')
    expect(tree.props.className).toEqual('Slides')
    expect(tree).toMatchSnapshot()
  })    
});



// describe('useProgress custom hook', () => {
//   it('returns an <ul> tag ', () => {
//     const tree = renderer
//         .create(<Slides />)
//         .toJSON()
//     expect(tree.type).toEqual('ul')
//     expect(tree.props.className).toEqual('Slides')
//     expect(tree).toMatchSnapshot()
//   })    
// });





// function SlidesTest() {
//   const div = document.createElement('div');
  // let state = {
  //   currentIndex: 0,
  //   takeFocus: true,
  // }
  // let index = 0
  // let slide = DATA[0]
// return (
//   <Slides>
//   {
//     slides.map((slide, index) => {
//       return (
//         <Slide 
//           isCurrent={index===state.currentIndex}
//           key={index}
//           slide={slide}
//           takeFocus={state.takeFocus}
//           children={slide.explanation}
//         />
//       )
//     })
//   }

// </Slides>
// )
// }