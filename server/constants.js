exports.httpStatuses = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
}

exports.allBatches = {
  2019: '2019 Batch',
  2018: '2018 Batch',
  2017: '2017 Batch',
  2016: '2016 Batch',
  2015: '2015 Batch',
  others: 'Others',
};

exports.allStatuses = {
  upcoming: 'Upcoming',
  running: 'Running',
  ended: 'Ended',
}

exports.TEACHER = 'teacher';
exports.STUDENT = 'student';
exports.DEPTADMIN = 'deptAdmin';
exports.SUPERADMIN = 'superUser';

exports.UPCOMING = 'upcoming';
exports.RUNNING = 'running';
exports.ENDED = 'ended';


exports.timeFormat = "hh:mm A";
exports.durationFormat = "HH:mm";

exports.inputDateFormats = [
  'DD/MM/YY',
  'DD/MM/YY',
  'DD-MM-YY',
  'MM-DD-YY',
  'MM/DD/YY',
  'DD/MM/YYYY',
  'DD/MM/YYYY',
  'DD-MM-YYYY',
  'MM-DD-YYYY',
  'MM/DD/YYYY',
];

exports.requiredCsvHeaders = {
  COURSE: [
    "Course Title",
    "Course Code",
    "Batch",
    "Start Date",
    "Status"
  ],
  STUDENT: [
    "First Name",
    "Last Name",
    "Registration Number",
    "Phone Number",
    "Email"
  ],
  TEACHER: [
    "First Name",
    "Last Name",
    "Short Name",
    "Designation",
    "Phone Number",
    "Email"
  ]
}

exports.ANSWER_TYPES = {
  'plain-text': 'Plain Text',
  'rich-text': 'Rich Text',
  'code': 'Code',
};
