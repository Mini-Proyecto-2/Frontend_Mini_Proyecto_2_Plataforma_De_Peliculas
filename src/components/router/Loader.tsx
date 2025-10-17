import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const FullScreenLoader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 20))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-opacity-50 gap-y-8">
      <img
        src="full_logo.svg"
        alt="Logo TaskFlow DS"
        className="h-12 object-contain"
      />
      <Progress
        className="w-[25%] h-5"
        value={progress}
      />
    </div>
  )
}


export { FullScreenLoader };