/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import money from "../public/assets/money.png";
import file from "../public/assets/file.png";
import people from "../public/assets/people.png";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import greet from "../public/images/greet.png";
import Footer from "./Footer";
import { ConnectButton, Chain } from "@rainbow-me/rainbowkit";
import { useWalletClient } from "wagmi";

const { accountStatus, chainStatus, label, showBalance } =
  ConnectButton.__defaultProps;
// You can now use these extracted values in your component
// For example:
// console.log("Account Status:", accountStatus);
// console.log("Chain Status:", chainStatus);
// console.log("Label:", label);
// console.log("Show Balance:", showBalance);

const features = [
  {
    description:
      "Funding Opportunity: Lotus offers funders a unique opportunity to empower pioneering blockchain initiatives. By providing financial backing, Lotus helps these visionary projects to advance, integrate, and succeed within the blockchain ecosystem.",
    url: money,
  },
  {
    description:
      "Transparent Evaluation Process: Lotus follows a meticulous and transparent assessment procedure to evaluate project proposals, guaranteeing that funded initiatives resonate with the platform's objectives and hold the promise to create meaningful and lasting effects.",
    url: file,
  },
  {
    description:
      "Community Engagement: Lotus actively fosters community engagement, empowering stakeholders to actively contribute to funding decisions, project curation, and shaping the trajectory of the blockchain ecosystem.",
    url: people,
  },
];

interface HeroProps {
  isConnected: boolean;
  // onClick: () => Promise<void>;
}

