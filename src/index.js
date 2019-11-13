import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import View from "./view.js";

let myGolabelSelectedName = ""; // 已选中label
let myGolabelInit = true; // 第一次绑定事件flag
let myGolabelHoverIndex = -1; // 当前hover
let myGolabelOptionsHash = []; // options
let myGolabelDragStatus = false;
let myGolabelMouseY = 0;
let myGolabelEnterStatus = false;
let myGolabelEnterHide = false;
let myGolabelPlaceholder = "";
let myGolabelChange = null;
let myGolabelOptionsInit = [];

const Index = memo(props => {
  const stateShowOptions = useState(false);
  const stateInputValue = useState("");
  const stateInputPlaceholder = useState("");
  const stateOptionsHash = useState([]);
  const stateHoverIndex = useState(myGolabelHoverIndex);
  const stateIsLoading = useState(false);
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const optionsRef = useRef(null);
  const scrollBarRef = useRef(null);
  const scrollBarWrapperRef = useRef(null);
  const optionRef = useRef(null);
  const scrollWidth = getScrollWidth();

  useEffect(() => {
    myGolabelOptionsInit = [];
    const optionsHash = props.attributes ? Array.isArray(props.attributes.options) ? props.attributes.options : [] : [];

    myGolabelChange = props.attributes ? props.attributes.change ? props.attributes.change : () => {return true} : () => {return true} ;
    myGolabelPlaceholder = props.attributes ? props.attributes.placeholder
      ? props.attributes.placeholder
      : "select..."
      : "select...";
    optionsHash.forEach((item, index) => {
      myGolabelOptionsInit.push({ ...item, select: false, index: index });
    });
    myGolabelOptionsHash = [...myGolabelOptionsInit];
    stateOptionsHash[1]([...myGolabelOptionsInit]);
    stateInputPlaceholder[1](myGolabelPlaceholder);
    stateIsLoading[1](props.attributes ? props.attributes.isLoading : false);
  }, [props.attributes]);

  useEffect(() => {
    if (myGolabelInit) {
      document.addEventListener("click", handleClickHide); // 点击其他区域隐藏
    }
  }, [myGolabelInit]);

  useEffect(() => {
    
    if (!stateShowOptions[0]) {
      myGolabelEnterStatus = myGolabelEnterHide;
      inputRef["current"]["readOnly"] = true;
      stateInputValue[1](myGolabelSelectedName);
      return;
    } else {
      myGolabelEnterHide = true;
      myGolabelEnterStatus = false;
      inputRef["current"]["readOnly"] = false;
      stateOptionsHash[1]([
        ...getOptionsHash(myGolabelOptionsInit, myGolabelSelectedName)
      ]);
      stateInputValue[1]("");
    }
    // 监听原生scroll
    if (myGolabelInit) {
      document.addEventListener("keydown", handleKeyDown); // 键盘事件
      optionsRef.current.addEventListener("scroll", handleScroll); // scroll事件
      // 监听点击scroll
      scrollBarWrapperRef.current.addEventListener(
        "mousedown",
        handleClickWrapper
      );
      scrollBarRef.current.addEventListener("mousedown", handleClickBar);
    }
    // 是否显示滚动条
    optionsRef.current.style.overflowY = "scroll";
    optionsRef.current.style.width = `calc(100% + ${scrollWidth}px)`;
    if (optionsRef.current.clientHeight !== optionsRef.current.scrollHeight) {
      scrollBarWrapperRef.current.style.display = "block";
      scrollBarRef.current.style.height = `${(optionsRef.current.clientHeight /
        optionsRef.current.scrollHeight) *
        100}%`;
    }
    myGolabelInit = false;
  }, [stateShowOptions[0]]);

  useEffect(() => {
    if (optionsRef.current.clientHeight !== optionsRef.current.scrollHeight) {
      scrollBarWrapperRef.current.style.display = "block";
      scrollBarRef.current.style.height = `${(optionsRef.current.clientHeight /
        optionsRef.current.scrollHeight) *
        100}%`;
    }
  }, [stateIsLoading[0]]);

  const handleClickWrapper = e => {
    if (e.target === scrollBarWrapperRef.current) {
      const offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY);
      const scrollbarHalf = scrollBarRef.current.offsetHeight / 2;
      const scrollbarClickPosition =
        ((offset - scrollbarHalf) * 100) / e.target.offsetHeight;
      optionsRef.current.scrollTop =
        (scrollbarClickPosition * optionsRef.current.scrollHeight) / 100;
    }
  };

  const handleChangeShowStatus = useCallback(status => {
    stateShowOptions[1](status);
  }, []);

  const handleScroll = () => {
    const moveY =
      (optionsRef.current.scrollTop / optionsRef.current.clientHeight) * 100;
    scrollBarRef.current.style.transform = `translateY(${moveY}%)`;
  };

  const handleClickBar = e => {
    startDrag(e);
    myGolabelMouseY =
      e.currentTarget.offsetHeight -
      (e.clientY - e.currentTarget.getBoundingClientRect().top); // 获取鼠标点击位置
  };

  const startDrag = e => {
    e.stopImmediatePropagation();

    myGolabelDragStatus = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.onselectstart = () => false;
  };

  const handleMouseMove = e => {
    if (myGolabelDragStatus === false) {
      return;
    }
    if (!myGolabelMouseY) {
      return;
    }
    const offset =
      (scrollBarWrapperRef.current.getBoundingClientRect().top - e.clientY) *
      -1; // 获取鼠标相对容器偏移量
    const scrollbarClickPosition =
      scrollBarRef.current.offsetHeight - myGolabelMouseY;
    const scrollbarPositionPercentage =
      ((offset - scrollbarClickPosition) * 100) /
      scrollBarWrapperRef.current.offsetHeight; // 获取鼠标相对点击位置偏移量（offset - scrollbarClickPosition）
    optionsRef.current.scrollTop =
      (scrollbarPositionPercentage * optionsRef.current.scrollHeight) / 100;
  };

  const handleMouseUp = e => {
    myGolabelDragStatus = false;
    myGolabelMouseY = 0;
    document.removeEventListener("mousemove", handleMouseMove);
    document.onselectstart = null;
  };

  const handleSelect = obj => {
    if (!obj.disabled) {
      myGolabelSelectedName = obj.name;
      stateShowOptions[1](false);
      myGolabelHoverIndex = obj.index;
      stateHoverIndex[1](myGolabelHoverIndex);

      const tempHash = getOptionsHash(stateOptionsHash[0], obj.name);
      myGolabelOptionsHash = [...tempHash];
      stateOptionsHash[1]([...tempHash]);
      stateInputPlaceholder[1](
        myGolabelSelectedName !== ""
          ? myGolabelSelectedName
          : myGolabelPlaceholder
      );
      if (obj.name === "") {
        stateInputValue[1]("");
      }
      return myGolabelChange(obj);
    }
  };

  const handleChangeInputValue = val => {
    stateInputValue[1](val);
    let searchOptionsHash = [];
    myGolabelOptionsInit.forEach(item => {
      if (item.name.indexOf(val) > -1) {
        searchOptionsHash.push({
          ...item,
          select: myGolabelSelectedName === item.name ? true : false
        });
      }
    });
    myGolabelOptionsHash = [...searchOptionsHash];
    stateOptionsHash[1]([...searchOptionsHash]);
  };

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 13: {
        if (myGolabelEnterStatus === true) {
          stateShowOptions[1](true);
        } else if (stateShowOptions[0]) {
          if (myGolabelHoverIndex !== -1 && myGolabelOptionsHash.length !== 0) {
            handleSelect(myGolabelOptionsHash[myGolabelHoverIndex]);
          } else {
            const tempHash = getOptionsHash(
              myGolabelOptionsInit,
              myGolabelSelectedName
            );
            myGolabelOptionsHash = tempHash;
            stateOptionsHash[1](tempHash);
            stateShowOptions[1](false);
          }
        }
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        break;
      }
      case 27: {
        if (!stateShowOptions[0]) {
          return;
        }
        stateShowOptions[1](false);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        break;
      }
      case 38: {
        handleHover(e, "prev");
        break;
      }
      case 40: {
        handleHover(e, "next");
        break;
      }
      default:
        break;
    }
  };

  const handleHover = (e, type) => {
    if (!stateShowOptions[0]) {
      false;
    }
    // 计算当前houver
    if (type === "prev") {
      myGolabelHoverIndex =
        myGolabelHoverIndex < 1
          ? myGolabelOptionsHash.length - 1
          : myGolabelHoverIndex - 1;
    } else {
      myGolabelHoverIndex =
        myGolabelHoverIndex > myGolabelOptionsHash.length - 2
          ? 0
          : myGolabelHoverIndex + 1;
    }
    stateHoverIndex[1](myGolabelHoverIndex);
    // 计算滚动条位置
    if (
      optionRef.current !== null && optionsRef.current.clientHeight !== optionsRef.current.scrollHeight
    ) {
      if (type === "prev") {
        const offset =
          optionRef.current.getBoundingClientRect().top -
          optionsRef.current.getBoundingClientRect().top;
        if (offset < 0 || optionRef.current.getBoundingClientRect().top > optionsRef.current.getBoundingClientRect().bottom) {
          optionsRef.current.scrollBy(0, offset + 6);
        }
      } else if (type === "next") {
        const offset =
          optionRef.current.getBoundingClientRect().bottom -
          optionsRef.current.getBoundingClientRect().bottom;
        if (offset > 0 || optionRef.current.getBoundingClientRect().bottom < optionsRef.current.getBoundingClientRect().top) {
          optionsRef.current.scrollBy(0, offset + 6);
        }
      }
    }
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  };

  const getOptionsHash = (array, name) => {
    const arr = array;
    for (let i = 0; i < arr.length; i++) {
      arr[i].select = name === arr[i].name ? true : false;
    }
    return arr;
  };

  const handleClickHide = e => {
    const targetE = document.getElementsByClassName("exepoc-select-wrapper")[0];
    if (!getTargetNode(e.target, targetE)) {
      myGolabelEnterHide = false;
      myGolabelEnterStatus = false;
      stateShowOptions[1](false);
    }
  };

  const getTargetNode = (clicke, target) => {
    // 点击区域是否包含在元素内
    if (!clicke || clicke === document) {
      return false;
    }
    return clicke === target ? true : getTargetNode(clicke.parentNode, target);
  };
  return (
    <View
      states={{
        stateInputPlaceholder,
        stateInputValue,
        stateShowOptions,
        stateOptionsHash,
        stateHoverIndex,
        stateIsLoading
      }}
      handlers={{
        handleChangeShowStatus,
        handleChangeInputValue,
        handleSelect
      }}
      refs={{
        selectRef,
        inputRef,
        optionsRef,
        scrollBarWrapperRef,
        scrollBarRef,
        optionRef
      }}
      customStyle={props.attributes ? props.attributes.customStyle : {}}
      emptyRecordText={props.attributes ? props.attributes.emptyRecordText : ""}
      placeholder={myGolabelPlaceholder}
    />
  );
});

const getScrollWidth = () => {
  let scrollBarWidth = 0;
  const outer = document.createElement("div");
  
  outer.style.width = "100px";
  outer.style.visibility = "hidden";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWidthScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWidthScroll;

  return scrollBarWidth;
};
export default Index;
