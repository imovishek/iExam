import styled from 'styled-components'

const { Spin } = require('antd')
// display: grid;
// grid-template-rows: auto;
// grid-template-columns: auto;
// background-color: rgba(225, 223, 223, 0.53);
const SpinWrapper = styled.div`
  text-align: center;
  width: 40vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 1000;
  background: rgba(225, 223, 223, 0.53);
`

const SpinStyled = styled(Spin)`
  position: absolute;
  top: 50vh;
  left: 50vw;
`

const Loading = ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      // <SpinWrapper
      // >
      <SpinStyled 
        {...{...props}}        
        size={props?.size || "large"} />
      // </SpinWrapper>
    )
  }
  return null;
}

export default Loading
