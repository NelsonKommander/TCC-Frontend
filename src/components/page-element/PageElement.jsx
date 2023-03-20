import ResponsiveAppBar from "../responsive-app-bar/ResponsiveAppBar";

export default function PageElement({component: Component}){
    return (
        <>
            <ResponsiveAppBar />
            <Component />
        </>
    )
}