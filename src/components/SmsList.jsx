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
const SmsList = () => {
    const [smsList, setSmsList] = useState([]);

    // SMS SENDING CONTENT DATA :
    useEffect(() => {
        axios
            .post('https://api.mever.me:8080/send/list?type=sms', {})
            .then((data) => {
                setSmsList(data.data);
            });
    }, []);
    return (
        <>
            <Space></Space>
            <Main>
                <Head>
                    <HeadText>일자</HeadText>
                    <HeadText>이메일</HeadText>
                    <HeadText>내용</HeadText>
                    <HeadText>전화번호</HeadText>
                </Head>
                <BodyWrap>
                    {smsList.map((list, index) => (
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
                            <BodyText>{list.content}</BodyText>
                            <BodyText>{list.phone}</BodyText>
                        </Body>
                    ))}
                </BodyWrap>
            </Main>
        </>
    );
};

export default SmsList;
