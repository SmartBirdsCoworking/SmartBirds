export const config = {
  region: 'eu-central-1',
  endpoint: process.env.REACT_APP_ENV === 'local' ? process.env.REACT_APP_DYNAMODB_ENDPOINT : undefined,
};
