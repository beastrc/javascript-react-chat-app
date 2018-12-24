import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import CCUser from "./CCUser";
import * as utils from './../../lib/uiComponentLib';

import * as actionCreator from './../../store/actions/cc_action';

class CCUserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _activeUserUID: this.props.activeUsers,
        }

    }

    handleClickUser = (uid, uType) => {
        this.props.updateActiveUser(uid);
        this.setState({ _activeUserUID: uid });
    }

    render() {
        return (
            this.props.usersList.map((el, index) => (
                <CCUser activeClass={this.state._activeUserUID == el.uid ? "active" : ""}
                    key={el.uid}
                    status={el.status}
                    avt={utils.CheckEmpty(el.avatar) ? el.avatar : false}
                    showMessageEvent={this.handleClickUser.bind(this, el.uid, "user")}>
                    {el.name}
                </CCUser>
            ))
        );
    }
}

const mapStateToProps = (store) => {
    return {
        usersList: store.users.usersList,
        activeUsers: store.users.activeUsers.uid,
    };
};

const mapDispachToProps = dispatch => {
    return {
        updateActiveUser: (key) => dispatch(actionCreator.setActiveUser(key)),
        fetchUser: (limit) => dispatch(actionCreator.getUsers(limit)),
    };
};

export default connect(mapStateToProps, mapDispachToProps)(CCUserList);
