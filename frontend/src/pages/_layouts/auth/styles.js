import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 32px 0;

  form{
    padding: 48px;
    width: 300px;
    box-shadow: var(--box-shadow);
    margin-bottom: 32px;
  }

  @media(max-width: 500px){
    form{
      width: 300px;
      box-shadow: none;
      padding: 16px;
      margin-bottom: 0;
    }
  }

`;
