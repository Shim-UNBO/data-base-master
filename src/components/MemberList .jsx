import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{Main, Head, HeadText, Body, BodyText, BodyWrap, Btn, } from '../table/style'
import SubscripPage from './SubscribeInfo';
import SendingPage from './SendingPage';
const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const [selectUser, setSelectUser] = useState()
  // const [selectEmail, setSelectEmail] = useState()
  const [uniquePage, setUniquePage] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [sendingPage, setSendingPage] = useState(false)
  // const [indexEmail, setIndexEmail] = useState()
  const [checkedUsers, setCheckedUsers] = useState([])
  const category = localStorage.getItem('category');
  const checkedArr =[]
  // MEMBER DATA :
  useEffect(()=>{
    axios
    .post('https://api.mever.me:8080/member/list', null, {
      params: {
        email: '',
        category: category,
      },
    })
    .then((data)=>{
      setMemberList(data.data)
    });
  }, [])

  const [uniqueData, setUniqueData] = useState([])
// SUBSCRIBTION BUTTON FUNCTION :
const onSubscribe = (index) => {
  setUniquePage(true)
  setSelectUser(index);
  setInputEmail(memberList[index]?.email);
  setInputPhone(memberList[index]?.phone);

}
// SEND EMAIL BTN FUNCTION:
// const onSendEmail = (index) => {
//   setSelectEmail(index)
//   setSendingPage(true)
//   setIndexEmail(index)
// }

// UNIQUE PAGE DATA :

useEffect(() => { 
  axios.post('https://api.mever.me:8080/subscription/list', {
    email: inputEmail,
    phone: inputPhone,
  })
    .then((response) => {

      setUniqueData(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
}, [inputEmail,inputPhone]);

const onCheck =(index) => {
!checkedArr.includes(index)?checkedArr.push(index):checkedArr.splice(checkedArr.indexOf(index), 1)
}
// console.log(checkedUsers);

const onSendList = () => {
  if(checkedArr.length>0){
    setCheckedUsers(checkedArr)
    setSendingPage(true)
  }else{alert('먼저 사용자를 선택하세요!')}
}
return (
  <>
      <Btn  onClick={onSendList}>이메일 보내기</Btn>
    <Main>
        <Head>
          <HeadText flex='.4'>선택</HeadText>
          <HeadText>일자</HeadText>
          <HeadText>이름</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText flex='1.6'>설문 조사 결과</HeadText>
          <HeadText flex='.9'>내용</HeadText>
        </Head>
        <BodyWrap>
          {memberList.map((list, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText flex='.4'>
                <input style={{width: '20px', height: '20px', cursor: 'pointer'}} type="checkbox" onChange={()=>{onCheck(index)}}/>
              </BodyText> 
              <BodyText>{list.regdate}</BodyText>
              <BodyText>{list.name}</BodyText>
              <BodyText>{list.email}</BodyText>
              <BodyText>{list.phone}</BodyText>
              <BodyText flex='1.6'>{list.dcrp}</BodyText>
              <BodyText flex='.9'><Btn style={index === selectUser ? {background: 'coral', color: '#000', margin: '0'} : {border: 'none', margin: '0'}} onClick={()=>{onSubscribe(index)}}>구독 정보</Btn></BodyText>
              
            </Body>
          ))}
        </BodyWrap>
      </Main>
      {uniquePage && <SubscripPage uniqueData = {uniqueData} userIndex ={selectUser} setClose ={setUniquePage}/>}
      {sendingPage && <SendingPage memberList = {memberList} setClose ={setSendingPage}  checkedUsers = {checkedUsers}/>}
    </>  
      
  )
}

export default MemberList
