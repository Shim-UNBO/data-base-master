import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Select, Button, Row, Col } from 'antd';
import {
  Main,
  Head,
  HeadText,
  Body,
  BodyText,
  BodyWrap,
  Btn,
  Space,
} from '../table/style';
import { Chart, registerables } from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import Spinner from './Spinner';
import { useCookies } from 'react-cookie';

Chart.register(...registerables);

const MainAnalytics = () => {
  const [chartData, setChartData] = useState(null);
  const [analyticsList, setAnalyticsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartKey, setChartKey] = useState(Date.now()); // key attribute added
  const [title, setTitle] = useState('');
  const category = localStorage.getItem('category');
  const [mainTitle, setMainTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const newJeans = cookies.id === 'true';
  const handleSelectChange = (value) => {
    setSelectedValue(value); // 선택된 값 업데이트
  };

  const handleButtonClick = () => {
    if (selectedValue) {
      fetchData(selectedValue); // 선택된 값으로 데이터를 가져오는 함수 호출
    }
  };
  const fetchData = (selectedCategory) => {
    axios
      .post('https://api.mever.me:8080/analyticsList', null, {
        params: {
          category: selectedCategory,
        },
      })
      .then((response) => {
        let filteredList = response.data;
        setAnalyticsList(filteredList);
        const users = filteredList.map((item) => item.users);
        const newUsers = filteredList.map((item) => item.newUsers);
        const pageTitle = filteredList.map((item) => item.page_title);
        const newSession = filteredList.map(
          (item) => item.percentNewSessions
        );
        const totalSession = 100 - newSession;

        if (filteredList.length > 0) {
          const barChartData = {
            labels: filteredList.map((item) => item.startYmd),
            datasets: [
              {
                label: '사이트 방문자 수',
                data: users,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
              },
              {
                label: '신규 방문자 수',
                data: newUsers,
                backgroundColor: 'rgba(192, 75, 192, 0.6)',
                borderWidth: 1,
              },
            ],
          };

          const doughnutChartData = {
            labels: ['신규 방문자', '기존 방문자'],
            datasets: [
              {
                label: 'count',
                data: [newSession, totalSession],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                ],
                hoverOffset: 4,
                borderWidth: 0,
              },
            ],
          };
          setChartData({ barChartData, doughnutChartData });
          setupTitle(selectedCategory);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    const setupTitle = async (selectedCategory) => {
      try {
        const response = await axios.post(
          'https://api.mever.me:8080/getMainTitle',
          {
            category: selectedCategory,
          }
        );
        const { title, subTitle } = response.data;
        console.log(response.data);
        setMainTitle(title);
        setSubTitle(subTitle);
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.mever.me:8080/getMainTitle',
          {
            category: category,
          }
        );
        const { title, subTitle } = response.data;
        setMainTitle(title);
        setSubTitle(subTitle);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .post('https://api.mever.me:8080/analyticsList', null, {
        params: {
          category: category,
        },
      })
      .then((response) => {
        console.log('@@@king : ')
        console.log(response)
        let filteredList = response.data;
        setAnalyticsList(filteredList);
        const users = filteredList.map((item) => item.users);
        const newUsers = filteredList.map((item) => item.newUsers);
        const pageTitle = filteredList.map((item) => item.page_title);
        const newSession = filteredList.map(
          (item) => item.percentNewSessions
        );
        const totalSession = 100 - newSession;

        if (filteredList.length > 0) {
          const barChartData = {
            labels: filteredList.map((item) => item.startYmd),
            datasets: [
              {
                label: '사이트 방문자 수',
                data: users,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
              },
              {
                label: '신규 방문자 수',
                data: newUsers,
                backgroundColor: 'rgba(192, 75, 192, 0.6)',
                borderWidth: 1,
              },
            ],
          };

          const doughnutChartData = {
            labels: ['신규 방문자', '기존 방문자'],
            datasets: [
              {
                label: 'count',
                data: [newSession, totalSession],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                ],
                hoverOffset: 4,
                borderWidth: 0,
              },
            ],
          };
          setChartData({ barChartData, doughnutChartData });
        }
        setLoading(false);
        // console.log(filteredList);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [category]);

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '신규 방문자 비율',
      },
      //   datalabels: { // Added datalabels plugin options
      //   formatter: (value, context) => {
      //     const dataset = context.dataset.data;
      //     const total = dataset.reduce((acc, val) => acc + val, 0);
      //     const percent = ((value / total) * 100).toFixed(2);
      //     return percent + '%';
      //   },
      // },
    },
  };
  const redirectToGoogle = () => {
    window.location.href = 'https://analytics.google.com/analytics/web/?hl=ko#/p318507112/reports/intelligenthome'; // 구글 URL로 리다이렉트
  };

  const redirectToNaver = () => {
    window.location.href = 'https://analytics.naver.com/summary/dashboard.html'; // 네이버 URL로 리다이렉트
  };
  const renderChart = () => {
    if (chartData) {
      return <Bar data={chartData.barChartData} key={chartKey} />;
    } else {
      return null;
    }
  };
  const renderDoughnutChart = () => {
    if (chartData && chartData.doughnutChartData) {
      return (
        <Doughnut
          data={chartData.doughnutChartData}
          options={doughnutOptions}
        />
      );
    } else {
      return null;
    }
  };

  const resetChart = () => {
    // setChartData(null);
    setChartKey(Date.now());
    renderChart();
    renderDoughnutChart();
  };

  localStorage.setItem('mainTitle', mainTitle);
  localStorage.setItem('subTitle', subTitle);
  return (
    <>

      {newJeans && (
        <Row gutter={20}>
          <Col span={8}>
            <Select
              defaultValue=""
              style={{
                width: '100%',
              }}
              placeholder="사이트 별 리스트 ↓"
              onChange={handleSelectChange}
              options={[
                {
                  key: 1,
                  value: '',
                  label: '사이트 별 리스트 ↓',
                },
                {
                  key: 2,
                  value: '/art1/',
                  label: '청담 갤러리1부(단체전)',
                },
                {
                  key: 3,
                  value: '/art2/',
                  label: '청담 갤러리2부(단체전)',
                },
                {
                  key: 4,
                  value: '/art3/',
                  label: '남산 갤러리(김미영 작가)',
                },
                {
                  key: 5,
                  value: '/cafe1/',
                  label: '선릉 카페(대단한 커피)',
                },
                {
                  key: 6,
                  value: '/hospital1/',
                  label: '강남병원 (지인 병원)',
                },
                {
                  key: 7,
                  value: '/office1/',
                  label: '법인 빌딩 (삼익영농)',
                },
                {
                  key: 8,
                  value: '/academy1/',
                  label: '강남 학원 (영어 학원)',
                },
                {
                  key: 9,
                  value: '/art4/',
                  label: '종로 갤러리2(백영희작가)',
                },
                {
                  key: 10,
                  value: '/mart1/',
                  label: '편의점',
                },
                {
                  key: 11,
                  value: '/antique1/',
                  label: '대전아트아카데미',
                },
                {
                  key: 12,
                  value: '/cafe2/',
                  label: '대전자산협회',
                },
                {
                  key: 13,
                  value: '/parking1/',
                  label: '부천재건축단지',
                },
                {
                  key: 14,
                  value: '/rebuilding1/',
                  label: '부천 대진아파트',
                },
                {
                  key: 15,
                  value: '/hall1/',
                  label: '부산벡스코',
                },
                {
                  key: 16,
                  value: '/building2/',
                  label: '수원 관공서',
                },
                {
                  key: 17,
                  value: '/warship1/',
                  label: '용산 전쟁 기념관',
                },
                {
                  key: 18,
                  value: '/academy2/',
                  label: '고려직업전문학교',
                },
                {
                  key: 19,
                  value: '/academy3/',
                  label: '고려직업전문학교3',
                },
                {
                  key: 20,
                  value: '/academy4/',
                  label: '아카데미4',
                },
                {
                  key: 21,
                  value: '/academy5/',
                  label: '아카데미5',
                },
                {
                  key: 22,
                  value: '/office2/',
                  label: '크럼플 오피스',
                },
                {
                  key: 23,
                  value: '/studio1/',
                  label: '스튜디오',
                },
                {
                  key: 24,
                  value: '/hall2/',
                  label: '부산벡스코2',
                },
                {
                  key: 25,
                  value: '/machine1/',
                  label: '벡스코/수원관공서',
                },
                {
                  key: 26,
                  value: '/kpop1/',
                  label: 'BTS 초콜릿',
                },
                {
                  key: 27,
                  value: '/modelhouse2/',
                  label: '3D 신촌 빌리브 디 에이블',
                },
                {
                  key: 28,
                  value: '/antique2/',
                  label: '서울 감정평가원',
                },
                {
                  key: 29,
                  value: '/pub1/',
                  label: '앤티크 펍(미자살롱)',
                },
                {
                  key: 30,
                  value: '/modelhouse1/',
                  label: '3D 신촌 빌리브 디 에이블',
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={handleButtonClick}>
              전송
            </Button>
          </Col>

          <Col span={8}>
            <Button style={{ float: 'right' }} onClick={resetChart}>
              통계 초기화
            </Button>
          </Col>
        </Row>
      )}
      <button onClick={redirectToGoogle}>구글 통계</button>
      <button onClick={redirectToNaver}>네이버 통계</button>
      <Space />
      <Row>
        {analyticsList.map((item, index) => (
          <Col key={index} span={8}>
            <BodyWrap>
              <BodyText>
                통계 기간: {item.startYmd} ~ {item.endYmd}
              </BodyText>
              <BodyText>
                평균 페이지 머문 시간: {item.avgSessions}
              </BodyText>
              <BodyText>
                페이지 조회 수: {item.totalPageview}
              </BodyText>
              <BodyText>총 방문자 수: {item.users}</BodyText>
              <BodyText>신규 방문자 수: {item.newUsers}</BodyText>
            </BodyWrap>
          </Col>
        ))}
        <Col
          style={{ display: 'flex', justifyContent: 'center' }}
          span={8}
        >
          <BodyWrap>
            {loading ? <Spinner /> : <>{renderChart()}</>}
          </BodyWrap>
        </Col>
        <Col
          style={{ display: 'flex', justifyContent: 'center' }}
          span={8}
        >
          <BodyWrap>
            {loading ? <Spinner /> : <>{renderDoughnutChart()}</>}
          </BodyWrap>
        </Col>
      </Row>
    </>

  );

};

export default MainAnalytics;
