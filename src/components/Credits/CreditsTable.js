import react from 'react'
import { TableRowChild, OperationWrapper, TableHeaderChild, TableRowStyled, TableWrapper, SearchStyled } from '../styles/tableStyles'
import styled from 'styled-components'
import { RightButtonWrapper, Row } from '../styles/pageStyles'
const CreditCard=({courses})=>{
	
}
const CreditsTable=function({courses}){
  return(
    <TableWrapper>
      <Row columns="repeat(3, 1fr) 240px">
        <TableHeaderChild> Title </TableHeaderChild>
        <TableHeaderChild> Code </TableHeaderChild>
        <TableHeaderChild> Credit </TableHeaderChild>
      </Row>
	  {courses.map((course)=>(
		  <TableRowStyled columns="repeat(3, 1fr) 240px" key={course.code}>
          <TableRowChild> { course.title } </TableRowChild>
          <TableRowChild> { course.code } </TableRowChild>
          <TableRowChild> { course.credit} </TableRowChild>
        </TableRowStyled>  
		  )
	  )}
    </TableWrapper>
    
  )
}
export default CreditsTable;