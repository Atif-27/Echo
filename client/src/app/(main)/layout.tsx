import OptionalBar from "@/components/OptionalBar";
import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="text-xl">
      <section className="grid grid-cols-10 w-screen h-screen">
        <Sidebar />
        <div className="col-span-4  border-r-[1px] border-l-[1px]  border-gray-600/80">
          {children}
        </div>
        <OptionalBar />
      </section>
    </main>
  );
}
