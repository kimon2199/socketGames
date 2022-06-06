import './App.css';

function App() {
  return (
    <div className="App bg-indigo-900 bg-contain mx-auto">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
          Save changes
        </button>
      </div>



      <div className='grid'>

        {/* <div class="bg-indigo-900 text-center py-4 lg:px-4">
          <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">VS.</span>
            <span class="font-semibold mr-2 text-left flex-auto">Player</span>
          </div>
        </div> */}
        {["A.I.","Player (Local)","Player (Online)"].map((i) =>
          <div class="text-center py-4 lg:px-4">
            <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full flex inline-flex" role="alert">
              <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">VS.</span>
              <span class="font-semibold mr-2 text-left flex-auto">{i}</span>
            </div>
          </div>)}
        <div class="bg-indigo-900 text-center py-4 lg:px-4">
          <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">VS.</span>
            <span class="font-semibold mr-2 text-left flex-auto">Player</span>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
