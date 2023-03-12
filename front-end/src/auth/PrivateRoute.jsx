import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './useUser';

export const PrivateRoute = props => {
    const user = useUser();
    const navigation = useNavigate();

    useEffect(() => {
        if (!user) navigation('/login');
    },[user, navigation]);

    return props.children;
}