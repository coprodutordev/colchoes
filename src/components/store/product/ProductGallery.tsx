"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

export function ProductGallery() {
  const [activeImg, setActiveImg] = useState(0);
  const images = [
    "/placeholder-colchao-1.jpg",
    "/placeholder-colchao-2.jpg",
    "/placeholder-colchao-3.jpg",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-muted rounded-3xl overflow-hidden border border-border group cursor-crosshair">
        <Image
          src={images[activeImg]}
          alt={`Colchão REMVITA - Imagem ${activeImg + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Search className="w-5 h-5 text-remvita-blue" />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`relative w-24 h-24 shrink-0 rounded-2xl border-2 transition-all overflow-hidden ${activeImg === i ? 'border-remvita-blue scale-105' : 'border-transparent bg-muted hover:border-border'}`}
          >
            <Image src={img} alt={`Miniatura ${i + 1}`} fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
