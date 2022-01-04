## Motivation behind this project:

When we first heard about this project, it was already working great. My vision was to see SUST intitially, to use this piece of software to assess students even if they are not in campus due to pandemic or whataever the reason is. Also an online exam management system is not only taking the exam, also it automates and reduces a lot of work load for the teacher as well as department, which could enable them to be more productive and help us be better engineers!

## Clarifications:

This is a project mainly started by Ovishek Paul(Software Engineer, Re:cruit) and Md Maruful Alam(Student,CSE, SUST) under the supervision of Enamul Hassan(Asistant Professor, Dept. of CSE, SUST). Our team contributed in this project as a part of our project-250 course offered by our university. Features implemented by our team is described below:

## Key Features

- Creating MCQ/free-text/code based Exam
- Evaluating and grading (auto/manual)
- Integrity testing
- creating dummy accounts for students to attempt one exam
- evaluating dynamic answers by running a code
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
