import {ChangeEvent, FC, useDeferredValue, useEffect, useMemo, useState, useTransition} from "react";
import {action} from '@storybook/addon-actions';
import userData from './data/users.json'

export default {
    title: 'Example/MarvelInput',
    parameters: {},
    tags: ['autodocs'],
}

const textChange = action('change input')
export const MarvelDefferedInput: FC = () => {
    const [text, setText] = useState<string>(' ')
    // @ts-ignore
    const [users, setUsers] = useState<typeof userData>(userData)
    const defferedValue = useDeferredValue(text)

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const filteredUsers = useMemo(() => {
        return users.filter(u => u.name.toLowerCase().includes(defferedValue))
    }, [defferedValue])


    useEffect(() => {
        textChange(text)

    }, [text])

    console.log('render')
    return (
        <div>
            <input value={text} onChange={onChangeText} type={'text'}/>
            <hr/>

            {filteredUsers.length ? filteredUsers.map(u => (
                <p key={u._id}>{u.name}</p>
            )) : <h2>No users</h2>}
        </div>
    )
}
export const MarvelTransitionInput: FC = () => {
    const [text, setText] = useState<string>('$')
    // @ts-ignore
    const [users, setUsers] = useState<typeof userData>(userData)
    const [isPending, startTransition] = useTransition()

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setText(e.currentTarget.value)
        })
    }

    const filteredUsers = useMemo(() => {
        return users.filter(u => u.name.toLowerCase().includes(text))
    }, [text])


    useEffect(() => {
        textChange(text)

    }, [text])

    console.log('render')
    return (
        <div>
            <input value={text} onChange={onChangeText} type={'text'}/>
            <hr/>

            {isPending ? <h2>Loading</h2> :
                filteredUsers.length ? filteredUsers.map(u => (
                    <p key={u._id}>{u.name}</p>
                )) : <h2>No users</h2>
            }

        </div>
    )
}

export const FetchComponent: FC = () => {
    const [data, setData] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const fetchData = () => {
        (async () => {
            const response = await fetch(`https://rpqgtp-3000.csb.app/${url}`)

                const result = await response.text()
                setData(result)

        })()
    }



    return (
        <div>
            <div>
                <input
                    value={url}
                    onChange={(e) => setUrl(e.currentTarget.value)}
                    placeholder={'Enter URL'}
                    type="url"
                />
            </div>

            <div style={{margin: '20px 0px'}}>
                <button data-url={url} onClick={fetchData}>Fetch data</button>
            </div>



                {JSON.stringify(data, null, 2)}


        </div>
    )
}
