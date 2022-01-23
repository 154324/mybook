import React, { useRef, useState } from 'react'
import {SendOutlined} from '@ant-design/icons'  
import { Button } from 'antd';
import BookShow from '../BookApi/BookShow';
import BestBook from '../BookApi/BestBook';
import useResizeObserver from '../useResizeObserver';
import styled from 'styled-components'

function LandingPage() {


    const contentRef = useRef(null);
    const [isShowReadMore, setIsShowReadMore] = useState(false);
    const observeCallback = (entries) => {
      for (let entry of entries) {
        if (entry.target.scrollHeight > entry.contentRect.height) {
          setIsShowReadMore(true);
        } else {
          setIsShowReadMore(false);
        }
      }
    };
    useResizeObserver({ callback: observeCallback, element: contentRef });
    const onClick = (e) => {
      contentRef.current.classList.add("show");
      setIsShowReadMore(false);
    };



    return (
 <div>
    <div style={{ width: '100%', margin: '1rem auto' }}>
            <div style={{width:'85%',margin:'2rem auto', textAlign: 'center' }}>
                <h2> 박근호 작가의 작품들 <SendOutlined />   </h2>
                <hr/>
                <div>
               <BookShow/>
                </div>
           



                <hr/>
                <h2>그 밖의 에세이 작품들 <SendOutlined /> </h2>
                <Wrap>
      <Ellipsis ref={contentRef}><BestBook/></Ellipsis>
      {isShowReadMore && <Buttonq onClick={onClick}>...더보기</Buttonq>}
    </Wrap>
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button type ="primary" href='/searchbook'>책 검색하러 가기</Button>
            </div>
        </div>
    </div>

    )
}

export default LandingPage

const Wrap = styled.div``;

const Ellipsis = styled.div`
  position: relative;
  display: -webkit-box;
  max-height: 35rem;
  line-height: 2rem;
  overflow: hidden;
  -webkit-line-clamp: 3;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;

const Buttonq = styled.button`
  max-height: 2rem;
  line-height: 2rem;
  &.hide {
    display: none;
  }
`;

