import React from 'react'
import { BodyBox, Btn, Container, HeadingBox, Icon, Text, Wrap } from './style'

const SubscripPage = ({setClose, uniqueData, setUserIndex}) => {
    const user = uniqueData[0]
    const onClose = () =>{
      // console.log('close');
      setUserIndex('')
      setClose(false)
    }
    const onConcel = () => {
      
    }
  return (
    <Container >
      <Icon.Close onClick={onClose}/>
      <Wrap>
        <HeadingBox>
        <Text fontWeight="600">이메일 : </Text>
        <Text fontWeight="600">전화번호 :</Text>
        <Text fontWeight="600">고객명 :</Text>
        <Text fontWeight="600">상품명 :</Text>
        <Text fontWeight="600">결제기간 :</Text>
        <Text fontWeight="600">구독상태 :</Text>
        <Text fontWeight="600">구독 시작일 :</Text>
        <Text fontWeight="600">다음 결제일 :</Text>
      </HeadingBox>
      <BodyBox>
        <Text>{user.email?user.email:'-'}</Text>
        <Text>{user.phone?user.phone:'-'}</Text>
        <Text>{user.name?user.name:'-'}</Text>
        <Text>{user.orderName?user.orderName:'-'}</Text>
        <Text>{user.period?user.period:'-'}</Text>
        <Text>{user.status?user.status:'-'}</Text>
        <Text>{user.requestedAt?user.requestedAt:'-'}</Text>
        <Text>{user.approvedAt?user.approvedAt:'-'}</Text>
      </BodyBox>
      </Wrap>
      
        <Btn onChange={onConcel}>취소</Btn>
    </Container>
  )
}

export default SubscripPage
