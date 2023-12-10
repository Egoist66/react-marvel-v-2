import {PureComponent, ReactNode} from "react";
import ErrorPic from "../../assets/images/error.gif";
import {ErrorMessage} from "./ErrorMessage.tsx";

interface ErorBoundaryProps {
    onTryhandler?: () => void;
    error: boolean;
    children: ReactNode;
}

interface ErrorBoundaryState {
    appError: boolean
}

class ErrorBoundary extends PureComponent<ErorBoundaryProps, ErrorBoundaryState> {
    static defaultProps = {
        error: false,
    };

    state: Readonly<ErrorBoundaryState> = {
        appError: false
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            appError: true
        })

        console.log({error, errorInfo})
    }

    render(): ReactNode {
        if (this.props.error || this.state.appError) {
            return (
                <>
                    <img
                        style={{
                            display: "block",
                            margin: "0 auto",
                        }}
                        src={ErrorPic}
                        alt="error"
                    />

                    {!this.state.appError ? <ErrorMessage
                        onTryHandler={this.props.onTryhandler}
                        errorText="Something went wrong..."
                    /> : null}
                </>
            );
        }

        return this.props.children;
    }
}


export default ErrorBoundary;
