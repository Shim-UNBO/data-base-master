import styled from "styled-components";
import { Bar, Doughnut } from 'react-chartjs-2';

export const CloseButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    vertical-align: middle;
  }

  span {
    display: none;
  }
`;
export const ChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const DoughnutChart = styled(Doughnut)`
  border: 1px solid black;
  border-radius: 10px;
  font-weight: bold;
`;

export const Main = styled.div`
  max-width: 70vw;
  width: 100%;
  height: 95vh;
  overflow-y: scroll;
  border: 1px solid coral;
  border-radius: 10px;
`;

export const Head = styled.div`
  
  position: sticky;
  top: 0px;
  width: 100%;
  justify-content: space-around;
  background-color: coral;
`;

export const HeadText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  flex: 1;
  text-align: center;
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const BodyText = styled.p`
  font-size: 1.4rem;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const BodyWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const Btn = styled.div`
  width: 150px;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 550;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  margin: 10px 0;
  background: #1cbcff;
  color: #fff;
  cursor: pointer;
`;
export const InputContainer = styled.div`
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
export const CalendarContainer = styled.div`
  width: 80%;
  /* 모바일 스타일 */
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    padding: 0 10px;
    max-width: 600px;
    margin-top: 50px;
    .fc .fc-scrollgrid-liquid {
      height: 300%;
    }
  }
`;

export const Popup = styled.div`
  background-color: #fffd;
  border: 1px solid black;
  /* 모바일 스타일 */
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 20%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 10%;
    max-width: 400px;
    max-height: 600px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
  /* 데스크탑 스타일 */
  @media screen and (min-width: 769px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: #0E3B68;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-weight: bold;
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
`;
export const eventContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const eventTitle = {
  marginTop: '5px',
  fontWeight: 'bold'
};

export const eventTime = {
  fontWeight: 'normal',
  textAlign: 'left',
};

export const eventStatus = {
  marginTop: '5px',
  padding: '5px',
  borderRadius: '5px',
  color: '#fff',
  fontWeight: 'bold',
};

export const eventStatusPending = {
  ...eventStatus,
  backgroundColor: 'green',
};

export const eventStatusApproved = {
  ...eventStatus,
  backgroundColor: 'blue',
};

export const eventStatusReject = {
  ...eventStatus,
  backgroundColor: 'red',
};