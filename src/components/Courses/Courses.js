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
    const isCoursesChanged = false;
    const [isLoading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);
    useEffect(() => {
        const { courseIDs = [] } = user;
        api.getCourses(courseIDs)
        .then(({ payload }) => {
            dispatch(onUpdateCourses(payload));
            setLoading(false);
        });

    }, [isCoursesChanged]);

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
                        />
                    </CourseTableWrapper>
                    <CreateEditCourseModal
                      visible={showCreateEditModal}
                      selectedCourse={selectedCourse}
                      setVisibility={setShowCreateEditModal}
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