import Vue from "vue";
import VueJwtDecode from 'vue-jwt-decode'

export default {

    userIsLogged(){
        if(process.browser){
            let token = this.getToken();


            if(token){
                let parseToken = VueJwtDecode.decode(token);

                if(parseToken.exp > Date.now()/1000){
                    return true;
                }else {
                    this.deleteToken();
                    return false;

                }
            }else {
                return false;
            }
        }

        return  false



    },

    getToken(){
        return localStorage.getItem("auth-token")
    },


    storeToken(token){
        localStorage.setItem("auth-token",token)
    },


    deleteToken(){
        localStorage.removeItem("auth-token")
    },

    storeUser(user){
        localStorage.setItem("user",JSON.stringify(user))
    },

    deleteUser(){
        localStorage.removeItem('user');
    },

    getUser(){
        return JSON.parse(localStorage.getItem("user"))
    },

    logoutUser(){
        this.deleteToken();
        this.deleteUser();
    },

    loginUser(user,token){
        this.storeToken(token);
        this.storeUser(user);
    }
}
