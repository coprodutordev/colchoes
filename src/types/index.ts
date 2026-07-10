/**
 * Type definitions for the REMVITA platform.
 * Centralized to ensure type-safety across all components and server actions.
 */

// ─── Auth & Users ─────────────────────────────────────────────────────────────
export type UserRole = "SuperAdmin" | "Editor" | "Comercial" | "Consultor";

export interface Profile {
  id: string;
  role_id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Catalog ──────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  created_at: string;
}

export interface Technology {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  is_primary: boolean;
  display_order: number;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Relations (populated via joins/views)
  category?: Category;
  images?: ProductImage[];
  technologies?: Technology[];
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface Author {
  id: string;
  profile_id: string | null;
  name: string;
  bio: string | null;
}

export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  author_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  read_time_minutes: number | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  author?: Author;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// ─── CRM ──────────────────────────────────────────────────────────────────────
export type LeadStatus = "novo" | "contato_feito" | "negociacao" | "fechado";

export interface Lead {
  id: string;
  product_id: string | null;
  name: string;
  email: string | null;
  phone: string;
  status: LeadStatus;
  origin: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Shared ───────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
