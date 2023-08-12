"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/images/logo.png";
// import Connect from './WalletConnect'
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface NavbarProps {
  isConnected: boolean;
  // onDisconnect: () => Promise<void>;
  // onConnect: () => Promise<void>;
  account: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ isConnected, account }) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(currentScrollPos < prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 lg:mb-4 mb-3 top-0 z-50">
      <nav
        className={`flex  items-center justify-between lg:p-6 p-2  ${
          isScrollingUp ? "bg-[#faf9f9]" : "bg-white"
        }`}
        aria-label="Global"
      >
        <div className="flex lg:min-w-0 lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Lotus</span>
            <Image
              className="flex-shrink-0 lg:w-[180px] lg:h-[60px] md:w-[182px] md:h-[52px] w-[120px] h-[32px] "
              src={logo}
              alt="logo"
            />
          </a>
        </div>
        <div className="lg:inline-flex">
          {/* <button
            onClick={isConnected ? onDisconnect : onConnect}
            className="rounded-md bg-[#00EF8B] lg:text-xl md:text-xl text-[10px]  lg:px-5 lg:py-3 px-[20px] py-[10px]  justify-center  font-medium text-black shadow-sm hover:bg-[#07a261]"
          >
            {isConnected ? `${account?.slice(0, 10)}...` : "Connect to OP"}
          </button> */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="rounded-md bg-[#00EF8B] lg:text-xl md:text-xl text-[10px]  lg:px-5 lg:py-3 px-[20px] py-[10px] overflow-hidden overflow-x-hidden justify-center transform hover:scale-105 transition-transform font-medium text-black shadow-md hover:bg-[#07a261]"
                          type="button"
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          className="rounded-md bg-[#dd231d] lg:text-xl md:text-xl text-[10px]  lg:px-5 lg:py-3 px-[20px] py-[10px] overflow-hidden overflow-x-hidden justify-center  font-medium text-black shadow-sm hover:bg-[#be1a1a]"
                          type="button"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          className="px-6 py-3 bg-[#ffff] text-black font-semibold rounded-lg shadow-xl  transform hover:scale-105 transition-transform"
                          onClick={openChainModal}
                          style={{ display: "flex", alignItems: "center" }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 15,
                                height: 15,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 15, height: 15 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          className="px-6 py-3 bg-[#ffff] text-black font-semibold rounded-lg shadow-xl  transform hover:scale-105 transition-transform"
                          type="button"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
