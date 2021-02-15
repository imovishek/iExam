import styled from 'styled-components'

export const Row = styled.div`
  display: grid;
  grid-gap: ${props => props.gridGap ? props.gridGap : '20px'};
  grid-template-columns: ${props => props.columns || 'auto'};
`

export const HeaderRow = styled.div`
  
`

export const BodyRow = styled.div`
  border: 1px solid rgba(10, 10, 10, 0.3);
  padding: 13px;
  border-radius: 8px;
`

export const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
  user-select: none;
`
export const TileHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'auto'};
  user-select: none;
`
export const RightButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const PageHeader = styled.div`
  display: inline;
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`
