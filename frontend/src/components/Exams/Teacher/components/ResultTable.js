import Search from "antd/lib/input/Search";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";
import _ from "underscore";
import api from "../../../../utitlities/api";
import { useEffect, useState } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { RightButtonWrapper } from "../../../styles/pageStyles";
import { Button, message } from "antd";
import confirm from "antd/lib/modal/confirm";
import { TableRowStyled } from "../../../styles/tableStyles";

const SearchStyled = styled(Search)`
  width: 100%;
  margin-bottom: 10px;
`;

const Container = styled.div`
  overflow: auto;
  height: 100%;
  padding: 20px;
`;

const HeaderLabel = styled.h3``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: grid;
  border-radius: 5px;
  grid-gap: 10px;
  grid-template-columns: ${(props) => props.columns || "auto"};
`;

const Body = styled.div`
  overflow: auto;
  height: calc(100% - 120px);

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
const getName = (student) => `${student.firstName} ${student.lastName}`;
const Card = ({ dispatch, studentInfo, exam }) => (
  <TableRowStyled
    onClick={() => dispatch(push(`/exam/${exam._id}/paper/${studentInfo._id}`))}
    columns="repeat(2, 1fr) 1fr 1fr"
  >
    <Wrapper>{studentInfo.registrationNo}</Wrapper>
    <Wrapper>{getName(studentInfo)}</Wrapper>
    <Wrapper> {studentInfo.answeredQuestions} </Wrapper>
    <Wrapper>{studentInfo.totalMarks}</Wrapper>
  </TableRowStyled>
);

const mapStudentData = (students, papers) => {
  const studentData = _.map(students, (student) => {
    const arr = _.filter(papers, (paper) => student._id === paper.student);
    const paper = arr[0];
    let count = 0;
    _.each(paper ? paper.answers : null, (answer) => {
      if (answer && answer.answer) count += 1;
    });
    return {
      ...student,
      answeredQuestions: count,
      totalMarks: paper ? paper.totalMarks : 0,
    };
  });
  return studentData;
};

const mapStudentDataToCSV = (studentsData) =>
  ["Reg No.,Name,TotalMarks"]
    .concat(
      studentsData.map(
        (student) =>
          `${student.registrationNo},${getName(student)},${student.totalMarks}`
      )
    )
    .join("\n");

const ResultTable = ({ students, exam, updateExamOnUI, dispatch, papers }) => {
  const [searchStudents, setSearchStudents] = useState(students);
  useEffect(() => {
    setSearchStudents(students);
  }, [students]);

  const studentsData = mapStudentData(searchStudents, papers);
  const handleSearch = (value) => {
    const pattern = value.trim().replace(/ +/g, "").toLowerCase();

    const afterSearchStudents = _.filter(students, (student) =>
      `${student.firstName}${student.lastName}${student.registrationNo}`
        .trim()
        .replace(/ +/g, "")
        .toLowerCase()
        .includes(pattern)
    );
    setSearchStudents(afterSearchStudents);
  };

  const handlePublishResults = (e) => {
    confirm({
      title: "Do you want to publish the results?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "Yes",
      onOk() {
        return api
          .updateExam(exam, {
            resultPublished: true,
            resultPublishedDate: moment().format(),
          })
          .then(() => updateExamOnUI())
          .then(() => message.success("Result successfully published!"))
          .catch(() => message.error("Oops, error occurred! Try again later"));
      },
      onCancel() {},
    });
  };

  const handleExportCSV = (e) => {
    const contentType = "text/csv";
    const csvFile = new Blob([mapStudentDataToCSV(studentsData)], {
      type: contentType,
    });
    const url = window.URL.createObjectURL(csvFile);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${exam.title}_results.csv`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    message.success("CSV exported successfully!");
  };

  return (
    <Container>
      <Row columns="270px auto">
        <SearchStyled
          allowClear
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <RightButtonWrapper>
          <Button
            disabled={exam.resultPublished}
            type="primary"
            onClick={handlePublishResults}
          >
            {exam.resultPublished ? "Result Published" : "Publish Results"}
          </Button>
          <Button type="primary" onClick={handleExportCSV}>
            Export CSV
          </Button>
        </RightButtonWrapper>
      </Row>

      <Row columns="repeat(2, 1fr) 1fr 1fr">
        <HeaderLabel>Reg No.</HeaderLabel>
        <HeaderLabel>Name</HeaderLabel>
        <HeaderLabel>Answered Questions</HeaderLabel>
        <HeaderLabel>TotalMarks</HeaderLabel>
      </Row>
      <Body>
        {_.map(studentsData, (studentInfo, index) => (
          <Card
            studentInfo={studentInfo}
            dispatch={dispatch}
            key={`result_${index}`}
            exam={exam}
          />
        ))}
      </Body>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(null, mapDispatchToProps)(ResultTable);
