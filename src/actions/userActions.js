const setUser = (payload) => ({ type: "SET_USER", token: payload });

export const login = (userPayload) => {
    console.log("login");
    fetch(`https://books-library-dev.herokuapp.com/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Login failed");
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("token", data.token);
            // dispatch(setUser(data.token));
        })
        .catch((error) => {
            console.error(error);
        });
};

export const register = (userPayload) => {
    fetch(`${process.env.apiUrl}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Register failed");
        })
        .then((data) => {
            localStorage.setItem("token", data.token);
            return data;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const logout = () => ({ type: "LOG_OUT" });
