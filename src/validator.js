function Equals(a,b){
    return a===b
}
function min(a,x=6){
    return a.length>=x
}
function max(a,x=6){
    return a.length<=x
}
function Empty(a){
    return a.length===0
}
module.exports={

Equals,min,max,Empty
}