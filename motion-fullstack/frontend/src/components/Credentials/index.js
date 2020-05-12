import React from 'react';
import styled from 'styled-components'
import { Route } from "react-router-dom";

import Login from './LogIn';
import LeftContainer from './LeftContainer'
import Verification from './Verification';
import EmailSentConfirmation from './EmailSentConfirmation';
import SignUp from './SignUp';


const CredentialsWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;    
    background-color: white;
`;

const RightContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
`;


const Credentials = (props) => {
    return (
        <CredentialsWrapper>
            <LeftContainer />
            <RightContainer>
                <Route path="/auth/login" exact component={Login} />
                <Route path="/auth/signup" exact component={SignUp} />
                <Route path="/auth/signup/sent" exact component={EmailSentConfirmation} />
                <Route path="/auth/signup/validation" exact component={Verification} />
            </RightContainer>
        </CredentialsWrapper>
    );
};


export default Credentials;
