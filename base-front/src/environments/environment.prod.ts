export const environment = {
  production: true,
  baseUrl: "https://jsonplaceholder.typicode.com",
  google: {
    api: 'https://maps.googleapis.com/maps/api/js?key=ahah'
  },
  keycloak: {
    config: {
      url: 'http://localhost:8080/auth/',
      realm: 'master',
      clientId: 'base-front',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    }
  }
};
