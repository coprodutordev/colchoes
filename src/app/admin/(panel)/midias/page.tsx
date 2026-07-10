import { Image as ImageIcon } from "lucide-react";

export default function AdminMidiasPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-pink-500/10 rounded-3xl flex items-center justify-center mb-6">
        <ImageIcon className="w-8 h-8 text-pink-500" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Mídias</h1>
      <p className="text-muted-foreground">Biblioteca de mídias será implementada em breve.</p>
    </div>
  );
}
