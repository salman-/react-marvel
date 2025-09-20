const environment = () => {
  return {
    // GET YOUR PUBLIC AND PRIVATE KEYS FROM : https://developer.marvel.com/account
    publicKey: 'YOUR-PUBLIC_API_KEY',
    privateKey: 'YOUR-PRIVATE_API_KEY',
    baseUrl: 'gateway.marvel.com:443/',
    protocol: 'https://'
  };
};

export default environment;
