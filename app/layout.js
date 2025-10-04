import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Mini Wallet App",
  description: "Assessment project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>
          <Navbar />
          <div style={{ paddingTop: "80px", maxWidth: "1200px", margin: "0 auto" }}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
