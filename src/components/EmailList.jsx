import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Main,
    Head,
    HeadText,
    Body,
    BodyText,
    BodyWrap,
    Space,
} from '../table/style';
const EmailList = () => {
    const [emailList, setEmailList] = useState([]);

    // EMAIL SENDING CONTENT DATA :
    useEffect(() => {
        axios
            .post('https://api.mever.me:8080/send/list?type=mail', {})
            .then((data) => {
                setEmailList(data.data);
            });
    }, []);
    return (
        <>
            <Space></Space>
            <Main>
                <Head>
                    <HeadText>일자</HeadText>
                    <HeadText>이메일</HeadText>
                    <HeadText>제목</HeadText>
                    <HeadText>내용</HeadText>
                    <HeadText>전화번호</HeadText>
                </Head>
                <BodyWrap>
                    {emailList.map((list, index) => (
                        <Body
                            key={index}
                            style={
                                index % 2 === 0
                                    ? { background: 'rgba(0, 0, 0, 0.05)' }
                                    : { background: 'white' }
                            }
                        >
                            <BodyText>{list.date}</BodyText>
                            <BodyText>{list.email}</BodyText>
                            <BodyText>{list.title}</BodyText>
                            <BodyText>{list.content}</BodyText>
                            <BodyText>{list.phone}</BodyText>
                        </Body>
                    ))}
                </BodyWrap>
            </Main>
        </>
    );
};

export default EmailList;
