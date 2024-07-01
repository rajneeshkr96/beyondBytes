import Image from "next/image"



export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='w-full min-h-screen flex justify-between' >
        <div className="flex justify-center items-center w-[45%]">
            {children}
        </div>
        <div className='w-[55%]'>
            <Image
                src={"/assets/bg-6.jpg"}
                alt="default-bg"
                width={600}
                height={600}
                className='object-cover h-full rounded-l-[3rem] w-full'
            />
        </div>
      </section>
    )
  }