import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    --primary-color: #495AFF;
    --success-color: #00ECBC;
    --success-color-dark: #2fd6b4;
    --error-color: #FF5864;
  }

  *{
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6{
    &.ant-typography{
      font-weight: normal;
    }
  }

  .container{
    max-width: 1040px;
    margin: auto;
  }

  .align-center{
    text-align: center;
  }

  .primary{
    color: var(--primary-color) !important;
  }

  .success{
    color: var(--success-color);
  }

  .error{
    color: var(--error-color);
  }

  .capitalize{
    text-transform: capitalize;
  }

  .form-product{
    display: flex;
    >div { 
      margin-right: 10px;
    }
  }

  .inputmask{
    width: 100%;
    border: 1px solid #d9d9d9;
    padding: 4px 11px;
    border-radius: 2px;
    transition: all 0.3s;
    
    &:focus{
      border-color: #7385ff;
      box-shadow: 0 0 0 2px rgba(73, 90, 255, 0.2);
      border-right-width: 1px !important;
      outline: 0;
    }
  }

`;
