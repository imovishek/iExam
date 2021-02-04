import { Pagination } from 'antd';

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}
const ModifiedPagination = ({
  total = 1,
  current = 1,
  pageSize = 10,
  onChange
}) => <Pagination total={total} current={current} pageSize={pageSize} itemRender={itemRender} onChange={onChange} />;

export default ModifiedPagination;