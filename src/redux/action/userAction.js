export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_LOGIN_SUCCES_TOQUIZZ'
export const USER_LOGOUT_SUCCES = 'USER_LOGOUT_SUCCES '
export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: data

    }
}

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCES,

    }
}