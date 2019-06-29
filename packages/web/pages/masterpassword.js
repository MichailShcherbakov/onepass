import React, { Component } from 'react';
import { connect } from 'react-redux';

import BodyWrapper from '../components/BodyWrapper';
import MasterPassword from '../components/SignUp/MasterPassword';

class MasterPasswordPage extends Component {
    render() {
        return (
            <BodyWrapper>
                <MasterPassword />
            </BodyWrapper>
        );
    }
}

export default connect()(MasterPasswordPage);
