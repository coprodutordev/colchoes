import { Building2 } from "lucide-react";

export default function AdminParceirosPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-remvita-teal/10 rounded-3xl flex items-center justify-center mb-6">
        <Building2 className="w-8 h-8 text-remvita-teal" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Parceiros</h1>
      <p className="text-muted-foreground">Gestão de parceiros será implementada em breve.</p>
    </div>
  );
}
