import { Row, Col } from 'antd';
import MyCard from './CreditCard';
import { PageHeader } from '../styles/pageStyles';
import persons from './persons';

const CreditList=function () {
  return (
    <div align="center">
      <Row justify="center">
        <PageHeader>
          Created By
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} justify="center" style={{marginBottom:32}}>
        <Col span={12}><MyCard 
          title={persons.ovishek.name} 
          description={persons.ovishek.description} 
          links={persons.ovishek.links} 
          img={persons.ovishek.img}/>
        </Col>

        <Col span={12}><MyCard 
          title={persons.maruf.name} 
          description={persons.maruf.description} 
          links={persons.maruf.links} 
          img={persons.maruf.img}/>
        </Col>

      </Row>
      <Row gutter={[8, 8]} justify="center">
        <PageHeader>
          Supervised By
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} justify="center" style={{marginBottom:32}}>
        <Col span={12}><MyCard 
          title={persons.enam.name} 
          description={persons.enam.description} 
          links={persons.enam.links} 
          img={persons.enam.img}/>
        </Col>
      </Row>
      <Row justify="center">
        <PageHeader>
          Special Contributors
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} style={{marginBottom:32}}>
        <Col span={12}><MyCard 
          title={persons.antar.name}
          description={persons.antar.description} 
          links={persons.antar.links} 
          img={persons.antar.img}/>
        </Col>

        <Col span={12}><MyCard 
          title={persons.sagor.name} 
          description={persons.sagor.description}
          links={persons.sagor.links} 
          img={persons.sagor.img}/>
        </Col>

        <Col span={12}><MyCard 
          title={persons.tithi.name} 
          description={persons.tithi.description} 
          links={persons.tithi.links} 
          img={persons.tithi.img}/>
        </Col>

        <Col span={12}><MyCard 
          title={persons.arnob.name} 
          description={persons.arnob.description} 
          links={persons.arnob.links} 
          img={persons.arnob.img}/></Col>

      </Row>
    </div>
  );
}

export default CreditList;
