// pages/profile-created.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust the import according to your project structure

const ProfileCreated = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Already Created</h1>
        <p className="text-gray-600 mb-6">
          Your profile has already been created. You can return to your dashboard.
        </p>
        <Link href="/dashboard">
          <Button className="w-full">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCreated;

