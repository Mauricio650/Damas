import { useState } from 'react'
import './App.css'



export function Board () {

  const arrayBoard = [
    ['N1','EW', 'N1', 'EW', 'N1', 'EW', 'N1', 'EW'],
    ['EW', 'N1', 'EW', 'N1', 'EW', 'N1', 'EW', 'N1'],
    ['N1','EW', 'N1', 'EW', 'N1', 'EW', 'N1', 'EW'],
    ['EW','EB', 'EW', 'EB', 'EW', 'EB', 'EW', 'EB'],
    ['EB','EW', 'EB', 'EW', 'EB', 'EW', 'EB', 'EW'],
    ['EW', 'N2', 'EW', 'N2', 'EW', 'N2', 'EW', 'N2'],
    ['N2','EW', 'N2', 'EW', 'N2', 'EW', 'N2', 'EW'],
    ['EW', 'N2', 'EW', 'N2', 'EW', 'N2', 'EW', 'N2'],
  ]
  
  const [Board,SetBoard] = useState(arrayBoard)


  return (
    <>
    <article className='Board-Table-Positions'>
      <div className='Board-table-Positions-BLACK'>B</div>
      <div className='Board-table-Positions-WHITE'>W</div>
    </article>
    <article className='Board'>
      {
        arrayBoard.map((value, index)=>{
          return value.map((v,i) => {
            if(v === 'N1' || v === 'N2'){
            return <div data-position={[index,i]} className='Board-SquareBoard-BLACK'key={[index,i]}>{v}</div>
            }
            if(v === 'EW') {
              return <div data-position={[index,i]} className='Board-SquareBoard-WHITE'key={[index,i]}>{v}</div>
            }else{
              return <div data-position={[index,i]} className='Board-SquareBoard-BLACK'key={[index,i]}>{v}</div>
            }
              
            
          })
        })
      }
    </article>
    
    </>
  )
}