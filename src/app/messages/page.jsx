import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ChatInterface from "./components/ChatInterface";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/messages");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-1">
                {session.user.role === 'restaurantOwner' 
                  ? "Manage conversations with your customers" 
                  : "Communicate with restaurant owners and manage your conversations"
                }
              </p>
            </div>
            <div className="p-6">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}