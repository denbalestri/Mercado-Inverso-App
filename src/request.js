const axios=require('axios');


const endpoints={
    post:'http://localhost:3001/posts',
    rols:'http://localhost:3001/rols'
}




function getRols(){

    return axios.get(endpoints.rols); 
}

module.exports={

    getRols,
}