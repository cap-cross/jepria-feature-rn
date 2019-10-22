 //const FEATURE_SERVICE_HOST = 'http://jepria.org';
 const FEATURE_SERVICE_HOST = 'https://infod.rusfinance.ru';

export const FEATURE_SERVICE_CONTEXT = 'JepRiaShowcase/api';


export const FEATURE_CONTEXT_URL = `${FEATURE_SERVICE_HOST}/${FEATURE_SERVICE_CONTEXT}`;

export const FEATURE_API_URL = `${FEATURE_CONTEXT_URL}/feature`;

export const FEATURE_STATUS_URL = `${FEATURE_API_URL}/option/feature-status`;
export const FEATURE_OPERATOR_URL = `${FEATURE_API_URL}/option/feature-operator`;
