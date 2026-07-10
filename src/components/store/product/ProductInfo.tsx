"use client";

import { MessageCircle, FileText, Heart, Share2, Star } from "lucide-react";

interface ProductInfoProps {
  product: {
    name: string;
    rating: number;
    reviews: number;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      {/* Title & Rating */}
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{product.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-yellow-400">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="ml-2 text-sm font-medium text-muted-foreground">({product.rating} / {product.reviews} avaliações)</span>
          </div>
        </div>
      </div>

      {/* Discount CTA */}
      <div className="mb-8 p-6 bg-remvita-teal/10 rounded-2xl border border-remvita-teal/30">
        <p className="text-2xl font-bold text-remvita-teal">Compre com 30% de desconto</p>
        <p className="text-sm mt-2 text-muted-foreground">Parcelamento em até 12x sem juros disponível.</p>
      </div>

      {/* Actions */}
      <div className="space-y-4 mb-10">
        <button className="w-full h-14 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full font-bold text-lg flex items-center justify-center transition-transform hover:scale-[1.02] shadow-lg shadow-[#25D366]/20">
          <MessageCircle className="w-6 h-6 mr-3" />
          Compre com 30% OFF
        </button>
        <button className="w-full h-14 bg-background border-2 border-remvita-blue text-remvita-blue hover:bg-remvita-light rounded-full font-bold text-lg flex items-center justify-center transition-colors">
          <FileText className="w-6 h-6 mr-3" />
          Solicitar Orçamento Oficial
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-6 border-t border-border pt-6">
        <button className="flex items-center text-muted-foreground hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5 mr-2" /> Favoritar
        </button>
        <button className="flex items-center text-muted-foreground hover:text-remvita-blue transition-colors">
          <Share2 className="w-5 h-5 mr-2" /> Compartilhar
        </button>
      </div>
    </div>
  );
}
