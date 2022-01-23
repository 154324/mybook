import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Button } from 'antd';
import {SendOutlined} from '@ant-design/icons'  
import { Card } from 'antd';
import BookShow from '../BookApi/BookShow';
import BestBook from '../BookApi/BestBook';

const { Meta } = Card;


function LandingPage() {


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
                <h2>그 밖의 에세이 작품들</h2>
                <BestBook/>
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button href='/uploadbook'>책 검색하러 가기</Button>
            </div>
        </div>
    </div>

    )
}

export default LandingPage

