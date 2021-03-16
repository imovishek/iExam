import styled from "styled-components";
import { Calendar } from 'antd';

const CalendarStyled = styled(Calendar)`
  width: 100%;
  height: 415px;
  min-width: 386px;
  border-radius: 8px;
  padding: 14px;
  border: 1px solid #dee1e8;
`
const DashboardCalender = () => (
  <CalendarStyled fullscreen={false}/>
);

export default DashboardCalender;