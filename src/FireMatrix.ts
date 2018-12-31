import { BLACK, colors, WHITE } from './colors';
import {minmax} from './helpers';

export type HowToDraw = (color: string, x: number, y: number) => void

export default class FireMatrix {

  refreshDelay = 100
  dots: number[][]
  public readonly width: number
  public readonly height: number

  constructor(w: number, h: number) {
    this.width = w
    this.height = h

    this.dots =
      Array.from(Array(h - 1), _ => Array(w).fill(BLACK)).concat(
        [new Array(this.width).fill(WHITE)]
      )
  }


  nextIteration(): void {
    this.dots.forEach((line, y) => {
      if(y === 0) {
        return
      }
      line.forEach((dot, x) => {
        const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        const rand = Math.round(Math.random() * 5 ) * plusOrMinus;
        const colorIndex = this.height - y - (rand & 1)

        const updateY = minmax(0, y - 1 + rand, this.height - 1 )
        const updateX = minmax(0, x, this.width - 1 )
        this.dots[updateY][updateX] = colorIndex
      })
    })
  }

  runIterations(ctx: CanvasRenderingContext2D, howToDraw: HowToDraw): Promise<never> {
    return new Promise<never>((resolve) => {
      setTimeout(_ => {
        this.nextIteration()
        this.draw(ctx, howToDraw, true)
        resolve()
      }, this.refreshDelay)
    }).then(_ => this.runIterations(ctx, howToDraw))
  }

  draw(ctx: CanvasRenderingContext2D, draw: HowToDraw, skipTop: boolean = false): void {
    this.dots.map(line => line.map(dot => colors[dot] || BLACK)).forEach((line, y) => {
      if(skipTop && y < 30) {
        return
      }
      line.forEach((dot, x) => {
        draw(dot, x, y)
      })
    })
  }

}