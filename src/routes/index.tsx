import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import ironMan from "@/assets/food/iron-man-prime.jpg";
import hulk from "@/assets/food/hulk-smash.jpg";
import thor from "@/assets/food/thors-hammer.jpg";
import cap from "@/assets/food/captain-america.jpg";
import widow from "@/assets/food/black-widow.jpg";
import groot from "@/assets/food/groot.jpg";
import burger from "@/assets/food/stark-burger.jpg";
import asinhas from "@/assets/food/asinhas.jpg";
import fries from "@/assets/food/fries.jpg";
import rings from "@/assets/food/onion-rings.jpg";
import torresmo from "@/assets/food/torresmo.jpg";
import coxinha from "@/assets/food/coxinha.jpg";
import petit from "@/assets/food/petit-gateau.jpg";
import brownie from "@/assets/food/brownie.jpg";
import sorvete from "@/assets/food/sorvete.jpg";
import geladinho from "@/assets/food/geladinho.jpg";
import raspadinha from "@/assets/food/raspadinha.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cardápio | Stark & Steak - Premium Steakhouse" },
      { name: "description", content: "Cardápio digital da Stark & Steak: cortes premium, burger, entradas, sobremesas e bebidas." },
      { property: "og:title", content: "Cardápio | Stark & Steak" },
      { property: "og:description", content: "Cortes premium, burger, entradas, sobremesas e bebidas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Item = { name: string; desc: string; price: string; img?: string; tag?: string };
type Section = { id: string; title: string; items: Item[]; list?: boolean };

const featured: Item = { name: "Thor's Hammer", desc: "Tomahawk 500 g", price: "129,90", img: thor, tag: "Premium" };

const menu: Section[] = [
  { id: "pratos", title: "Pratos Principais", items: [
    { name: "Iron Man Prime", desc: "Picanha 300 g", price: "89,90", img: ironMan },
    { name: "Captain America Classic", desc: "Bife de chorizo 300 g", price: "79,90", img: cap },
    { name: "Black Widow", desc: "Baby beef 250 g", price: "64,90", img: widow },
  ]},
  { id: "burger", title: "Burger", items: [
    { name: "Stark Burger", desc: "Hambúrguer 180 g com cheddar e bacon", price: "42,90", img: burger },
    { name: "Hulk Smash", desc: "Smash burger duplo com cheddar", price: "74,90", img: hulk, tag: "Smash" },
    { name: "Groot Vegano", desc: "Hambúrguer de cogumelos e grão-de-bico", price: "49,90", img: groot, tag: "Vegano" },
  ]},
  { id: "entradas", title: "Entradas", items: [
    { name: "Asinhas de Gavião Arqueiro", desc: "Asinhas de frango crocantes", price: "38,90", img: asinhas },
    { name: "Vibranium Fries", desc: "Batata rústica", price: "24,90", img: fries },
    { name: "Anéis de cebola Infinity", desc: "Anéis de cebola empanados", price: "26,90", img: rings },
    { name: "Thorresmo", desc: "Torresmo crocante", price: "32,90", img: torresmo },
    { name: "Perninhas de Viúva Negra", desc: "Coxinha de frango com molho escuro", price: "36,90", img: coxinha },
  ]},
  { id: "sobremesas", title: "Sobremesas", items: [
    { name: "Petit gâteau Infinity Stone", desc: "Bolo quente com sorvete", price: "28,90", img: petit },
    { name: "Brownie Thanos", desc: "Brownie de chocolate intenso", price: "24,90", img: brownie },
    { name: "Sorvete Asgard", desc: "Taça de sorvete da casa", price: "19,90", img: sorvete },
    { name: "Geladinho do Homem de Gelo", desc: "Geladinho cremoso", price: "9,90", img: geladinho },
    { name: "Raspadinha do Homem de Gelo", desc: "Gelo raspado com calda azul", price: "14,90", img: raspadinha },
  ]},
  { id: "bebidas", title: "Bebidas", list: true, items: [
    { name: "Refrigerante lata", desc: "350 ml", price: "8,00" },
    { name: "Suco natural", desc: "Fruta da estação", price: "14,00" },
    { name: "Drink Arc Reactor", desc: "Sem álcool", price: "22,00", tag: "Sem álcool" },
    { name: "Cerveja long neck", desc: "Gelada", price: "16,00" },
    { name: "Drink Mind Stone", desc: "Gin tônica", price: "32,00" },
  ]},
];

function Card({ it }: { it: Item }) {
  return (
    <article className="reveal menu-card group overflow-hidden relative p-3">
      <div className="overflow-hidden rounded-xl aspect-[4/3]">
        <img src={it.img} alt={`${it.name}: ${it.desc}`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
      </div>
      {it.tag && <span className="badge-outline absolute top-6 left-6">{it.tag}</span>}
      <div className="px-2 pt-4 pb-2">
        <h3 className="font-title text-xl">{it.name}</h3>
        <p className="text-soft text-sm mt-1 truncate">{it.desc}</p>
        <p className="text-gold font-semibold text-lg text-right mt-3">R$ {it.price}</p>
      </div>
    </article>
  );
}

function Index() {
  const [active, setActive] = useState("pratos");

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    menu.forEach((s) => { const el = document.getElementById(s.id); if (el) spy.observe(el); });
    return () => { io.disconnect(); spy.disconnect(); };
  }, []);

  return (
    <>
      <header className="px-4 pt-12 pb-10 text-center">
        <img src={logo.url} alt="Stark & Steak - Premium Steakhouse" className="mx-auto w-full max-w-md h-auto" />
        <div className="gold-rule max-w-xs mx-auto mt-4" />
        <p className="label-caps text-gold text-sm mt-4">Cardápio</p>
      </header>

      <nav aria-label="Categorias" className="sticky top-0 z-20 bg-ink/95 backdrop-blur border-y border-gold/25">
        <ul className="flex gap-6 overflow-x-auto px-5 py-4 max-w-6xl mx-auto sm:justify-center">
          {menu.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`label-caps text-xs pb-1 border-b transition-colors ${active === s.id ? "text-gold border-gold" : "text-soft border-transparent hover:text-gold"}`}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {menu.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className={i ? "pt-16" : ""}>
            {i > 0 && <div className="gold-rule mb-16" />}
            <h2 id={`${s.id}-t`} className="reveal label-caps text-gold text-center text-lg sm:text-xl font-semibold mb-10">{s.title}</h2>

            {s.id === "pratos" && (
              <article className="reveal menu-card group overflow-hidden grid md:grid-cols-2 mb-8">
                <div className="overflow-hidden aspect-[4/3] md:aspect-auto">
                  <img src={featured.img} alt={`${featured.name}: ${featured.desc}`} width={1024} height={768} className="h-full w-full object-cover" />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <span className="badge-gold self-start">{featured.tag}</span>
                  <h3 className="font-title text-3xl sm:text-4xl mt-5">{featured.name}</h3>
                  <p className="text-soft mt-2">{featured.desc}</p>
                  <p className="text-gold font-semibold text-2xl mt-6">R$ {featured.price}</p>
                </div>
              </article>
            )}

            {s.list ? (
              <ul className="reveal menu-card max-w-2xl mx-auto p-6 sm:p-10 space-y-6">
                {s.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-title text-lg">{it.name}</span>
                      {it.tag && <span className="badge-outline shrink-0">{it.tag}</span>}
                      <span className="dotted-leader" aria-hidden="true" />
                      <span className="text-gold font-semibold shrink-0">R$ {it.price}</span>
                    </div>
                    <p className="text-soft text-sm mt-1">{it.desc}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {s.items.map((it) => <Card key={it.name} it={it} />)}
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="bg-ink border-t border-gold/25 px-4 py-10 text-center">
        <img src={logo.url} alt="Stark & Steak" className="mx-auto w-40 h-auto" />
        <p className="text-soft text-sm mt-4">Projeto escolar de empreendedorismo - não é um estabelecimento real</p>
      </footer>
    </>
  );
}
