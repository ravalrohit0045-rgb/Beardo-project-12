import API from "./api";

export const registerUser = async (user) => {

    const res = await API.get("/users");

    const exist = res.data.find(
        item => item.email === user.email
    );

    if (exist) {

        return {
            success: false,
            message: "Email already exists"
        };

    }

    await API.post("/users", user);

    return {
        success: true
    };

};

export const loginUserAPI = async (email, password) => {

    const res = await API.get("/users");

    const user = res.data.find(

        item =>

            item.email === email &&
            item.password === password

    );

    if (user) {

        return {
            success: true,
            user
        };

    }

    return {

        success: false,
        message: "Invalid Email or Password"

    };

};