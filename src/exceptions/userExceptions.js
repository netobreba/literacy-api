import HttpStatus from 'http-status-codes'

export const USER_NOT_FOUND = "usuário não existe"
export const USERNAME_OR_PASSWORD_INCORRET = "username or password incorret"

export let responseErroCatch = (code) =>{
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

export let responseNotFoundUser = () =>{
    return {error: USER_NOT_FOUND}
}

export let responseUsernameOrPasswordIncorret = () => {
    return {error: USERNAME_OR_PASSWORD_INCORRET}
}