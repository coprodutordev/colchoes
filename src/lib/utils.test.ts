import { describe, it, expect } from "vitest";
import { formatCurrency, truncate, slugify, calcReadTime } from "./utils";

describe("formatCurrency", () => {
  it("formats BRL correctly", () => {
    expect(formatCurrency(4990)).toBe("R$ 4.990,00");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("R$ 0,00");
  });
});

describe("truncate", () => {
  it("returns string unchanged when shorter than max", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates and adds ellipsis", () => {
    const result = truncate("hello world", 5);
    expect(result).toBe("hello…");
  });
});

describe("slugify", () => {
  it("converts to URL-safe slug", () => {
    expect(slugify("Colchão Terapêutico REMVITA")).toBe("colchao-terapeutico-remvita");
  });

  it("handles special characters", () => {
    expect(slugify("Olá! Como vai?")).toBe("ola-como-vai");
  });
});

describe("calcReadTime", () => {
  it("returns at least 1 minute", () => {
    expect(calcReadTime("short")).toBe(1);
  });

  it("calculates read time correctly", () => {
    const words = Array(400).fill("word").join(" ");
    expect(calcReadTime(words)).toBe(2);
  });
});
