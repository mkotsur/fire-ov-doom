import React, { Component } from 'react';
import './App.css';
import {heatmap} from './heatmap';

const run = () => {
  console.log('RUN')
  const canvas: HTMLCanvasElement = document.getElementById("glCanvas") as HTMLCanvasElement
  const gl: CanvasRenderingContext2D = canvas.getContext("2d")!
  gl.imageSmoothingEnabled = false

  const width = 640
  const height = 480
  const pixelSize = 8

  const BLACK = "#070707"
  const WHITE = "#FFFFFF"

  // Init the canvas
  gl.fillStyle = BLACK;
  gl.fillRect(0, 0, width, height)

  gl.fillStyle = WHITE;
  gl.fillRect(0, height - pixelSize, width, height)


  const fire: () => Promise<never> = async () => new Promise((resolve) => {
    setTimeout(() => {
      for(let x = 0 ; x < width; x = x + pixelSize) {
        for (let y = height - pixelSize; y > 0; y = y - pixelSize) {
          const colorIndex = (height - y) / pixelSize
          const rand = Math.round(Math.random() * 3.0) & 3;
          gl.fillStyle = heatmap[colorIndex - (rand & 1)] || BLACK
          gl.fillRect(x, y - pixelSize, pixelSize, pixelSize)
        }
      }
      resolve()
    }, 70)
  })
    .then(() => fire());


  fire();

}



class App extends Component {

  componentDidMount(): void {
    console.log('Did mount')
    run()
  }

  render() {
    return (
      <div>
        <canvas id="glCanvas" width="640" height="480"/>
      </div>
    );
  }
}

export default App;