const Hero: React.FC<HeroProps> = ({ isConnected }) => {
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const { data: signer } = useWalletClient();

  console.log("Data:", signer);
  useEffect(() => {
    const container = wordContainerRef.current;

    let currentIndex = 0;
    const words = ["Discover", "Collaborate", "Propose", "Invest"];
    const duration = 2000; // Duration for each word (in milliseconds)

    const animateWords = () => {
      const currentWord = words[currentIndex];
      const wordElement = container?.querySelector(".scroll-word");

      if (wordElement) {
        wordElement.textContent = currentWord;

        // Animate the word

        setTimeout(() => {
          wordElement.animate(
            [
              { transform: "translateY(100%)", opacity: 0 },
              { transform: "translateY(0%)", opacity: 1 },
            ],
            { duration }
          );
        }, 100);

        setTimeout(() => {
          wordElement.animate(
            [
              { transform: "translateY(0%)", opacity: 1 },
              { transform: "translateY(-100%)", opacity: 0 },
            ],
            { duration }
          );
        }, duration + 100);
      }

      currentIndex = (currentIndex + 1) % words.length;
    };

    // Start the animation
    animateWords();
    const interval = setInterval(animateWords, duration * 2);

    // Clean up the interval when component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col">
      <div
        className=" lg:pt-24 lg:pb-8 lg:px-8 lg:bg-cover flex-shrink-0  lg:bg-no-repeat "
        style={{ backgroundImage: `url('/images/Frame.png')` }}
      >
        <div className="lg:mx-auto px-2 lg:pt-[38px] ">
          <div className="lg:text-center text-center lg:flex flex flex-col justify-center  lg:flex-col">
            <motion.h1
              className="text-xs mt-20 lg:mt-0 font-bold tracking-tight text-center items-center text-white md:text-xl lg:text-5xl"
              whileHover={{ scale: 1, rotate: 0 }}
            >
              Become a member of a thriving community of trailblazers, where
              investors fuel the future and innovators bring their ideas to
              life.
            </motion.h1>
            <div
              className="text-white  lg:text-[42px] mt-5 font-semibold "
              ref={wordContainerRef}
            >
              <AnimatePresence>
                <motion.span
                  className="scroll-word"
                  initial={{ opacity: 0, translateY: "100%" }}
                  animate={{ opacity: 1, translateY: "0%" }}
                  exit={{ opacity: 0, translateY: "-100%" }}
                  transition={{ duration: 0.5 }}
                  key="scroll-word"
                />
              </AnimatePresence>
            </div>
            <p className="mx-auto mt-6 lg:max-w-3xl max-w-xs font-semibold text-[10px] lg:text-lg leading-8 text-white">
              Unleash your vision to drive success by funding and proposing
              revolutionary projects today!
            </p>
            <div className="lg:mt-8 flex gap-x-2 mb-2  lg:justify-center items-center justify-center ">
              <Link
                href={isConnected ? "/dashboard" : "#"}
                legacyBehavior
                passHref
              >
                <a
                  onClick={() => {
                    if (!isConnected) {
                      alert("Please connect to your wallet before you proceed");
                    }
                  }}
                  className="rounded-md bg-white lg:text-xl text-base lg:px-7 p-2 lg:py-5 justify-center cursor-pointer flex font-medium text-[#00EF8B] shadow-sm hover:bg-[#00EF8B] hover:text-white"
                >
                  Get started
                  <span
                    className="text[#00EF8B] hover:text-white ml-2 bg-inherit"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col mt-6   ">
        <div className="lg:mb-[25px] mb-[5px]">
          <h4 className="font-semibold lg:mx-auto lg:max-w-6xl ml-[15px] text-xl justify-start lg:text-4xl">
            Why Lotus{" "}
          </h4>
        </div>
        <div>
          <div className="lg:mx-auto lg:mt-10 mt-[15px] lg:max-w-6xl mx-[15px] lg:space-y-3  flex-shrink-0 space-y-2 flex flex-col lg:gap-y-4 ">
            <p className="text-[11px] font-semibold lg:font-normal lg:text-base   text-[#303030]">
              Lotus is a grant platform with a clear and noble purpose - to
              bridge the gap between visionary funders and innovative minds
              within the dynamic realm of blockchain technology. Much like the
              lotus flower rises from the depths of water to blossom in the
              sun's embrace, our platform aims to elevate ingenious ideas from
              the depths of innovation to the forefront of progress. By
              connecting funders who are driven by the desire to fuel change
              with the innovators who hold the key to transformative solutions,
              Lotus cultivates an environment of collaboration and growth.
            </p>
            <p className="text-[11px] font-semibold lg:font-normal lg:text-base  text-[#303030]">
              At Lotus, we stand as a unifying force in the blockchain
              ecosystem, embodying the lotus flower's symbolism of unity and
              purity. Our platform is a space where ideas take root and
              flourish, empowered by the resources necessary to turn visions
              into reality. Through transparent processes and effective
              communication, we facilitate a seamless journey for both funders
              and innovators, ensuring that impactful projects are nurtured and
              propelled to success. Like the lotus, which symbolizes
              enlightenment, Lotus brings a new light to grant platforms,
              illuminating pathways for innovation to thrive and make a lasting
              impact.
            </p>
            <p className="text-[11px] font-semibold lg:font-normal lg:text-base  text-[#303030]">
              Our mission is clear: to be the catalyst that propels blockchain
              innovation forward. In the world of Lotus, funders and innovators
              converge to create a symphony of progress, as the lotus flower
              emerges beautifully from the depths of water, Lotus emerges as a
              beacon of hope and collaboration in the blockchain space,
              illuminating the path to a future where innovation blooms and
              flourishes.
            </p>
          </div>
        </div>
      </div>
      <div className=" flex mb-[35px] flex-col mt-6">
        <div className="lg:mb-[50px] mb-[5px] ">
          <h4 className="font-semibold lg:mx-auto lg:max-w-6xl ml-[15px]  text-xl justify-start lg:text-4xl">
            How it works
          </h4>
        </div>
        <div className="lg:flex lg:mx-auto flex mx-auto items-center justify-center -ml-3 mr-6  lg:pl-[134px] lg:pr-[143px] ">
          <div className=" grid relative left-5 justify-center  items-center my-6  lg:max-w-6xl grid-cols-1 lg:gap-y-24 gap-y-14">
            <div className="lg:max-w-xl max-w-screen-xl bg-[#00EF8B]">
              <p className="text-center text-black py-[20px] px-[45.5px] lg:text-base text-xs ">
                Project creators submit their proposals to Lotus, outlining
                their innovative ideas, project scope, timeline, and funding
                requirements. The proposals undergo a thorough evaluation
                process by seasoned project managers and developers.
              </p>
            </div>

            <div className="lg:max-w-xl max-w-screen-xl bg-[#00EF8B]">
              <p className="text-center text-black py-[20px] px-[45.5px] lg:text-base text-xs ">
                Once project proposals are approved, funders can participate in
                the funding allocation process after thorough review of
                feasibility, business opportunities, and wealth creation.
              </p>
            </div>
          </div>
          <div className="aspect-h-3 border-8 justify-center items-center  lg:flex hidden  border-[#00EF8B] aspect-w-2 lg:aspect-h-4 lg:aspect-w-3 sm:overOP-hidden sm:rounded-lg">
            <Image
              src={greet}
              alt="image"
              className="h-full w-full  object-cover object-center"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <div className="mb-[35px]">
        <div className="mb-[50px]">
          <h4 className="font-semibold lg:mx-auto lg:max-w-6xl ml-[15px] text-xl justify-start lg:text-4xl">
            Key features
          </h4>
        </div>
        <div className="mt-20 lg:mx-auto ml-4 mr-4 lg:max-w-6xl ">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3 lg:grid-cols-3 md:gap-x-12 md:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.description}
                className="flex justify-center items-center flex-col gap-6  md:flex-col lg:flex-col"
              >
                <div className="flex lg:h-[141px] lg:w-[170px]  align-middle items-center justify-center rounded-md bg-[#BCD7CB] text-white sm:shrink-0">
                  <div className="h-[108px] lg:flex flex align-middle items-center justify-center w-[94px]">
                    <Image
                      src={feature.url}
                      className="align-middle items-center justify-center "
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="sm:min-w-0  lg:flex lg:flex-shrink-0 text-center justify-center  sm:flex-1">
                  <p className="mt-2 lg:text-sm text-xs max-h-[168px] max-w-[310px] my-auto text-center justify-center leading-7 text-[#101010]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
