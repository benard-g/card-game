import styled from 'styled-components';

export const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.background};
`;
