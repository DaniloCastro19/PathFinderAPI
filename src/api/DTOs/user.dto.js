export default class UserDTO{
    constructor(user){
        this.id = user.user_id;
        this.username = user.username;
        this.email = user.email;

    }
}