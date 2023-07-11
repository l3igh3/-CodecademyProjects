const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let playing = true;


class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.field[0][0] = pathCharacter; //Sets home position before the game starts
        this.x = 0;
        this.y = 0;
    }

    //Start Game
   startGame() { 
         while(playing) {
            this.print();
            this.promptUser();
            if (!this.isInBounds()) {
                console.log('Out of bounds! GAME OVER');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Oh no, we fell in a hole! GAME OVER');
                playing = false;
                this.playAgain();
                console.log(' '); //break in prompt
                break;
              } else if (this.isHat()) {
                console.log('Congrats, you found my hat!');
                playing = false;
                break;
              } 
            

            //Update location of user on map
            this.field[this.y][this.x] = pathCharacter; 
            
        }
    }

    //Ask user for input
    promptUser() {
        const answer = prompt('Which way?: ');
        switch (answer) {
            case 'U'||'u':
               this.y -= 1;
                break;
            case 'd'|| 'D':
               this.y += 1;
                break;
            case 'l'||'L':
               this.x -= 1;
                break;
            case 'r'||'R':
                this.x += 1;
                break;
            default:
                console.log('Enter U, D, L, or R to move: ');
                this.promptUser();
                break;
        }
    }
   
     //in Bounds
     isInBounds() {
        return (
          this.y >= 0 &&
          this.x >= 0 &&
          this.y < this.field.length &&
          this.x < this.field[0].length
        );
      }
      isHat() {
        return this.field[this.y][this.x] === hat;
      }
    
      isHole() {
        return this.field[this.y][this.x] === hole;
      }
    
      print() {
        const displayString = this.field.map(row => {
            return row.join('');
          }).join('\n');
        console.log(displayString);
      }
      //stolencode
      static generateField(height, width, holes) {
        let newField = [];
        for (let i = 0; i < height; i++) {
          newField.push([]);
          for (let j = 0; j < height; j++) {
              newField[i].push(fieldCharacter)
          };
        };
        newField[0][0] = pathCharacter;
        let hatX = Math.floor(Math.random() * width);
        let hatY = Math.floor(Math.random() * height);
        newField[hatY][hatX] = hat;
        
        for (let k = holes; k > 0; k--) {
          let holeX = hatX;
          let holeY = hatY;
          while (holeX === hatX) {
            holeX = Math.floor(Math.random() * width)
          };
          while (holeY === hatY) {
            holeY = Math.floor(Math.random() * height)
          };
         newField[holeY][holeX] = hole; 
        }
        return newField;
      } 
      //Generate field
      static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
          return field;
        }
        
        //Set Hat location
        const hatLocation = {
           hatx: Math.floor(Math.random() * width),
           haty: Math.floor(Math.random() * height)
          };
          // Make sure the "hat" is not at the starting point
          while (hatLocation.hatx === 0 && hatLocation.haty === 0) {
            hatLocation.hatx = Math.floor(Math.random() * width);
            hatLocation.haty = Math.floor(Math.random() * height);
          }
          field[hatLocation.haty][hatLocation.hatx] = hat;
          return field;
        }

         //promt user to play again
    playAgain() {
      const again = prompt('Play Again?(y/n): ')
      switch(again) {
        case 'y':
          myfield.startGame();
          break;
        case 'n':
          console.log('Okay, bye!');
          break;
      }
    }
    
}
const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.startGame(new Field);


  