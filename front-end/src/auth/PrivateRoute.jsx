import { useNavigate } from "react-router-dom";
import { useUser } from './useUser';

export const PrivateRoute = props => {
    const user = useUser();
    const navigation = useNavigate();

    if (!user) {
        navigation('/login');
    }

    return props.children;
}