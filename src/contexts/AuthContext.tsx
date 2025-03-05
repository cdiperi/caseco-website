import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
    signIn,
    signOut,
    getCurrentUser,
    fetchAuthSession,
    fetchUserAttributes,
    type AuthUser
} from 'aws-amplify/auth';

// Define an extended user type that includes attributes
interface ExtendedAuthUser extends AuthUser {
    attributes?: {
        email?: string;
        name?: string;
        sub?: string;  // Changed to optional to match FetchUserAttributesOutput
        [key: string]: any;
    };
}

interface AuthContextType {
    isAuthenticated: boolean;
    isInitializing: boolean;
    user: ExtendedAuthUser | null;
    signIn: (username: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<ExtendedAuthUser | null>(null);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const currentUser = await getCurrentUser();
            // Fetch user attributes to include with the user object
            const attributes = await fetchUserAttributes();

            // Create extended user object with attributes
            const extendedUser: ExtendedAuthUser = {
                ...currentUser,
                attributes: attributes as ExtendedAuthUser['attributes']
            };

            setUser(extendedUser);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsInitializing(false);
        }
    };

    const handleSignIn = async (username: string, password: string) => {
        try {
            const result = await signIn({ username, password });
            // Fetch current user and attributes after successful sign in
            const currentUser = await getCurrentUser();
            const attributes = await fetchUserAttributes();

            // Create extended user object with attributes
            const extendedUser: ExtendedAuthUser = {
                ...currentUser,
                attributes: attributes as ExtendedAuthUser['attributes']
            };

            setUser(extendedUser);
            setIsAuthenticated(true);
            return result;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const getToken = async (): Promise<string | null> => {
        try {
            const session = await fetchAuthSession();
            return session.tokens?.idToken?.toString() || null;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isInitializing,
                user,
                signIn: handleSignIn,
                signOut: handleSignOut,
                getToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};