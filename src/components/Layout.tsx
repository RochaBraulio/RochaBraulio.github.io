
import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
}

export function Layout({ children, onSearch }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearch={onSearch} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
