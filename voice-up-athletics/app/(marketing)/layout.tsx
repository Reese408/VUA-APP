import NavBarWrapper from "@/components/layout/navbar-wrapper";
import Footer from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarWrapper />
      {children}
      <Footer />
    </>
  );
}
