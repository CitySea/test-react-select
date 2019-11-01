# test-react-select

[![npm version](https://badge.fury.io/js/test-react-select.svg)](https://badge.fury.io/js/test-react-select)

###  :tada: For version >= 2.0.0, please update react and react-dom to at least ```16.8.6```, since it is rewrited with hooks.
```js
  "peerDependencies": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  }
```
# Docs Link
[attributes](#attributes)

### <a name="attributes"></a>attributes

|Props                             |       |Type    |Description                                  |Default     |
|---                               |---    |---     |---                                          |  ---       |
|options                           |  Opt  |  arr   |                                             |  none      |
|placeholder                       |  Opt  |  Str   |                                             |  select... |
|emptyRecordText                   |  Opt  |  Str   |                                             |  无匹配数据  |
|isLoading                         |  Opt  |  Boolen|                                             |  false     |
|customStyle                       |  Opt  |  Obj   |                                             |  none      |
|select                            |  Opt  |  Obj   |                                             |            |
|width                             |  Opt  |  Str   |                                             |  160px     |  
|height                            |  Opt  |  Str   |                                             |  30px      |
|options                           |  Opt  |  Obj   |                                             |            |
|maxHeight                         |  Opt  |  Str   |                                             |  250px     |


```js
import React , {useState, useEffect} from 'react';
import TextSelect from 'test-react-select';

function App () {
  const stateTest = useState('1111');
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
      <TextSelect attributes={stateAttributes[0]}/>
      <p>{stateTest[0]}</p>
    </div>
  )
}

export default App
```