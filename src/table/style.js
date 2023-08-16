import styled from 'styled-components';
import { device } from '../responsive';
import { ReactComponent as close } from '../assets/icons/to-right.svg';
import { ReactComponent as menu } from '../assets/icons/hamburger.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    padding-top: 10px;
    @media ${device.laptop} {
        padding: 0 10px;
        height: 100vh;
    }
`;

const Main = styled.div`
    max-width: 90vw;
    width: 100%;
    height: 90vh;
    overflow-y: auto;
    border: 1px solid coral;
    border-radius: 10px;
    @media ${device.laptop} {
        overflow-x: auto;
    }
    @media ${device.mobile} {
        max-width: 98vw;
        position: relative;
    }
`;
const Head = styled.div`
    display: flex;
    position: sticky;
    top: 0px;
    width: 100%;
    justify-content: space-around;
    background-color: coral;
    @media ${device.laptop} {
        width: 1100px;
    }
    @media ${device.mobile} {
        position: -webkit-sticky;
        position: -moz-sticky;
        position: -o-sticky;
        position: -ms-sticky;
        position: sticky;
    }
`;
const HeadText = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    flex: ${({ flex }) => (flex ? `${flex}` : '1')};
    text-align: center;
    @media ${device.mobile} {
        margin: 5px 0;
        font-size: 15px;
    }
`;

const Body = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media ${device.laptop} {
        width: 1100px;
    }
`;
const BodyText = styled.p`
    font-size: 1rem;
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    flex: ${({ flex }) => (flex ? `${flex}` : '1')};
    @media ${device.mobile} {
        margin: 5px 0;
        font-size: 14px;
    }
`;
const BodyWrap = styled.div`
    display: flex;
    flex-direction: column-reverse;
`;

const LoginBox = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 400px;
    height: 300px;
    color: #fff;
    background: #0e3b68;
    border-radius: 10px;
    @media ${device.mobile} {
        width: 320px;
        height: 270px;
    }
`;
const LoginInput = styled.input`
    height: 40px;
    width: 260px;
    border-radius: 8px;
    margin-bottom: 20px;
    outline: 0;
    padding: 0 20px;
    font-size: 1rem;
`;
const LoginBtn = styled.div`
    height: 40px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    background: #1cbcff;
    cursor: pointer;
`;
const BtnBox = styled.div`
    display: flex;
    width: 90%;
    @media ${device.laptop} {
        width: 95%;
    }
    @media ${device.mobile} {
        display: none;
    }
`;
const Btn = styled.div`
    width: 150px;
    height: 40px;
    font-size: 1.2rem;
    font-weight: 550;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-radius: 8px;
    background: #1cbcff;
    color: #fff;
    cursor: pointer;
    margin: ${({ margin }) => (margin ? `${margin}` : '10px 0')};
    @media ${device.laptop} {
        font-size: 1rem;
    }
    @media ${device.mobile} {
        font-size: 1rem;
    }
`;

const Sidebar = styled.div`
    position: fixed;
    display: none;
    top: 10%;

    z-index: 1;
    padding: 20px 20px 20px 40px;
    background: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    @media ${device.mobile} {
        display: block;
    }
`;
const CloseWrap = styled.div`
    width: 35px;
    height: 88px;
    padding-top: 20px;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    left: 0;
`;
const Icon = styled.div``;

Icon.Close = styled(close)`
    width: 30px;
`;
Icon.Menu = styled(menu)`
    display: none;
    width: 40px;
    position: fixed;
    z-index: 1;
    top: 0px;
    right: 20px;
    @media ${device.mobile} {
        display: block;
    }
`;
const Space = styled.div`
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    @media ${device.mobile} {
        display: block;
    }
`;

export {
    Container,
    Main,
    Head,
    HeadText,
    Body,
    BodyText,
    BodyWrap,
    LoginBox,
    LoginBtn,
    LoginInput,
    BtnBox,
    Btn,
    Sidebar,
    CloseWrap,
    Icon,
    Space,
};
