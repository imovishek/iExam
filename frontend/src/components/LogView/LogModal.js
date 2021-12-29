import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, DatePicker, Row, Space, Spin, Switch } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onViewStudentLog } from "../Exams/actions";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getLogs } from "../../utitlities/api";
const { RangePicker } = DatePicker;

const getTimeMap = (time) => {
  const tm = moment(time);
  const date = tm.format("dddd, MMMM Do YYYY");
  const t = tm.format("hh:mm A");
  return { Date: date, Time: t };
};
const LoginLogRow = ({ data, time }) => {
  const TableView = ({ header, mapData, height = "100%" }) => (
    <div
      style={{
        border: "1px solid #d5b3e5",
        borderTop: "none",
        height: height,
      }}
    >
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "center",
            background: "#d5b3e5",
          }}
        >
          {header}
        </Col>
      </Row>
      {Object.entries(mapData).map((a) => (
        <Row key={a[0]} style={{ padding: "2px 10px" }}>
          <Col span={12}>{a[0]}</Col>
          <Col span={12}>{a[1]}</Col>
        </Row>
      ))}
    </div>
  );

  return (
    <Row style={{ margin: "10px 5px 0px 5px" }}>
      <Col span={12}>
        <TableView height="50%" header="Login Time" mapData={time}></TableView>
        <TableView
          height="50%"
          header="Device Info"
          mapData={data.data.device}
        ></TableView>
      </Col>

      <Col span={12}>
        <TableView header="IP Info" mapData={data.data.ip}></TableView>
      </Col>
    </Row>
  );
};

const ViewLogs = ({ student, dispatch }) => {
  const [isVisible, setVisible] = useState(false);
  const [defaultRange, setDefaultRange] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOnlyLoginLog, setOnlyLoginLog] = useState(false);

  const setUp = () => {
    // console.log(student.exam);

    const examStart = moment(student.exam.startDate);
    const startTime = moment(student.exam.startTime, "hh:mm A");

    examStart.set("hour", startTime.get("hour"));
    examStart.set("minute", startTime.get("minute"));

    const duration = student.exam.duration.split(":");
    const dHour = parseInt(duration[0]);
    const dMin = parseInt(duration[1]);

    const examEnd = moment(examStart.toString());
    examEnd.add(dHour, "hour");
    examEnd.add(dMin + 20, "minute");

    examStart.subtract(1, "hour");

    setDefaultRange([examStart, examEnd]);
    setVisible(true);
  };

  useEffect(() => {
    if (student._id) setUp();
    else setVisible(false);
  }, [student]);

  useEffect(async () => {
    if (defaultRange.length === 0) return;
    setLoading(true);

    const data = await getLogs({
      email: student.credential.email,
      startTime: defaultRange[0].format(),
      endTime: defaultRange[1].format(),
    });

    console.log(data);

    setData(data);
    setLoading(false);
  }, [defaultRange]);

  const closeModal = () => dispatch(onViewStudentLog({}));

  const banOrUnabn = () => {
    student.bnFunc();
    closeModal();
  };

  const timeChanged = (e) => {
    setDefaultRange(e);
  };

  return (
    <Modal
      title={`Log of ${student.firstName} ${student.lastName} (${student.registrationNo})`}
      visible={isVisible}
      footer={[
        <Button key="2" danger onClick={banOrUnabn}>
          {student.bnText}
        </Button>,
        <Button key="1" type="primary" onClick={closeModal}>
          Close
        </Button>,
      ]}
      closeIcon={
        <FontAwesomeIcon onClick={closeModal} icon={faTimes}></FontAwesomeIcon>
      }
      width={"60vw"}
    >
      <Row align="center">
        <div style={{ margin: "3px 5px 0px 5px" }}>Between</div>
        <RangePicker
          showTime
          separator={"and"}
          showSecond={false}
          onChange={timeChanged}
          defaultValue={defaultRange}
        />
        <div style={{ margin: "3px 20px 0px 15px" }}>
          Login Logs only{" "}
          <Switch
            style={{ marginLeft: "8px" }}
            onChange={(checked) => setOnlyLoginLog(checked)}
          ></Switch>
        </div>
      </Row>

      {isLoading && (
        <div style={{ height: "400px" }}>
          <Spin tip="fetching..."> </Spin>
        </div>
      )}

      {!isLoading && (
        <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
          {data.map((val) => {
            console.log(val);
            if (val.desc === "login")
              return (
                <LoginLogRow
                  data={val}
                  time={getTimeMap(data.time)}
                ></LoginLogRow>
              );
            else if (!isOnlyLoginLog) {
              return <div>other</div>;
            }
          })}
        </div>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  student: state.examData.viewLogForStudent,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLogs);
