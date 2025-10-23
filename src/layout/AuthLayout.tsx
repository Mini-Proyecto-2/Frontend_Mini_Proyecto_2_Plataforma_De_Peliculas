import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center"
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
