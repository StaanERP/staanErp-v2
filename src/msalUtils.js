import { PublicClientApplication } from '@azure/msal-browser';

 

export const initializeMsal = async () => {
  try {
    const pca = new PublicClientApplication({
      auth: {
        clientId: '52a3b712-cbab-461d-a03d-a6b234a9ed21',
        authority: 'https://login.microsoftonline.com/2708cf11-c83a-466f-9399-671ebba3e8fc',
        redirectUri: '/admintable',
      }
    }); 
    async function initializeMsal() {
      await pca.initialize();
      // Now you can safely access msalInstance methods
      // const logger = pca.getLogger(); // This should work without errors
    }
    initializeMsal();
    
    await pca.initialize();
    
    console.log('MSAL initialized successfully');
    return pca;
  } catch (error) {
    console.error('Error initializing MSAL:', error);
    throw error;
  }
};
