import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
    <article className="menu-card group overflow-hidden relative flex md:flex-col h-full gap-4 md:gap-0 p-3 md:p-3">
      <div className="overflow-hidden rounded-lg md:rounded-xl size-24 md:size-auto md:aspect-[4/3] shrink-0">
        <img src={it.img} alt={`${it.name}: ${it.desc}`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
      </div>
      {it.tag && <span className="badge-outline absolute hidden md:inline top-6 left-6">{it.tag}</span>}
      <div className="flex-1 min-w-0 flex md:flex-col gap-3 md:gap-0 md:px-2 md:pt-4 md:pb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-title text-lg md:text-xl leading-tight">{it.name}</h3>
          <p className="text-soft text-base md:text-sm mt-1 line-clamp-2">{it.desc}</p>
          {it.tag && <span className="badge-outline inline-block mt-2 md:hidden">{it.tag}</span>}
        </div>
        <p className="text-gold font-semibold text-base md:text-lg tabular shrink-0 md:text-right md:mt-auto md:pt-3 whitespace-nowrap">R$ {it.price}</p>
      </div>
    </article>
  );
}

function Index() {
  const [active, setActive] = useState("pratos");
  const lockUntil = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (Date.now() < lockUntil.current) return;
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
        setActive(menu[menu.length - 1]!.id);
        return;
      }
      const line = window.innerHeight * 0.3;
      let current = menu[0]!.id;
      for (const s of menu) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const unlock = () => { lockUntil.current = 0; onScroll(); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", unlock);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", unlock);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const select = (id: string) => {
    setActive(id);
    lockUntil.current = Date.now() + 1000;
  };

  useEffect(() => {
    document.getElementById(`chip-${active}`)?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  const link = (id: string) => `flex items-center min-h-11 transition-colors ${active === id ? "text-gold" : "text-soft hover:text-gold"}`;

  return (
    <div className="overflow-x-clip">
      <header className="enter px-4 pt-12 pb-10 lg:pb-16 text-center">
        <img src={logo.url} alt="Stark & Steak - Premium Steakhouse" className="mx-auto w-full max-w-md h-auto" />
        <div className="gold-rule max-w-xs mx-auto mt-4" />
        <p className="text-gold text-lg mt-4 font-title">Cardápio</p>
      </header>

      <nav aria-label="Categorias" className="lg:hidden sticky top-0 z-20 bg-ink/95 backdrop-blur border-y border-gold/25">
        <ul className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          {menu.map((s) => (
            <li key={s.id} className="shrink-0">
              <a id={`chip-${s.id}`} href={`#${s.id}`} onClick={() => select(s.id)} aria-current={active === s.id ? "true" : undefined}
                className={`flex items-center min-h-11 px-4 rounded-full border text-base transition-colors ${active === s.id ? "bg-gold text-ink border-gold font-semibold" : "text-soft border-gold/30 hover:border-gold"}`}>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10 py-12 lg:py-0 lg:pb-24 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="Categorias" className="sticky top-8">
            <ul className="border-l border-gold/25">
              {menu.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={() => select(s.id)} aria-current={active === s.id ? "true" : undefined}
                    className={`${link(s.id)} -ml-px pl-5 border-l-2 text-base ${active === s.id ? "border-gold font-semibold" : "border-transparent"}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main>
          {menu.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className={i ? "mt-12 lg:mt-20" : ""}>
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <h2 id={`${s.id}-t`} className="font-title text-3xl lg:text-4xl shrink-0">{s.title}</h2>
                <div className="h-px flex-1 bg-gold/60" />
              </div>

              {s.id === "pratos" && (
                <article className="menu-card group overflow-hidden grid md:grid-cols-2 mb-6">
                  <div className="overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-80">
                    <img src={featured.img} alt={`${featured.name}: ${featured.desc}`} width={1024} height={768} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6 sm:p-10 flex flex-col justify-center">
                    <span className="badge-gold self-start">{featured.tag}</span>
                    <h3 className="font-title text-3xl sm:text-4xl mt-4">{featured.name}</h3>
                    <p className="text-soft text-base mt-2">{featured.desc}</p>
                    <p className="text-gold font-semibold text-2xl mt-6 tabular">R$ {featured.price}</p>
                  </div>
                </article>
              )}

              {s.list ? (
                <ul className="menu-card p-6 sm:p-8 grid md:grid-cols-2 gap-x-12 gap-y-5">
                  {s.items.map((it) => (
                    <li key={it.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-title text-lg">{it.name}</span>
                        <span className="dotted-leader" aria-hidden="true" />
                        <span className="text-gold font-semibold shrink-0 tabular">R$ {it.price}</span>
                      </div>
                      <p className="text-soft text-base mt-1">{it.desc}{it.tag && <span className="badge-outline ml-2 align-middle">{it.tag}</span>}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {s.items.map((it) => <Card key={it.name} it={it} />)}
                </div>
              )}
            </section>
          ))}
        </main>
      </div>

      <footer className="bg-ink border-t border-gold/25 px-4 py-10 text-center">
        <img src={logo.url} alt="Stark & Steak" className="mx-auto w-40 h-auto" />
        <p className="text-soft text-base mt-4">Projeto escolar de empreendedorismo - não é um estabelecimento real</p>
      </footer>
    </div>
  );
}
