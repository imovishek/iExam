import { Card, Avatar,Image } from 'antd';
import {FacebookOutlined,TwitterOutlined,GithubOutlined,LinkedinOutlined,MailOutlined} from '@ant-design/icons';
import { link } from '@hapi/joi';
const style = { background: '#0092ff', padding: '8px 0' };

const { Meta } = Card;

const MyCard=({title,description,links,img})=>(
  <div style={{padding:"8px"}}>
    <Card
      bordered={true}
      style={{width: 400}}
      actions={[
        <a href={links.facebook} key="a"><FacebookOutlined/></a>,
        <a href={links.twitter} key="a"><TwitterOutlined key="a"/></a>,
        <a href={links.github} key="a"><GithubOutlined key="a"/></a>,
        <a href={links.linkedin} key="a"><LinkedinOutlined key="a"/></a>,
        <a href={links.mail} key="a"><MailOutlined key="a"/></a>,
      ]}
    >
      <Meta
        avatar={<Avatar size={64*2} src={`/images/${img}`} />}
        title={title}
        description={description}
      />
       
    </Card>
  
  </div>
);


export default MyCard;
