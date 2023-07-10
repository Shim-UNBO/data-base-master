import styled from "styled-components";
import {ReactComponent as check} from '../../assets/icons/close-icon.svg'
import device from "../../responsive";

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
  height: 60vh;
  background: #0E3B68;
  border-radius: 15px;
  color: #fff;
  padding: 20px 0px;
  @media ${device.mobile}{
    top: 50%;
    width: 95%;
    height: 80vh;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-top: 20px;
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
  font-size: 1rem;
  margin: 0px;
  display: flex;
  font-weight: ${({fontWeight})=>(fontWeight ? `${fontWeight}` : '600')};
  margin-bottom:10px;
`;
const Input = styled.input`
  width: 90%;
  height: 30px;
  outline: none;
  border-radius: 7px;
  padding: 0 15px;
  font-size: 1rem;
  border: none;
`
const TextArea = styled.textarea`
  width: 90%;
  height: 7em;
  resize: none;
  border: none;
  outline: none;
  border-radius: 7px;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: 500;
`
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
  margin-top: 30px;
`;
const Select = styled.select`
  height: 30px;
  width: 95%;
  padding: 0 15px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  outline: none;
`;
const HeadWrap = styled.div`
  height: ${({height})=>(height ? `${height}` : '53px')};
`;
const Alert = styled.p`
  color: red;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 14px;
  margin-top: 3px;
`

export { Btn, Alert, Container, HeadWrap, Icon, Text, TextArea, Input, Wrap, Select}