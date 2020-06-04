const axios = require('axios');
const ApiConfigModel = require('../model/api-config-model');

/**
 * Role: Handling the api lists from https://www.resales-online.com/en/.
 * Packages:
 *  -  Axios
 *      Axios is a Promise-based HTTP client for JavaScript which can be used in the front-end application and in the Node.js backend. By using Axios it's easy to send asynchronous HTTP request to REST endpoints and perform CRUD operations.
 *  -  ApiConfigModel
 *      To use the third-party api, needs to use their format. I made the database for it.
 */
const ApiService = {

    /**
     * Role: getting the api keys
     * 
     * @param {*} callback 
     * The callback is the function.
     * In this part, the fuction from the parameter will be called after get the api_name from the database
     */
    getApiKeys(callback){
        if(!process.env.API_NAME){
            callback(null);
        }
        
        ApiConfigModel.findOne({
            api_name : process.env.API_NAME
        }, (err, apiKey) => {
            if(err){
                callback(null);
            }
            callback(apiKey);
        });
    },
    /**
     * Role: getting the apiURL
     * @param {*} callback 
     * If the apikey is not exist, retur null, and if there is api keys, do call the below apiUrl using that api keys
     */
    getApiUrl(callback){
        this.getApiKeys(apiKey => {
            if(!apiKey){
                callback(null);
            }
            const apiFunction = "SearchProperties";
            const apiUrl = `${process.env.API_BASE_URL}/${apiKey.api_version}/${apiFunction}?p_agency_filterid=1&p1=${apiKey.api_id}&p2=${apiKey.api_key}&P_sandbox=true`;
            callback(apiUrl);
        });
    },
    /**
     * Role: getting the apiData
     * @param {*} callback 
     * After got the apiUrl, get the data from this apiUrl using the axios package.  The result will  be returned via callback function.
     */
    getApiData(callback){
        this.getApiUrl(apiUrl => {
            if(!apiUrl){
                callback(null);
            }
            axios.get(apiUrl)
                .then(response => {
                    callback(response.data);
                })
                .catch(error => {
                    callback(error);
                });
        });
    }
};

module.exports = ApiService;