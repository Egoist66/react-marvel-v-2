import {FC, PureComponent, ReactNode, useEffect} from "react";

export default {
    title: 'Example/HOC',
    parameters: {},
    tags: ['autodocs'],
}


function withLogging<T = any>(Component: FC<T>) {
    const data = {location: location.pathname}

    return (props: T) => {
        useEffect(() => {
            console.log(data)
        }, [])
        Component.displayName = `withLogged`
        return <Component {...data} {...props}  />
    }

}

export const Logger = withLogging<{ location?: string, dataId: string }>((props) => {

    return <>

        {props.location}
        <br/>
        {props.dataId}
    </>
})

export const LoggerOut: FC = () => {
    return (
        <>
            <Logger dataId={'hello'}/>

            <Header/>
            <Aside/>

        </>

    )
}

export const Component = (title: string, render: (arg?: string) => ReactNode) => {
    return class extends PureComponent {
        render() {
            return (
                <>

                    {render(title)}

                </>
            )
        }
    }
}

const Header = Component('Header', (arg) => <header>Header - {arg}</header>)
const Aside = Component('Header', (arg) => <aside>Aside - {arg}</aside>)

