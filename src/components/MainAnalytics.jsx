import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import { Main, Head, HeadText, Body, BodyText, BodyWrap, Btn, Space } from '../table/style'
import { Chart, registerables } from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import Spinner from './Spinner';
import { useCookies } from 'react-cookie'

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
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // 선택된 값 업데이트
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
          setupTitle(selectedCategory);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      const setupTitle = async (selectedCategory) => {
        try {
          const response = await axios.post('https://api.mever.me:8080/getMainTitle', {
            category: selectedCategory,
          });
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
    {newJeans && (
    <div>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value=''>사이트 별 리스트 ↓</option>
        <option value='/art1/'>청담 갤러리1부(단체전)</option>
        <option value='/art2/'>청담 갤러리2부(단체전)</option>
        <option value='/art3/'>남산 갤러리(김미영 작가)</option>
        <option value='/cafe1/'>선릉 카페(대단한 커피)</option>
        <option value='/hospital1/'>강남병원 (지인 병원)</option>
        <option value='/office1/'>법인 빌딩 (삼익영농)</option>
        <option value='/academy1/'>강남 학원 (영어 학원)</option>
        <option value='/art4/'>종로 갤러리2(백영희작가)</option>
        <option value='/mart1/'>편의점</option>
        <option value='/antique1/'>대전아트아카데미</option>
        <option value='/cafe2/'>대전자산협회</option>
        <option value='/parking1/'>부천재건축단지</option>
        <option value='/rebuilding1/'>부천 대진아파트</option>
        <option value='/hall1/'>부산벡스코</option>
        <option value='/building2/'>수원 관공서</option>
        <option value='/warship1/'>용산 전쟁 기념관</option>
        <option value='/academy2/'>고려직업전문학교</option>
        <option value='/academy3/'>고려직업전문학교3</option>
        <option value='/academy4/'>아카데미4</option>
        <option value='/academy5/'>아카데미5</option>
        <option value='/office2/'>크럼플 오피스</option>
        <option value='/studio1/'>스튜디오</option>
        <option value='/hall2/'>부산벡스코2</option>
        <option value='/machine1/'>벡스코/수원관공서</option>
        <option value='/kpop1/'>BTS 초콜릿</option>
        <option value='/modelhouse2/'>3D 신촌 빌리브 디 에이블</option>
        <option value='/antique2/'>서울 감정평가원</option>
        <option value='/pub1/'>앤티크 펍(미자살롱)</option>
        <option value='/modelhouse1/'>3D 신촌 빌리브 디 에이블</option>
      </select>
      <button onClick={handleButtonClick}>전송</button>
    </div>
      )}
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