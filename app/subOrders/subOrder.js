/**
 * Created by zhaodeyang on 29/03/17.
 */
import React from 'react';
import {List, Datagrid, TextField, FunctionField, ReferenceField} from 'admin-on-rest/lib/mui';

import GridList from './GridList';
import {Filter, ReferenceInput, SelectInput, TextInput, NumberInput, ImageInput, ImageField} from 'admin-on-rest/lib/mui';
import {
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  DateField,
  EditButton,
  TabbedForm,
  FormTab

} from 'admin-on-rest/lib/mui';



const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />

  </Filter>
);

export const SubOrders = (props) => (
  <List {...props} title="次分类" filters={<PostFilter />}>
   <GridList/>
  </List>
);
