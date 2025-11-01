export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 mt-auto">
      <div className="container mx-auto px-4">
        {/* Copyright */}
        <div className="border-t mt-6 pt-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Recapp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
