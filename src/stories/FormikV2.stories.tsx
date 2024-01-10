import {FC, InputHTMLAttributes} from "react";
import './css/global.scss'
import {ErrorMessage, Field, Form, Formik, useField} from 'formik';
import * as yup from "yup";

export default {
    title: 'Example/Formik',
    parameters: {},
    tags: ['autodocs'],
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;
//type SelectProps = SelectHTMLAttributes<HTMLSelectElement>
const MyTextInput: FC<{ label: string, attr: InputProps }> = ({label, attr}) => {
    const [field, meta] = useField(attr?.name!)

    return (
        <>

            <label htmlFor={attr?.name}>{label}</label>
            <input {...attr} {...field} />
            {meta.touched && meta.error ? (
                <div className={'error'}>{meta.error}</div>
            ) : null}
        </>
    )


}

export const FormV2: FC = () => {


    return (

        <div className={'app'}>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    amount: 0,
                    currency: '',
                    text: '',
                    terms: false

                }}
                onSubmit={(values, {resetForm}) => {
                    console.log(values)
                    resetForm()
                }}
                validationSchema={yup.object({
                    name: yup.string().min(2, 'Не менее 2 символов!').required('Поле обязательно'),
                    email: yup.string().email('Неверный формат email').required('Поле обязательно'),
                    amount: yup.number().min(3, 'Не менее 3!').required('Поле обязательно!'),
                    currency: yup.string().required('Поле обязательно!'),
                    text: yup.string().trim().max(1000, 'Превышено допустимое кол-во символов'),
                    terms: yup.boolean().required('Необходимо согласие').oneOf([true], 'Необходимо согласие')
                })}
            >
                <Form className="form">

                    <h2>Отправить пожертвование</h2>
                    <MyTextInput
                        label={'Ваше имя'}
                        attr={{name: 'name', type: 'text', id: 'name'}}
                    />
                    <MyTextInput
                        label={'Ваша почта'}
                        attr={{name: 'email', type: 'email', id: 'email'}}
                    />

                    <MyTextInput
                        label={'Количество'}
                        attr={{name: 'amount', type: 'number', id: 'amount'}}
                    />


                    <label htmlFor="currency">Валюта</label>
                    <Field
                        id="currency"
                        name={'currency'}
                        as={'select'}
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                    </Field>
                    <ErrorMessage component={'div'} name={'currency'} className={'error'}/>


                    <label htmlFor="text">Ваше сообщение</label>
                    <Field
                        id="text"
                        name={'text'}
                        as={'textarea'}
                    />
                    <ErrorMessage component={'div'} name={'text'} className={'error'}/>


                    <label className="checkbox">
                        <Field name={'terms'} type="checkbox"/>
                        Соглашаетесь с политикой конфиденциальности?
                    </label>

                    <ErrorMessage component={'div'} name={'terms'} className={'error'}/>

                    <button type="submit">Отправить</button>
                </Form>

            </Formik>
        </div>
    )
}