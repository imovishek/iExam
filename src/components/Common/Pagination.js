import { Pagination } from 'antd';
import styled from 'styled-components';

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}
const PaginationStyled = styled(Pagination)`
  margin-top: 10px;
  float: right;
`;
const ModifiedPagination = ({
  total = 1,
  current = 1,
  pageSize = 10,
  onChange
}) => <PaginationStyled total={total} current={current} pageSize={pageSize} itemRender={itemRender} onChange={onChange} />;

export default ModifiedPagination;