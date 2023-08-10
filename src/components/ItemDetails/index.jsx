import React, { useState, useEffect } from 'react';
import * as Styled from './style'; // 스타일을 불러오는 부분
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const ItemDetails = ({ itemDetails, handleClosePopup, handleRefresh }) => {
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const [contents, setContents] = useState(itemDetails.contents || '');
  const [itemTitle, setItemTitle] = useState(itemDetails.itemTitle || '');
  const [orderName, setOrderName] = useState(itemDetails.orderName || '');
  const [photoUrl, setPhotoUrl] = useState(itemDetails.photoUrl || '');
  const [videoUrl, setVideoUrl] = useState(itemDetails.videoUrl || '');
  const [price, setPrice] = useState(itemDetails.price || '');
  const [orderId, setOrderId] = useState(itemDetails.orderId || '');
  const [readOnly, setReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const updateThumbnailUrls = () => {
    clearThumbnailUrls();
    const urls = [];
    const { videoUrl } = itemDetails || {};
    if (videoUrl && videoUrl !== '') {
      let replaceUrl = videoUrl;
      replaceUrl = replaceUrl.replace('https://youtu.be/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/embed/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/watch?v=', '');
      const finUrl = replaceUrl.split('&')[0];
      urls.push(`https://img.youtube.com/vi/${finUrl}/mqdefault.jpg`);
    }
    setThumbnailUrls(urls);
  };

  const clearThumbnailUrls = () => {
    setThumbnailUrls([]);
  };

  const handleUpdateContents = () => {
    const category = localStorage.getItem('category');
    if (isEditing) {
      axios
        .post('https://api.mever.me:8080/updateContents', {
          orderId,
          contents,
          orderName,
          itemTitle,
          photoUrl,
          videoUrl,
          price,
          category,
        })
        .then((response) => {
          console.log('업데이트 완료');
          alert('업데이트 되었습니다.');
          handleClosePopup();
          handleRefresh();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsEditing(true);
      setReadOnly(false);
    }
  };

  useEffect(() => {
    updateThumbnailUrls();
  }, [itemDetails]);

  return (
    <Styled.StyledPopupContainer>
    <Styled.StyledCloseButton onClick={handleClosePopup}>
      <AiOutlineClose />
      </Styled.StyledCloseButton>
      <Styled.StyledPopupContent>
        <Styled.Text>
          Title: <input id='itemTitle' value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} readOnly={readOnly} />
        </Styled.Text>
        <Styled.Text>
          Order Name: <input id='orderName' value={orderName} onChange={(e) => setOrderName(e.target.value)} readOnly={readOnly} />
        </Styled.Text>
        <Styled.Text>
          Price: <input id='price' value={price} onChange={(e) => setPrice(e.target.value)} readOnly={readOnly} />
        </Styled.Text>
        <Styled.Text>
          <div>Contents:</div>
        </Styled.Text>
        <Styled.TextArea value={contents} onChange={(e) => setContents(e.target.value)} id="contents" readOnly={readOnly} />
        <Styled.Text>
          Photo URL: <input id='photoUrl' value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} readOnly={readOnly} />
        </Styled.Text>
        <Styled.Text>
          Video URL: <input id='videoUrl' value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} readOnly={readOnly} />
        </Styled.Text>
        <input type="text" className="youtube-url" defaultValue={itemDetails.videoUrl} style={{ display: 'none' }} />
        <Styled.ThumbnailWrap>
          {thumbnailUrls.map((url, index) => (
            <Styled.ThumbnailImage key={index} src={url} alt="Thumbnail" />
          ))}
        </Styled.ThumbnailWrap>
        <Styled.Btn id="change2" onClick={handleUpdateContents}>
          {isEditing ? '수정 완료' : '수정'}
        </Styled.Btn>
      </Styled.StyledPopupContent>
    </Styled.StyledPopupContainer>
  );
};

export default ItemDetails;