/**
 * Created by zhaodeyang on 10/03/17.
 */
import { Field } from 'redux-form'

import React from 'react';
import MenuItem from 'material-ui/MenuItem'

import {GridList, GridTile} from 'material-ui/GridList';

import 'whatwg-fetch'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'





const lang =  fetch('http://localhost:3000/Lang').then(function(response) {
  response.json().then(function(json) {
    console.log(json)
   const langmap = json.map((item, index)=>(<MenuItem key={index} value={item.Code} primaryText={item.DisplayName}/>));
console.log(langmap);
    return langmap
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });
});

// const renderLang = function () {
//   if (lang.length > 0) {
// return lang.map((item, index)=>(<MenuItem value={item.Code} primaryText={item.DisplayName}/>));
//   }
//   else {
//   }
// };
const styles = {

  add: {
    width:'100%'

  }
};



const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
                    valueSelected={input.value}
                    onChange={(event, value) => input.onChange(value)}/>
);



const TranslateInput = () => (
  <div>
  <Field name="SupportedLanguages[0].ID" component={renderRadioGroup}>
    <RadioButton value="6eff66e3-9aae-4965-8a65-1f472de18610" label="English"/>
  </Field>
    <Field name="SupportedLanguages[1].ID" component={renderRadioGroup}>
      <RadioButton value="f77dd949-3d52-48aa-8100-187d1c9f77a4" label="Chinese"/>
    </Field>

    </div>
);
export default TranslateInput;
