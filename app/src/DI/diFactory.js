
import configureSecureFetch from '../api/configureSecureFetch';
import {jwtLoginAPI} from '../api/JWTLoginAPI';

export const secureFetch = configureSecureFetch(jwtLoginAPI);