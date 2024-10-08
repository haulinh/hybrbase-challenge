const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="px-10">{children}</div>;
};

export default Layout;
