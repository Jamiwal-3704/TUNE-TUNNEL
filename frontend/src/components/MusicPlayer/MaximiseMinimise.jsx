import { useSelector, useDispatch } from "react-redux"
import { setIsSongFullScreen } from "../../redux/features/playerSlice";
export const MaximiseMinimise = () => {
  const dispatch = useDispatch();
  const { isSongFullScreen } = useSelector((state) => state.player);

  const toggleFullScreen = () => {
    dispatch(setIsSongFullScreen(!isSongFullScreen))
  };


  return (
    <button className="text-white w-6 h-6 ml-4"
      onClick={toggleFullScreen}
    >
      {isSongFullScreen ?
        (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white ">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>

        )}
    </button>
  )

}
