"use client"
import { useEffect, useRef, useState } from "react";
import { NavBar } from "./components";
import { Categories } from "./server/database/schema/categories";
import { GetCategories } from "./server/database/queries";
import Category from "./components/category";

export default function Home() {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await GetCategories();
      const sorted = resp.sort((a, b) => a.order - b.order);
      setCategories(sorted);
    })()
  }, [])

  const [scrolled, setScrolled] = useState(false);
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (scrollDivRef.current) {
        if (scrollDivRef.current.scrollTop > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    }

    if (scrollDivRef.current) {
      scrollDivRef.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (scrollDivRef.current) {
        scrollDivRef.current.removeEventListener('scroll', onScroll);
      }
    }
  }, [])

  return (
    <>
      <div className="bg-[url('/img/bg.avif')] bg-contain mix-blend-screen opacity-40 scale-x-[200%] absolute w-full h-full -z-10 pointer-events-none"></div>

      <NavBar scrolled={scrolled} />
      <div className="w-full h-screen select-none">
        <div ref={scrollDivRef} className="w-full h-full flex flex-col ~px-12/32 overflow-y-scroll">
          {categories.map((category) => (
            <Category key={category.name} category={category} />
          ))}
          <div className="~mt-24/32 w-full h-10 opacity-0">
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
