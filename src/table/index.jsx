import React, { useState } from 'react'
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

const TablePage = () => {
// PAGES' DISPLAY STATES : 
  const [access, setAccess] = useState(false)
  const [userPage, setUserPage] = useState(false)
  const [mainPage, setMainPage] = useState(true)
  const [emailPage, setEmailPage] = useState(false)
  const [emailSendPage, setEmailSendPage] = useState(false)
  const [smsPage, setSmsPage] = useState(false)
  const [memberPage, setMemberPage] = useState(false)
  const [subPage, setSubPage] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [controlPage, setControlPage] = useState(false)
  const [managePage, setManagePage] = useState(false)
  const [reserPage, setReserPage] = useState(false)
  const [userInfo, setUserInfo] = useState(null); 
  // SUBSCRIPTION BUTTON STATES :

  // SEARCH STATES:
  // const [searchType, setSearchType] = useState('name'); 
  // const [searchValue, setSearchValue] = useState('');

  // LOGIN PAGE FUNCTIONS:
  const onId = (e) => {
    setId(e.target.value)
  }
  const onPassword = (e) => {
    setPassword(e.target.value);
  }
  const onSubmit = () => {
    // 서버와 통신하여 회원 정보 확인
    axios
    .post('https://api.mever.me:8080/chkAdmin', {
      email: id,
      password: password
    })
    .then(response => {
      const data = response.data;
      console.log(data);
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
const onKeyPress = (e) => {
  if (e.key === 'Enter') {
    onSubmit();
  }
};

// PAGE BUTTON CONTROL:
const onMain = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(true)
  setControlPage(false)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onPayment = () => {
  setUserPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setControlPage(false)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onEmail = () => {
  setUserPage(false)
  setEmailPage(true)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setControlPage(false)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onSend = () => {
  setUserPage(false)
  setEmailSendPage(true)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(false)
  setMainPage(false)
  setControlPage(false)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onSms = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(true)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setControlPage(false)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onMember = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(true)
  setEmailSendPage(false)
  setMainPage(false)
  setControlPage(false)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onContol = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setControlPage(true)
  setOpen(false)
  setManagePage(false)
  setReserPage(false)
};
const onManage = () => {
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setControlPage(false)
  setOpen(false)
  setReserPage(false)
  setManagePage(true)
}
const onReser = () => {
  setReserPage(true)
  setUserPage(false)
  setEmailPage(false)
  setSmsPage(false)
  setMemberPage(false)
  setSubPage(false)
  setEmailSendPage(false)
  setMainPage(false)
  setManagePage(false)
  setControlPage(false)
};

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
            <Btn margin='10px 20px 10px 0' onClick={onMain} style={mainPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onPayment} style={userPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>결제 내역</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onEmail} style={emailPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onSms} style={smsPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onContol} style={controlPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>설정</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onManage} style={managePage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
            <Btn margin='10px 20px 10px 0' onClick={onReser} style={reserPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>
            </>
          )}
          {userInfo.name === 'manager' && (
            // 일반 사용자 계정 메뉴
            <>
              <Btn margin='10px 20px 10px 0' onClick={onMain} style={mainPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onContol} style={controlPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>설정</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onManage} style={managePage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onReser} style={reserPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>           
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
              <Btn margin='10px 20px 10px 0' onClick={onMain} style={mainPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onPayment} style={userPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>결제 내역</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onEmail} style={emailPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일</Btn>
              {/* <Btn margin='10px 20px 10px 0' onClick={onSend} style={emailSendPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>이메일보내기</Btn> */}
              <Btn margin='10px 20px 10px 0' onClick={onSms} style={smsPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메시지</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onContol} style={controlPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>설정</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onManage} style={managePage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onReser} style={reserPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>  
            </BtnBox>
         )}
          {userInfo.name === 'manager' && (
            // 일반 사용자 계정 메뉴
            <BtnBox>
              <Btn margin='10px 20px 10px 0' onClick={onMain} style={mainPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>메인</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onMember} style={memberPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>고객</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onContol} style={controlPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>설정</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onManage} style={managePage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>상품 관리</Btn>
              <Btn margin='10px 20px 10px 0' onClick={onReser} style={reserPage ? {color:'#000', background: 'coral'} : {color: '#fff'}}>예약 관리</Btn>           
          </BtnBox>
          )}
        </div>
      )}
      {access && mainPage && <MainAnalytics />}
      {access && userPage && <PaymentList/>}
      {access && emailPage && <EmailList/>}
      {access && smsPage && <SmsList/>}
      {access && memberPage && <MemberList/>}
      {access && controlPage && <ContolList/>}
      {access && managePage && <Management/>}
      {access && reserPage && <ReservationList/>}
    </Container>
  )
}

export default TablePage
