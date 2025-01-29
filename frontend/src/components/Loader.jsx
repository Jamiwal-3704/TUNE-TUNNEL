import { loadiermotion } from "../assets";
export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center  h-full w-full ">
      <img
        src={loadiermotion}
        alt="loader"
        className="w-32 h-32 "
      ></img>
    </div>
  );
}
