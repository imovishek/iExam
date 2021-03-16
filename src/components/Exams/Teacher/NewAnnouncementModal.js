import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, Select, Button, Upload, Dropdown, message } from "antd";
import _ from "underscore";
import api from "../../../utitlities/api";

import { UploadOutlined } from "@ant-design/icons";
import { options } from "@hapi/joi";
import TextArea from "antd/lib/input/TextArea";
import { Col } from "../../../utitlities/styles";

const { Option } = Select;

const Row = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "none"};
`;

const ColumnWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 15px;
`;

const StyledSelect = styled(Select)`
  margin-left: 20px;
  width: 120px;
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
        <div>
          To:
          <StyledSelect value={form.securityType} onChange={(value) => setForm({ ...form, securityType: value })} >
            <Option value="public">Public</Option>
            <Option value="private">Private</Option>
          </StyledSelect>
        </div>
        <TextArea value={form.body} rows={5} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      </Col>
    </Modal>
  );
};

export default NewAnnouncementModal;
