import styled from 'styled-components'
import device from '../../responsive'

export const StyledPopupContainer = styled.div`
    top: 50%;
    left: 50%;
    width: 50%;
    max-width: 800px;
    min-width: 300px;
    height: 60%;
    max-height: 80%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const StyledPopupContent = styled.div`
    background-color: white;
    padding: 45px;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

export const StyledCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ccc;
    color: #333;
    border: none;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #999;
    }
`

export const Text = styled.div`
    margin: 10px 0;
`

export const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const ThumbnailWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

export const ThumbnailImage = styled.img`
    max-width: 100px;
    height: auto;
`
export const Btn = styled.button`
    width: 200px;
    height: 45px;
    border-radius: 10px;
    background: coral;
    font-weight: 600;
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
