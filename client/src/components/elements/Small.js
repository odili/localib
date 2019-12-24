import styled from 'styled-components';

const Small = styled.small`
  color: ${props => {
    if (props.status === 'AVAILABLE') {
      return '#28a745';
    } else if (props.status === 'LOANED') {
      return '#ffc107';
    } else {
      return '#dc3545';
    }
  }};
`;
export default Small;
