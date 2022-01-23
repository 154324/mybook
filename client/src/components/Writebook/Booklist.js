import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { Card, Col, Row } from 'antd';
export default function BookList(){

    const dispatch = useDispatch()
    const [List,setList]=useState([]);

    axios.get('/api/users/getList').then(res=>{
        setList(res.data.data);

    })

    return (
        <div className="site-card-wrapper">
        <br/><br/> 
        <Row gutter={16}>

             { List.map(list=>
             (
                <Col span={8}> 
                 <Card title={list.title} key={list.id} bordered={false}>
                 {list.contents}
             </Card>
             
        </Col>
        ))}
        </Row>

        </div>
                
        
    )

}