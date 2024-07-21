import Image from "next/image"



export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='w-full max-screen flex justify-between max-[900px]:justify-center' >
        <div className="flex justify-center items-center w-[45%] max-md:w-3/5">
            {children}
        </div>
        <div className='w-[55%] max-[900px]:hidden'>
            <Image
                src={"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0dcl4ost3xg4q7bduvmr.jpg"}
                alt="default-bg"
                width={700}
                height={700}
                className='object-cover h-full rounded-l-[3rem] w-full'
            />
        </div>
      </section>
    )
  }