## Motivation behind this project:

When we first heard about this project, it was already working great. My vision was to see SUST intitially, to use this piece of software to assess students even if they are not in campus due to pandemic or whataever the reason is. Also an online exam management system is not only taking the exam, also it automates and reduces a lot of work load for the teacher as well as department, which could enable them to be more productive and help us be better engineers!

## Clarifications:

This is a project mainly started by Ovishek Paul(Software Engineer, Re:cruit) and Md Maruful Alam(Student,CSE, SUST) under the supervision of Enamul Hassan(Asistant Professor, Dept. of CSE, SUST). Our team contributed in this project as a part of our project-250 course offered by our university. Features implemented by our team is described below:

## Key Features

- Creating MCQ/free-text/code based Exam
- Evaluating and grading (auto/manual)
- Improving the UI
- Creating a dashboard for student/teacher where all the features can be accessed easily
- Allowing students to use the site only from one device at a time
- Monitoring students' activity during the exam 
- Integrity testing
- creating dummy accounts for students to attempt one exam
- Evaluating dynamic answers by running a code
- Publishing results of a exam/test without any hassle

## Contributions of Antar Roy (2018331040)

- Application Changes

  - Realtime Data transferring between frontend and backend (exam updates, clarifications/announcements)
    - Creating Socket server, authenticating a clients connection based on the token
    - sending events from server to client.
    - client listens to specific event's.
    - recieving the events and update the ui accordingly.
  - Creation of dummy accounts with random passwords
    - Frontend takes a csv input of registration number's and names of student's
    - backend creates account with random password.
    - a csv is created with the registration number password mapping and sent back to client.
  - Frontend Theming, Loader and more updates that makes the app more user interactive.
  - Fix Email sending service
    - Migrate nodemailer to Sendgrid
  - Merging two different (backend + frontend) git repo and merge into one
  - Make React app faster
    - Lazily loaded all the components on demand, which saves a lot of bandwith also makes the app faster
  - Introduces Production Build and fixed issues with dev mode

- Deployment Process (Digital Ocean & SUST Local sever)
  - blocking all ports excepts for 80 and 443 and a custom ssh port
  - Installing all the dependencies ()
  - configuring nginx proxy to route all `/` to react frontend and `/api` to node.js backend
  - Install docker and start a mongodb container
  - setup ssh and create bash script to make redeployment semi-automatic
  - Configuring services to run without sticking to terminal session


## Contributions of Faridul Reza Sagor (2018331012)

- Frontend Design

  - Designing the login window
  - Designing a student's dashboard where student can -
    - see their upcoming exams with useful statistics
    - access their running exam with one click
  - Designing a Teacher's dashboard where teachers can -
    - see the running exam(s) of their courses
    - create exams easily from dashboard
    - see exam or course statistics and access them easily

- Allowing student accounts to have only one active session (Backend)

  - created a new database (logs) with the most efficient database scheme for logging & querying student activities (login activity & tab visibility)
  - worked with JWT for allowing one active session
  - modified the frontend's all API call's response delivery system so that the user is automatically logged out on requests made with invalidated JWT token

- Student's activity monitoring

  - New login made by students will be logged to the server. The log contains-
    - Device info 
    - IP info (public).
    Along with the time of login
   
  - When an exam is running students tab visibility is monitored. When the tab is 100% invisible (by means of tab change, browser minimization or overlay by other programs) a log entry will be registered against the student.

- Showing the logs to the frontend

  - Created a Modal view with where teachers can-
    - Query all the logs by a timeframe
    - filter out logs
    - see details of the logs
  - Created a view for activity summary on exam page
    - Teachers can see the count of how many logins or tab changes had been made while an exam was running
    - Access the details of the activity with appropriate filter with one click
  
