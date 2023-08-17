import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';

import { dateFilter } from '../utils';

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

    const columns = [
        { title: '일자', dataIndex: 'date', key: 'date', width: 110 },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '제목', dataIndex: 'title', key: 'title' },
        { title: '내용', dataIndex: 'content', key: 'content' },
        { title: '전화번호', dataIndex: 'phone', key: 'phone', width: 200 },
    ];

    // EMAIL SENDING CONTENT DATA :
    useEffect(() => {
        axios
            .post('https://api.mever.me:8080/send/list?type=mail', {})
            .then((data) => {
                setEmailList(
                    data.data.map((item) => {
                        item.date = dateFilter(item.date);
                        return item;
                    })
                );
            });
    }, []);

    return (
        <>
            <Space></Space>
            <Table dataSource={emailList} columns={columns} />
        </>
    );
};

export default EmailList;
