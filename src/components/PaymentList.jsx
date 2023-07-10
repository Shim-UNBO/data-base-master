import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{Main, Head, HeadText, Body, BodyText, BodyWrap, Space} from '../table/style'
const PaymentList = () => {
  const [users, setUsers] = useState([])
  const category = localStorage.getItem('category')

  useEffect(()=>{
    axios.post(`https://api.mever.me:8080/paymentList?email=test@naver.com`, {category}).then((data)=>{
      setUsers(data.data)
    });
  }, [])
  return (
    <>
    <Space></Space>
      <Main>
        <Head>
          <HeadText>일자</HeadText>
          <HeadText>이름</HeadText>
          <HeadText>이메일</HeadText>
          <HeadText>전화번호</HeadText>
          <HeadText>설문 조사 결과</HeadText>
          <HeadText>상품명</HeadText>
          <HeadText>상품 가격</HeadText>
        </Head>
        <BodyWrap>
          {users.map((user, index)=>(
            <Body key={index} style={index % 2 === 0 ? {background: 'rgba(0, 0, 0, 0.05)'} : {background: 'white'}}>
              <BodyText>{user.approvedAt}</BodyText>
              <BodyText>{user.name}</BodyText>
              <BodyText>{user.email}</BodyText>
              <BodyText>{user.phone}</BodyText>
              <BodyText>{user.dcrp}</BodyText>
              <BodyText>{user.orderName}</BodyText>
              <BodyText>{`${user.totalAmount?user.totalAmount:0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</BodyText>
            </Body>
          ))}
        </BodyWrap>
      </Main>
    </>
  )
}

export default PaymentList
