import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");
  const passgenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";
    let check = true;
    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
      setPass(password);

    }



  }, [length, numberAllowed, charAllowed, setPass]);
  const passCopy = useRef(null);
  const copyPass = useCallback(()=>{passCopy.current?.select(); window.navigator.clipboard.writeText(pass)},[pass]);
  useEffect(() => { passgenerator() }, [passgenerator, length, numberAllowed, charAllowed]);


  return (
    <>
      <div className="w-full  max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 mb-3 text-orange-500 bg-gray-700 text-center text-3xl">Password Generator
        <div className="flex justify-center shadow rounded-lg overflow-hidden  ">
          <input type="text"
            value={pass} ref={passCopy} className="outline-none m-auto py-1 px-3 w-full rounded-md" placeholder="password" readOnly />
          <button onClick={copyPass} className="bg-blue-700 text-white px-3 py-0.5 outline-none shrink-0 hover:bg-blue-500">copy</button>
        </div>
      </div>
      <div className="flex text-center justify-center text-sm gap-x-2 text-white">
        <div className="flex  tex-sm gap-x-1">
          <input type="range"
            min={8}
            max={20}
            value={length} className="cursor-pointer"
            onChange={(e) => { setLength(e.target.value) }} />
          <label className="text-white text-2xl" >Length:{length}</label>
        </div>
        <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }} />
        <label htmlFor="numberInput" className="text-2xl">Numbers</label>
        <input type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }} />
        <label htmlFor="charInput" className="text-2xl">Characters  </label>
      </div>

    </>
  )
}

export default App
