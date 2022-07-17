import React, { memo, useEffect, useState } from 'react';
import { useAction } from "../../../hooks/useAction";

interface IErrorMessageProps {
  message: string | false | undefined | null
  timeout: number
}

const ErrorMessage: React.FC<IErrorMessageProps> = memo(({ message, timeout }) => {

  const { cleanErrorMessage } = useAction()

  const [timeoutId, setTimeoutId] = useState(0)

  useEffect(() => {

    if (message) {
      clearTimeout(timeoutId)
      setTimeoutId(setTimeout(() => cleanErrorMessage(), timeout))
    }

  }, [message])

  return (
    <p className={message ? "error-message error-message--active" : "error-message"}>{message}</p>
  );
})

export default ErrorMessage;