export const FETCH_USER_LOGIN_SUCCES = 'FETCH_USER_LOGIN_SUCCES_TOQUIZZ'

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCES,
        payload: data

    }
}