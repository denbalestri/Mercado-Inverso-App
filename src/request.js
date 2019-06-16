const axios=require('axios');


const endpoints={
    post:'http://localhost:3001/posts',
    rols:'http://localhost:3001/rols',
    category:'http:///localhost:3001/category',
    pickupzone:'http:///localhost:3001/pickupzone'
}




function getRols(){

    return axios.get(endpoints.rols); 
}
function getCategories(){

    return axios.get(endpoints.category)
}
function getPosts(){
    return axios.get(endpoints.post)
}
function getPickupZone(){
    return axios.get(endpoints.pickupzone)


}

module.exports={

    getRols,getCategories,getPosts,getPickupZone
}


