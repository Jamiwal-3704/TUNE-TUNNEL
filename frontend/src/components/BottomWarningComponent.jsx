import { Link } from "react-router-dom"
export function BottomWarningComponent({ text, to, linkLabel }) {

  return <div className="flex justify-center items-center my-3 w-full ">
    <h4 className="mr-2">{text}</h4>
    <Link to={to} className="underline hover:text-blue-500 cursor-pointer pointer">{linkLabel}</Link>
  </div>
}
