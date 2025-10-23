import { Spinner } from "../ui/spinner";

const FullScreenLoader = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
      <Spinner className="size-[5rem]" />
      <img
        src="logo-white.png"
        alt="Logo FilmUnity"
        className="h-35 object-contain"
      />
    </div>
  )
}


export { FullScreenLoader };