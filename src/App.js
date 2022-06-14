import logo from "./logo.svg";
import "./App.css";
import { Board, Button, Cubes, Sudoku } from "./Components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col">
          <div>
            <Button action={()=>{}} content={"Helper"}/>
            <Button action={()=>{}} content={"Solve"}/>
          </div>
          <Sudoku />
        </div>
      </header>
    </div>
  );
}

export default App;
