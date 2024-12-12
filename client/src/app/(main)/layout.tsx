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
        <div className="col-span-2 md:col-span-3 flex items-end justify-end  ">
          <Sidebar />
        </div>
        <div className="col-span-8 md:col-span-4  border-r-[1px] border-l-[1px]  border-gray-600/80">
          {children}
        </div>
        <div className="hidden md:col-span-3 md:flex flex-col">
          <OptionalBar />
        </div>
      </section>
    </main>
  );
}
