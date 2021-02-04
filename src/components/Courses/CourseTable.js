
import styled from "styled-components";
import _ from 'underscore';
import { Spin, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FlexBoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  background: #cecece;
  margin-top: 5px;
`;

const FlexChildHeader = styled.div`
  flex: 1;
  font-weight: 600;
  padding: 10px;
  text-align: center;
  height: 60px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;


const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  background: #e6e6e6;
  margin-top: 5px;
`;

const FlexChild = styled.div`
  flex: 1;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  height: 60px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

const SpinWrapper = styled.div`
  text-align: center;
  margin-top: 50px;;
  height: 100%;
  width: 100%;
  z-index: 1000;
`;
const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
`;

const OperationWrapper = styled.div`
  float: right;
`;

const getName = obj => `${obj.firstName} ${obj.lastName}`;

const CourseCard = ({ course }) => {
    return (
        <FlexBox>
            <FlexChild> { course.title } </FlexChild>
            <FlexChild> { course.courseCode } </FlexChild>
            <FlexChild> { course.assignedTeacher ? getName(course.assignedTeacher) : 'Unassigned'} </FlexChild>
            <FlexChild> { course.department.departmentCode } </FlexChild>
            <FlexChild> { course.status } </FlexChild>
            <FlexChild>
                <OperationWrapper>
                  <Button>Edit</Button>
                <FontAwesomeIconWrapper icon={faTrash} color="#a02f2f" />
              </OperationWrapper>
            </FlexChild>
        </FlexBox>
    )
};

const CourseTable = ({ courses, isLoading }) => {
    return (
      <div>
        <FlexBoxHeader>
            <FlexChildHeader> Course Title </FlexChildHeader>
            <FlexChildHeader> Course Code </FlexChildHeader>
            <FlexChildHeader> Assigned Teacher </FlexChildHeader>
            <FlexChildHeader> Department </FlexChildHeader>
            <FlexChildHeader> Status </FlexChildHeader>
            <FlexChildHeader></FlexChildHeader>
        </FlexBoxHeader>
        { !isLoading && _.map(courses, (course, index) => (
            <CourseCard key={`courses_${index}`} course={course} />
        ))}
        { isLoading &&
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        }
      </div> 
    );
};

  
export default CourseTable;