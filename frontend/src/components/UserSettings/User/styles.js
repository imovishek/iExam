import styled from "styled-components";

const VInput = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: 400px;
  color: black;
`;

export const ViewInput = ({ value, defaultValue }) => <VInput>{value || defaultValue || "N/A"}</VInput>;
export const ViewSelect = ({ value, defaultValue, mapper }) => <VInput>{ mapper[value || defaultValue] || "N/A"}</VInput>;
