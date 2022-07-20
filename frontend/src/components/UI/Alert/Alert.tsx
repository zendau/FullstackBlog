import React, { memo, useEffect, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAction } from '@/hooks/useAction';


interface IErrorMessageProps {
  timeout: number
}

const AlertMessage: React.FC<IErrorMessageProps> = memo(({ timeout }) => {



  const { clearError } = useAction()

  const { message, type } = useTypedSelector(state => state.alertState)

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  useEffect(() => {

    if (message) {
      clearTimeout(timeoutId)
      setTimeoutId(setTimeout(() => clearError(), timeout))
    }

  }, [message])

  return (
    <p dangerouslySetInnerHTML={ { __html: message } } className={`
      alert-message 
      ${message && "alert-message--active"}
      alert-message--${type}
      ` }></p>
  );
})

export default AlertMessage;