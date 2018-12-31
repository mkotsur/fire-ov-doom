import React, { Component } from 'react';
import './App.css';
import FireMatrix, { HowToDraw } from './FireMatrix';

class App extends Component {

  componentDidMount(): void {
    setTimeout(() => {
      const width = 640
      const height = 360
      const pixelSize = 4

      const canvas: HTMLCanvasElement = document.getElementById("glCanvas") as HTMLCanvasElement
      canvas.width = width
      canvas.height = height
      const gl: CanvasRenderingContext2D = canvas.getContext("2d")!
      gl.imageSmoothingEnabled = false

      const fireMatrix = new FireMatrix(Math.trunc(width / pixelSize), Math.trunc(height / pixelSize))
      const howToDraw: HowToDraw = (color, x, y) => {
        gl.fillStyle = color;
        gl.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
      };

      fireMatrix.draw(gl, howToDraw)
      gl.fillStyle = "yellow"
      gl.font = "80px doom";
      gl.fillText("Happy 2019", 100, 100);
      fireMatrix.runIterations(gl, howToDraw)
    }, 500)
  }

  render() {
    return (
      <div>
        <h1 style={{fontFamily: "doom", color: "white"}}>Font loaded</h1>
        <canvas id="glCanvas" width="640" height="360"/>
      </div>
    );
  }
}

export default App;
