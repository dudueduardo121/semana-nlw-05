import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${props => props.theme.colors.background};
    }

    h1,h2,h3,h4,h5,h6,table,tbody,thead,tr,th,td,p,a,title,span,strong{
        color: ${props => props.theme.colors.text}
    }



`;