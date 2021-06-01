import { Row, Col } from 'antd';
import MyCard from './CreditCard';
import { PageHeader } from '../styles/pageStyles';

const CreditList=function () {
  return (
    <div align="center">
      <Row justify="center">
        <PageHeader>
          Created By
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} justify="center" style={{marginBottom:32}}>
        <Col span={12}><MyCard title={"Ovishek Paul"} description={"Software Engineer, Kinetik Care"} links={{github:"https://github.com",mail:"",facebook:"",linkedin:"",twitter:""}} img="naruto.jpg"/></Col>
        <Col span={12}><MyCard title={"Md Maruful Alam"} description={`Student, SUST`} links={{github:"",mail:"https://gmail.com",facebook:"",linkedin:"",twitter:""}} img="naruto.jpg"/></Col>
      </Row>
      <Row gutter={[8, 8]} justify="center">
        <PageHeader>
          Supervised By
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} justify="center" style={{marginBottom:32}}>
        <Col span={12}><MyCard title={"Enamul Hassan"} description={"Asistant Professor,SUST"} links={{github:"",mail:"",facebook:"https://facebook.com",linkedin:"",twitter:""}} img="naruto.jpg"/></Col>
      </Row>
      <Row justify="center">
        <PageHeader>
          Special Contributors
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} style={{marginBottom:32}}>
        <Col span={12}><MyCard title={"Antor Roy"} description={"Student, SUST"} links={{github:"",mail:"",facebook:"",linkedin:"https://linkedin.com",twitter:""}} img="naruto.jpg"/></Col>
        <Col span={12}><MyCard title={"Faridul Reza Sagor"} description={"Student, SUST"} links={{github:"",mail:"",facebook:"",linkedin:"",twitter:"https://twitter.com"}} img="naruto.jpg"ss/></Col>
      </Row>
    </div>
  );
}

export default CreditList;
