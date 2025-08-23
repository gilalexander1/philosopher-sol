"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PORTFOLIO_URL = "https://your-personal-site.com"; // <-- put your site here

function NavChip(props: {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 22, mass: 0.6 }}
      className="chip header-chip"
    >
      {props.children}
    </motion.span>
  );

  if (props.onClick) {
    return (
      <button className="no-underline bg-transparent border-0 p-0" onClick={props.onClick}>
        {content}
      </button>
    );
  }

  if (props.external && props.href) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return (
    <Link href={props.href ?? "#"} className="no-underline">
      {content}
    </Link>
  );
}

export default function TopBar() {
  const router = useRouter();

  return (
    <header className="max-w-5xl mx-auto px-4 pt-4">
      <div className="header-row">
        {/* Left: seal + title with entrance animation */}
        <motion.div
          className="header-left"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.8 }}
        >
          <img src="/svg/wax-seal-sol.svg" alt="Sol seal" className="header-seal" />
          <h1 className="site-title m-0">The Philosopher’s Sol</h1>
        </motion.div>

        {/* Right: menu */}
        <nav className="header-menu">
          {/* Home: go to "/" and refresh */}
          <NavChip
            onClick={() => {
              router.push("/");
              router.refresh(); // force a soft refresh of the page
            }}
          >
            Home
          </NavChip>

          {/* About/Glossary (internal) */}
          <NavChip href="/about">About</NavChip>
          <NavChip href="/glossary">Glossary</NavChip>

          {/* New: Portfolio (external site) */}
          <NavChip href={PORTFOLIO_URL} external>
            Portfolio
          </NavChip>
        </nav>
      </div>

      <motion.div
        className="key-rule mt-3 mb-2"
        initial={{ scaleX: 0, opacity: 0.6 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.7 }}
        style={{ transformOrigin: "left center" }}
      />
    </header>
  );
}
