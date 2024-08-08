// components/layout.tsx
import "../styles/globals.css"; // Ensure this path is correct based on your project structure

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background">
      <div className="background-content">{children}</div>
    </div>
  );
};

export default Layout;
