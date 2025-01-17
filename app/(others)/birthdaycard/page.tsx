'use client'

import React, { useEffect, useRef } from 'react'
 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const BirthdayCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // helper functions
    const PI2 = Math.PI * 2
    const random = (min: number, max: number) => Math.random() * (max - min + 1) + min | 0
    const timestamp = () => new Date().getTime()

    class Firework {
      dead: boolean
      offsprings: number
      x: number
      y: number
      targetX: number
      targetY: number
      shade: number
      history: { x: number; y: number }[]
      madeChilds?: boolean

      constructor(x: number, y: number, targetX: number, targetY: number, shade: number, offsprings: number) {
        this.dead = false
        this.offsprings = offsprings

        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY

        this.shade = shade
        this.history = []
      }

      update(delta: number) {
        if (this.dead) return

        let xDiff = this.targetX - this.x
        let yDiff = this.targetY - this.y
        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
          this.x += xDiff * 1 * delta // Reduced speed
          this.y += yDiff * 1 * delta // Reduced speed

          this.history.push({
            x: this.x,
            y: this.y
          })

          if (this.history.length > 20) this.history.shift()

        } else {
          if (this.offsprings && !this.madeChilds) {
            let babies = this.offsprings / 2
            for (let i = 0; i < babies; i++) {
              let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
              let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

              birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))
            }
          }
          this.madeChilds = true
          this.history.shift()
        }
        
        if (this.history.length === 0) this.dead = true
        else if (this.offsprings) { 
          for (let i = 0; this.history.length > i; i++) {
            let point = this.history[i]
            ctx.beginPath()
            ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`
            ctx.arc(point.x, point.y, 1, 0, PI2, false)
            ctx.fill()
          } 
        } else {
          ctx.beginPath()
          ctx.fillStyle = `hsl(${this.shade},100%,50%)`
          ctx.arc(this.x, this.y, 1, 0, PI2, false)
          ctx.fill()
        }
      }
    }

    class Birthday {
      width: number
      height: number
      spawnA: number
      spawnB: number
      spawnC: number
      spawnD: number
      fireworks: Firework[]
      counter: number

      constructor() {
        this.resize()

        // create a lovely place to store the firework
        this.fireworks = []
        this.counter = 0
      }
      
      resize() {
        this.width = canvas.width = canvas.offsetWidth
        this.height = canvas.height = canvas.offsetHeight
        let center = this.width / 2 | 0
        this.spawnA = center - center / 4 | 0
        this.spawnB = center + center / 4 | 0
        this.spawnC = this.height * .1
        this.spawnD = this.height * .5
      }
      
      onClick(evt: MouseEvent | TouchEvent) {
        let rect = canvas.getBoundingClientRect()
        let x = 'clientX' in evt ? evt.clientX - rect.left : evt.touches[0].pageX - rect.left
        let y = 'clientY' in evt ? evt.clientY - rect.top : evt.touches[0].pageY - rect.top
        
        let count = random(1,3) // Reduced count for slower animation
        for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          x,
          y,
          random(0, 260),
          random(15, 55))) // Reduced offsprings for slower animation
              
        this.counter = -1
      }
      
      update(delta: number) {
        ctx.globalCompositeOperation = 'hard-light'
        ctx.fillStyle = `rgba(20,20,20,${4 * delta})` // Increased fade for slower animation
        ctx.fillRect(0, 0, this.width, this.height)

        ctx.globalCompositeOperation = 'lighter'
        for (let firework of this.fireworks) firework.update(delta)

        // if enough time passed... create new new firework
        this.counter += delta * 1.5 // Reduced for slower animation
        if (this.counter >= 1) {
          this.fireworks.push(new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            random(0, this.width),
            random(this.spawnC, this.spawnD),
            random(0, 360),
            random(15, 55))) // Reduced offsprings for slower animation
          this.counter = 0
        }

        // remove the dead fireworks
        if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)
      }
    }

    let birthday = new Birthday()
    
    window.onresize = () => birthday.resize()
    canvas.onclick = evt => birthday.onClick(evt as MouseEvent)
    canvas.ontouchstart = evt => birthday.onClick(evt as TouchEvent)

    let then = timestamp()

    ;(function loop(){
      requestAnimationFrame(loop)

      let now = timestamp()
      let delta = now - then

      then = now
      birthday.update(delta / 1000)
    })()

  }, [])

  return (
    <div className="flex items-center justify-center   ">
      <div className=" rounded-lg shadow-xl p-4   w-full mx-auto relative overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0" 
          style={{ pointerEvents: 'none' }}
        />
        <div className="relative z-10">
          <div className="flex flex-col items-center">
            <div>
            <Avatar  className='h-[15vh] w-auto'>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
            </div>
   
            <h1 className="text-3xl font-bold text-white mb-2 text-center z-10">Happy Birthday</h1>
            <h2 className="text-xl text-white  mb-4 text-center z-10">Muskaan </h2>
            <p className="text-white  text-center mb-6 z-10">
              Wishing you a day filled with joy, laughter, and unforgettable moments. May this year bring you success, happiness, and all the wonderful things you deserve!
            </p>
         
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirthdayCard

