import React from "react";

const headerTextStyleObject = { padding: "0", margin: "0", color: "white" };

const EmptyUpcommingExamTable = () => (
  <div style={{ margin: "20px", paddingBottom: "20px" }}>
    <h3 style={{ marginLeft: "12px", marginBottom: "-5px" }}>
      Upcomming Exams
    </h3>
    <p style={{ color: "grey",margin:"25px" }}>No Exams</p>
  </div>
);

export default EmptyUpcommingExamTable;
