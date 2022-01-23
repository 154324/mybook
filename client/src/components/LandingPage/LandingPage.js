import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Button } from 'antd';
import {SendOutlined} from '@ant-design/icons'  
import { Carousel } from 'antd';
import BookList from '../Writebook/Booklist';
import { Card } from 'antd';

const { Meta } = Card;


function LandingPage() {


    return (
 <div>
    <div style={{ width: '100%', margin: '1rem auto' }}>
            <div style={{width:'85%',margin:'2rem auto', textAlign: 'center' }}>
                <h2> 당신의 글을 완성하세요 <SendOutlined />   </h2>
                <hr/>
            <BookList/>
            
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button href='/uploadbook'>글 쓰러가기</Button>
            </div>
        </div>
    </div>

    )
}

export default LandingPage

