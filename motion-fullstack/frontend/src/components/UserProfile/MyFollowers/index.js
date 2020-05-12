import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersAction } from '../../../store/actions/userActions';
import GenericUserList from '../../GenericUserList';
import GenericSpinner from '../../GenericSpinner';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 1200px;
    margin: 0 auto;
`;

const Center = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    margin: auto;
`;

const MyFollowers = ({ myFollowers, isEmpty, getUsersAction }) => {
    useEffect(() => {
        getUsersAction('followers');

    }, [getUsersAction]);

    const displayMessage = () => isEmpty ? <Center>You have no following</Center> : <GenericSpinner />;



    return <Wrapper>
        {console.log("following: ", myFollowers)}
        {myFollowers && myFollowers.length
            ? <GenericUserList users={myFollowers} />
            : displayMessage()
        }
    </Wrapper>
};


const mapStateToProps = state => {
    return ({
        isEmpty: state.usersReducer['followersisEmpty'],
        myFollowers: state.usersReducer.followers
    })
};
export default connect(mapStateToProps, { getUsersAction })(MyFollowers);