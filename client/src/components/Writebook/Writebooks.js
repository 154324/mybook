import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import axios from 'axios';


const { Title } = Typography;
const { TextArea } = Input;


function Writebooks() {
    const user_id = sessionStorage.getItem('user_id');

    const[TitleValue,setTitleValue]=useState('');
    const[Contents,setContents]=useState('');

   
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onContents = (event) => {
        setContents(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !Contents) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: user_id,
            title: TitleValue,
            contents: Contents,
        }

        axios.post('/api/users/uploadbook', variables)
            .then(response => {
                if (response.data.success) {
                    alert('작성 완료')
                    document.location.href='/'
                } else {
                    alert('Failed to upload')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Book</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
    

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Contents</label>
                <TextArea
                    onChange={onContents}
                    value={Contents}
                />
                <br />
                <br />
        

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default Writebooks
