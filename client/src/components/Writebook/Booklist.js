import axios from "axios";
import { useRef, useState } from "react";
import { Card, Col, Row } from 'antd';
import { Typography, Switch } from 'antd';

const { Paragraph, Text } = Typography;


export default function BookList(){

    const [ellipsis, setEllipsis] = useState(true);
    const [List,setList]=useState([]);

    axios.get('/api/users/getList').then(res=>{
        setList(res.data.data);

    })

    return (
        
        <div className="site-card-wrapper">
             
             <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      /> <a>더 보기</a>
        <hr/>
        <Row gutter={16}>

             { List.map(list=>
             (
                <Col span={8}>
                 <Card title={list.title} key={list.id} bordered={false}>
                 <Paragraph ellipsis={ellipsis}>{list.contents}</Paragraph>
             </Card>
             
        </Col>
        ))}
        </Row>

        </div>
                
        
    )

}

