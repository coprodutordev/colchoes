import { FileText } from "lucide-react";

export default function AdminBlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-remvita-blue/10 rounded-3xl flex items-center justify-center mb-6">
        <FileText className="w-8 h-8 text-remvita-blue" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Blog</h1>
      <p className="text-muted-foreground">Gestão de posts do blog será implementada em breve.</p>
    </div>
  );
}
