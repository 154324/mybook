import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
function LandingPage() {
   const navigate =useNavigate();
    const logoutHandler=()=>{
        axios.get('/api/users/logout').then
        (response=>{
            if(response.data.success){
                navigate('/login')
                alert("로그아웃 완료")
                console.log(response.data)
            }else{
                alert("로그아웃을 실패 했습니다")
            }
        
    })
}

    


    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data))

    }, [])
    return (
        <div style={{
            display : 'flex' ,justifyContent : 'center', alignItems : 'center',
            width : '100%',height:'100vh'
        }}>
           <h2>시작 페이지</h2>

           <br/>
           <button>
               <Link to ="/login">Login</Link> 
           </button>
           <button onClick={logoutHandler}>
               Logout
           </button>

        </div>
    )
}

export default LandingPage
