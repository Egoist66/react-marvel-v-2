import {FC, memo} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../../reusable/Button.tsx";
import {useTitle} from "../../../hooks/useTitle.ts";

export const Page404: FC = memo(() => {
    const navigate = useNavigate()
    useTitle('404 - Not found')
    return (
        <div>
            <h2 style={{paddingBottom: 20}}>404 - Such page does not exist!</h2>
            <Button className={'button__main'} onClick={() =>navigate('/', {replace: true})}>
                Back to home
            </Button>

        </div>
    )
})