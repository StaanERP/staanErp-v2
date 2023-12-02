import { PublicClientApplication } from '@azure/msal-browser';



export const initializeMsal = async () => {
  // "aws"
const currentclientId = "3c30e362-b108-49d2-b3b4-37fe01f4941d"
const currentauthority = "2708cf11-c83a-466f-9399-671ebba3e8fc"

 "local"
//  const currentclientId = "52a3b712-cbab-461d-a03d-a6b234a9ed21"
//  const currentauthority = "2708cf11-c83a-466f-9399-671ebba3e8fc"
  try {
    const pca = new PublicClientApplication({
      auth: {
        clientId: currentclientId,
        authority: `https://login.microsoftonline.com/${currentauthority}`,
        redirectUri: '/',
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
