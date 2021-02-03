import styled from "styled-components";

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
  align-items: space-around;
  `;

export const Container = styled.div`
    display: inline-block;
    padding: 30px 20px;
    height: 100%;
    overflow: scroll;
    flex-grow: 100;
`;

export const Text = styled.div`
    font-weight: 800;
    font-family: arial;
    color: #505250;
`;

export const Box = styled.div`
    background: ${(props) => props.bgColor || 'gray'};
    width: ${(props) => props.width || '200px'};
    height: ${(props) => props.height || '70px'};
    display: block;
`;