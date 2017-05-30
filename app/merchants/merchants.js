/**
 * Created by zhaodeyang on 7/03/17.
 */
import React from 'react';
import {List, Datagrid, TextField, FunctionField, ReferenceField} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/action/bookmark';
import LinkToRelatedCategories from './LinkToRelatedCategories';
import LinkToRelatedOrders from './LinkToRelatedOrders';

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

import WorkingHourInput from './WorkingHourInput'
import TranslateInput from './TranslateInput'
import DisplayNameInput from './DisplayNameInput'

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />

  </Filter>
);


// const PostFilter = (props) => (
//   <Filter {...props}>
//     <TextInput label="Search" source="Translate[0].DisplayName" alwaysOn />
//
//   </Filter>
// );

const postDefaultValue = { Translations:[{LanguageCode:'cn'},{LanguageCode:'en'},{LanguageCode:'kr'}] };

export const MerchantCreate = (props) => (
  <Create  {...props} >
    <TabbedForm defaultValue={postDefaultValue}>
      <FormTab  label="1">
        <TextInput source="CompanyName" label="公司名"/>
        <DisplayNameInput/>
        <TextInput source="GSTNumber" label="GST号"/>
        <NumberInput source="MinimumOrder" label="最小订单"/>
        <NumberInput source="ShippingFee" label="运费"/>
        <NumberInput source="AverageDeliveryTime" label="平均送餐时间"/>
        <TextInput source="LogoURL" label="Logo"/>
        <TextInput source="FoodGradeImgURL" label="食品等级"/>
        <TextInput source="IncorporationImgURL" label="公司图片"/>
        <ReferenceInput label="分类" source="Categories[0].ID" reference="TopCategories" allowEmpty>
            <SelectInput />
        </ReferenceInput>
</FormTab >
      <FormTab  label="2">
        <TextInput source="Addresses[0].ContactPerson" label="联系人"/>
        <TextInput source="Addresses[0].Phone" label="手机"/>
        <TextInput source="Addresses[0].LocationID" label="LocationID"/>
        </FormTab>
        <FormTab  label="3">

        <WorkingHourInput/>
</FormTab>
      <FormTab  label="4">
       <TranslateInput/>
      </FormTab>

    </TabbedForm>
  </Create>
);

export const MerchantEdit = (props) => (
  <Edit {...props} title='修改'>
    <TabbedForm defaultValue={postDefaultValue}>
      <FormTab  label="1">
        <DisabledInput label="Id" source="id" />
        <TextInput source="CompanyName" label="公司名"/>
        <DisplayNameInput/>
        <TextInput source="GSTNumber" label="GST号"/>
        <NumberInput source="MinimumOrder" label="最小订单"/>
        <NumberInput source="ShippingFee" label="运费"/>
        <NumberInput source="AverageDeliveryTime" label="平均送餐时间"/>
        <TextInput source="LogoURL" label="Logo"/>
        <TextInput source="FoodGradeImgURL" label="食品等级"/>
        <TextInput source="IncorporationImgURL" label="公司图片"/>
        <ReferenceInput label="分类" source="Categories[0].ID" reference="TopCategories" >
          <SelectInput />
        </ReferenceInput>
      </FormTab >
      <FormTab  label="2">
        <TextInput source="Addresses[0].ContactPerson" label="联系人"/>
        <TextInput source="Addresses[0].Phone" label="手机"/>
        <TextInput source="Addresses[0].LocationID" label="LocationID"/>
      </FormTab>
      <FormTab  label="3">

        <WorkingHourInput/>
      </FormTab>
      <FormTab  label="4">
        <TranslateInput/>
      </FormTab>

    </TabbedForm>
  </Edit>
);


export const MerchantIcon = Icon;

export const Merchants = (props) => (
  <List {...props} title="店铺管理" filters={<PostFilter />}>
    <Datagrid>

      <TextField source="Translations[0].DisplayName" label="店铺名"/>
      <FunctionField source="Rating" render={record => `${record.Rating / 100}`} label="评分"/>
      <TextField source="MonthlySales" label="月销售"/>
      <EditButton />

      <LinkToRelatedCategories />
      <LinkToRelatedOrders />

    </Datagrid>
  </List>
);
export const Languages = (props) => (
  <List {...props} title="语言">
    <Datagrid>
      <TextField source="Name" />
      <TextField source="id" />

    </Datagrid>
  </List>
);

