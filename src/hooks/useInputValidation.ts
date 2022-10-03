import { useState, useCallback } from 'react'

function useInputValidation<T>(
  initialValue: T,
  validationFn: (value: T) => boolean
): [(value: T) => void, boolean] {
  const [state, setState] = useState<T>(initialValue)
  const [isValid, setIsValid] = useState<boolean>(validationFn(state))

  const setValue = useCallback(
    (nextValue: T): void => {
      setState(nextValue)
      setIsValid(validationFn(nextValue))
    },
    [validationFn]
  )

  return [setValue, isValid]
}

export default useInputValidation
