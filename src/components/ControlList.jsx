import React, { useState,useEffect } from 'react';
import { Head, HeadText, Body, InputContainer, Input, Btn } from './mainStyle';
import axios from 'axios';
import { Space, Main } from '../table/style';

const ContolList = () => {
  const [mainTitle, setMainTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [titleList, setTitleList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const category = localStorage.getItem('category');
  
  const handleInputChange = (e) => {
    if (e.target.id === 'mainTitle') {
      setMainTitle(e.target.value);
    } else if (e.target.id === 'subTitle') {
      setSubTitle(e.target.value);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.post('https://api.mever.me:8080/getMainTitleList', {
        category: category,
      });
      if (response.data && response.data.length > 0) {
        console.log(response.data);
        setTitleList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateTitle = () => {
    axios
      .post('https://api.mever.me:8080/updateTitle', {
        mainTitle: document.getElementById('mainTitle').value,
        subTitle: document.getElementById('subTitle').value,
        category,
      })
      .then((response) => {
        console.log('업데이트 완료');
        alert('업데이트 되었습니다.');
        fetchData();
      })
      .catch((error) => {
        console.log('에러 발생:', error);
        // 에러 처리에 대한 추가로 실행할 코드 작성
      });
  };
  const handleApplyButton = (title,subtitle) => {
    // return () => {
    //   setTimeout(() => {
    //     document.getElementById('mainTitle').value = title;
    //     document.getElementById('subTitle').value = subtitle;
    //   }, 1);
    // };
    setSelectedTitle({ title, subtitle });
  };
  const hadleDeleteButton = (seq) => {
    axios
      .post('https://api.mever.me:8080/deleteTitle', {
        seq
      })
      .then((response) => {
        alert('삭제가 되었습니다.');
        fetchData();
      })
      .catch((error) => {
        console.log('에러 발생:', error);
      });
  };
  useEffect(() => {
    if (selectedTitle) {
      setMainTitle(selectedTitle.title);
      setSubTitle(selectedTitle.subtitle);
    }
  }, [selectedTitle]);
  return (
    <>
    <Space/>
    <Main>
      <Head>
        <HeadText>페이지 설정</HeadText>
      </Head>
      <Body style={window.innerWidth < 500?{flexDirection: 'column', justifyContent: 'center', width: '100%'}:{flexDirection: 'row'}}>
        <InputContainer>
              <input type="text" id="mainTitle" value={mainTitle} onChange={handleInputChange} placeholder={localStorage.getItem('mainTitle')}/>
        </InputContainer>
        <InputContainer>
              <input type="text" id="subTitle" value={subTitle} onChange={handleInputChange} placeholder={localStorage.getItem('subTitle')}/>
        </InputContainer>
        <Btn onClick={handleUpdateTitle}>업데이트</Btn>  
      </Body>
      <div className="title-list-container">
        <h1>이력</h1>
        {titleList.map((title, index) => (
          <div className="product" key={index}>            
              <h3>TiTle: {title.title} SubTitle : {title.subTitle} <button onClick={() => handleApplyButton(title.title, title.subTitle)}>적용</button>
              <button onClick={() => hadleDeleteButton(title.seq)}>삭제</button> {title.insertDate}
              </h3>
          </div>
        ))}
      </div>
    </Main>
    </>
  );
};

export default ContolList;