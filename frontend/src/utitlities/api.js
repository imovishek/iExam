import axios from "axios";
import { push } from "connected-react-router";
const apiUrl = process.env.REACT_APP_API_URL;

export const apiLogin = async (email, password) =>
  axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });

export const getCourses = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/courses`, "get", {}, query).then(
    (res) => res.data
  );

export const getQuestionsOfMe = async () =>
  requestApiAndGetResponse(`${apiUrl}/questions/me`, "get", {}).then(
    (res) => res.data
  );

export const getCredentials = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/credentials`, "get", {}, query).then(
    (res) => res.data
  );

export const getExams = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/exams`, "get", {}, query).then(
    (res) => res.data
  );

export const updateExam = async (exam, update) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${exam._id || "random"}`, "put", {
    query: {
      _id: exam._id,
    },
    update: update || exam,
  }).then((res) => res.data);

export const getCourseByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/course/${id}`, "get").then(
    (res) => res.data
  );

export const createCourse = async (course) =>
  requestApiAndGetResponse(`${apiUrl}/courses`, "post", {
    course,
  }).then((res) => res.data);

export const updateCourse = async (course, update) =>
  requestApiAndGetResponse(`${apiUrl}/course/${course._id}`, "put", {
    query: {
      _id: course._id,
    },
    update: update || course,
  }).then((res) => res.data);

export const deleteCourse = async (course) =>
  requestApiAndGetResponse(`${apiUrl}/course/${course._id}`, "delete").then(
    (res) => res.data
  );

export const getTeachers = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/teachers`, "get", {}, query).then(
    (res) => res.data
  );

export const getStudents = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/students`, "get", {}, query).then(
    (res) => res.data
  );

export const getStudentsByBatch = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/students/batch`, "get", {}, query).then(
    (res) => res.data
  );

export const createStudent = async (student) =>
  requestApiAndGetResponse(`${apiUrl}/students`, "post", {
    student,
  }).then((res) => res.data);

export const updateStudent = async (student) =>
  requestApiAndGetResponse(
    `${apiUrl}/student/${student._id || "random"}`,
    "put",
    {
      query: {
        _id: student._id,
      },
      update: student,
    }
  ).then((res) => res.data);

export const deleteStudent = async (student) =>
  requestApiAndGetResponse(
    `${apiUrl}/student/${student._id || "random"}`,
    "delete"
  ).then((res) => res.data);

export const createTeacher = async (teacher) =>
  requestApiAndGetResponse(`${apiUrl}/teachers`, "post", {
    teacher,
  }).then((res) => res.data);
export const updateTeacher = async (teacher) =>
  requestApiAndGetResponse(
    `${apiUrl}/teacher/${teacher._id || "random"}`,
    "put",
    {
      query: {
        _id: teacher._id,
      },
      update: teacher,
    }
  ).then((res) => res.data);

export const deleteTeacher = async (teacher) =>
  requestApiAndGetResponse(
    `${apiUrl}/teacher/${teacher._id || "random"}`,
    "delete"
  ).then((res) => res.data);

export const createExam = async (exam) =>
  requestApiAndGetResponse(`${apiUrl}/exams`, "post", {
    exam,
  }).then((res) => res.data);
export const deleteExam = async (exam) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${exam._id}`, "delete").then(
    (res) => res.data
  );
export const updateDeptAdminByID = async (_id, body) =>
  requestApiAndGetResponse(`${apiUrl}/deptAdmin/${_id}`, "put", {
    update: body,
  }).then((res) => res.data);

export const getUserByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/user/${id}`, "get").then(
    (res) => res.data
  );
export const getUsers = (query) =>
  requestApiAndGetResponse(`${apiUrl}/users`, "get", {}, query).then(
    (res) => res.data
  );

export const updateUserByID = async (_id, body) =>
  requestApiAndGetResponse(`${apiUrl}/user/${_id}`, "put", {
    update: body,
  }).then((res) => res.data);

