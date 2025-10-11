import React from "react";
import LoginForm from "./components/LoginForm";
import CreateDemoUsersButton from "./components/CreateDemoUsersButton";

export default function LoginPage() {
  // Only show the demo button in development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="py-18">
      <LoginForm />
    
                
    </div>
  );
}