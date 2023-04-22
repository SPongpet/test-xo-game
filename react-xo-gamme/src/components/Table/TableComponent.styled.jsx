import styled from 'styled-components'

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  margin: 10px;
`

export const GameBoxContainer = styled.div`
  display: flex;
`

export const New = styled.div`
  display: flex;
  border-bottom: ${props => props.active ? '1px solid' : 'unset'};
`

export const Quit = styled.div`
  display: flex;
  border-bottom: ${props => props.active ? '1px solid' : 'unset'};
`

export const BoxContainer = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`