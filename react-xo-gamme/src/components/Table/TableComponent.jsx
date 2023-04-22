import { useState, useEffect } from 'react'
import { serverAPI } from '../../apis'
import * as Styled from './TableComponent.styled'


export const TableComponent = ({gameStatus, setGameStatus}) => {
  const [dynamicTable, setDynamicTable] = useState([
    ['', '', ''],
    ['', '', ''],
    ['' ,'', '']
  ])

  const [player, serPlayer] = useState('X')
  
  const [dateStart, setDateStart] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (gameStatus !== 'End' && gameStatus !== '') {
      if (count === 60) {
        callUpdateHistory()
        setGameStatus('Quit')
        setCount(0)
      }

      const incrementCount = () => {
        setCount(count + 1)
      }
      const timer = setTimeout(() => incrementCount(), 1000)
  
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, gameStatus])
  
  const renderRows = (el, index) => {
    const dynamicTable = []
    for (let i = 0; i < el.length; i++) {
      if (gameStatus !== 'New') {
        dynamicTable.push(
          <Styled.BoxContainer>
            {el[i]}
          </Styled.BoxContainer>
        )
      } else {
        dynamicTable.push(
          <Styled.BoxContainer
            onClick={() => el[i] === '' ? handleClick({
              col: i,
              row: index,
            }) : {}}
          >
            {el[i]}
          </Styled.BoxContainer>
        )
      }
      
    }
    
    return dynamicTable
  }

  const handleClick = async ({col, row}) => {
    const newDynamicTable = dynamicTable
    dynamicTable[row][col] = player

    const res = await serverAPI({
      path: '/api/calculate/endgame',
      payload: {
        list: newDynamicTable,
      }
    })

    if (res.status === 200) {

      player === 'X' ? serPlayer('O') : serPlayer('X')
      setDynamicTable(newDynamicTable)
  
      console.log("🚀 ~ file: TableComponent.jsx:75 ~ handleClick ~ res.data.results:", res.data.results)
      if (res.data.results !== null) {
        let status = 'DRAW'
        if (res.data.results === 'X') status = 'XWIN'
        if (res.data.results === 'O') status = 'OWIN'
        
        
        await serverAPI({
          path: '/api/create/history',
          payload: {
            gameDate: dateStart, 
            gameStatus: status, 
            gameDuration: count,
          }
        })

        setGameStatus('End')
      }
    }
  }

  const handleNew = async () => {
    setDateStart(new Date())
    serPlayer('X')
    setGameStatus('New')
    setCount(0)
    setDynamicTable([
      ['', '', ''],
      ['', '', ''],
      ['' ,'', '']
    ])
  }

  const callUpdateHistory = async () => {
    await serverAPI({
      path: '/api/create/history',
      payload: {
        gameDate: dateStart, 
        gameStatus: 'QUIT', 
        gameDuration: count,
      }
    })
  }

  const handleQuit = async () => {
    setDynamicTable([
      ['', '', ''],
      ['', '', ''],
      ['' ,'', '']
    ])

    await callUpdateHistory()

    setGameStatus('Quit')
    setCount(0)
  }

  return (
    <Styled.TableContainer>
      <Styled.HeaderContainer>
        <Styled.New active={gameStatus === 'New'} onClick={() => handleNew()}>New</Styled.New>
        <Styled.Quit active={gameStatus === 'Quit'} onClick={() => handleQuit()}>Quit</Styled.Quit>
        {gameStatus === 'New' && (
          <Styled.New>{count}</Styled.New>
        )}
      </Styled.HeaderContainer>
      <Styled.GameBoxContainer>
        {dynamicTable.map((el, index) => {
          return (
            <>
              <div>{renderRows(el, index)}</div>
            </>
          )
        })}
      </Styled.GameBoxContainer>
      {gameStatus === 'New' && (
        <div>
          {`Game Statue @${dateStart} Turn ${player}`}
        </div>
      )}
      
    </Styled.TableContainer>
  )
}