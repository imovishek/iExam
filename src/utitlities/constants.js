export const hasPageAccess = {
    deptAdmin: {
        Courses: true,
        Teachers: true,
        Students: true,
        CoursePage: true,
        ExamPage: true,
    },
    student: {
        Exams: true,
        Courses: true,
    }
};

export const ignoreKeys = {
    updatedAt: true,
    createdAt: true,
    __v: true,
    department: true,
};