export const getExamByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${id}`, "get").then(
    (res) => res.data
  );

export const getQuestionByID = (id) =>
  requestApiAndGetResponse(`${apiUrl}/question/${id}`, "get").then(
    (res) => res.data
  );

export const createQuestion = async (question) =>
  requestApiAndGetResponse(`${apiUrl}/questions`, "post", {
    question,
  }).then((res) => res.data);

export const updateQuestion = async (question, update) =>
  requestApiAndGetResponse(`${apiUrl}/question/${question._id}`, "put", {
    query: {
      _id: question._id,
    },
    update: update || question,
  }).then((res) => res.data);

export const deleteQuestion = async (question) =>
  requestApiAndGetResponse(`${apiUrl}/question/${question._id}`, "delete").then(
    (res) => res.data
  );

export const requestApiAndGetResponse = (
  url,
  method = "get",
  body = {},
  query = {}
) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios({
    method,
    url,
    params: query,
    data: body,
    headers,
  }).catch((e) => {
    if (e.response.status === 403) {
      localStorage.clear();
      push("/login");
    } else throw e;
  });
};

export const getExamByIDWithPaper = (id, studentID) =>
  requestApiAndGetResponse(
    `${apiUrl}/exam/${id}/paper${studentID ? `?student=${studentID}` : ""}`,
    "get"
  ).then((res) => res.data);

export const getExamPaperWithQuestionID = (id, questionID) =>
  requestApiAndGetResponse(
    `${apiUrl}/exam/${id}/paper${questionID ? `?question=${questionID}` : ""}`,
    "get"
  ).then((res) => res.data);

export const updateExamPaperForStudent = (id, paper) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${id}/paper`, "put", { paper }).then(
    (res) => res.data
  );

export const updateExamPaperForTeacher = (id, paper) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${id}/evaluatepaper`, "put", {
    paper,
  }).then((res) => res.data);
export const getExamUsingFilterByID = (id, filter) =>
  requestApiAndGetResponse(`${apiUrl}/exam/${id}/filter`, "post", filter).then(
    (res) => res.data
  );

const COURSE_UPLOAD_URL = `${apiUrl}/courses/upload`;

export const uploadCoursesFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");
  return axios.post(COURSE_UPLOAD_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const STUDENT_UPLOAD_URL = `${apiUrl}/students/upload`;

export const uploadStudentsFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");
  return axios.post(STUDENT_UPLOAD_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const TEACHER_UPLOAD_URL = `${apiUrl}/teachers/upload`;

export const uploadTeachersFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");
  return axios.post(TEACHER_UPLOAD_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getClarifications = (query) =>
  requestApiAndGetResponse(`${apiUrl}/clarifications`, "get", {}, query).then(
    (res) => res.data
  );

export const createClarification = async (clarification) =>
  requestApiAndGetResponse(`${apiUrl}/clarifications`, "post", {
    clarification,
  }).then((res) => res.data);

export const resetPassword = async (user, password) =>
  requestApiAndGetResponse(`${apiUrl}/user/resetPassword`, "post", {
    user,
    password,
  }).then((res) => res.data);

export const forgotPassword = async (email) =>
  requestApiAndGetResponse(`${apiUrl}/user/forgotPassword`, "post", {
    email,
  }).then((res) => res.data);

export const updateClarification = async (clarification, update) =>
  requestApiAndGetResponse(
    `${apiUrl}/clarification/${clarification._id}`,
    "put",
    {
      query: {
        _id: clarification._id,
      },
      update: update || clarification,
    }
  ).then((res) => res.data);

export const evaluateBroadQuestion = async (code, lang, answer, marks) => {
  const { output, msg } = await requestApiAndGetResponse(
    `${apiUrl}/compiler/runEvaluation`,
    "post",
    {
      code,
      lang,
      answer,
      marks,
    }
  ).then((res) => res.data);
  const array = output.split("\n");
  const lastLine = array[array.length - 1]
    ? array[array.length - 1]
    : array[array.length - 2] || "";
  const evaluation = Number(
    Number(lastLine.replace(/[^0-9.]+/g, "") || "0").toFixed(2)
  );
  return {
    stdout: output,
    value: msg === "error" ? 0 : evaluation,
  };
};

export const runCode = async (code, input) => {
  const { output, msg } = await requestApiAndGetResponse(
    `${apiUrl}/compiler/runCode`,
    "post",
    {
      code,
      lang: "cpp",
      input,
    }
  ).then((res) => res.data);
  const array = output.split("\n");
  const lastLine = array[array.length - 1]
    ? array[array.length - 1]
    : array[array.length - 2] || "";
  const evaluation = Number(
    Number(lastLine.replace(/[^0-9.]+/g, "") || "0").toFixed(2)
  );
  return {
    stdout: output,
    value: msg === "error" ? 0 : evaluation,
  };
};

export const enrollRequest = (courseID) => {
  requestApiAndGetResponse(`${apiUrl}/enrollrequest/${courseID}`, "put").then(
    (res) => res.data
  );
};

export const getUserMe = () =>
  requestApiAndGetResponse(`${apiUrl}/user/me`, "get").then((res) => res.data);

export const updateUserMe = async (body) =>
  requestApiAndGetResponse(`${apiUrl}/user/me`, "put", {
    update: body,
  }).then((res) => res.data);
export const getDeptAdmins = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/deptAdmins`, "get", {}, query).then(
    (res) => res.data
  );
