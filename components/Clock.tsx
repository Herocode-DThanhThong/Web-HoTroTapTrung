import { getTime } from "@/utils/getTime";
import React, { memo, useEffect, useState } from "react";

const Clock = () => {
  const [timer, setTimer] = useState<string>("00:00:00");
  useEffect(() => {
    setInterval(() => {
      setTimer(getTime());
    }, 1000);
  }, []);
  return <>{timer}</>;
};

export default memo(Clock);
