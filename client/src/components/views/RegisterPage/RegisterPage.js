import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {



    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");



    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        
        if(Password!==ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다')
        }

        
        event.preventDefault();
        let body = {
            name : Name,
            email: Email,
            password: Password
        }
        

    dispatch(registerUser(body))
    .then(response => {
        if (response.payload.success){
                    alert("회원가입 완료")
                    navigate('/login');

                } else {
                    alert('Error˝')
                }
            })


    }






    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>이름</label>
                <input type="name" value={Name} onChange={onNameHandler} />
                <label>이메일</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>비밀번호 확인</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                
                
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
