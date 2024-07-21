
export default function HomeLayout({ children,params }: { children: React.ReactNode, params:{slug:string,schema:object}}) {

    return (
        <>
            {children}
        </>
    );
}