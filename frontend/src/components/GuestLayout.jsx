import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border">
        <div className="w-full max-w-md space-y-8">
          <h1 className="mt-6 text-center text-5xl font-bold tracking-tight text-blue-900">
            FMMS
          </h1>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
