import styled from "styled-components";
import {ReactComponent as check} from '../../assets/icons/close-icon.svg'

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 30vw;
  height: 50vh;
  background: #0E3B68;
  border-radius: 15px;
  color: #fff;
  padding: 20px 0px;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-bottom: 30px;
`;

const HeadingBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
`;
const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Icon = styled.div``;
Icon.Close =styled(check)`
  width: 30px;
  height: 30px;
  position: fixed;
  right: 1rem;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 1.3rem;
  font-weight: ${({fontWeight})=>(fontWeight ? `${fontWeight}` : '500')};
`;
const Btn = styled.div`
  width: 200px;
  height: 45px;
  border-radius: 10px;
  background: coral;
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;


export {BodyBox, Btn, HeadingBox, Container, Icon, Text, Wrap}