import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row,Button } from 'antd';
const { Meta } = Card;


export default function BookShow(){
 const [Book,setBook] = useState([]);
 
 axios.get('/api/search/book?query=박근호').then(response=>{
     setBook(response.data.items)
 })

return (
    <div className="site-card-wrapper" key={Book.title}>
    <br/><br/> 
    <Row gutter={16}>

         { Book.map(book=>
         (
            <Col span={8}> 
            <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="picture" src={book.image} />}
    
  >
    <Meta title={book.title} description={book.description} />
  </Card>
         
    </Col>
    ))}
    </Row>

    </div>
            
)

}