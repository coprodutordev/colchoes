import { Metadata } from "next";
import { Lock } from "lucide-react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Login - Painel Administrativo REMVITA",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-3xl shadow-xl border border-border p-8">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-remvita-blue/10 rounded-2xl flex items-center justify-center text-remvita-blue">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Painel REMVITA</h1>
        <p className="text-muted-foreground text-center text-sm mb-8">Acesse para gerenciar o sistema</p>
        
        <LoginForm />
      </div>
    </div>
  );
}
