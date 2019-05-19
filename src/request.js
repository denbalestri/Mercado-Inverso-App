const axios=require('axios');


const endpoints={
    post:'http://localhost:3001/posts',
    rols:'http://localhost:3001/rols',
    category:'http:///localhost:3001/category'
}




function getRols(){

    return axios.get(endpoints.rols); 
}
function getCategories(){

    return axios.get(endpoints.category)
}

module.exports={

    getRols,getCategories
}


