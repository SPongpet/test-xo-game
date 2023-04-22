import { serverAPI } from '../../apis'
import { useEffect, useState } from 'react'
import { 
  TableComponent,
  StatisticsComponent,
  HistoryComponent,
 } from '../../components'


export const MainPage = () => {
  const [list, setList] = useState([])
  const [object, setObject] = useState([])
  const [gameStatus, setGameStatus] = useState('')

  const getHistory = async () => {
    try {
      const response = await serverAPI({
        path: '/api/query/history',
      })
      
      if (response.status === 200) {
        setList(response.data.results)
      }

    } catch (error) {
      console.log("🚀 ~ file: History.jsx:19 ~ ; ~ error:", error)
    }
  }

  const getStatistics = async () => {
    try {
      const response = await serverAPI({
        path: '/api/calculate/statistics',
      })

      if (response.status === 200) {
        setObject(response.data.results)
      }

    } catch (error) {
      console.log("🚀 ~ file: History.jsx:19 ~ ; ~ error:", error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getStatistics()
      await getHistory()
    })()
  }, [])

  useEffect(() => {
    if (gameStatus === 'End' || gameStatus === 'Quit') {
      ;(async () => {
        await getStatistics()
        await getHistory()
      })()
    }
  }, [gameStatus])

  return (
    <>
      <div> Running MainPage</div>
      <TableComponent gameStatus={gameStatus} setGameStatus={setGameStatus}/>
      <StatisticsComponent object={object}/>
      <HistoryComponent list={list}/>
    </>
  )
}