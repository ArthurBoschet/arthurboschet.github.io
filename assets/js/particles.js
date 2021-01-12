class Engine{
    constructor(canvas, ctx, update_function, draw_function){
        this.update = update_function;
        this.draw = draw_function;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    run_animation(){
        let past_time = 0;
        let gameloop = function(timestamp, engine){
            let deltatime = timestamp - past_time;
            past_time = timestamp;

            //clear canvas
            engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

            //update game objects
            engine.update();

            //draw game frame
            engine.draw(engine.ctx);

            //request next frame
            requestAnimationFrame(timestamp => gameloop(timestamp, engine));
        }
        let engine = this;
        (timestamp => gameloop(timestamp, engine))();

    }

}

class Particle{
    constructor(canvas, x, y, directionX, directionY, size, color){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    //check particle position, check ball position
    update(mouse){
        let width = this.canvas.width;
        let height = this.canvas.height;
        if(this.x > width || this.x<0){
            this.directionX = -this.directionX
            if (this.x < 0){
                this.x = this.size;
            }else{
                this.x = width-this.size;
            }
        }
        if(this.y > height || this.y<0){
            this.directionY = -this.directionY
            if (this.y < 0){
                this.y = this.size;
            }else{
                this.y = height-this.size;
            }
        }

    
        let dx = mouse.position.x - this.x;
        let dy = mouse.position.y - this.y;
        let distance = Math.sqrt(dx*dx+dy*dy);

        //check collision with ball
        if(distance < 10*mouse.diameter){
            
            let changex;
            let changed_mag = 10;
            if(dx > 0){
                changex = -changed_mag;
            }else{
                changex = changed_mag;
            }
            let changey;
            if(dy > 0){
                changey = -changed_mag;
            }else{
                changey = changed_mag;
            }

            if(dx*dx > dy*dy){
                this.x += changex;
            }else{
                this.y += changey;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
    }
}

class Particles{
    constructor(canvas, mouse){
        this.canvas = canvas;
        this.screen_width = canvas.width;
        this.screen_height = canvas.height;
        this.particles_array = [];
        this.mouse = mouse;
        this.init();
    }
    
    init(){
        this.particles_array = [];
        let number_particles = (this.canvas.height * this.canvas.width)/30000;
        for(let i=0; i<number_particles; i++){
            let size = (Math.random() * 5) + 1;
            let x = (Math.random()*(this.screen_width - size*4) + size*2);
            let y = (Math.random()*(this.screen_height - size*4) + size*2);
            let directionX = (Math.random()*5-2.5);
            let directionY = (Math.random()*5-2.5);
            let color = 'white'
            this.particles_array.push(new Particle(this.canvas, x,y ,directionX, directionY, size, color));
        }
    }

    update(){
        //console.log(this.mouse.position.x);
        for(let i=0; i<this.particles_array.length; i++){
            this.particles_array[i].update(this.mouse);
        }
    }

    connect(ctx){
        for(let a=0; a<this.particles_array.length; a++){
            for(let b=a; b<this.particles_array.length; b++){
                //console.log("hello");
                let dx = this.particles_array[b].x - this.particles_array[a].x;
                let dy = this.particles_array[b].y - this.particles_array[a].y;
                let dist2 = dx*dx + dy*dy;
                if(dist2 < (this.screen_height/7)*(this.screen_height/7)){
                    //ctx.save();
                    ctx.strokeStyle = "white";
                    let alpha = Math.exp(-Math.sqrt(dist2)/25);
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(this.particles_array[a].x, this.particles_array[a].y);
                    ctx.lineTo(this.particles_array[b].x, this.particles_array[b].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                    //ctx.restore();
                }
            }
        }
    }

    draw(ctx){
        //console.log(this.particles_array.length);
        for(let i=0; i<this.particles_array.length; i++){
            //console.log("hello particles")
            this.particles_array[i].draw(ctx);
            this.connect(ctx);
        }
    }
}

//canvas setup
let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//clear the screen initially
ctx.clearRect(0, 0, canvas.width, canvas.height);

//intitialize mouse object
let mouse = {
    position: {
        x: null,
        y: null
    },
    diameter: (this.screen_height/80) * (this.screen_width/80)
};


//create new game object
let particles = new Particles(canvas, mouse);

//add event listener
// window.addEventListener('mousemove',
//     function(event){
//         console.log("hello")
//         particles.mouse.position.x = event.x;
//         particles.mouse.position.y = event.y;
//     }
// )

window.addEventListener('resize',
    function(event){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        particles.screen_width = canvas.width;
        particles.screen_height = canvas.height;
        particles.init();
    }
)

let update = (() => particles.update(mouse));//(deltatime => game.update(deltatime, level_duration));
let draw = (context => particles.draw(context));

//create new engine object
let engine = new Engine(canvas, ctx, update, draw);

//enter gameloop
engine.run_animation();







