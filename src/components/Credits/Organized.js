import { Card, Col,Avatar,Image, Row, Descriptions } from 'antd';

const { Meta } = Card;

const Organized=({description})=>(
  
  <Card
    bordered={false}
    size="small"
    style={{width:280}}
  >
    <Row style={{paddingBottom:"0px"}}>
      <Meta
        style={{width:'25%',marginRight:"14px"}}
        avatar={<Avatar size={45} src="https://www.sust.edu/images/logo.png"/>}
      />
      <div style={{paddingLeft:"0px", paddingTop:"10px"}}>
        <h4>{description}</h4>
        
      </div>
    </Row>
    
  </Card>


  
);


export default Organized;
