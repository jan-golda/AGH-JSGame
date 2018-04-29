class GameEngine{

    constructor(){
        this._setupWorld();
        this._setupEngine();
        this._setupRenderer();
        this._setupRunner();
        this._setupBoard();

        this.pause();
    }

    _setupWorld(){
        this.world = Matter.World.create(Settings.world);
    }

    _setupEngine(){
        this.engine = Matter.Engine.create({
            world: this.world
        });
    }

    _setupRenderer(){
        this.render = Matter.Render.create({
            canvas: document.getElementById("board"),
            engine: this.engine,
            options: Settings.renderer
        });

        Matter.Render.run(this.render);
    }

    _setupRunner(){
        this.runner = Matter.Runner.create();
        Matter.Runner.run(this.runner, this.engine);
    }

    _setupBoard(){

        // setup walls
        let wall = Settings.board.wallWidth;
        let height = this.getHeight();
        let width = this.getWidth();

        Matter.World.add(this.world, [
            Matter.Bodies.rectangle(width/2,           0-wall/2,           width + 2*wall,    wall,               {isStatic: true}),
            Matter.Bodies.rectangle(width + wall/2,    height/2,           wall,              height + 2*wall,    {isStatic: true}),
            Matter.Bodies.rectangle(width/2,           height + wall/2,    width + 2*wall,    wall,               {isStatic: true}),
            Matter.Bodies.rectangle(0-wall/2,          height/2,           wall,              height + 2*wall,    {isStatic: true})
        ]);


    }

    clear(){
        Matter.World.clear(this.world, true);
    }

    add(body){
        Matter.World.add(this.world, body);
    }

    getWidth(){
        return this.render.options.width;
    }

    getHeight(){
        return this.render.options.height;
    }

    pause(){
        this.runner.enabled = false;
    }

    resume(){
        this.runner.enabled = true;
    }

}