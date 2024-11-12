import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}