import { Row, Col } from 'antd';
import MyCard from './CreditCard';
import SpecialContributors from './SpecialContributors';
import Acknowledgements from './Acknowledgements';
import Organized from './Organized';
import { PageHeader } from '../styles/pageStyles';
import persons from './persons';
import OrganizedDescriptions from './OrganizedDescription';

const CreditList=function () {
  return (
    <div style={{margin:"0 auto"}} >
      <Row justify="center">
        <PageHeader>
          Created By
        </PageHeader>
      </Row>
      <Row gutter={[280, 0]}  style={{paddingBottom:32}}>
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
      <Row gutter={[270, 0]} justify="center" style={{paddingBottom:32}}>
        <Col span={12}><MyCard 
          title={persons.enam.name} 
          description={persons.enam.description} 
          links={persons.enam.links} 
          img={persons.enam.img}/>
        </Col>
      </Row><br/>

      <Row gutter={[8, 8]} justify="center">
        <PageHeader>
          Special Contributors
        </PageHeader>
      </Row>
      <Row gutter={[8, 8]} style={{marginBottom:32}}>
        <Col span={6}><SpecialContributors 
          title={persons.antar.name}
          description={persons.antar.description} 
          links={persons.antar.links} 
          img={persons.antar.img}/>
        </Col>

        <Col span={6}><SpecialContributors
          title={persons.sagor.name} 
          description={persons.sagor.description}
          links={persons.sagor.links} 
          img={persons.sagor.img}/>
        </Col>
      
        <Col span={6}><SpecialContributors 
          title={persons.tithi.name} 
          description={persons.tithi.description} 
          links={persons.tithi.links} 
          img={persons.tithi.img}/>
        </Col>

        <Col span={6}><SpecialContributors 
          title={persons.arnob.name} 
          description={persons.arnob.description} 
          links={persons.arnob.links} 
          img={persons.arnob.img}/></Col>

      </Row>
      <Row gutter={[8, 8]} justify="center" style={{marginBottom:32}}>
        <Col span={6}><SpecialContributors
          title={persons.bappi.name} 
          description={persons.bappi.description}/>
        </Col>
      </Row><br/><br/>

      <Row gutter={[8, 8]} justify="center">
        <PageHeader>
          Acknowledgements
        </PageHeader>
      </Row>
      <Row gutter={[270, 0]} justify="center" style={{paddingBottom:32}}>
        <Col span={12}><Acknowledgements 
          title={persons.mridul.name} 
          description={persons.mridul.description}/>
        </Col>
      </Row><br/><br/><br/><br/>

      <Row gutter={[8, 8]} justify='center'>
        <h2>
          Organized By  
        </h2>
      </Row>
      <Row gutter={[280, 0]} style={{marginBottom:32}} justify="center">
        <Col span={12}>
          <Organized description={OrganizedDescriptions.cseDept.description} />
        </Col>
      </Row>
      <Row gutter={[280, 0]} style={{marginBottom:32}} justify="center">
        <Col span={12}>
          <Organized description={OrganizedDescriptions.researchCenter.description} />
        </Col>
      </Row>

    </div>
  );
}

export default CreditList;
