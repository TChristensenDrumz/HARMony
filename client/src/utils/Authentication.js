const Authenticate = () => {
    let loggedIn;
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };        
    const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            loggedIn = false;
        } else {
        const parsedToken = parseJwt(token);
        if (Date.now() <= parsedToken.exp * 1000) {
            loggedIn = true;
        } else {
            loggedIn = false;
            localStorage.clear();
        };
    };
    return loggedIn;
};

export default Authenticate;