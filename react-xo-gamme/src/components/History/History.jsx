import * as Styled from './History.styled'

export const HistoryComponent = ({list}) => {

  return (
    <div>
      <p>Passed Games</p>
      <Styled.HistoryTableContainer>
        <Styled.HeaderTable>
          <th>GameId</th>
          <th>GameDate</th>
          <th>GameStatus</th>
          <th>GameDuration</th>
        </Styled.HeaderTable>
        <Styled.BodyContainer>
          {list.map((item) => {
            return (
              <Styled.HeaderTable>
                <td>{item.gameId}</td>
                <td>{item.gameDate}</td>
                <td>{item.gameStatus}</td>
                <td>{item.gameDuration}</td>
              </Styled.HeaderTable>
            )
          })}
        </Styled.BodyContainer>
      </Styled.HistoryTableContainer>
    </div>
  )
}