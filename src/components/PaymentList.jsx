import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import {
    Main,
    Head,
    HeadText,
    Body,
    BodyText,
    BodyWrap,
    Space,
} from '../table/style';
const PaymentList = () => {
    const [users, setUsers] = useState([]);
    const category = localStorage.getItem('category');

    const columns = [
        { title: '일자', dataIndex: 'approvedAt', key: 'approvedAt' },
        { title: '이름', dataIndex: 'name', key: 'name' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '전화번호', dataIndex: 'phone', key: 'phone' },
        { title: '설문 조사 결과', dataIndex: 'dcrp', key: 'dcrp' },
        { title: '상품명', dataIndex: 'orderName', key: 'orderName' },
        { title: '상품 가격', dataIndex: 'totalAmount', key: 'totalAmount' },
    ];

    useEffect(() => {
        axios
            .post(
                `https://api.mever.me:8080/paymentList?email=test@naver.com`,
                { category }
            )
            .then((data) => {
                setUsers(data.data);
            });
    }, []);
    return (
        <>
            <Space></Space>
            <Table dataSource={users} columns={columns} />
        </>
    );
};

export default PaymentList;
