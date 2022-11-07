import React, { useEffect } from 'react'
import { saveLoginCredentials } from '../../../redux/listingSlice'
import UpdatedComponent from '../../withHooks'
import navbarStyle from './Navbar.module.css'

function Navbar(props) {

    useEffect(()=> {
        props.dispatch(saveLoginCredentials(JSON.parse(sessionStorage.getItem('loginCredentials'))))
    }, [])

    return (
        <div className={navbarStyle.navbarContainer}>
            <div className={navbarStyle.navHeadingDiv}>
                <p className={navbarStyle.navHeading}>Shopify</p>
            </div>
            <div className={navbarStyle.navMenu}>
                <p><i class="fa-regular fa-user"></i> {props.state.listing.loginCredentials.userName}</p>
            </div>
        </div>
    )
}

export default UpdatedComponent(Navbar)