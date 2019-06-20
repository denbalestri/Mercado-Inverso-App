const axios=require('axios');


const endpoints={
    post:'http://localhost:3001/posts',
    rols:'http://localhost:3001/rols',
    category:'http:///localhost:3001/category',
    pickupzone:'http:///localhost:3001/pickupzone',
    offers:'http:///localhost:3001/offer',
    offersConfirmed:'http:///localhost:3001/offer/confirmed',
    ownPost:'http://localhost:3001/posts/OwnPost',
    postOffer:'http:///localhost:3001/offer/postOffer',
}


function getPostOffers(post_id){
    console.log('post id'+post_id)
    return axios.post(endpoints.postOffer,{post_id:post_id}); 
}

function getOwnPost(user_id){
    
    return axios.post(endpoints.ownPost,{user_id:user_id}); 
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
function getOffers(user_id){
    return axios.post(endpoints.offers,{user_id:user_id})
}
function getOffersConfirmed(user_id){
    return axios.post(endpoints.offersConfirmed,{user_id:user_id})
}
function getPickupZone(){
    return axios.get(endpoints.pickupzone)


}

module.exports={

    getRols,getCategories,getPosts,getPickupZone,getOffers,getOwnPost,getPostOffers,getOffersConfirmed
}


