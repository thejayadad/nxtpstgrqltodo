export const metadata = {
    title: "Players",
  };
  
  const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="py-10 px-10">{children}</div>;
  };
  
  export default PlayerLayout;