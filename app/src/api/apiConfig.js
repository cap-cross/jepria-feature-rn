 const FEATURE_SERVICE_HOST = 'https://jepria.org';
 //const FEATURE_SERVICE_HOST = 'http://vsmlapprfid1';
 //const FEATURE_SERVICE_HOST = 'http://10.50.132.72:8080';

export const FEATURE_SERVICE_CONTEXT = 'JepRiaShowcase/api';
export const LOGIN_API_URL = `${FEATURE_SERVICE_HOST}/JepRiaShowcase/autoLogonServlet`;
export const FEATURE_CONTEXT_URL = `${FEATURE_SERVICE_HOST}/${FEATURE_SERVICE_CONTEXT}`;
export const FEATURE_API_URL = `${FEATURE_CONTEXT_URL}/feature`;
export const FEATURE_STATUS_URL = `${FEATURE_API_URL}/option/feature-status`;
export const FEATURE_OPERATOR_URL = `${FEATURE_API_URL}/option/feature-operator`;
export const META_INFO_URL = `${FEATURE_CONTEXT_URL}/meta`;

