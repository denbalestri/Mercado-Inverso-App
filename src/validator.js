function Equals(a,b){
    return a===b
}
function min(a,x=6){
    return a.length>=x
}
function max(a,x=6){
    return a.length<=x
}
function maxPrice(a,x=999999){
    return a<=x
}
function Empty(a){
    return a.length===0 || a==="" 
}
function EmptyFields(a){
    return a===""
}
module.exports={

Equals,min,max,Empty,maxPrice,EmptyFields
}