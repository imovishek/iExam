import axios from 'axios';
import {
  teachers,
  courses
} from './dummy';
const apiUrl = process.env.REACT_APP_API_URL;

export const apiLogin = async (email, password) => {
  return axios.post(`${apiUrl}/auth/login`, {
    email,
    password
  });
};

export const getCourses = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/courses`, 'get', {}, query)
  .then(res => res.data);

export const getCredentials = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/credentials`, 'get', {}, query)
  .then(res => res.data);

export const getExams = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/exams`, 'get', {}, query)
  .then(res => res.data);

export const getCourseByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/course/${id}`, 'get')
  .then(res => res.data);

export const createCourse = async (course) =>
  requestApiAndGetResponse(`${apiUrl}/courses`, 'post', {
    course
  })
  .then(res => res.data);

export const updateCourse = async (course, update) =>
  requestApiAndGetResponse(`${apiUrl}/course/${course._id}`, 'put', {
    query: {
      _id: course._id
    },
    update: update || course
  })
  .then(res => res.data);

export const deleteCourse = async (course) =>
  requestApiAndGetResponse(`${apiUrl}/course/${course._id}`, 'delete')
  .then(res => res.data);

export const getTeachers = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/teachers`, 'get', {}, query)
  .then(res => res.data);

export const getStudents = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/students`, 'get', {}, query)
  .then(res => res.data);

export const getStudentsByBatch = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/students/batch`, 'get', {}, query)
  .then(res => res.data);

export const createStudent = async (student) =>
  requestApiAndGetResponse(`${apiUrl}/students`, 'post', {
    student
  })
  .then(res => res.data);

export const updateStudent = async (student) =>
  requestApiAndGetResponse(`${apiUrl}/student/${student._id || 'random'}`, 'put', {
    query: {
      _id: student._id
    },
    update: student
  })
  .then(res => res.data);

export const deleteStudent = async (student) =>
  requestApiAndGetResponse(`${apiUrl}/student/${student._id || 'random'}`, 'delete')
  .then(res => res.data);

export const createTeacher = async (teacher) =>
  requestApiAndGetResponse(`${apiUrl}/teachers`, 'post', {
    teacher
  })
  .then(res => res.data);
export const updateTeacher = async (teacher) =>
  requestApiAndGetResponse(`${apiUrl}/teacher/${teacher._id || 'random'}`, 'put', {
    query: {
      _id: teacher._id
    },
    update: teacher
  })
  .then(res => res.data);

export const deleteTeacher = async (teacher) =>
  requestApiAndGetResponse(`${apiUrl}/teacher/${teacher._id || 'random'}`, 'delete')
  .then(res => res.data);

export const updateDeptAdminByID = async (_id, body) =>
  requestApiAndGetResponse(`${apiUrl}/deptAdmin/${_id}`, 'put', {
    update: body
  })
  .then(res => res.data);

export const getUserByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/user/${id}`, 'get')
  .then(res => res.data);

export const updateUserByID = async (_id, body) =>
  requestApiAndGetResponse(`${apiUrl}/user/${_id}`, 'put', {
    update: body
  })
  .then(res => res.data);

export const getExamByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${id}`, 'get')
  .then(res => res.data);

export const requestApiAndGetResponse = (url, method = 'get', body = {}, query = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return axios({
    method,
    url,
    params: query,
    data: body,
    headers,
  });
}

const api = {
  apiLogin,
  getCourses,
  createCourse,
  requestApiAndGetResponse,
  updateCourse,
  deleteCourse,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeachers,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudents,
  getCourseByID,
  updateDeptAdminByID,
  updateUserByID,
  getUserByID,
  getExamByID,
  getExams,
  getCredentials,
  getStudentsByBatch
};

export default api;