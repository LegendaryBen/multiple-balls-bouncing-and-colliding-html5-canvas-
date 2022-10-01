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
let different_ball_sizes = [5.5];
let different_ball_speeds = [5];

~function initialize_balls(){
    for(let i =0;i<20;i++){
        let x = Math.floor(Math.random()*500);
        let y =  Math.floor(Math.random()*500);
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
        if(ball.x - ball.radius <0 || ball.x +ball.radius >900){
            ball.velocity_x = ball.velocity_x * -1;
        }else if(ball.y - ball.radius < 0 || ball.y + ball.radius > 700){
            ball.velocity_y = ball.velocity_y * -1;
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
                if(distance <= (test_ball.radius + ball.radius)){

                    //be calm and understand it
                    //it was also difficult for me when i started
                    // it is just simple physics

                    let dx = test_ball.x - ball.x;
                    let dy = test_ball.y - ball.y;

                    let collision_angle = Math.atan2(dy,dx);

                    let speed1 = Math.sqrt((test_ball.velocity_x*test_ball.velocity_x)+(test_ball.velocity_y*test_ball.velocity_y));
                    let speed2 = Math.sqrt((ball.velocity_x*ball.velocity_x)+(ball.velocity_y*ball.velocity_y));

                    let direction1 = Math.atan2(test_ball.velocity_y,test_ball.velocity_x);
                    let direction2 = Math.atan2(ball.velocity_y,ball.velocity_x);

                    let tem_velx_of_testball = Math.cos(direction1 - collision_angle)*speed1;
                    let tem_vely_of_testball = Math.sin(direction1 - collision_angle)*speed1;

                    let tem_velx_of_ball = Math.cos(direction2 - collision_angle)*speed2;
                    let tem_vely_of_ball = Math.sin(direction2 -collision_angle)*speed2;

                    let final_velx_of_testball = ((test_ball.mass - ball.mass)*tem_velx_of_testball + (ball.mass+ball.mass)*tem_velx_of_ball)/(test_ball.mass+ball.mass);
                    let final_vely_of_testball = tem_vely_of_testball;

                    let final_velx_of_ball = ((test_ball.mass + test_ball.mass)*tem_velx_of_testball + (ball.mass - test_ball.mass)*tem_velx_of_ball)/(test_ball.mass + ball.mass);
                    let final_vely_of_ball = tem_vely_of_ball;

                    test_ball.velocity_x = Math.cos(collision_angle)*final_velx_of_testball + Math.cos(collision_angle + Math.PI/2)*final_vely_of_testball;
                    test_ball.velocity_y = Math.sin(collision_angle)*final_velx_of_testball + Math.sin(collision_angle + Math.PI/2)*final_vely_of_testball;

                    ball.velocity_x = Math.cos(collision_angle)*final_velx_of_ball + Math.cos(collision_angle + Math.PI/2)*final_vely_of_ball;
                    ball.velocity_y = Math.cos(collision_angle)*final_velx_of_ball + Math.cos(collision_angle + Math.PI/2)*final_vely_of_ball;
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
