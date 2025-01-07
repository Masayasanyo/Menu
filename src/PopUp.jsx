// components/PopUp.js
import React, { useState } from "react";

const PopUp = () => {
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  return (
    <div>
      <button onClick={togglePopUp}>ポップアップを開く</button>

      {isPopUpVisible && (
        <div className='pop-up'>
          {/* ポップアップの中身 */}
          <p>ここにポップアップの内容を記述します。</p>
          <button onClick={togglePopUp}>閉じる</button>
        </div>
      )}
    </div>
  );
};

export default PopUp;
