import { useState, useEffect, useRef } from "react";
import deleteItem from "../components/deleteItem";

export default function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      debugger;
      setIsComponentVisible(false);
      if (event.target.className === "unique_class") {
        debugger;
        setIsComponentVisible(true);
      }
    }
  };
  //   useEffect(() => {
  //     document.addEventListener("click", handleClickOutside, true);
  //     debugger;
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside, true);
  //     };
  //   }, [ref]);

  return { ref, isComponentVisible, setIsComponentVisible };
}
