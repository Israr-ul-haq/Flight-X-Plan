import { useState } from "react";

function useDisplayImage1() {
  const [result1, setResult1] = useState("");

  function uploader1(e) {
    debugger;
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResult1(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  return { result1, uploader1, setResult1 };
}

export default useDisplayImage1;
