import React, {ChangeEvent, memo, useEffect, useState} from 'react';



interface ITextInput {
    title: string
    id: string
    letters: number
    value: string | undefined
    setValue: (e: React.ChangeEvent<any>) => void
    type: string
    name: string
}

const typeValues = ["text", "email", "password"]


const TextInput : React.FC<ITextInput> = memo(({title, letters, id, value, setValue, type, name}) => {

    useEffect(() => {
        const val = typeValues.filter(item => item === type)

        if (val.length === 0) {
            console.error("Input wrong type")
        }

    }, [type])

    const [charLeft, setCharLeft] = useState(letters)


    function changeValue(e: ChangeEvent<HTMLInputElement>) {

        console.log(e)

        const newValue = e.target.value

        const chars = letters - newValue.length


        if (chars >= 0) {
            setCharLeft(chars)
            setValue(e)
        }
    }

    return (
        <div className="textInput">
            <label htmlFor={id}>{title}</label>
            <input type={type} id={id} placeholder={title} name={name} value={value} onChange={changeValue} />
            <p className="letters"><span>{charLeft}</span> Characters remaining</p>
        </div>
    );
})

export default TextInput;