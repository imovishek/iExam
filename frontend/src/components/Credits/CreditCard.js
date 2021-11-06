import { Card, Col,Avatar,Image, Row } from 'antd';
import path from 'path';
import {FacebookFilled,TwitterOutlined,GithubFilled,LinkedinFilled,MailOutlined} from '@ant-design/icons';
const gmicon=(<img width="28" alt="Gmail icon (2020)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/64px-Gmail_icon_%282020%29.svg.png"></img>)
const { Meta } = Card;

const MyCard=({title,description,links,img})=>(
  
  <Card
    bordered={true}
    size="small"
    style={{width:280, "border-radius": "20px",border:"2px solid #BA55D3","box-shadow": "1px 2px #DA70D6"}}
  >
    <Row style={{paddingBottom:"8px"}}>
      <Meta
        style={{width:'25%',marginRight:"16px"}}
        avatar={<Avatar size={75} src={path.join(__dirname,`images/${img}`)}/>}
      />
      <div style={{paddingLeft:"16px"}}>
        <h3 >{title}</h3>
        {description}
      </div>
    </Row>
    <Row style={{padding:"8px"}}>
      <Col span={3}></Col>
      <Col span={5}><a href={links.facebook}><FacebookFilled style={{fontSize:28,color:"#4267B2",background:"#FFFFFF"}}/></a></Col>
      <Col span={5}><a href={links.github}><GithubFilled style={{fontSize:28,color:"#000000",background:"#FFFFFF","border-radius": "50px"}}/></a></Col>
      <Col span={5}><a href={links.mail}>{gmicon}</a></Col>
      <Col span={5}><a href={links.linkedin}><LinkedinFilled style={{fontSize:28,color:"#0e76a8",background:"#FFFFFF"}}/></a></Col>
      <Col span={2}></Col>
    </Row>
  </Card>


  
);


export default MyCard;


<a title="Google, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Gmail_icon_(2020).svg"></a>

// "border-radius": "10px","box-shadow": "1px 2px #F0F0F0",border:"1px solid 	#FF1493"
// <Col span={4}><a href={links.twitter}><TwitterOutlined style={{fontSize:28,color:"#1E90FF"}}/></a></Col>