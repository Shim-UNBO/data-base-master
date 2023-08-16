import React, { useState } from 'react'
import {
    Btn,
    Container,
    Icon,
    Input,
    Text,
    TextArea,
    Wrap,
    Select,
    Alert,
    HeadWrap,
} from './style'
import axios from 'axios'

const SendingPage = ({ memberList, setClose, checkedUsers }) => {
    const [select, setSelect] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectAlert, setSelectAlert] = useState('')
    const [titleAlert, setTitleAlert] = useState('')
    const [contentAlert, setContentAlert] = useState('')
    // const data = memberList[checkedUsers[0]]
    const data = memberList.filter(
        (user, index) => checkedUsers.includes(index) && user
    )
    const alfa = data.map((val) => ({ ala: val.email }))
    const onClose = () => {
        setClose(false)
        // setUserIndex('')
    }
    const onChange = (setState) => (e) => {
        setState(e.target.value)
    }
    const onSubmit = () => {
        if (select.length > 0 && title.length > 0 && content.length > 0) {
            setClose(false)
            alert('완료되었습니다')
            axios
                .post(
                    'https://api.mever.me:8080/send/reservation/mail',
                    data.map((val) => ({
                        email: val.email,
                        title: title,
                        content: content,
                        period: select,
                        phone: data.phone,
                    }))
                )
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            if (select.length === 0) setSelectAlert('종류을 선택하세요')
            if (title.length === 0) setTitleAlert(' 제목을 입력하세요')
            if (content.length === 0) setContentAlert('내용을 입력하세요')
        }
    }
    const onFocusSelect = () => {
        setSelectAlert('')
    }
    const onFocusTitle = () => {
        setTitleAlert('')
    }
    const onFocusContent = () => {
        setContentAlert('')
    }

    return (
        <Container>
            <Icon.Close onClick={onClose} />
            <Wrap>
                {/* <Text >이메일 : {data.email}</Text> */}
                <Text>종류 선택 :</Text>
                <HeadWrap>
                    <Select
                        onChange={onChange(setSelect)}
                        onFocus={onFocusSelect}
                        name="period"
                        id="period-select"
                    >
                        <option value="">--하나를 선택하세요--</option>
                        <option value="new">신규</option>
                        <option value="day">일</option>
                        <option value="week">주</option>
                        <option value="month">월</option>
                        <option value="year">년</option>
                    </Select>
                    <Alert>{selectAlert}</Alert>
                </HeadWrap>
                <Text>이메일 제목 :</Text>
                <HeadWrap>
                    <Input
                        onChange={onChange(setTitle)}
                        onFocus={onFocusTitle}
                        type="text"
                        placeholder="이메일 제목"
                    />
                    <Alert>{titleAlert}</Alert>
                </HeadWrap>
                <Text>이메일 내용 :</Text>
                <HeadWrap height="300px">
                    <TextArea
                        onChange={onChange(setContent)}
                        onFocus={onFocusContent}
                        placeholder="이메일 내용"
                    ></TextArea>
                    <Alert>{contentAlert}</Alert>
                </HeadWrap>
            </Wrap>
            <Btn onClick={onSubmit}>전송</Btn>
        </Container>
    )
}

export default SendingPage
