import { useCallback, useEffect, useRef, useState } from "react";
function App() {
const [length , setLength] = useState(8);
const [numberAllowed , setNumberAllowed ] = useState(false);
const [charAllowed , setCharAllowed] = useState(false);
const [password , setPassword] = useState('');

const passwordRef = useRef(null)


const generatePassword = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(charAllowed) str += "!@#$%^&*()_+"
  for(let i = 1; i<length; i++){
  const char = Math.floor(Math.random() * str.length + 1)
  pass =+ str.charAt(char)
  }
  setPassword(pass)
} , [length, numberAllowed, charAllowed])

useEffect(() => {
  generatePassword()
}, [length , numberAllowed, charAllowed])


const copyPasswordToClipboard= ()=>{
window.navigator.clipboard.writeText(password)
passwordRef.current?.select()
}


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-red-400 text-black-800 ">
    <h1 className="text-white my-3 text-center "> Password Generator </h1>
    <div className="flex shadow rounded-lg mb-4 overflow-hidden ">
   <input className="outline-none py-1 px-3 w-full " placeholder="Password" readOnly  value={password} type="text"  ref={passwordRef}/>
    <button  onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"> Copy </button>
    </div>
    <div className="flex text-sm gap-x-2 ">
   <div className="flex items-center gap-x-1 ">
   <input onChange={(e) => setLength(e.target.value)}  type="range" name="" id="" min={6} value={length} className="cursor-pointer" />
    <label htmlFor="length">Length:{length}</label>
    </div>

    <div className="flex items-center gap-x-1 ">
   <input onChange={() =>{ setNumberAllowed((prev) => !prev  ) }}  type="checkbox" defaultChecked={numberAllowed} name="" id="" />
    <label htmlFor="number">Numbers </label>
    </div>

    <div className="flex items-center gap-x-1 ">
   <input onChange={() =>{ setCharAllowed((prev) => !prev  ) }}  type="checkbox" defaultChecked={charAllowed} name="" id="" />
    <label htmlFor="charInput">Character</label>
    </div>
    </div>
     </div>

  )
}
export default App
