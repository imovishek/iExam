import CheckAuthentication from "../CheckAuthentication/CheckAuthentication";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../utitlities/api';
import { onUpdateCourses } from "./actions";
import styled from "styled-components";
import CourseTable from "./CourseTable";
import { Button } from "antd";
import CreateEditCourseModal from "./CreateEditCourseModal";


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

const Courses = ({ courses, user, dispatch }) => {
    const [isCoursesChanged, setCourseChanged] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);

    useEffect(() => {
      if (isCoursesChanged) {
        const { courseIDs = [] } = user;
        api.getCourses(courseIDs)
        .then(({ payload }) => {
            dispatch(onUpdateCourses(payload));
            setCourseChanged(false);
            setLoading(false);
        });
      }
    }, [isCoursesChanged]);

    const createCourseHandler = async (course) => {
      setLoading(true);
      await api.createCourse(course);
      // await api.updateDeptAdmin(user._id, { courseIDs: { $push: course._id } });
      setCourseChanged(true);
    };

    const updateCourseHandler = async (course) => {
      await api.updateCourse(course);
      setCourseChanged(true);
    };

    const deleteCourseHandler = async (course) => {
      setLoading(true);
      await api.deleteCourse(course);
      setCourseChanged(true);
    };

    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                    <PageHeader>Courses</PageHeader>
                    <CreateNewCourseWrapper>
                      <Button
                        onClick={() => {
                          setShowCreateEditModal(true);
                          setSelectedCourse(null);
                        }}
                        type="primary"
                      >
                          Create New Course
                      </Button>
                    </CreateNewCourseWrapper>
                    <CourseTableWrapper>
                      <CourseTable
                        courses={courses}
                        isLoading={isLoading}
                        setCourseToEdit={(selectedCourse) => {
                          setSelectedCourse(selectedCourse);
                        }}
                        showCreateEditModal={(value) => setShowCreateEditModal(value)}
                        deleteCourse={deleteCourseHandler}
                      />
                    </CourseTableWrapper>
                    <CreateEditCourseModal
                      visible={showCreateEditModal}
                      selectedCourse={selectedCourse}
                      setVisibility={setShowCreateEditModal}
                      createCourse={createCourseHandler}
                      updateCourse={updateCourseHandler}
                    />
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