import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
    Btn,
    BtnBox,
    CloseWrap,
    Container,
    Icon,
    LoginBox,
    LoginBtn,
    LoginInput,
    Sidebar,
} from './style';
import PaymentList from '../components/PaymentList';
import EmailList from '../components/EmailList';
import SmsList from '../components/SmsList';
import MemberList from '../components/MemberList ';
import ContolList from '../components/ControlList';
import MainAnalytics from '../components/MainAnalytics';
import Management from '../components/ManagementPage';
import ReservationList from '../components/ReservationList';
import MenuControl from '../components/MenuControl';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import logoImage from '../assets/images/logo.png';

const { Header, Content, Footer, Sider } = Layout;

const PAGES = {
    MAIN: 'main',
    PAYMENT: 'payment',
    EMAIL: 'email',
    EMAIL_SEND: 'emailSend',
    SMS: 'sms',
    MEMBER: 'member',
    CONTROL: 'control',
    MANAGEMENT: 'management',
    RESERVATION: 'reservation',
    SALES: 'sales',
    MENUCONTROL: 'menuControl',
};

const TablePage = () => {
    const category = localStorage.getItem('category');

    const [cookies, setCookie] = useCookies(['id']);
    const [access, setAccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(PAGES.MAIN);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [mainTitle, setMainTitle] = useState('');
    const onId = (e) => setId(e.target.value);
    const onPassword = (e) => setPassword(e.target.value);
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // SUBSCRIPTION BUTTON STATES :

    // SEARCH STATES:
    // const [searchType, setSearchType] = useState('name');
    // const [searchValue, setSearchValue] = useState('');

    // LOGIN PAGE FUNCTIONS:
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://api.mever.me:8080/getMainTitle',
                    {
                        category: category,
                    }
                );
                const { title } = response.data;
                setMainTitle(title);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = () => {
        // 서버와 통신하여 회원 정보 확인
        axios
            .post('https://api.mever.me:8080/chkAdmin', {
                email: id,
                password: password,
            })
            .then((response) => {
                const data = response.data;
                // 회원 정보 확인 결과에 따라 로그인 처리
                if (data.statusCodeValue !== 400) {
                    localStorage.setItem('category', data.category);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('mainId', data.email);
                    if (data.adminYn === 'Y' && data.name === 'master') {
                        setCookie('id', 'true');
                    } else {
                        setCookie('id', 'false');
                    }
                    setUserInfo(data); // 사용자 정보 저장
                    setAccess(true);
                } else {
                    alert('아이디 또는 패스워드가 잘못되었습니다.');
                }
            })
            .catch((error) => {
                console.log(error);
                // 에러 처리에 대한 추가로 실행할 코드 작성
            });
    };
    const onSales = () => {
        window.location.href = 'https://www.mever.me/sales/';
    };
    const onPageChange = (page) => setCurrentPage(page);

    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(!open);
    };

    const adminMenuItems = [
        { key: 'MAIN', label: '메인' },
        { key: 'PAYMENT', label: '결제 내역' },
        { key: 'EMAIL', label: '이메일' },
        { key: 'SMS', label: '메시지' },
        { key: 'MEMBER', label: '고객' },
        { key: 'CONTROL', label: '타이틀 변경' },
        { key: 'MANAGEMENT', label: '상품 관리' },
        { key: 'RESERVATION', label: '예약 관리' },
        { key: 'SALES', label: '영업 관리' },
    ];

    const managerMenuItems = [
        { key: 'MAIN', label: '메인' },
        { key: 'MEMBER', label: '고객' },
        { key: 'CONTROL', label: '타이틀 변경' },
        { key: 'MANAGEMENT', label: '상품 관리' },
        { key: 'RESERVATION', label: '예약 관리' },
    ];

    const masterMenuItems = [
        { key: 'MAIN', label: '메인' },
        { key: 'PAYMENT', label: '결제 내역' },
        { key: 'EMAIL', label: '이메일' },
        { key: 'SMS', label: '메시지' },
        { key: 'MEMBER', label: '고객' },
        { key: 'CONTROL', label: '타이틀 변경' },
        { key: 'MANAGEMENT', label: '상품 관리' },
        { key: 'RESERVATION', label: '예약 관리' },
        { key: 'SALES', label: '영업 관리' },
        { key: 'MENUCONTROL', label: '사이트 설정' },
    ];

    let menuItems = [];

    switch (userInfo && userInfo.name) {
        case 'admin':
            menuItems = adminMenuItems;
            break;
        case 'manager':
            menuItems = managerMenuItems;
            break;
        case 'master':
            menuItems = masterMenuItems;
            break;
    }

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case 'MAIN':
                onPageChange(PAGES.MAIN);
                break;
            case 'PAYMENT':
                onPageChange(PAGES.PAYMENT);
                break;
            case 'EMAIL':
                onPageChange(PAGES.EMAIL);
                break;
            case 'SMS':
                onPageChange(PAGES.SMS);
                break;
            case 'MEMBER':
                onPageChange(PAGES.MEMBER);
                break;
            case 'CONTROL':
                onPageChange(PAGES.CONTROL);
                break;
            case 'MANAGEMENT':
                onPageChange(PAGES.MANAGEMENT);
                break;
            case 'RESERVATION':
                onPageChange(PAGES.RESERVATION);
                break;
            case 'SALES':
                onSales();
                break;
            case 'MENUCONTROL':
                onPageChange(PAGES.MENUCONTROL);
                break;
        }
    };

    return (
        <div>
            <LoginBox
                style={access ? { display: 'none' } : { display: 'flex' }}
            >
                <h3>아이디와 비밀번호를 입력해주세요</h3>
                <LoginInput type="text" onChange={onId} placeholder="아이디" />
                <LoginInput
                    type="password"
                    onChange={onPassword}
                    placeholder="비밀번호"
                    onKeyPress={onKeyPress}
                />
                <LoginBtn onClick={onSubmit}>DB 보기</LoginBtn>
            </LoginBox>

            {access && (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <h1 style={{ color: '#FFF', textAlign: 'center' }}>
                            <img
                                style={{ width: '60%' }}
                                src={logoImage}
                                alt="mever"
                            />
                        </h1>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['MAIN']}
                            items={menuItems}
                            onClick={handleMenuClick}
                        />
                    </Sider>
                    <Layout>
                        {access && currentPage === PAGES.MAIN && (
                            <Header
                                style={{
                                    padding: 0,
                                    background: colorBgContainer,
                                }}
                            >
                                <h3 style={{ margin: 0, textAlign: 'center' }}>
                                    {mainTitle}
                                </h3>
                            </Header>
                        )}
                        <Content
                            style={{
                                margin: '24px 16px',
                            }}
                        >
                            <div
                                style={{
                                    minHeight: 'calc(100vh - 112px)',
                                    padding: '20px',
                                    backgroundColor: '#FFF',
                                }}
                            >
                                {access && currentPage === PAGES.MAIN && (
                                    <MainAnalytics />
                                )}
                                {access && currentPage === PAGES.PAYMENT && (
                                    <PaymentList />
                                )}
                                {access && currentPage === PAGES.EMAIL && (
                                    <EmailList />
                                )}
                                {access && currentPage === PAGES.SMS && (
                                    <SmsList />
                                )}
                                {access && currentPage === PAGES.MEMBER && (
                                    <MemberList />
                                )}
                                {access && currentPage === PAGES.CONTROL && (
                                    <ContolList />
                                )}
                                {access && currentPage === PAGES.MANAGEMENT && (
                                    <Management />
                                )}
                                {access &&
                                    currentPage === PAGES.RESERVATION && (
                                        <ReservationList />
                                    )}
                                {access &&
                                    currentPage === PAGES.MENUCONTROL && (
                                        <MenuControl />
                                    )}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            )}
        </div>
    );
};

export default TablePage;
