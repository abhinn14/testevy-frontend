"use client";

import {useParams} from "next/navigation";

const Test = () => {
  const id = useParams().id;
  return (
    <div className="h-100">
      Give Test Now!!!
      Test ID = {id}
    </div>
  )
}

export default Test;