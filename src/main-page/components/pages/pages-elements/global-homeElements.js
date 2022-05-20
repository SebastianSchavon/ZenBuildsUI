import styled from "styled-components";

export const BuildDiv = styled.div`
    margin: 2rem;
    padding: 1rem;
    max-width: 30vw;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid beige;
    /* border: 1px solid beige; */
`;

export const Content = styled.p`

    border: 1px solid beige;
    font-size: 110%;
    background: rgba(249, 241, 239, 0.3);
    /* min-height: 40vh; */
    text-align: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    transition: 0.3s ease-in-out;
    opacity: ${props => props.value ? '100%' : '0'};
    min-height: ${props => props.value ? '40vh' : '0'};
    margin-top: ${props => props.value ? '1rem' : '0'};
    margin-top: ${props => props.value ? '1rem' : '0'};
    padding: ${props => props.value ? '1.5rem' : '0'};
`;

export const Title = styled.p`
    font-size: 80%;
    &:hover{
        cursor: pointer;
    }
`;

export const UsernameDisplay = styled.p`
    font-size: 80%;
    margin-left: 2.1rem;
`;

export const Likes = styled.p`
    font-size: 80%;
`;

export const PublishedDate = styled.p`
    font-size: 80%;
`;

export const ContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

`;

export const Page = styled.section`
    

`;

export const Hr = styled.hr`
    width: 40vw;
    border: 1px solid #E0CFCC;
    

`;


export const UserImg = styled.img`
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    margin-bottom: -2.5%;
`;

export const UserHeader = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: center;

`;