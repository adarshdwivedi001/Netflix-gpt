import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-gray-800 p-4 text-white font-extrabold text-center">Hello World</div>
    </>
  );
}

export default App;
