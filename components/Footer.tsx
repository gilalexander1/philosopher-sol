export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="site-footer">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-sm">
            © {year} <strong>GilAlexander</strong> — All misquotations of Plato are my own.
          </div>
          <div className="text-xs text-[var(--sub)]">
            The Philosopher’s Sol is an educational tool. Not legal, medical, or financial advice.
          </div>
        </div>
      </footer>

      {/* Greek key divider below the footer */}
      <div className="footer-key-divider" aria-hidden="true"></div>
    </>
  );
}
