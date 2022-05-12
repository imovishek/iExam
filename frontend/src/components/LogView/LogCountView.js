import { useEffect, useState } from "react";
import { getLogCounts } from "../../utitlities/api";
import moment from "moment";
import { Spin, Tooltip } from "antd";
import LogModal from "./LogModal";

const ColoredBadge = ({ count, callBack, tooltip }) => (
  <Tooltip placement="top" title={tooltip}>
    <div
      style={{
        borderRadius: "12px",
        display: "inline-block",
        color: "white",
        background:
          count <= 0 || count === undefined || count === null ? "green" : "red",
        fontFamily: "roboto",
        fontWeight: "bolder",
        padding: "1px 8px",
        fontSize: "12px",
        marginLeft: "1px",
      }}
      onClick={callBack}
    >
      {count === undefined || count === null ? 0 : count}
    </div>
  </Tooltip>
);

let range = [];
const LogCountView = ({ studentEmail, exam, showDetails }) => {
  const [counts, setCounts] = useState(null);

  useEffect(async () => {
    // console.log(student.exam);

    const examStart = moment(exam.startDate);
    const startTime = moment(exam.startTime, "hh:mm A");

    examStart.set("hour", startTime.get("hour"));
    examStart.set("minute", startTime.get("minute"));

    const duration = exam.duration.split(":");
    const dHour = parseInt(duration[0]);
    const dMin = parseInt(duration[1]);

    const examEnd = moment(examStart.toString());
    examEnd.add(dHour, "hour");
    examEnd.add(dMin, "minute");

    const data = await getLogCounts({
      email: studentEmail,
      startTime: examStart.format(),
      endTime: examEnd.format(),
    });
    range = [examStart, examEnd];
    setCounts(data);
  }, []);

  // console.log(showDetails);
  if (counts === null) return <>fetching..</>;

  return (
    <>
      <ColoredBadge
        callBack={(e) => {
          showDetails(true, false, range);
          e.preventDefault();
          e.stopPropagation();
        }}
        count={counts.loginCount}
        tooltip={`Made ${
          counts.loginCount === undefined || counts.loginCount === null
            ? 0
            : counts.loginCount
        } login(s) during the exam time`}
      ></ColoredBadge>
      <ColoredBadge
        callBack={(e) => {
          showDetails(false, true, range);
          e.preventDefault();
          e.stopPropagation();
        }}
        count={counts.visibilityCount}
        tooltip={`Changed tabs ${
          counts.visibilityCount === undefined ||
          counts.visibilityCount === null
            ? 0
            : counts.visibilityCount
        } time(s)`}
      ></ColoredBadge>
    </>
  );
};

export default LogCountView;
