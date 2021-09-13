import React, {useEffect, useState} from 'react';
import {useAction} from "../../hooks/useAction";

interface IErrorMessageProps {
    message: string | null | undefined
    timeout: number
}

const ErrorMessage : React.FC<IErrorMessageProps> = ({message, timeout}) => {

    const {cleanErrorMessage} = useAction()

    const [timeoutId, setTimeoutId] = useState(0)

    useEffect(() => {

        if (message) {
            clearTimeout(timeoutId)
            setTimeoutId(setTimeout(() => cleanErrorMessage(), timeout))
        }

    }, [message])

    return (
        <p className={ message ? "error-message error-message--active" : "error-message"}>Error message</p>
    );
};

export default ErrorMessage;