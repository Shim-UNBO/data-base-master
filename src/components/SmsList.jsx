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
const SmsList = () => {
    const [smsList, setSmsList] = useState([]);

    const columns = [
        { title: '일자', dataIndex: 'date', key: 'date' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '내용', dataIndex: 'content', key: 'content' },
        { title: '전화번호', dataIndex: 'phone', key: 'phone' },
    ];
    // SMS SENDING CONTENT DATA :
    useEffect(() => {
        axios
            .post('https://api.mever.me:8080/send/list?type=sms', {})
            .then((data) => {
                setSmsList(
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
            <Table dataSource={smsList} columns={columns} />
        </>
    );
};

export default SmsList;
