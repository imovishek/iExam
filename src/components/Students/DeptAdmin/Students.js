import CheckAuthentication from "../../CheckAuthentication/CheckAuthentication";
import NavBar from "../../NavBar/NavBar";
import { connect } from "react-redux";
import { BodyWrapper, Container } from "../../../utitlities/styles";
import React, { useEffect, useState } from "react";
import api from '../../../utitlities/api';
import { onUpdateStudents } from "../actions";
import styled from "styled-components";
import StudentTable from "./StudentTable";
import { Button } from "antd";
import CreateEditStudentModal from "./CreateEditStudentModal";


const StudentTableWrapper = styled.div`
  margin-top: 50px;
`;
const PageHeader = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #828b94;
  user-select: none;
`;

const CreateNewStudentWrapper = styled.div`
  float: right;
`;

const Students = ({ students, user, dispatch }) => {
    const [isStudentsChanged, setStudentChanged] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);

    useEffect(() => {
      if (isStudentsChanged) {
        const { studentIDs = [] } = user;
        api.getStudents({ _id: { $in: studentIDs } })
        .then(({ payload }) => {
            console.log(payload);
            dispatch(onUpdateStudents(payload));
            setStudentChanged(false);
            setLoading(false);
        });
      }
    }, [isStudentsChanged]);

    const createStudentHandler = async (student) => {
      setLoading(true);
      await api.createStudent(student);
      // await api.updateDeptAdmin(user._id, { studentIDs: { $push: student._id } });
      setStudentChanged(true);
    };

    const updateStudentHandler = async (student) => {
      await api.updateStudent(student);
      setStudentChanged(true);
    };

    const deleteStudentHandler = async (student) => {
      setLoading(true);
      await api.deleteStudent(student);
      setStudentChanged(true);
    };

    return (
        <div>
            <CheckAuthentication />
            <BodyWrapper>
                <NavBar />
                <Container>
                    <PageHeader>Students</PageHeader>
                    <CreateNewStudentWrapper>
                      <Button
                        onClick={() => {
                          setShowCreateEditModal(true);
                          setSelectedStudent(null);
                        }}
                        type="primary"
                      >
                          Create New Student
                      </Button>
                    </CreateNewStudentWrapper>
                    <StudentTableWrapper>
                      <StudentTable
                        students={students}
                        isLoading={isLoading}
                        setStudentToEdit={(selectedStudent) => {
                          setSelectedStudent(selectedStudent);
                        }}
                        showCreateEditModal={(value) => setShowCreateEditModal(value)}
                        deleteStudent={deleteStudentHandler}
                      />
                    </StudentTableWrapper>
                    {/* <CreateEditStudentModal
                      visible={showCreateEditModal}
                      selectedStudent={selectedStudent}
                      setVisibility={setShowCreateEditModal}
                      createStudent={createStudentHandler}
                      updateStudent={updateStudentHandler}
                    /> */}
                </Container>
            </BodyWrapper>
            
        </div>
    )
};
const mapStateToProps = state => ({
    user: state.login.user,
    students: state.studentData.students
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

  
export default connect(mapStateToProps, mapDispatchToProps)(Students);