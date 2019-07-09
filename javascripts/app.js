// boundaries 

let boundaries =  [[null, null, "rock", null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, "rock", null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, "rock", null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null]]

// rover objects 

const Rover1 = {
    name: "Rover1",
    Direction: "N",
    x: 0,
    y: 0,
    travellog: [[0, 0]],
  }
  
const Rover2 = {
    name: "Rover2",
    Direction: "N",
    x: 9,
    y: 9,
    travellog: [[9, 9]],
}
  
let nextPosition = null

  // turning arround

  function turnLeft(rover){
    console.log(`turnLeft was called for ${rover["name"]}`)
    switch(rover["Direction"]){
      case "N":
        rover["Direction"] = "W"
        break;
      case "W":
        rover["Direction"] = "S"
        break;
      case "S":
        rover["Direction"] = "E"
        break;
      case "E":
        rover["Direction"] = "N"
        break;
    }
    console.log(`The new direction is ${rover["Direction"]}`)
  }
  
  function turnRight(rover) {
    console.log(`TurnRight was called for ${rover["name"]}`)
    switch(rover["Direction"]){
      case "N":
        rover["Direction"] = "E"
        break;
      case "W":
        rover["Direction"] = "N"
        break;
      case "S":
        rover["Direction"] = "W"
        break;
      case "E":
        rover["Direction"] = "S"
        break;
    }
    console.log(`The new direction is ${rover["Direction"]}`)
  }

// function to move 

function moveForward(rover){
    console.log(`moveForward was called for ${rover["name"]}`)
    switch(rover["Direction"]){
      case "N":
          if(rover["y"]<=0) {
            return console.log("Error: stay within boundry!")
          }
          nextPosition = boundaries[rover["y"]-1][rover["x"]]
          if(nextPosition != null){
            return console.log(`Error a ${nextPosition} formed an obstacle`)
          } else {
            rover["y"] -= 1
            break;
          }
      case "W":
          if(rover["x"]<=0) {
            return console.log("Error: stay within boundry!")
          }
          nextPosition = boundaries[rover["y"]][rover["x"]-1]
          if(nextPosition != null){
            return console.log(`Error a ${nextPosition} formed an obstacle`)
          } else {
            rover["x"] -= 1
            break;
          }
      case "S":
          if(rover["y"]>=9) {
            return console.log("Error: stay within boundry!")
          }
          nextPosition = boundaries[rover["y"]+1][rover["x"]]
          if(nextPosition != null){
            return console.log(`Error a ${nextPosition} formed an obstacle`)
          } else {
            rover["y"] += 1
            break;
          }
      case "E":
          if(rover["x"]>=9) {
            return console.log("Error: stay within boundry!")
          }
          nextPosition = boundaries[rover["x"]+1][rover["y"]] 
          if(nextPosition != null){
            return console.log(`Error a ${nextPosition} formed an obstacle`)
          } else {
            rover["x"] += 1
            break;
          }
    }
    console.log(`The rover's new coordinates are ${rover["x"]} x and ${rover["y"]} y`)
    rover["travellog"].push([rover["x"], rover["y"]])
    var back = rover["travellog"].length-2
    var lastPosition = rover["travellog"][back]
    var lastX = lastPosition[0] 
    var lastY = lastPosition[1]
    boundaries[lastX][lastY] = null
    boundaries[rover["y"]][rover["x"]] = "rover"
  }

  function moveBackward(rover){
    console.log("moveBackward was called")
    switch(rover["Direction"]){
      case "S":
            if(rover["y"]<=0) {
              return console.log("Error: stay within boundry!")
            }
            nextPosition = boundaries[rover["y"]-1][rover["x"]]
            if(nextPosition != null){
              return console.log(`Error a ${nextPosition} formed an obstacle`)
            } else {
              rover["y"] -= 1
              break;
            }
      case "E":
            if(rover["x"]<=0) {
              return console.log("Error: stay within boundry!")
            }
            nextPosition = boundaries[rover["y"]][rover["x"]-1]
            if(nextPosition != null){
              return console.log(`Error a ${nextPosition} formed an obstacle`)
            } else {
              rover["x"] -= 1
              break;
            }
      case "N":
            if(rover["y"]>=9) {
              return console.log("Error: stay within boundry!")
            }
            nextPosition = boundaries[rover["y"]+1][rover["x"]]
            if(nextPosition != null){
              return console.log(`Error a ${nextPosition} formed an obstacle`)
            } else {
              rover["y"] += 1
              break;
            }
      case "W":
            if(rover["x"]>=9) {
              return console.log("Error: stay within boundry!")
            }
            nextPosition = boundaries[rover["y"]][rover["x"]+1] 
            if(nextPosition != null){
              return console.log(`Error a ${nextPosition} formed an obstacle`)
            } else {
              rover["x"] += 1
              break;
            }
    }
    console.log(`The rover's new coordinates are ${rover["x"]} x and ${rover["y"]} y`)
    rover["travellog"].push([rover["x"], rover["y"]])
    var lastPosition = rover["travellog"][rover["travellog"].length]
    var lastX = lastPosition[0] 
    var lastY = lastPosition[1]
    boundaries[lastX][lastY] = null
    boundaries[rover["y"]][rover["x"]] = "rover"
  }

  // commands function 

  function commands(commandoList){
    let roverInPlay = Rover1
    for(let i = 0; i < commandoList.length; i++){
      var commando = commandoList[i]
      if("fblr".includes(commando)){
        switch(commando){
          case "f":
            moveForward(roverInPlay)
            break;
          case "l":
            turnLeft(roverInPlay)
            break;
          case "r":
            turnRight(roverInPlay)
            break;
        }
        if(roverInPlay === Rover1){
            roverInPlay = Rover2
        } else {
            roverInPlay = Rover1
        }
      } else {
        return console.log(`invalid input command ${commandoList[i]} was given, mission aboard!`)
      }
    }
    let steps = 0
    Rover1.travellog.forEach(function (position) {
      console.log(`The ${steps}th position was on coordinates ${position[0]}, ${position[1]} `)
      steps += 1
    })
    steps = 0
    Rover2.travellog.forEach(function (position) {
        console.log(`The ${steps}th position was on coordinates ${position[0]}, ${position[1]} `)
        steps += 1
      })
  }