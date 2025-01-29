
export function InputComponent(props) {
  return <div>
    <div className="font-bold w-full text-md text-justify">{props.label}</div>
    <input placeholder={props.placeholder} className="bg-gray-100 border-2 w-full px-3 py-2 my-3 border-gray-300 rounded-md " ref={props.reference} ></input>
  </div>
}
