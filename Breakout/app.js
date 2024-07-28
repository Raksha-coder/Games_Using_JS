const grid = document.querySelector('.grid');
const blockWidth = 130;
const blockHeight = 20;
const movingBlockStartPosition = [220,10]; //left = 220 and bottom = 10
let movingBlockCurrentPosition = movingBlockStartPosition;  //when game will end , it should start from it's original position.
const gridwidth = 574;
const gridheight = 300;
const ballStartPosition = [275,30];
let ballCurrentPosition = ballStartPosition;
let ballDiameter = 20;
let ballXDirection = 2;
let ballYDirection = 2;
//to stop the ball
let timeId ;
const GameOver = document.querySelector('#Over');
const score = document.querySelector('#score');
let displayScore =0;
const startAndStopBtn = document.querySelector('#btn');


    //position of blocks
    class Block
    {
        //it is covering the whole area of block.
        constructor(xAxis,yAxis) {
            this.bottomleft = [xAxis,yAxis];    //first block , left and bottom 

            //for ball touching the blocks
            this.bottomRight = [xAxis + blockWidth+yAxis];
            this.topLeft = [xAxis,yAxis+blockHeight];
            this.topRight = [xAxis + blockWidth,yAxis+blockHeight];
        };
        
    }


    //array of blocks.
    const blocks = [
        // first row
        new Block(10,270),
        new Block(150,270),
        new Block(290,270),
        new Block(430,270),

        //second row
        new Block(10,235),
        new Block(150,235),
        new Block(290,235),
        new Block(430,235),

        //third row
        new Block(10,200),
        new Block(150,200),
        new Block(290,200),
        new Block(430,200),

        //fourth row
        new Block(10,170),
        new Block(150,170),
        new Block(290,170),
        new Block(430,170),

    ];



    function addBlock()
    {
        for(let i=0;i<blocks.length;i++){
            const block = document.createElement('div');
            block.classList.add('block');
            grid.appendChild(block);
            block.style.left = blocks[i].bottomleft[0] + 'px';  //10px
            block.style.bottom = blocks[i].bottomleft[1] + 'px'; //270px
        }
    }

    addBlock();



    
    //add moving Block
    const movingBlock = document.createElement('div')
    movingBlock.classList.add('movingBlock');
    positionOfBlock();
    grid.appendChild(movingBlock);


    //draw the movingBlock
    function positionOfBlock()
    {
        movingBlock.style.left = movingBlockCurrentPosition[0] + 'px';   //230
        movingBlock.style.bottom = movingBlockCurrentPosition[1] + 'px';   //10
    }


    //now add the right and left movement in above block
    function moveBlockRightLeft(e)
    {
        switch(e.key){
            case 'ArrowLeft':
                if(movingBlockCurrentPosition[0] > 10){
                    movingBlockCurrentPosition[0] -= 10;
                    positionOfBlock();
                }
                break;

            case 'ArrowRight':
                if(movingBlockCurrentPosition[0] < gridwidth - blockWidth){
                        movingBlockCurrentPosition[0] += 10;
                        positionOfBlock();
                }
                break;
            
        }
    }

    document.addEventListener('keydown',moveBlockRightLeft);


    //ball position 
    function drawBall()
    {
        ball.style.left = ballCurrentPosition[0] + 'px';
        ball.style.bottom = ballCurrentPosition[1] + 'px';
    }



    //ball 
    const ball = document.createElement('div');
    ball.classList.add('ball');
    grid.appendChild(ball);
    drawBall();



    //check for collisions
    function checkForCollisions()
    {
        //check for block collision
        for(let i=0;i<blocks.length;i++){
            if( (ballCurrentPosition[0] > blocks[i].bottomleft[0] && 
                ballCurrentPosition[0] < blocks[i].bottomRight[0]) && 
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomleft[1] 
            && ballCurrentPosition[1] < blocks[i].topLeft[1])){

                //take all blacks and their index
                const allBlocks = Array.from(document.querySelectorAll('.block'));
                console.log(allBlocks);
                allBlocks[i].classList.remove('block');

                //remove the position from the Block class 
                blocks.splice(i,1);
                changeDirections();
                displayScore++;
                score.innerHTML = displayScore;

                if(blocks.length === 0){
                    GameOver.innerHTML = "YOU WON!";
                    clearInterval(timeId);
                    document.removeEventListener('keydown',moveBlockRightLeft);
                }

            }
        }

        //collision with the moving block
        if( (ballCurrentPosition[0] > movingBlockCurrentPosition[0]  && ballCurrentPosition[0] < (movingBlockCurrentPosition[0]+blockWidth) 
            && (ballCurrentPosition[1]> movingBlockCurrentPosition[1] && ballCurrentPosition[1] < (movingBlockCurrentPosition[1]+blockHeight)) )){
            changeDirections();
        }



        //for moving the ball
        if(ballCurrentPosition[0] >= (gridwidth - ballDiameter)||
        ballCurrentPosition[1] >= (gridheight - ballDiameter) ||
            (ballCurrentPosition[0] <=0) ){
                    changeDirections();
        }




        //check for Game Over 
        if(ballCurrentPosition[1] <=0){
            clearInterval(timeId);
            GameOver.textContent = "Game Over!!";
            document.removeEventListener('keydown',moveBlockRightLeft)
        }
    }



    function changeDirections()
    {
        if(ballXDirection === 2 && ballYDirection  === 2){
            ballYDirection = -2;
            return
        }

        if(ballXDirection === 2 && ballYDirection  === -2){
            ballXDirection = -2;
            return
        }

        if(ballXDirection === -2 && ballYDirection === -2){
            ballYDirection = 2;
            return
        }

        if(ballXDirection===-2 && ballYDirection === 2){
            ballXDirection = 2;
            return;
        }
    }




    function moveBall(){
        ballCurrentPosition[0] +=ballXDirection;
        ballCurrentPosition[1] +=ballYDirection;
        drawBall();
        checkForCollisions();
    };



    //if the ball touched the block , do x and y minus
    timeId = setInterval(moveBall, 25);




// startAndStopBtn.addEventListener('click',startTheGame);






