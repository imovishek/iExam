import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #ffffff;
  box-shadow: -3px 6px 15px 0px rgb(0 0 0 / 36%);
  min-height: 300px;
  width: ${props => props.isCollapsed ? '70px' : '250px'};
  `

export const SubWrapper = styled.div`
  padding: ${({ isCollapsed }) => isCollapsed ? '10px 0px' : '30px 0px'};
  min-height: 300px;
  height: 100%;
  transition-duration: 200ms;
  display: grid;
  width: ${props => props.isCollapsed ? '70px' : '250px'};
  grid-template-rows: 1fr ${({ isCollapsed }) => isCollapsed ? '140px' : '70px'};
`

export const NavWrapper = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  justify-content: center;
  
  display: grid;
  grid-template-columns: ${props => props.isCollapsed ? "30px" : "40px 30px 1fr"};
  transition-duration: 200ms;
`

export const LinkWrapper = styled.div`
  :hover{
    color: ${(props) => props.selected ? '#000000' : '#000000'};
  }
  color: ${(props) => props.selected ? '#000000' : '#000000'};
  margin-bottom: 10px;
  width: ${props => props.isCollapsed ? '50px' : '230px'};
  padding: 0px 10px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background: ${(props) => props.selected ? '#d5b3e5' : '#ffffff'};
  transition-duration: 200ms;
`;
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isCollapsed ? 'left' : 'center'};
  padding-left: ${props => props.isCollapsed ? '10px' : '0px'};
  margin-bottom: 20px;
`;

export const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  width: 30px;
  ${({ isCollapsed }) => isCollapsed && `height: 50px;`};
`

export const FooterIconWraper = styled.div`
  display: flex;
  flex-direction: ${({ isCollapsed }) => isCollapsed ? 'column' : 'row'};
  justify-content: center;
`

export const DesignationWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #484848;
  font-size: 11px;
  font-style: italic;
  margin-bottom: 10px;
`
export const FooterNameWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isCollapsed }) => isCollapsed ? 'column' : 'row'};
  ${({ isCollapsed }) => isCollapsed && `
    border-radius: 25px;
    padding: 10px;
    border: 1px solid #bbbbbb;
    width: fit-content;
    margin-left: -10px;
  `};
  justify-content: center;
`

export const FooterWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  ${props => props.isCollapsed ? 'margin-left: 15px;' : ''}
`

export const LabelHeader = styled.label`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
`;

export const ColorBar = styled.div`
  ${props => (props.selected ? 'background: #40a9ff;' : '')}
  border-radius: 0px;
`;

export const AppTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -15px;
  margin-bottom: 30px;
  font-size: 16px;
  color: #6c1894;
`; 