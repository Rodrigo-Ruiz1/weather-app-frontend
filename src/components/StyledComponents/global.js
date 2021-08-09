import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.fontColor};
    }
`
export const NavDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

export const NavUl = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-between;
`