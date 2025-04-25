import { useState } from 'react'
import { isEqual } from 'lodash'
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

  const players = {
    n1:'N1',
    n2: 'N2'
  }
  
  const [board,setBoard] = useState(arrayBoard)

  const [currentPosition,setCurrentPosition] = useState([0,0])

  const [turn,setTurn] = useState('')

  const [wantPosition,setWantPosition] = useState([0,0])

  const [futurePositions, setFuturePositions] = useState([[0,0],[0,0]])

  const handleClick = (e) =>{
    const player = e.target.dataset.player

    const currentP = [Number(e.target.dataset.positionY),Number(e.target.dataset.positionX)]
    setCurrentPosition(currentP)
    console.log('esta en la posicion',currentP)

    if(player === 'N1') {
      const fPositions = [[Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) -1],[Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) + 1]]
      setFuturePositions(fPositions)
      console.log('se puede mover hacia las posiciones',fPositions)
    }else {
      const fPositions = [[Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) -1],[Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) + 1]]
      setFuturePositions(fPositions)
      console.log('se puede mover hacia las posiciones',fPositions)
    }
  }


    const wannaMove = (e) => {
      const wannaM = [Number(e.currentTarget.dataset.positionY),Number(e.currentTarget.dataset.positionX)]
      const valueSquare = e.target.dataset.value
      if (isEqual(futurePositions[0],wannaM) || isEqual(futurePositions[1],wannaM)){
        setWantPosition(wannaM)
        console.log(valueSquare)
        console.log('DECIDE MOVER HACIA LA POSICION',wannaM)
      }
      
    }

  


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
            return <div data-position-y={index}
                        data-position-x={i}
                        className='Board-SquareBoard-BLACK'
                        key={[index,i]}
                        onClick={handleClick}>
                    
                      <div data-position-y={index}
                        data-position-x={i}
                        data-player={v}>
                          {v}
                      </div>

                   </div>
            }
            if(v === 'EW') {
              return <div data-position-y={index}
                          data-position-x={i} 
                          className='Board-SquareBoard-WHITE'
                          key={[index,i]}
                          onClick={wannaMove}
                          >
                            
                        <div data-position-y={index}
                        data-position-x={i}
                        data-value={v}>{v}</div>
                     </div>
            }else{
              return <div data-position-y={index}
                          data-position-x={i} 
                          
                          className='Board-SquareBoard-BLACK'
                          key={[index,i]}
                          onClick={wannaMove}
                          >

                        <div data-position-y={index}
                        data-position-x={i}
                        data-value={v}>{v}</div>
                     </div>
            }
          })
        })
      }
    </article>
    
    </>
  )
}