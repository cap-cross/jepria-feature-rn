
import configureSecureFetch from '../api/configureSecureFetch';
import {loginAPI} from '../api/JWTLoginAPI';

export {loginAPI} from '../api/JWTLoginAPI';
export const secureFetch = configureSecureFetch(loginAPI);