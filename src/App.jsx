import { useState, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [generateNewPassword, setGenerateNewPassword] = useState(false);

  useEffect(() => {
    setGenerateNewPassword(false);
    let pw = generatePassword(length);
    setPassword(pw);
  }, [length, generateNewPassword]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-200">
      <div className=" w-9/12 bg-zinc-100 rounded-xl shadow-2xl px-4 py-8 flex flex-col items-center justify-between gap-6 max-w-xl">
        <h1 className="font-normal text-3xl text-gray-500">
          Password Generator
        </h1>
        <div className="w-full relative bg-gray-200 shadow-inner h-1/6 rounded-xl text-center py-2 flex  items-center">
          <p className="flex-grow text-lg font-bold text-slate-800 tracking-tight">
            {password}
          </p>
          <button
            className="p-1 text-2xl text-sky-50 bg-sky-400 grow-0 mr-2 rounded-md active:bg-sky-600"
            onClick={() => {
              navigator.clipboard.writeText(password);
            }}
          >
            <FaClipboard />
          </button>
        </div>
        <div className="w-full flex gap-2 accent-sky-500 active:accent-sky-400">
          <span className="text-md font-semibold">Length: </span>
          <input
            className="w-full grow-0"
            type="range"
            min={8}
            value={length}
            max={16}
            step={1}
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="text-md font-semibold w-8">{length}</span>
        </div>
        <button
          onClick={() => setGenerateNewPassword(true)}
          className="w-full bg-sky-400 h-1/6 rounded-xl shadow-lg hover:bg-sky-300 active:scale-95 active:bg-sky-600 py-2 text-sky-50 text-xl text font-medium  "
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

const generatePassword = (length) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    let choice = Math.floor(random(0, 3));

    if (choice === 0) {
      password += getRandomLowerCaseLetter();
    } else if (choice === 1) {
      password += getRandomUpperCaseLetter();
    } else if (choice === 2) {
      password += getRandomSymbol();
    } else if (choice === 3) {
      password += random(0, 9);
    }
  }

  return password;
};

const random = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomLowerCaseLetter = () => {
  return String.fromCharCode(random(97, 122));
};

const getRandomUpperCaseLetter = () => {
  return String.fromCharCode(random(65, 90));
};

const getRandomSymbol = () => {
  const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
  return symbols[random(0, symbols.length - 1)];
};

export default App;
