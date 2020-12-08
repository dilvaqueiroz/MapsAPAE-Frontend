import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import * as  auth from '../services/auth';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';


interface User{
    name: string;
    email:string;
  }

interface AuthContextData{
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(name: string, password: string): Promise<void>;
    signOut():void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
//JTW (Stateless)
export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser =   await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken =  await AsyncStorage.getItem('@RNAuth:token');

            if(storagedUser && storagedToken){
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false); 
            }
        }
            loadStorageData();
    }, []);

    async function signIn(name: string, password: string) {
        const response = await auth.signIn();

        if(name === response.user.name && password === response.user.password){
            setUser(response.user);
    
            api.defaults.headers.Authorization = `Bearer ${response.token}`;
    
            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
            await AsyncStorage.setItem('@RNAuth:token', response.token);
 
            {/*<Redirect to={{
                pathname:'/app',
            }} />*/}

        } else {
                //Alert
        }
    }

    async function signOut(){
        AsyncStorage.clear().then(()=>{
            setUser(null);
        });   
    }
    
    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}