import Image from "next/image"



export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='w-full min-h-screen flex justify-between max-[900px]:justify-center' >
        <div className="flex justify-center items-center w-[45%] max-md:w-3/5">
            {children}
        </div>
        <div className='w-[55%] max-[900px]:hidden'>
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