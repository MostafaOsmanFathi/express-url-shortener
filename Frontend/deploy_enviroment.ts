const frontend_domain = 'http://localhost';
const backend_domain = 'http://localhost/api';

export const environment: any = {
    frontEndBaseUrl: `${frontend_domain}`,
    apiUrl: `${backend_domain}`,
    getForwardLink: `${backend_domain}/link/get-forward/`
};