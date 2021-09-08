import decode from 'jwt-decode';

export default class AuthService {
    constructor() {
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.logout = this.logout.bind(this);
        this.tokenName = 'JWS_TOKEN';
    }

    login = async (username, password, email) => {
        let response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email,
            })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return false;
        }

        localStorage.setItem('username', username);
        this.setToken(result.token) // Setting the token in localStorage
        return true;
    }


    register = async (username, password, email) => {
        let response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email,
            })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return false;
        }

        //   this.setToken(result.token) // Setting the token in localStorage
        return true;
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('JWS_TOKEN');
        localStorage.removeItem('username');
        window.location.reload(true);
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        const token = this.getToken();
        if (token) {
            return decode(token);
        }
        return {};
    }

    isLoggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return Boolean(token && !this.isTokenExpired(token))// handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000; // Checking if token is expired
        } catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem(this.tokenName, idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem(this.tokenName)
    }
}