import { Button, Spinner } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../custom'
import UpdatedComponent from '../withHooks'
import LoginStyle from './Login.module.css'

function Login(props) {

    const navigate = useNavigate()

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    const {result, fetchData} = useFetch()

    var opt = {
        method: "POST",
        headers: {
            Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA"
        }
    }

    var loginSubmit = (event) => {
        event.preventDefault()
        props.setSpinner(true)
        var url = `https://fbapi.sellernext.com/user/login?username=${event.target[0].value}&password=${event.target[1].value}`
        setUserName(event.target[0].value)
        setPassword(event.target[1].value)
        fetchData("login",url, opt)
    }

    useEffect(() => {
        props.setSpinner(false)
        if (result?.success === true) {
            sessionStorage.setItem("loginCredentials", JSON.stringify({
                userName: userName,
                password: password
            }))
            navigate('/home')
        }
    }, [result])

    return (
        <div className={LoginStyle.loginPageContainer}>

            <p className={LoginStyle.loginHeading}>Login</p>

            <form className={LoginStyle.loginForm} onSubmit={(event) => loginSubmit(event)}>
                <div className={LoginStyle.inputDiv}>
                    <p className={LoginStyle.inputLabel}>Username: </p>
                    <input type="text" id={LoginStyle.usernameID} required />
                    <p className={LoginStyle.inputDescription}>We'll use this email address to inform you on future changes to Polaris.</p>

                </div>

                <div className={LoginStyle.inputDiv}>
                    <p className={LoginStyle.inputLabel}>Password: </p>
                    <input type="password" id={LoginStyle.passwordID} required />
                    <p className={LoginStyle.inputDescription}>We'll use this email address to inform you on future changes to Polaris.</p>
                </div>

                <div className={LoginStyle.buttonDiv}>
                    <button type='submit' className={LoginStyle.submitBtn}>Submit</button>
                    <div className={LoginStyle.spinnerDiv}>
                        {(props.spinner === true) ? <Spinner accessibilityLabel="Spinner example" size="large" /> : ''}
                    </div>
                </div>

                {(result?.success === false) ? <p className={LoginStyle.errorMsg}>Wrong Credentials</p> : ''}
            </form>
        <Button onClick={()=>{sessionStorage.clear()}}>Clear Local</Button>
        
        </div>
    )
}

export default UpdatedComponent(Login)
