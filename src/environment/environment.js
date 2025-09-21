const environment = () => {
  return {
    // GET YOUR PUBLIC AND PRIVATE KEYS FROM : https://developer.marvel.com/account
    publicKey: 'PUBLIC_KEY',
    privateKey: 'PRIVATE_KEY',
    baseUrl: 'gateway.marvel.com:443/',
    protocol: 'https://'
  };
};

export default environment;
