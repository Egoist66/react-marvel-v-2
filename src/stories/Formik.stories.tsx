import {FC} from "react";
import './css/global.scss'
import {useFormik} from "formik";
import {withFormikDevtools} from "formik-devtools-extension";
import * as yup from 'yup';

export default {
    title: 'Example/Formik',
    parameters: {},
    tags: ['autodocs'],
}


export const Form: FC = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false

        },
        validationSchema: yup.object({
            name: yup.string().min(2, 'Не менее 2 символов!').required('Поле обязательно'),
            email: yup.string().email('Неверный формат email').required('Поле обязательно'),
            amount: yup.number().min(3, 'Не менее 3!').required('Поле обязательно!'),
            currency: yup.string().required('Поле обязательно!'),
            text: yup.string().trim().max(1000, 'Превышено допустимое кол-во символов'),
            terms: yup.boolean().required('Необходимо согласие').oneOf([true], 'Необходимо согласие')
        }),

        onSubmit(values) {
            console.log(values)
        }
    })

    withFormikDevtools(formik);



    return (
        <div className={'app'}>
            <form onSubmit={formik.handleSubmit} className="form">
                <h2>Отправить пожертвование</h2>
                <label htmlFor="name">Ваше имя</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.errors.name && formik.touched.name ?
                    <p style={{color: 'red', margin: '10px 0px'}}>{formik.errors.name}</p> : null}


                <label htmlFor="email">Ваша почта</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ?
                    <p style={{color: 'red', margin: '10px 0px'}}>{formik.errors.email}</p> : null}

                <label htmlFor="amount">Количество</label>
                <input
                    id="amount"
                    min={0}
                    type="number"
                    {...formik.getFieldProps('amount')}
                />

                {formik.errors.amount && formik.touched.amount ?
                    <p style={{color: 'red', margin: '10px 0px'}}>{formik.errors.amount}</p> : null}

                <label htmlFor="currency">Валюта</label>
                <select
                    id="currency"
                    {...formik.getFieldProps('currency')} >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </select>

                {formik.errors.currency && formik.touched.currency ?
                    <p style={{color: 'red', margin: '10px 0px'}}>{formik.errors.currency}</p> : null}


                <label htmlFor="text">Ваше сообщение</label>
                <textarea
                    id="text"
                    {...formik.getFieldProps('text')}
                />
                {formik.errors.text && formik.touched.text ?
                    <p style={{color: 'red', margin: '10px 0px'}}>{formik.errors.text}</p> : null}

                <label className="checkbox">
                    <input {...formik.getFieldProps('terms')}  type="checkbox"/>
                    Соглашаетесь с политикой конфиденциальности?
                </label>

                {formik.errors.terms && formik.touched.terms ?
                    <p style={{color: 'red', margin: '10px 0px'}}>{formik.errors.terms}</p> : null}

                <button type="submit">Отправить</button>
            </form>
        </div>
    )
}