import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function FunDemo() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  useEffect(() => {
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)

    // setTimeout(() => {
    //   setCount(count + 1)
    //   setCount(count + 2)
    // }, 0);
  }, []);

  return (
    <div className="hooks">
        <div>
          <p onClick={() => setCount(count + 1)}>{count}</p>
        </div>
    </div>
  );
}

export default FunDemo;
