import styled from 'styled-components';

const IndexCount = styled.section`
  width: 100%;
  max-width: 960px;
  margin: 3rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 2rem;
  a:hover {
    text-decoration: none;
  }
  .show-count {
    text-align: center;
    padding: 1.5rem 0;
    &:hover {
      background-color: lavender;
    }
    p {
      text-transform: uppercase;
      font-size: 0.65rem;
    }
  }
`;

export default IndexCount;
