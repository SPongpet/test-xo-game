import styled from "styled-components";

export const HistoryTableContainer = styled.table`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const HeaderTable = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
`

export const BodyContainer = styled.div`
  height: 280px;
  overflow-x: auto;
`
