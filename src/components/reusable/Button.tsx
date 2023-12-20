import {FC, memo, ReactNode, useMemo} from "react";
import * as React from "react";

type ButtonProps = {
    as?: 'a' | 'button'
    type?: "button" | "submit" | "reset" | undefined,
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    onClick?: () => void
    children: ReactNode
}

export const Button: FC<ButtonProps> = memo(({as = 'button', disabled = false, style, children, className, onClick, type = 'button'}) => {

    const matchButton = useMemo(() => {
        switch (as) {
            case 'a':
                return <a style={style} onClick={onClick} className={className}>{children}</a>
            case 'button':
                return <button disabled={disabled} style={style} type={type} onClick={onClick} className={`button ${className}`}>
                    <div className={'inner'}>{children}</div>
                </button>

        }
    }, [as, className, type, children])

    return matchButton
})