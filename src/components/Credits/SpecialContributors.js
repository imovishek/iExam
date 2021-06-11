import { Card, Row } from 'antd';


const SpecialContributors=({title,description})=>(
  
  <Card
    bordered={true}
    size="small"
    style={{width:200, "border-radius": "20px",border:"2px solid #BA55D3","box-shadow": "1px 2px #DA70D6"}}
  >
    <Row style={{paddingBottom:"8px"}}>
      
      <div style={{paddingLeft:"16px"}}>
        <h3 >{title}</h3>
        {description}
      </div>
    </Row>
    
  </Card>


  
);


export default SpecialContributors;
