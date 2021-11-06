import { typeToQuestionBody } from "../constants";

const QuestionBody = (props) => {
  const Body = typeToQuestionBody[props.question.type];
  if (!Body) return null;
  return (
    <Body {...props}/>
  );
};

export default QuestionBody
