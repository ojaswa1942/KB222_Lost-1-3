import { useRef, useEffect } from "react";

const useOuterClick = (callback) => {
  const innerRef = useRef();
  const callbackRef = useRef();

  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("keydown", handleClick);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleClick);
      document.removeEventListener("click", handleClick);
    };

    // read most recent callback and innerRef dom node from refs
    function handleClick(e) {
      if (e.type === `keydown` && e.key !== 13) {
        return;
      }
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
        callbackRef.current(e);
      }
    }
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
};

export default useOuterClick;
