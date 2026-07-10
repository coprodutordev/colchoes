import { Users, TrendingUp, ShoppingBag, Eye } from "lucide-react";

export default function AdminDashboard() {
  const kpis = [
    { title: "Leads no Mês", value: "142", trend: "+12.5%", icon: <Users className="text-remvita-blue w-6 h-6" /> },
    { title: "Orçamentos Fechados", value: "38", trend: "+8.2%", icon: <ShoppingBag className="text-remvita-teal w-6 h-6" /> },
    { title: "Visitas no Site", value: "4.5k", trend: "+24.1%", icon: <Eye className="text-purple-500 w-6 h-6" /> },
    { title: "Taxa de Conversão", value: "3.2%", trend: "+1.1%", icon: <TrendingUp className="text-green-500 w-6 h-6" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Visão geral do desempenho de vendas e tráfego.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-background border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-muted rounded-xl">
                {kpi.icon}
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background border border-border rounded-2xl shadow-sm p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Tráfego vs Leads (Últimos 30 dias)</h3>
            <select className="text-sm bg-muted border-none rounded-lg px-3 py-1 outline-none">
              <option>Últimos 30 dias</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-border rounded-xl">
            <span className="text-muted-foreground text-sm">[Gráfico Recharts AreaChart será renderizado aqui]</span>
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-2xl shadow-sm p-6 min-h-[400px]">
          <h3 className="font-bold text-lg mb-6">Últimos Leads</h3>
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-sm">Cliente {i}</h4>
                    <p className="text-xs text-muted-foreground">Interesse: Linha Premium</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">Novo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
