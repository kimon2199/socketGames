import { Link } from "react-router-dom";

const HomePage = () => {

  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  return(
    <div className="bg-contain mx-auto">
      <h1 className="text-3xl font-bold text-white font-mono py-32">
        Welcome to jungle game!
      </h1>

      <div className='grid'>

        {/* <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">VS.</span>
            <span className="font-semibold mr-2 text-left flex-auto">Player</span>
          </div>
        </div> */}
        {zip(["A.I.","Player (Local)","Player (Online)"],['ai','local','online']).map((i) =>
          <div className="text-center py-4 lg:px-4">
            <Link className="nav-link" to={"/"+i[1]}>
            <button className="p-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 items-center text-indigo-100 leading-none rounded-full flex inline-flex shadow-2xl" role="alert">
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">VS.</span>
              <span className="font-semibold mr-2 flex-auto">{i[0]}</span>
            </button>
            </Link>
          </div>)}

        <div className="bg-indigo-900 text-center py-4 lg:px-4 shadow-2xl">
          <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none sm:rounded-full flex sm:inline-flex" role="alert">
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">VS.</span>
            <span className="font-semibold mr-2 flex-auto">Player</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;