var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var score = 0
var targetlst = []
var gameInterval;
canvas.width = 800
canvas.height = 600
function addTarget(){
    var x = Math.floor(Math.random() * (canvas.width-40))+20
    var y = 650
    targetlst.push({x:x,y:y,radius:10})
    
}
function drawTarget(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    count = 0;
    targetlst.forEach(function(target){
        ctx.beginPath()
        ctx.arc(target.x,target.y,target.radius,0,2*Math.PI)
        ctx.fillStyle ='red'
        ctx.fill()
        ctx.closePath()
        if (target.y<-100){
            targetlst.splice(count,1)
            console.log("target removed")
        }
        target.y--
        count+=1

    })
    document.getElementById('score').innerHTML = "Score:"+score
    
}
function checkCollision(x,y){
    const hitRadius = 20
    targetlst = targetlst.filter(function(target){
        var distance = Math.sqrt((x - target.x)**2 + (y - target.y)**2)
        if(distance<hitRadius){
            console.log("collide")
            score++
            return false
        }
        else{return true}
        
    })
   
}
canvas.addEventListener('click',function(event){
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    checkCollision(x,y);
})
gameInterval = setInterval(function(){
    addTarget()


},500)
refreshInterval = setInterval(function(){
    drawTarget()    

},10)