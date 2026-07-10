import { HelpCircle } from "lucide-react";

export default function AdminFaqPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-remvita-teal/10 rounded-3xl flex items-center justify-center mb-6">
        <HelpCircle className="w-8 h-8 text-remvita-teal" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">FAQ</h1>
      <p className="text-muted-foreground">Gestão de perguntas frequentes será implementada em breve.</p>
    </div>
  );
}
