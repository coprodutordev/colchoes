import { Megaphone } from "lucide-react";

export default function AdminBannersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center mb-6">
        <Megaphone className="w-8 h-8 text-orange-500" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Banners</h1>
      <p className="text-muted-foreground">Gestão de banners será implementada em breve.</p>
    </div>
  );
}
