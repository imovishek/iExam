import styled from 'styled-components'

const { Spin } = require('antd')

const SpinWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
`

const SpinStyled = styled(Spin)`
  position: absolute;
  top: 50vh;
  left: 50vw;
  z-index: 1000;
`

const Loading = ({ isLoading }) => {
  if (isLoading) {
    return (
      <SpinWrapper>
        <SpinStyled size="large" />
      </SpinWrapper>
    )
  }
  return <div></div>
}

export default Loading
