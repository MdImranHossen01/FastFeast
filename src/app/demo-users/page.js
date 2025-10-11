import { dbConnect, collectionsName } from "@/lib/dbConnect";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <div key={user._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Password:</span> demo-{role}-{index + 1}</p>
                  <p><span className="font-medium">Role:</span> {user.role}</p>
                  <p><span className="font-medium">Phone:</span> {user.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These demo accounts have OTP verification disabled for testing purposes.
        </p>
      </div>
    </div>
  );
}