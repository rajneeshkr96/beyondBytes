"use client";
import React, { useEffect, useRef, useState } from "react";
import { mapClasses, previews,links } from "./data";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import localFont from 'next/font/local'
const defaultClipPaths: { [key: string]: string } = {
  "variant-1": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  "variant-2": "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
  "variant-3": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
};

const variantTransforms: { [key: string]: { [key: string]: { [key: string]: number } } } = {
  "variant-1": {
    title: { x: 75, opacity: 0 },
    tags: { y: -75, opacity: 0 },
    description: { x: -75, opacity: 0 },
  },
  "variant-2": {
    title: { x: -75, opacity: 0 },
    tags: { y: -75, opacity: 0 },
    description: { y: 75, opacity: 0 },
  },
  "variant-3": {
    title: { x: 75, opacity: 0 },
    tags: { y: 75, opacity: 0 },
    description: { x: 75, opacity: 0 },
  },
};

const getDefaultClipPath = (previewElement: Element): string => {
  for (const variant in defaultClipPaths) {
    if (previewElement.classList.contains(variant)) {
      return defaultClipPaths[variant];
    }
  }
  return "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)";
};

const applyVariantStyles = (previewElement: Element) => {
  if(previewElement !== null){
    const variant = previewElement.className
      .split(" ")
      .find((className) => className.startsWith("variant-"));
    if (variant && variantTransforms[variant]) {
      Object.entries(variantTransforms[variant]).forEach(([elementClass, transform]) => {
        const element = previewElement.querySelector(`.preview-${elementClass}`);
        if (element) {
          gsap.set(element, transform);
        }
      });
    }
  }
};

const changeBg = (newImgSrc: string, previewBg: HTMLElement) => {
  const newImg = document.createElement("img");
  newImg.src = newImgSrc;
  newImg.style.position = "absolute";
  newImg.style.top = "0";
  newImg.style.left = "0";
  newImg.style.width = "100%";
  newImg.style.height = "100%";
  newImg.style.objectFit = "cover";
  newImg.style.opacity = "0";

  previewBg.appendChild(newImg);

  gsap.to(newImg, { opacity: 1, duration: 0.5 });
  if (previewBg.children.length > 1) {
    const oldImg = previewBg.children[0] as HTMLElement;
    gsap.to(oldImg, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if(previewBg.contains(oldImg))
          previewBg.removeChild(oldImg);
      },
    });
  }
};

const HeroSection: React.FC = () => {
  const [activePreview, setActivePreview] = useState<HTMLElement | null>(null);
  const [isMouseOverItem, setIsMouseOverItem] = useState(false);

  const previewBg = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const defaultPreview = document.querySelector(".preview.default") as HTMLElement;

    previews.forEach((preview, index) => {
      const previewElement = document.createElement("div");
      previewElement.className = `preview ${mapClasses[index]} preview-${index + 1} opCheck`;
      previewElement.innerHTML = `
        <div class="preview-img" ><img src="${preview.img}" alt="" /></div>
        <div class="preview-title"><h1>${preview.title}</h1></div>
        <div class="preview-tags"><p>${preview.tags}</p></div>
        <div class="preview-description"><p>${preview.description}</p></div>`;
        if(container.current !== null){
          container.current.appendChild(previewElement);
        }
      applyVariantStyles(previewElement);
    });
    setActivePreview(defaultPreview);
  }, []);

  const Mouseenter = (index:number) => {
    setIsMouseOverItem(true);
    const newBg = `./assets/bg-${index + 1}.jpg`;
    if(previewBg.current !== null){
      changeBg(newBg, previewBg.current);
    }
    const newActivePreview = document.querySelector(`.preview-${index + 1}`) as HTMLElement;
    if (activePreview !== null && activePreview !== newActivePreview) {
      const previousActivePreviewImg = activePreview.querySelector(".preview-img") as HTMLElement;
      const previousDefaultClipPath = getDefaultClipPath(activePreview);
      gsap.to(previousActivePreviewImg, {
        clipPath: previousDefaultClipPath,
        duration: 0.75,
        ease: "power3.out",
      });
      gsap.to(activePreview, {
        opacity: 0,
        duration: 0.3,
        delay: 0.2,
      });
      applyVariantStyles(activePreview);
    }
    gsap.to(newActivePreview, { opacity: 1, duration: 0.1 });
    setActivePreview(newActivePreview);
    const elementsToAnimate = ["title", "tags", "description"];
    elementsToAnimate.forEach((el) => {
      const element = newActivePreview.querySelector(`.preview-${el}`) as HTMLElement;
      if (element) {
        gsap.to(element, { x: 0, y: 0, opacity: 1, duration: 0.5 });
      }

  const activePreviewImg = newActivePreview.querySelector(".preview-img") as HTMLElement;
  gsap.to(activePreviewImg, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power3.out",
  });
});

};

const mounseLeave = async () => {
  setIsMouseOverItem(false);
  applyVariantStyles(activePreview!);
  const defaultPreview = document.querySelector(".preview.default") as HTMLElement;
  setTimeout( () => {
    if (isMouseOverItem) {
      if(previewBg.current !== null){
        changeBg("./assets/default-bg.jpg", previewBg.current);
      }

      if (activePreview) {
        gsap.to(activePreview, { opacity: 0, duration: 0.1 });
        gsap.to(defaultPreview, { opacity: 1, duration: 0.1 });
        setActivePreview(defaultPreview);
        const activePreviewImg = defaultPreview.querySelector(".preview-img") as HTMLElement;
        const defaultClipPath = getDefaultClipPath(defaultPreview);
        gsap.to(activePreviewImg, {
          clipPath: defaultClipPath,
          duration: 1,
          ease: "power3.out",
        });
      }
      
    }
    setTimeout( () => {
      const preview = document.querySelectorAll(".opCheck")
      preview.forEach((pre) => {
        pre.setAttribute("style", "opacity:0;")
      })
    }, 50);
  }, 10);

  


}

  return (
    <header className="main-container ">
      <div className="container max-w-[100vw]" ref={container} >
        <footer>
          <p>match shoreel</p>
          <p>collection 2024</p>
        </footer>
        <div className="items gap-y-2">
          {links.map((link, index) => (
            <Link href={link.link} key={index} className={`font-serif item w-max bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl px-3 py-1 my-1 border font-semibold hover:border-main-text-color hover:bg-transparent hover:text-light-color`} onMouseEnter={()=>Mouseenter(index)} onMouseLeave={mounseLeave} >
              <p className="">{link.name}</p>
            </Link>
          ))}
        </div>
        <div className="preview-bg" ref={previewBg} >
          <Image
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="preview default"></div>
      </div>
    </header>
  );
};

export default HeroSection;
