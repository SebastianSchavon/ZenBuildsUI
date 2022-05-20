import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
import { NavLink as Link } from 'react-router-dom'

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 30%;
    background-color: #0d0d0d;
    display: grid;
    align-items: center;
    left: 0;
    transition: 0.3s ease-in-out;
    /* opacity: ${({ visibillity }) => (visibillity ? '100%' : '0')};
    top: ${({ visibillity }) => (visibillity ? '0' : '-100%')};  */
    opacity: ${props => props.value ? '100%' : '0'};
    top: ${props => props.value ? '0' : '-100%'};
`

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`

export const SidebarLink = styled(Link)`
    width: 100%;
    text-align: center;
    text-decoration: none;
    font-size: 40px;
    color: #fff;
    text-decoration: none;
    height: 100%;

    &:hover{
        color: #15cdfc;
    }
    &.active{
        color: #15cdfc;
    }

`

export const SidebarMenu = styled.nav`
    display: flex;
    flex-direction: column;
`

export const SidebarWrapper = styled.div`

`
