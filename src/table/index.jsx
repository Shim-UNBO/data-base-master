import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Btn, BtnBox, CloseWrap, Container, Icon, LoginBox, LoginBtn, LoginInput, Sidebar } from './style'
import PaymentList from '../components/PaymentList'
import EmailList from '../components/EmailList'
import SmsList from '../components/SmsList'
import MemberList from '../components/MemberList '
import ContolList from '../components/ControlList'
import MainAnalytics from '../components/MainAnalytics'
import Management from '../components/ManagementPage'
import ReservationList from '../components/ReservationList'
import axios from 'axios'

const PAGES = {
  MAIN: 'main',
  PAYMENT: 'payment',
  EMAIL: 'email',
  EMAIL_SEND: 'emailSend',
  SMS: 'sms',
  MEMBER: 'member',
  CONTROL: 'control',
  MANAGEMENT: 'management',
  RESERVATION: 'reservation',
  SALES:'sales'
};

const TablePage = () => {
  const [access, setAccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGES.MAIN);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const onId = (e) => setId(e.target.value);
  const onPassword = (e) => setPassword(e.target.value);
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  // SUBSCRIPTION BUTTON STATES :

  // SEARCH STATES:
  // const [searchType, setSearchType] = useState('name'); 
  // const [searchValue, setSearchValue] = useState('');

  // LOGIN PAGE FUNCTIONS:

  const onSubmit = () => {
    // 서버와 통신하여 회원 정보 확인
    axios
    .post('https://api.mever.me:8080/chkAdmin', {
      email: id,
      password: password
    })
    .then(response => {
      const data = response.data;
      // 회원 정보 확인 결과에 따라 로그인 처리
      if (data.statusCodeValue !== 400) {
        localStorage.setItem('category',data.category);
        localStorage.setItem('name',data.name);
        localStorage.setItem('mainId',data.email);
        setUserInfo(data); // 사용자 정보 저장
        setAccess(true);
      } else {
        alert('아이디 또는 패스워드가 잘못되었습니다.');
      }
    })
    .catch(error => {
      console.log(error);
      // 에러 처리에 대한 추가로 실행할 코드 작성
    });
};

const onPageChange = (page) => setCurrentPage(page);

const [open, setOpen] = useState(false)
const onOpen =()=>{
  setOpen(!open)
}

  return (
    <Container>
      <LoginBox style={access ? {display: 'none'} : {display: 'flex'}}>
        <h3>아이디와 비밀번호를 입력해주세요</h3>
        <LoginInput type='text' onChange={onId} placeholder='아이디'/>
        <LoginInput type='password' onChange={onPassword} placeholder='비밀번호' onKeyPress={onKeyPress}/>
        <LoginBtn onClick={onSubmit}>DB 보기</LoginBtn>
      </LoginBox>

        {access &&
        <Sidebar className={open?'sidebar-active':'sidebar'}>
          <CloseWrap>
            <Icon.Close onClick={()=>{setOpen(false)}}/>
          </CloseWrap>
          {userInfo.name === 'admin' && (
            <>
            <Btn margin='10px 20px 10px 0'onClick={() => onPageChange(PAGES.MAIN)} style={currentPage === PAGES.MAIN ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.PAYMENT)} style={currentPage === PAGES.PAYMENT ? {color:'#000', background: 'coral'} : {color: '#fff'}}>결제 내역</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.EMAIL)} style={currentPage === PAGES.EMAIL ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.SMS)} style={currentPage === PAGES.SMS ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MEMBER)} style={currentPage === PAGES.MEMBER ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.CONTROL)} style={currentPage === PAGES.CONTROL ? {color:'#000', background: 'coral'} : {color: '#fff'}}>타이틀 변경</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MANAGEMENT)} style={currentPage === PAGES.MANAGEMENT ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
            <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.RESERVATION)} style={currentPage === PAGES.RESERVATION ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>
            <Link to="/sales"><Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.SALES)} style={currentPage === PAGES.SALES ? {color:'#000', background: 'coral'} : {color: '#fff'}}>영업 관리</Btn></Link>
            </>
          )}
          {userInfo.name === 'manager' && (
            // 일반 사용자 계정 메뉴
            <>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MAIN)} style={currentPage === PAGES.MAIN ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MEMBER)} style={currentPage === PAGES.MEMBER ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.CONTROL)} style={currentPage === PAGES.CONTROL ? {color:'#000', background: 'coral'} : {color: '#fff'}}>타이틀 변경</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MANAGEMENT)} style={currentPage === PAGES.MANAGEMENT ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.RESERVATION)} style={currentPage === PAGES.RESERVATION ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>           
              </>
          )}
        </Sidebar>
        }
      {access&& <Icon.Menu onClick={onOpen}/>}

      {access && userInfo && (
        <div>
          {/* 로그인 사용자에 따라 다른 메뉴를 보여줌 */}
          {userInfo.name === 'admin' && (
            // admin 계정 메뉴
            <BtnBox>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MAIN)} style={currentPage === PAGES.MAIN ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.PAYMENT)} style={currentPage === PAGES.PAYMENT ? {color:'#000', background: 'coral'} : {color: '#fff'}}>결제 내역</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.EMAIL)} style={currentPage === PAGES.EMAIL ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일</Btn>
              {/* <Btn margin='10px 20px 10px 0' onClick={onSend} style={emailSendPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일보내기</Btn> */}
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.SMS)} style={currentPage === PAGES.SMS ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MEMBER)} style={currentPage === PAGES.MEMBER ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
              <Btn margin='10px 20px 10px 0'onClick={() => onPageChange(PAGES.CONTROL)} style={currentPage === PAGES.CONTROL ? {color:'#000', background: 'coral'} : {color: '#fff'}}>타이틀 변경</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MANAGEMENT)} style={currentPage === PAGES.MANAGEMENT ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.RESERVATION)} style={currentPage === PAGES.RESERVATION ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>  
              <Link to="/sales"  style={{ textDecoration: "none" }}><Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.SALES)} style={currentPage === PAGES.SALES ? {color:'#000', background: 'coral'} : {color: '#fff'}}>영업 관리</Btn></Link>
            </BtnBox>
         )}
          {userInfo.name === 'manager' && (
            // 일반 사용자 계정 메뉴
            <BtnBox>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MAIN)} style={currentPage === PAGES.MAIN ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MEMBER)} style={currentPage === PAGES.MEMBER ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.CONTROL)} style={currentPage === PAGES.CONTROL ? {color:'#000', background: 'coral'} : {color: '#fff'}}>타이틀 변경</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.MANAGEMENT)} style={currentPage === PAGES.MANAGEMENT ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
              <Btn margin='10px 20px 10px 0' onClick={() => onPageChange(PAGES.RESERVATION)} style={currentPage === PAGES.RESERVATION ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>           
          </BtnBox>
          )}
        </div>
      )}
      {access && currentPage === PAGES.MAIN && <MainAnalytics />}
      {access && currentPage === PAGES.PAYMENT && <PaymentList />}
      {access && currentPage === PAGES.EMAIL && <EmailList />}
      {access && currentPage === PAGES.SMS && <SmsList />}
      {access && currentPage === PAGES.MEMBER && <MemberList />}
      {access && currentPage === PAGES.CONTROL && <ContolList />}
      {access && currentPage === PAGES.MANAGEMENT && <Management />}
      {access && currentPage === PAGES.RESERVATION && <ReservationList />}
    
    </Container>
  )
}

export default TablePage
