import React, { memo, useState } from "react";

const TimeRead: React.FC = () => {
  return (
    <>
      <div>
        <label htmlFor="postTimeRead">Post reading time in minutes</label>
        <input type="number" name="postTimeRead" />
      </div>
    </>
  );
};

export default TimeRead;
