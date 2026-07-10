import { BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-purple-500/10 rounded-3xl flex items-center justify-center mb-6">
        <BarChart3 className="w-8 h-8 text-purple-500" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Analytics</h1>
      <p className="text-muted-foreground">Relatórios e análises serão implementados em breve.</p>
    </div>
  );
}
