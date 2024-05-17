import { useCallback, useState } from "react";

const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => {
    setState((pre) => !pre)
  }, [])

  const close = useCallback(() => {
    setState(false)
  }, [])

  const open = useCallback(() => {
    setState(true)
  }, [])

  return [state, { toggle, close, open }]

}

export default useToggle