import { dbConnect, collectionsName } from "@/lib/dbConnect";
import Image from "next/image";

async function getDemoUsers() {
  const usersCollection = await dbConnect(collectionsName.usersCollection);
  const demoUsers = await usersCollection.find({ isDemo: true }).toArray();
  return demoUsers;
}

export default async function DemoUsersPage() {
  const demoUsers = await getDemoUsers();
  
  // Group users by role
  const usersByRole = {};
  demoUsers.forEach(user => {
    if (!usersByRole[user.role]) {
      usersByRole[user.role] = [];
    }
    usersByRole[user.role].push(user);
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demo User Credentials</h1>
      <p className="mb-6 text-gray-600">
        These demo users can log in without OTP verification. Use them to test different user roles in the application.
      </p>
      
      {Object.entries(usersByRole).map(([role, users]) => (
        <div key={role} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{role} Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={user.photoUrl}
                    alt={`Profile picture of ${user.name}`} // <-- FIX IS HERE
                    width={64} // w-16
                    height={64} // h-16
                    className="rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                
                {/* User Details */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-800">Email:</span> {user.email}</p>
                    <p><span className="font-medium text-gray-800">Password:</span> <span className="font-mono bg-gray-100 px-1 rounded">{user.email.split('@')[0]}</span></p>
                    <p><span className="font-medium text-gray-800">Role:</span> {user.role}</p>
                    <p><span className="font-medium text-gray-800">Phone:</span> {user.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These demo accounts have OTP verification disabled for testing purposes. The password for each account is the part of the email before the @ symbol.
        </p>
      </div>
    </div>
  );
}