import React, { useState } from "react";
import Icon from "./Components/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import click from "./click.mp3";
import Swal from "sweetalert2";
import victory from "./victory.mp3";


const itemArray = new Array(9).fill("empty");
let victory_sound = new Audio(victory);
let click_sound = new Audio(click);

const App = () => {
  const height = () => {
    return window.innerHeight + "px";
  };

  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }

    else if(itemArray.filter(item => item === "empty").length === 0){
      Swal.fire({
        title: "Draw",
        html :'<img src="https://thumbs.gfycat.com/AnnualPinkJavalina-size_restricted.gif">',
        confirmButtonText: 'Cool'
      })
    }
    
  };

  const changeItem = itemNumber => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    if (itemArray[itemNumber] === "empty") {
      click_sound.play();
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    }
    else {
      return toast("⚠ Already filled", { type: "error" , position: "top-right"});
    }

    checkIsWinner();
  };

  if(winMessage!==""){
    Swal.fire({
      title: winMessage,
      html :'<img src="https://c.tenor.com/IRwu0K11SigAAAAi/dance.gif">',
      confirmButtonText: 'Cool'
    })
    victory_sound.play();
  }

  return (
   <div className="app" style={{height:height()}}>
     <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
            <h1 className="text-center turns">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card className="Card" onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="button-container">
            <Button className="button" onClick={reloadGame}>
              Reload
            </Button>
      </div>
        </Col>
      </Row>
    </Container>
   </div>
  );
};

export default App;