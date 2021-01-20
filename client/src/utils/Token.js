export default {
    getToken: function() {
        let token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            return JSON.parse(atob(token.split('.')[1]));
        };
    },

    authenticate: function() {
        const token = this.getToken();
        if (!token) {
            return false;
        } else {
            if (Date.now() <= token.exp * 1000) {
                return true;
            } else {
                localStorage.clear();
                return false;
            };
        };
    },

    getId: function() {
        const token = this.getToken();
        if (token) {
            return token.userId;
        };
    },

    getUsername: function() {
        const token = this.getToken();
        if (token) {
            return token.username;
        };
    }

};