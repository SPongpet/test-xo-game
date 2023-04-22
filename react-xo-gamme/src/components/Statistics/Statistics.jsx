import * as Styled from './Statistics.styled'

export const StatisticsComponent = ({ object }) => {

  return (
    <div>
      <p>Statistics</p>
      <Styled.StatisticsTableContainer>
        <Styled.HeaderTable>
          <th>XWinPercent</th>
          <th>OWinPercent</th>
          <th>QuitPercent</th>
          <th>DrawPercent</th>
        </Styled.HeaderTable>
          <Styled.HeaderTable>
            <td>{object.xWinPercent} %</td>
            <td>{object.oWinPercent} %</td>
            <td>{object.quitPercent} %</td>
            <td>{object.drawPercent} %</td>
          </Styled.HeaderTable>
      </Styled.StatisticsTableContainer>
    </div>
  )
}