export const deleteDeptAdmin = async (deptAdmin) =>
  requestApiAndGetResponse(
    `${apiUrl}/deptAdmin/${deptAdmin._id || "random"}`,
    "delete"
  ).then((res) => res.data);
export const createDeptAdmin = async (deptAdmin) =>
  requestApiAndGetResponse(`${apiUrl}/deptAdmins`, "post", {
    deptAdmin,
  }).then((res) => res.data);
// requestApiAndGetResponse(`${apiUrl}/superUser`, "post", {
//  deptAdmin,
// }).then((res) => res.data);
export const updateDeptAdmin = async (deptAdmin) =>
  requestApiAndGetResponse(
    `${apiUrl}/deptAdmin/${deptAdmin._id || "random"}`,
    "put",
    {
      query: {
        _id: deptAdmin._id,
      },
      update: deptAdmin,
    }
  ).then((res) => res.data);

export const getDepts = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/depts`, "get", {}, query).then(
    (res) => res.data
  );
export const deleteDept = async (dept) =>
  requestApiAndGetResponse(
    `${apiUrl}/dept/${dept._id || "random"}`,
    "delete"
  ).then((res) => res.data);
export const createDept = async (dept) =>
  requestApiAndGetResponse(`${apiUrl}/depts`, "post", {
    dept,
  }).then((res) => res.data);
export const updateDept = async (dept) =>
  requestApiAndGetResponse(`${apiUrl}/dept/${dept._id || "random"}`, "put", {
    query: {
      _id: dept._id,
    },
    update: dept,
  }).then((res) => res.data);

export const logLogin = async (email, ipInfo) => {
  requestApiAndGetResponse(`${apiUrl}/log/login`, "post", {
    email: email,
    ip: ipInfo,
  }).then((res) => res.data);
};

export const logVisibility = async (email, data) => {
  requestApiAndGetResponse(`${apiUrl}/log/visibility`, "post", {
    email: email,
    data: data,
  }).then((res) => res.data);
};

export const getLogs = async (query) =>
  requestApiAndGetResponse(`${apiUrl}/log/getLogs`, "post", query).then(
    (res) => res.data
  );

const api = {
  getUserMe,
  updateUserMe,
  apiLogin,
  getCourses,
  getQuestionsOfMe,
  createCourse,
  getCourseByID,
  updateCourse,
  enrollRequest,
  requestApiAndGetResponse,
  deleteCourse,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeachers,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudents,
  updateDeptAdminByID,
  updateUserByID,
  getUserByID,
  getExamByID,
  getExams,
  createExam,
  updateExam,
  getCredentials,
  getStudentsByBatch,
  createQuestion,
  getQuestionByID,
  updateQuestion,
  deleteQuestion,
  getExamByIDWithPaper,
  getExamPaperWithQuestionID,
  updateExamPaperForStudent,
  updateExamPaperForTeacher,
  getExamUsingFilterByID,
  uploadCoursesFile,
  uploadStudentsFile,
  uploadTeachersFile,
  getClarifications,
  createClarification,
  updateClarification,
  getUsers,
  evaluateBroadQuestion,
  deleteExam,
  resetPassword,
  forgotPassword,
  runCode,
  getDeptAdmins,
  deleteDeptAdmin,
  createDeptAdmin,
  updateDeptAdmin,
  getDepts,
  deleteDept,
  createDept,
  updateDept,
};

export default api;
