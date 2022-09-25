let canvas = document.querySelector("canvas");

canvas.width = 900;

canvas.height = 700;

let ctx = canvas.getContext("2d");

function create_balls(x,y,speed,radius,angle,mass){
    this.x = x;
    this.y = y;
    this.speed= speed;
    this.radius = radius;
    this.angle = angle;
    this.mass = mass;
    this.start = (Math.PI/180)*0;
    this.end =(Math.PI/180)*360;
    this.clock = false;
    this.radian = (Math.PI/180)*this.angle;
    this.velocity_x = Math.cos(this.radian)*this.speed;
    this.velocity_y = Math.sin(this.radian)*this.speed;
}

let balls = [];
let different_ball_sizes = [13,17,20,15,18];
let different_ball_speeds = [3,5,7,8,6,10];

~function initialize_balls(){
    for(let i =0;i<4;i++){
        let x = Math.floor(Math.random()*canvas.width);
        let y =  Math.floor(Math.random()*canvas.height);
        let radius_num =  Math.floor(Math.random()*different_ball_sizes.length);
        let radius = different_ball_sizes[radius_num];
        let mass = radius;
        let speed_num = Math.floor(Math.random()*different_ball_speeds.length);
        let speed = different_ball_speeds[speed_num];
        let angle =  Math.floor(Math.random()*360);
        balls.push(new create_balls(x,y,speed,radius,angle,mass));
    }
}();

function draw_balls_to_canvas(){
    ctx.fillStyle = "white";
    for(let i =0;i<balls.length;i++){
        let ball = balls[i];
        ctx.beginPath();
        ctx.arc(ball.x,ball.y,ball.radius,ball.start,ball.end,ball.clock);
        ctx.fill();
        ctx.closePath();
    }
}


function update_ball_position(){
    for(let i =0;i<balls.length;i++){
        let ball = balls[i];
        ball.x += ball.velocity_x;
        ball.y += ball.velocity_y;
    }
}

function check_wall_collision_for_the_balls(){
    for(let i = 0;i<balls.length;i++){
        let ball = balls[i];
        if(ball.x - ball.radius <0 || ball.x + ball.radius>900){
            ball.angle = 180 -ball.angle;
            ball.radian = (Math.PI/180)*ball.angle;
            ball.velocity_x =   Math.cos(ball.radian)*ball.speed;
            ball.velocity_y =   Math.sin(ball.radian)*ball.speed;
        }else if(ball.y - ball.radius < 0 || ball.y + ball.radius > 700){
            ball.angle = 360 - ball.angle ;
            ball.radian = (Math.PI/180)*ball.angle;
            ball.velocity_x =   Math.cos(ball.radian)*ball.speed;
            ball.velocity_y =   Math.sin(ball.radian)*ball.speed;
        }
    }
}

function check_ball_collision_against_themselves(){
    for(let i = 0;i<balls.length;i++){
        let test_ball = balls[i];
        for(let j = 0;j<balls.length;j++){
            let ball = balls[j];
            let dx = test_ball.x - ball.x;
            let dy = test_ball.y - ball.y;
            let distance = Math.sqrt((dx*dx)+(dy*dy));
            if(i == j){
                continue;
            }else{
                if(distance < (test_ball.radius + ball.radius)){
                    // let dx = test_ball.x - ball.x
                    // let collision_angle = Math.atan2()
                }
            }
            
        }
    }
}


function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw_balls_to_canvas();
    update_ball_position();
    check_wall_collision_for_the_balls();
    check_ball_collision_against_themselves();
    requestAnimationFrame(loop);
}

loop();
