/* eslint-disable */
import React , {useState, useEffect} from 'react'
import ExepocSelect from '../../src/index.js'

function App () {
  const stateTest = useState('');
  const optionsHash = [ // 用户options
    { name: "BTC" },
    { name: "ETH" },
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
    placeholder: '请选择',
    emptyRecordText: '无匹配数据111',
    isLoading: true,
    customStyle: {
      select: {
        width: '200px',
        height: '40px',
      },
      options: {
        maxHeight: '200px'
      }
    },
    change: (val) => {
      stateTest[1](val.name);
    }
  };

  const stateAttributes = useState(attributes);

  useEffect(() => {
    setTimeout(() => {
      stateAttributes[1]({...attributes, isLoading: false});
    }, 2000)
  }, []);
  return (
    <div>
      <ExepocSelect attributes={stateAttributes[0]}/>
      <p>{stateTest[0]}</p>
    </div>
  )
}

export default App
