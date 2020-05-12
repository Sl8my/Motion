import React from 'react';
import styled from 'styled-components'
import { GradientCircleContainer } from "../../../style/GlobalWrappers";



const BellCounterContainer = styled(GradientCircleContainer)`
    top: 15px;
    left: 20px;

`;

const NotificationCounter = () => {
    return <>
        <BellCounterContainer>39</BellCounterContainer>
    </>
};

export default NotificationCounter