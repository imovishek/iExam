import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../../utitlities/api';
import styled from "styled-components";
import CourseTable from "./CourseTable";
import { Button } from "antd";
import { setUserAction } from "../../Login/actions";

const LabelWrapper = styled.div`
  color: grey;
  margin-bottom: 10px;
`;

const CourseTableWrapper = styled.div`
  margin-top: 50px;
`;
const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;

const CreateNewCourseWrapper = styled.div`
  float: right;
`;

const ButtonStyled = styled(Button)`
  height: 30px;
  margin-right: 10px;
`;
const CourseButtonWrapper = styled.div`
  float: right;
`;

const Courses = ({ user, dispatch }) => {
  const [isCoursesChanged, setCourseChanged] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isCoursesChanged) {
      const { courseIDs = [] } = user;
      try {
        const { payload = [] } = await api.getCourses({});
        setCourses(payload);
      } catch (err) {
        console.log(err);
      } finally {
        setCourseChanged(false);
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCoursesChanged]);

  const createCourseHandler = async (course) => {
    setLoading(true);
    course.assignedTeacher = course.assignedTeacher._id;
    const { payload: newCourse } = await api.createCourse(course);
    const { payload: newUser } = await api.updateUserByID(user._id, { $push: { courseIDs: newCourse._id } });
    dispatch(setUserAction(newUser));
    setCourseChanged(true);
  };

  const updateCoursesOnUI = async() => {
    setCourseChanged(true);
  }

  const updateCourseHandler = async (course) => {
    await api.updateCourse(course);
    setCourseChanged(true);
  };

  const deleteCourseHandler = async (course) => {
    setLoading(true);
    await api.deleteCourse(course);
    const { payload: newUser } = await api.updateUserByID(user._id, { $pull: { courseIDs: course._id } });
    dispatch(setUserAction(newUser));
    setCourseChanged(true);
  };

  return (
    <div>
      <CheckAuthentication />
      <BodyWrapper>
        <NavBar />
        <Container>
          <PageHeader>Courses</PageHeader>
          <CourseTableWrapper>
            <CourseTable
              user={user}
              courses={courses}
              isLoading={isLoading}
              updateCoursesOnUI={updateCoursesOnUI}
            />
          </CourseTableWrapper>
        </Container>
      </BodyWrapper>

    </div>
  )
};
const mapStateToProps = state => ({
  user: state.login.user,
  courses: state.courseData.courses
});

const mapDispatchToProps = dispatch => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(Courses);