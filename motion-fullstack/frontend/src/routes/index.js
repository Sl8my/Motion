import React from 'react';
import Credentials from "../components/Credentials";
import AuthComponent from "../HOCs/AuthComponent";
import Feed from "../components/Feed";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import Navigation from "../components/Navigation";
import FindFriends from '../components/FindFriends';
import UserDetail from '../components/UserDetail';
import UpdateProfile from '../components/UserProfile/UpdateProfile';


// all global modal are put here, whether they are visible or not is decided by redux
import ModalPostDetail from '../components/ModalPostDetail';
import ModalNewPost from '../components/ModalNewPost';

const Routes = () => {
    return <>
        <Router>

            <ModalPostDetail />
            <ModalNewPost />

            <Switch>
                <Route path={'/auth'} component={AuthComponent(Credentials)} />

                <Navigation>
                    <Route exact path='/feed' component={AuthComponent(Feed)} />
                    <Route exact path='/users' component={AuthComponent(FindFriends)} />
                    <Route path='/users/:userId' component={UserDetail} />
                    <Route exact path='/userProfile' component={AuthComponent(UserProfile)} />
                    <Route exact path='/userProfileUpdate' component={AuthComponent(UpdateProfile)} />
                </Navigation>
            </Switch>
        </Router>
    </>

};

export default Routes;
