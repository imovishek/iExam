import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, Select, message } from "antd";
import api from "../../../utitlities/api";

import TextArea from "antd/lib/input/TextArea";
import { CenterText, Col } from "../../../utitlities/styles";
import { PRIVATE } from "../../../utitlities/constants";
import { getName } from "../../../utitlities/common.functions";

const { Option } = Select;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${(props) => props.columns || "none"};
`;


const StyledSelect = styled(Select)`
  width: 100%;
`;

const NewAnnouncementModal = ({
  user,
  visible,
  setVisibility,
  exam,
  updateExamOnUI,
}) => {
  const defaultAnnouncement = { securityType: 'public', body: '', access: [], authorID: user._id };
  const [form, setForm] = useState(defaultAnnouncement)
  const createAnnouncementHandler = async (e) => {
    form.dateTime = new Date();
    await api.updateExam(exam, { $push: { announcements: form } });
    await updateExamOnUI();
    message.success('Successfully created!')
  };
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  useEffect(async () => {
    if (!exam.course) return {};
    try {
      const { payload: users } = await api.getUsers({
        _id: {
          $in: exam.course.enrolledStudents,
        },
        userType: 'student',
      });
      setEnrolledStudents(users);
    } catch (error) {
      
    }
  }, [exam])
  const closeModal = () => {
    setVisibility(false);
    setForm(defaultAnnouncement);
  };

  const onSubmit = () => {
    createAnnouncementHandler();
    closeModal();
  };

  return (
    <Modal
      title={"Create New Announcment"}
      visible={visible}
      width={520}
      height={500}
      style={{ height: "600px" }}
      onOk={() => onSubmit()}
      onCancel={() => closeModal()}
      okText="Create"
    >
      <Col rows="30px 1fr">
        <Row columns="30px 1fr 2fr">
          <CenterText>To: </CenterText>
          <StyledSelect value={form.securityType} onChange={(value) => setForm({ ...form, securityType: value })} >
            <Option value="public">Public</Option>
            <Option value="private">Private</Option>
          </StyledSelect>
          {form.securityType === PRIVATE && (
            <Select
              style={{ width: '100%' }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
              onChange={(v) => setForm({...form, access: [v]})}
              value={form.access && form.access[0]}
              placeholder="Select Student"
            >
              {enrolledStudents.map((std, index) => (
                <Option key={std._id} value={std._id}>{`${getName(std)} (${std.registrationNo})`}</Option>
              ))}
            </Select>
          )}
        </Row>
        <TextArea value={form.body} rows={5} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      </Col>
    </Modal>
  );
};

export default NewAnnouncementModal;
