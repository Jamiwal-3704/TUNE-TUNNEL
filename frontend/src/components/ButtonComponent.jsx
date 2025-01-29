export function ButtonComponent({ label, onClick }) {
  return <div>
    <button onClick={onClick} className="w-full bg-gray-900 border-2 text-white font-semibold py-2 rounded-md border-none flex justify-center items-center hover:bg-blue-700">{label}</button>
  </div>
}
