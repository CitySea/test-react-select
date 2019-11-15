/* eslint-disable */
import React, { useState, useEffect, memo } from "react";
import ExepocSelect from "../../src/index.js";
import "../../src/index.css";
import "./index.css";

const Index = memo(() => {
  const stateTest = useState("");
  const optionsHash = [
    // 用户options
    { icon: 'test1', name: "BTC" },
    { icon: 'test2', name: "ETH" },
    { name: "EOS", disabled: true },
    { name: "BTC2" },
    { name: "ETH3" },
    { name: "EOS4" },
    { name: "BTC5" },
    { name: "ET6H" },
    { name: "EOS1" }
  ];
  const attributes = {
    options: optionsHash,
    showIcon: true,
    placeholder: "请选择",
    emptyRecordText: "无匹配数据111",
    isLoading: false,
    change: val => {
      stateTest[1](val.name);
    }
  };

  const stateAttributes = useState(attributes);

  useEffect(() => {
    setTimeout(() => {
      stateAttributes[1]({ ...attributes, isLoading: false });
    }, 2000);
  }, []);
  return (
    <div>
      <ExepocSelect attributes={stateAttributes[0]} />
      <p>{stateTest[0]}</p>
    </div>
  );
});

export default Index;
