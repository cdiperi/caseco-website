import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';

export const configureAmplify = () => {
    Amplify.configure({
        Auth: {
            region: import.meta.env.VITE_REGION,
            userPoolId: import.meta.env.VITE_USER_POOL_ID,
            userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
            identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
            mandatorySignIn: true
        } as any,
        API: {
            endpoints: [
                {
                    name: 'AdminAPI',
                    endpoint: import.meta.env.VITE_API_ENDPOINT,
                    region: import.meta.env.VITE_REGION,
                    custom_header: async () => {
                        try {
                            const session = await fetchAuthSession();
                            const idToken = session.tokens?.idToken?.toString();
                            return {
                                Authorization: `Bearer ${idToken}`
                            };
                        } catch (error) {
                            console.error('Error getting auth session:', error);
                            return {};
                        }
                    }
                }
            ]
        } as any
    });
};