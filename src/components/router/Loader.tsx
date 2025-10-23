import { Spinner } from "../ui/spinner";
import logo from "@/assets/logo-white.png";

const FullScreenLoader = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
      <img
        src={logo}
        alt="Logo FilmUnity"
        className="h-20 object-contain"
      />
      <Spinner className="size-[5rem]" />
    </div>
  )
}


export { FullScreenLoader };