import axios from "axios";
import { Input } from 'antd';
import { useState } from "react";
import { Card, Col, Row,Button} from 'antd';
const { Meta } = Card;
const { Search } = Input;

export default function Booksearch(){


    const[Query,setQuery] = useState();
    const [Book,setBook] = useState([]);


    const onQueryHandler=(e)=>{
        setQuery(e.currentTarget.value);

    }

   const onSearch = (event) => {
        event.preventDefault();

       
        axios.get(`/api/search/book?query=${Query}`).
        then(response =>{setBook(response.data.items)})
    
   }

    return (

<div className="site-card-wrapper" >
<div>
    <input placeholder="검색할 단어를 적어주세요" value={Query} onChange={onQueryHandler}></input>
    <Button type="primary" onClick={onSearch}>검색</Button>
    </div> 
 <br/><br/>

 <hr/>
 <Row gutter={16}>

      { Book.map(book=>
      (
         <Col span={8}> 
         <Card
 hoverable
 style={{ width: 240 }}
 cover={<img alt="picture" src={book.image} />}
 key={book.title}
>
 <Meta  title={book.title} description={book.description} />
</Card>
      
 </Col>
 ))}
 </Row>

 </div>

   
   )
}