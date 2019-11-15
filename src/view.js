import React, { memo } from "react";
import "./index.css";

const Index = memo(props => {
  const {
    states,
    handlers,
    refs,
    customStyle,
    emptyRecordText,
    placeholder
  } = props;
  const {
    stateInputPlaceholder,
    stateInputValue,
    stateShowOptions,
    stateOptionsHash,
    stateHoverIndex,
    stateIsLoading,
    stateShowIcon,
    stateIconClass
  } = states;
  const {
    handleChangeShowStatus,
    handleChangeInputValue,
    handleSelect
  } = handlers;
  const {
    selectRef,
    inputRef,
    optionsRef,
    scrollBarWrapperRef,
    scrollBarRef,
    optionRef
  } = refs;
  return (
    <div className="exepoc-select-wrapper">
      <div
        className="exepoc-select flex flex-center-y flex-start-x"
        onClick={() => {
          handleChangeShowStatus(!stateShowOptions[0]);
        }}
        ref={selectRef}
      >
       { stateIconClass[0] && <div className="select-left-icon">
          <div className={stateIconClass[0] ? stateIconClass[0] : 'default'}></div>
        </div>}
        <div
          className="select-value flex flex-center-y flex-start-x light"
          style={customStyle && { ...customStyle.select }}
        >
          <input
            type="test"
            autoComplete="off"
            placeholder={stateInputPlaceholder[0]}
            className="select-input"
            readOnly="readonly"
            ref={inputRef}
            value={stateInputValue[0]}
            onChange={e => {
              handleChangeInputValue(e.target.value);
            }}
          />
        </div>
        <div
          className="select-icon flex flex-center-y flex-start-x icon-delete"
          onClick={e => {
            e.stopPropagation();
            handleSelect({ name: "", index: -1 });
          }}
        >
          {stateInputPlaceholder[0] !== placeholder ? "x" : ""}
        </div>
        <div className="select-icon flex flex-center-y flex-start-x">
          <i className="icon-arrow-up"></i>
        </div>
      </div>
      <SelectOptions
        stateOptionsHash={stateOptionsHash}
        stateShowOptions={stateShowOptions}
        stateHoverIndex={stateHoverIndex}
        stateIsLoading={stateIsLoading}
        stateShowIcon={stateShowIcon}
        handleSelect={handleSelect}
        optionsRef={optionsRef}
        scrollBarWrapperRef={scrollBarWrapperRef}
        scrollBarRef={scrollBarRef}
        optionRef={optionRef}
        customStyle={customStyle}
        emptyRecordText={emptyRecordText}
      />
    </div>
  );
});

const SelectOptions = memo(
  ({
    stateOptionsHash,
    stateShowOptions,
    stateHoverIndex,
    stateIsLoading,
    stateShowIcon,
    handleSelect,
    optionsRef,
    scrollBarWrapperRef,
    scrollBarRef,
    optionRef,
    customStyle,
    emptyRecordText
  }) => (
    <div
      className="select-options-box"
      style={{ display: stateShowOptions[0] === true ? "block" : "none" }}
    >
      <div className="select-options-wrapper">
        <div
          className="select-options"
          ref={optionsRef}
          style={customStyle && { ...customStyle.options }}
        >
          {stateIsLoading[0] && <p className="empty">加载中...</p>}
          {!stateIsLoading[0] &&
            stateOptionsHash[0].map((item, index) => {
              return (
                <div
                  className={`option${item.select === true ? " selected" : ""}${stateHoverIndex[0] === index ? " hover" : ""}${item.disabled === true ? " disabled" : ""}`}
                  key={index}
                  onClick={() => {
                    handleSelect(item, index);
                  }}
                  ref={(ref)=>{
                    if (stateHoverIndex[0] === index) {
                      optionRef.current = ref;
                    }
                  }}
                >
                  <div className="flex flex-center-y">
                    {stateShowIcon[0] && <div style={{marginRight: '10px', maxWidth: '30px', maxHeight: '20px', overflow: 'hidden'}}><div className={item.icon ? item.icon : ''}></div></div>}
                    <div>{item.name}</div>  
                  </div>
                </div>
              );
            })}
          {!stateIsLoading[0] && stateOptionsHash[0].length === 0 && (
            <p className="empty">
              {emptyRecordText ? emptyRecordText : "无匹配数据"}
            </p>
          )}
        </div>
        <div className="scrolllbar-wrapper" ref={scrollBarWrapperRef}>
          <div className="scrollbar" ref={scrollBarRef}></div>
        </div>
      </div>
    </div>
  )
);
export default Index;
