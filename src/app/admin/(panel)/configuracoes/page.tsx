import { Settings } from "lucide-react";

export default function AdminConfiguracoesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-gray-500/10 rounded-3xl flex items-center justify-center mb-6">
        <Settings className="w-8 h-8 text-gray-500" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Configurações</h1>
      <p className="text-muted-foreground">Configurações do sistema serão implementadas em breve.</p>
    </div>
  );
}
