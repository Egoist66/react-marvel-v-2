import {FC, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "../reusable/Button.tsx";
import * as yup from 'yup'
import {m_service} from "../../services/mservice-api.ts";
import {useCatchUI} from "../../hooks/useCatchUI.ts";
import {NavLink} from "react-router-dom";

export type FoundCharState = {

    id: number | null
    message: string | null

}
export const CharForm: FC = () => {
    const {isLoading, onLoad, onError} = useCatchUI()
    const [state, setState] = useState<FoundCharState>({
        id: null,
        message: ''
    })

    const getCharWithSearch = async (search: string) => {
        try {
            onLoad(true)
            const {message, id} = await m_service.findSingleChar(search)
            setState({
                id,
                message
            })
            onLoad(false)
        }
        catch (e){
            console.log(e)
            onError(true)
        }
    }

    return (
        <Formik
            initialValues={{search: ''}}
            onSubmit={(values, {resetForm}) => {
                getCharWithSearch(values.search.toUpperCase())
                resetForm()

            }}
            validationSchema={yup.object({
                search: yup.string().required('This field is required'),
            })}
        >
            <Form>
                <div style={{display: "flex", gap: 20, alignItems: "center", padding: '20px 0px'}}>
                    <Field style={{padding: 10}} name={'search'} id={'search'}/>


                    <Button disabled={isLoading} style={{margin: 0}} className={'button__main button__long'} type={'submit'}>{isLoading ? 'Finding...': 'Find a character'}</Button>

                </div>
                <div>
                    {state?.id ? <NavLink end style={{textDecoration: "underline"}} to={`/character/${state?.id}`}>Read about the character</NavLink> : null}
                    <ErrorMessage component={'div'} name={'search'} className={'error'}/>
                    <p style={{paddingTop: 5}}>{state.message}</p>
                </div>

            </Form>
        </Formik>
    )
}