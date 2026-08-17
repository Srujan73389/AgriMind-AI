export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-emerald-800/10 rounded-full blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="w-full max-w-lg glass p-8 md:p-12 rounded-3xl relative z-10">
        {children}
      </div>
    </div>
  );
}
