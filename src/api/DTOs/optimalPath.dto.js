export default class OptimalPathDTO{
    constructor(optimalPath){
        this.id = optimalPath.path_id;
        this.user_preferences = optimalPath.user_preferences;
        this.map_data = optimalPath.map_data;
        this.optimal_path = optimalPath.optimal_path;

    }
}