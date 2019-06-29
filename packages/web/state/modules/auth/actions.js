import Router from 'next/router';

import api from '../../../api';
import * as types from './types';
import * as endpoints from '../../../api/constants';

export const submitSignUpData = formValues => {
    const { email, name } = formValues;
    return async dispatch => {
        try {
            const response = await api({
                method: 'POST',
                url: endpoints.SIGNUP_SUBMIT_ENDPOINT,
                data: {
                    email,
                    name,
                },
            });
            // eslint-disable-next-line no-console
            console.log('response', response);
            dispatch({
                type: types.SUBMIT_SIGNUP_DATA,
                payload: response.data,
            });
            // route to verify page
            Router.push('/verify', '/signup/verify');
        } catch ({ response }) {
            // eslint-disable-next-line no-console
            console.log(response.data.error);
        }
    };
};

export const submitLoginData = formValues => {
    const { email, secretKey } = formValues;
    return async dispatch => {
        try {
            const response = await api({
                method: 'POST',
                url: endpoints.LOGIN_SUBMIT_ENDPOINT,
                data: {
                    email,
                    secretKey,
                },
            });
            // eslint-disable-next-line no-console
            console.log('response', response);
            dispatch({
                type: types.SUBMIT_LOGIN_DATA,
                payload: response,
            });
        } catch ({ response }) {
            // eslint-disable-next-line no-console
            console.log(response.data.error);
            // ToDo: Dispatch some error handler
        }
    };
};

export const submitVerificationToken = (token, email) => {
    return async dispatch => {
        try {
            const response = await api({
                method: 'POST',
                url: endpoints.TOKEN_VERIFICATION_ENDPOINT,
                data: {
                    token,
                    email,
                },
            });
            dispatch({
                type: types.SUBMIT_VERIFICATION_TOKEN,
                payload: response.data,
            });
        } catch ({ response }) {
            // eslint-disable-next-line no-console
            console.log(response.data.error);
        }
    };
};