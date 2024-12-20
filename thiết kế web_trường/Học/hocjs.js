
var a=[
    {name:"book",price:5000,num:20},
    {name:"pen", price:2000,num:10},
    {name:"pencil",price:1000,num:15},
    {name:"book1",price:5000,num:30},
    {name:"pen1", price:2000,num:35},
    {name:"pencil1",price:1000,num:5},
]

function sumPrice(){
    let totalPrice = 0;
    for(let i=0; i<a.length; i++){
        totalPrice += a[i].price * a[i].num;
    }
    return totalPrice;
}

function sumNum(){
    let totalNum = 0;
    for(let i=0; i<a.length; i++){
        totalNum += a[i].num;
    }
    return totalNum;
}

var price5000=a.filter(a=>a.num==20&&a.price==5000);
console.log("Total price: " + sumPrice());
console.log("Total number of items: " + sumNum());
console.log(price5000);
document.writeln("Total price: " + sumPrice());
document.writeln("Total number of items: " + sumNum());
document.writeln(price5000);