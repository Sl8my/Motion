import React from 'react';
import { connect } from "react-redux";


const LandingPage = ({ history }) => {
    return (
        <div>
            This is the Landing Page
            <button onClick={() => history.push('credentials')}>Log in</button>
        </div>
    )
}

export default connect()(LandingPage);
