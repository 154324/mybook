import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Button } from 'antd';
import {SendOutlined} from '@ant-design/icons'  
import { Carousel } from 'antd';


function LandingPage() {

    const contentStyle = {
        height: '160px',
        color: 'black',
        lineHeight: '160px',
        textAlign: 'center',
        background: 'white',
      };


    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data))

    }, [])
    return (
    <div>



 
<div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2> 당신의 글을 완성하세요 <SendOutlined />   </h2>
            </div>
        </div>
        <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>당신의 글이 시작되는 공간</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>

        </div>
    )
}

export default LandingPage

