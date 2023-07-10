import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import { Main, Head, HeadText, Body, BodyText, BodyWrap, Btn, Space } from '../table/style'
import { Chart, registerables } from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import Spinner from './Spinner';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api.mever.me:8080/getMainTitle', {
          category: category,          
        });
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
      let filteredList = response.data;
      setAnalyticsList(filteredList);
      const users =  filteredList.map((item) => item.users)
      const newUsers =  filteredList.map((item) => item.newUsers)
      const pageTitle  =  filteredList.map((item) => item.page_title)
      const newSession = filteredList.map((item) => item.percentNewSessions)
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
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
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
    // datalabels: { // Added datalabels plugin options
    //   formatter: (value, context) => {
    //     const dataset = context.dataset.data;
    //     const total = dataset.reduce((acc, val) => acc + val, 0);
    //     const percent = ((value / total) * 100).toFixed(2);
    //     return percent + '%';
    //   },
    // },
  },
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
      return <Doughnut data={chartData.doughnutChartData} options={doughnutOptions} />;
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

  localStorage.setItem('mainTitle',mainTitle);
  localStorage.setItem('subTitle',subTitle);
  return (
    <>
    <Space/>
    <Main style={window.innerWidth < 500?{height: '92vh'}:{height: '38vh'}}>
      <Head style={window.innerWidth < 500?{width: '100%'}:{background: '#fff'}}>
        <HeadText>{mainTitle}</HeadText>
      </Head>
      <Body style={window.innerWidth < 500?{flexDirection: 'column', justifyContent: 'center', width: '100%'}:{flexDirection: 'row'}}>
        
        {analyticsList.map((item, index) => (
          <BodyWrap key={index}>
            <BodyText>통계 기간: {item.startYmd} ~ {item.endYmd}</BodyText>
            <BodyText>평균 페이지 머문 시간: {item.avgSessions}</BodyText>
            <BodyText>페이지 조회 수: {item.totalPageview}</BodyText>
            <BodyText>총 방문자 수: {item.users}</BodyText>
            <BodyText>신규 방문자 수: {item.newUsers}</BodyText>
          </BodyWrap>
        ))}
        <BodyWrap>
          {loading ? <Spinner /> : <>{renderChart()}</>}
        </BodyWrap>
        <BodyWrap>
          {loading ? <Spinner /> : <>{renderDoughnutChart()}</>}
        </BodyWrap>
        <Btn onClick={resetChart}>통계 초기화</Btn>
      </Body>
    </Main>
    </>
  );
};

export default MainAnalytics;