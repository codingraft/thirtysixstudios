import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpanRef = useRef(null);
  const cursorRef = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, {
        width: "80px",
        height: "80px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        width: "15px",
        height: "15px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const heading = headingRef.current;
    heading.addEventListener("mouseenter", handleMouseEnter);
    heading.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heading.removeEventListener("mouseenter", handleMouseEnter);
      heading.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cursor = (e) => {
      gsap.set(cursorRef.current, {
        top: e.clientY,
        left: e.clientX,
      });
    };
    const handleClick = (e) => {
      setShowCanvas((prevCanvas) => {
        if (!prevCanvas) {
          gsap.set(growingSpanRef.current, {
            top: e.clientY,
            left: e.clientX,
          });
          gsap.set(cursorRef.current, {
            backgroundColor: "#000",
            duration: 1.2,
          });
          gsap.to("body", {
            duration: 1.2,
            backgroundColor: "#fd2c2a",
            color: "#000",
            ease: "power2.inOut",
          });
          gsap.to(growingSpanRef.current, {
            duration: 1.2,
            scale: 1000,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpanRef.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            duration: 1.2,
            backgroundColor: "#000",
            color: "#fff",
            ease: "power2.inOut",
          });
          gsap.set(cursorRef.current, {
            backgroundColor: "#fd2c2a",
            duration: 1.2,
          });
        }
        return !prevCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);
    window.addEventListener("mousemove", cursor);
    // Clean up
    return () => {
      headingElement.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", cursor);
    };
  }, []);

  return (
    <>
      <span
        ref={growingSpanRef}
        className="growing fixed rounded-full top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <span
        ref={cursorRef}
        className="cursor fixed rounded-full w-5 h-5 z-10"
      ></span>
      <div className="w-full relative min-h-screen  font-PPNeueMontreal">
        {showCanvas &&
          data[0].map((canvasDetails, index) => (
            <Canvas key={index} details={canvasDetails} />
          ))}
        <div className="w-full relative z-1 min-h-screen">
          <nav className="w-full p-4  z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className=" text-2xl font-regular">thirtysixstudio</div>
              <ul className="flex gap-8">
                {["Home", "About", "Projects", "Contact"].map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className=" hover:text-gray-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="w-full relative textcontainer px-[20%]">
            <div className="text w-[40%]">
              <h3 className="text-3xl leading-[1.3]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-md mt-10 font-normal">
                We’re a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns.
              </p>
              <p className="text-md mt-10 font-normal">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-1/2 translate-x-[-50%] text-center ">
            <h1
              ref={headingRef}
              className="text-[17vw] tracking-tight leading-none heading"
            >
              thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10  font-PPNeueMontreal">
        {showCanvas &&
          data[1].map((canvasDetails, index) => (
            <Canvas key={index} details={canvasDetails} />
          ))}
        <h1 className="text-8xl tracking-tighter">about the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
};

export default App;
