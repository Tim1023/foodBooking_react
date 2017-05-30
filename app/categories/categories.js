/**
 * Created by zhaodeyang on 9/03/17.
 */
import React from 'react';
import {Filter, List, Datagrid, TextField,FunctionField,ReferenceField ,TextInput, NumberInput, Create, SimpleForm, ReferenceInput,SelectInput,DisabledInput,EditButton,Edit} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/image/collections';
import LinkToRelatedProducts from './LinkToRelatedProducts'
const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />

  </Filter>
);

const styles = {

  hide: {
    display : 'none'

  }
};

export const CategoryCreate = (props) => (

  <Create {...props}>
    <SimpleForm>
      <TextInput source="OwnerType" defaultValue={'Merchant'} style={styles.hide}/>
      <ReferenceInput source='MerchantID' reference="Merchants" allowEmpty defaultValue={window.localStorage.getItem("MerchantID")}  style={styles.hide}>
        <SelectInput optionText="id" />
      </ReferenceInput>
      <NumberInput source="Ordering" />

      <TextInput source="Translations[0].LanguageCode" />
      <TextInput source="Translations[0].DisplayName" />
      <TextInput source="Translations[0].ImageURL" />
    </SimpleForm>
  </Create>
);
export const CategoryEdit = (props) => (

  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id"/>
        <TextInput source="OwnerType" defaultValue={'Merchant'} style={styles.hide}/>
        <ReferenceInput source='MerchantID' reference="Merchants" allowEmpty defaultValue={window.localStorage.getItem("MerchantID")}  style={styles.hide}>
          <SelectInput optionText="id" />
        </ReferenceInput>
        <NumberInput source="Ordering" />

        <TextInput source="Translations[0].LanguageCode" />
        <TextInput source="Translations[0].DisplayName" />
        <TextInput source="Translations[0].ImageURL" />
    </SimpleForm>
  </Edit>
);
export const CategoryIcon = Icon;

export const Categories = (props) => (
  <List {...props} title="分类管理" filters={<PostFilter />}>
    <Datagrid>
      <TextField source="Translations[0].DisplayName" label="分类名"  />
      <TextField source="OwnerType" label="OwnerType"  />
      <ReferenceField label="商铺" source="MerchantID" reference="Merchants">
        <TextField source="Translations[0].DisplayName" />
      </ReferenceField>
      <LinkToRelatedProducts/>
      <EditButton />

    </Datagrid>
  </List>
);
