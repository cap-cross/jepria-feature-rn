/* Production */
// const FEATURE_SERVICE_HOST = 'jepria.org';
// const FEATURE_SERVICE_PORT = '80';
/* Test */
// const FEATURE_SERVICE_HOST = 'test.jepria.org';
// const FEATURE_SERVICE_PORT = '80';
/* Development (localhost from emulator) */
const FEATURE_SERVICE_HOST = '10.0.3.2';
const FEATURE_SERVICE_PORT = '8080';

// const featureServiceContext = 'feature-json-jepria-backend-nagornyys';
export const FEATURE_SERVICE_CONTEXT = 'feature-json-jepria-backend';
const API_VERSION = 'v1';
export const FEATURE_API = 'features';

export const BASE_URL = `http://${FEATURE_SERVICE_HOST}:${FEATURE_SERVICE_PORT}`;
export const FEATURE_CONTEXT_URL = `${BASE_URL}/${FEATURE_SERVICE_CONTEXT}/${API_VERSION}`;
export const FEATURE_API_URL = `${FEATURE_CONTEXT_URL}/${FEATURE_API}`;

export const FEATURE_API_FIND_URL = FEATURE_API_URL;
export const FEATURE_API_ADD_URL = FEATURE_API_URL;
export const FEATURE_API_UPDATE_URL = FEATURE_API_URL;
export const FEATURE_API_DELETE_URL = FEATURE_API_URL;
export const FEATURE_STATUSES_URL = `${FEATURE_CONTEXT_URL}/featurestatuses`;
export const FEATURE_OPERATORS_URL = `${FEATURE_CONTEXT_URL}/featureoperators`;

