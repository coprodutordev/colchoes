import { createClient } from "@/lib/supabase/server";

// ─── Products ───────────────────────────────────────────────────────────────

export async function getActiveProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Fallback products used:", error?.message);
    }
    return FALLBACK_PRODUCTS;
  }
  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*), technologies:product_technologies(technology:technologies(*))")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Fallback product used:", error?.message);
    }
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? FALLBACK_PRODUCTS[0];
  }
  return data;
}

// ─── Blog ───────────────────────────────────────────────────────────────────

export async function getPublishedPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, author:authors(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data?.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Fallback posts used:", error?.message);
    }
    return FALLBACK_POSTS;
  }
  return data;
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, author:authors(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Fallback post used:", error?.message);
    }
    return FALLBACK_POSTS.find((p) => p.slug === slug) ?? FALLBACK_POSTS[0];
  }
  return data;
}

// ─── Testimonials ───────────────────────────────────────────────────────────

export async function getApprovedTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data?.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Fallback testimonials used:", error?.message);
    }
    return FALLBACK_TESTIMONIALS;
  }
  return data;
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

export async function getPublishedFaqs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error || !data?.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Fallback FAQ used:", error?.message);
    }
    return FALLBACK_FAQS;
  }
  return data;
}

// ─── Dashboard ──────────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_dashboard_stats");

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[queries] Dashboard stats fallback:", error?.message);
    }
    return { monthly_leads: 142, monthly_closed: 38 };
  }
  return data as { monthly_leads: number; monthly_closed: number };
}

// ─── Fallback data ───────────────────────────────────────────────────────────

const FALLBACK_PRODUCTS = [
  {
    id: "fallback-1",
    category_id: null,
    name: "REMVITA Premium",
    slug: "remvita-premium",
    description: "A combinação perfeita de conforto e tecnologia para a maioria dos biotipos.",
    price: 4990,
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    category_id: null,
    name: "REMVITA Master",
    slug: "remvita-master",
    description: "Vibromassagem incluída. O ápice do relaxamento noturno.",
    price: 6990,
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    category_id: null,
    name: "REMVITA Platinum",
    slug: "remvita-platinum",
    description: "Suporte reforçado e densidade ajustada para alta performance.",
    price: 8990,
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const FALLBACK_POSTS = [
  {
    id: "fb-post-1",
    author_id: null,
    title: "Como a Magnetoterapia alivia dores crônicas na lombar",
    slug: "magnetoterapia-e-dores-na-lombar",
    excerpt: "Estudos recentes apontam que a exposição contínua a campos magnéticos controlados durante o sono atua diretamente...",
    content: "",
    cover_image_url: null,
    read_time_minutes: 5,
    status: "published" as const,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: null,
  },
  {
    id: "fb-post-2",
    author_id: null,
    title: "O Guia Completo das Fases do Sono",
    slug: "guia-fases-do-sono",
    excerpt: "Entenda por que apenas dormir 8 horas não é suficiente se você não alcançar a fase profunda de regeneração celular.",
    content: "",
    cover_image_url: null,
    read_time_minutes: 8,
    status: "published" as const,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: null,
  },
  {
    id: "fb-post-3",
    author_id: null,
    title: "Densidade de Colchão: Como escolher a ideal para o seu peso",
    slug: "como-escolher-densidade-colchao",
    excerpt: "A escolha errada da densidade pode agravar problemas de coluna.",
    content: "",
    cover_image_url: null,
    read_time_minutes: 4,
    status: "published" as const,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: null,
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: "fb-test-1",
    client_name: "Maria Helena S.",
    role: "Professora aposentada",
    content: "Depois de 30 anos com dores lombares, finalmente encontrei alívio. Acordo sem a rigidez que me acompanhava todos os dias.",
    rating: 5,
    is_approved: true,
  },
  {
    id: "fb-test-2",
    client_name: "Carlos Eduardo M.",
    role: "Empresário",
    content: "A qualidade do sono mudou completamente. Meu desempenho no trabalho melhorou porque finalmente durmo bem.",
    rating: 5,
    is_approved: true,
  },
  {
    id: "fb-test-3",
    client_name: "Ana Paula R.",
    role: "Fisioterapeuta",
    content: "Como profissional de saúde, recomendo a REMVITA para meus pacientes. A tecnologia faz a diferença real no tratamento.",
    rating: 5,
    is_approved: true,
  },
];

const FALLBACK_FAQS = [
  { id: "fb-faq-1", question: "Qual a diferença do colchão terapêutico para o comum?", answer: "Os colchões REMVITA possuem camadas de densidade progressiva, pastilhas de infravermelho longo e campo magnético que auxiliam na recuperação celular.", display_order: 1, is_published: true },
  { id: "fb-faq-2", question: "Possui garantia?", answer: "Sim, oferecemos 15 anos de garantia na estrutura e tecnologias.", display_order: 2, is_published: true },
  { id: "fb-faq-3", question: "Como é feita a entrega?", answer: "Entregamos em todo o Brasil através de transportadoras parceiras, com seguro total.", display_order: 3, is_published: true },
];
