/**
 * Created by zhaodeyang on 16/03/17.
 */
/**
 * Created by zhaodeyang on 9/03/17.
 */
import React from 'react';
import {
  Filter,
  List,
  Datagrid,
  ReferenceField,
  BooleanInput,
  TextField,
  FunctionField,
  TextInput,
  NumberInput,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DisabledInput,
  EditButton,
  Edit,
} from 'admin-on-rest/lib/mui';

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn/>

  </Filter>
);

const styles = {

  hide: {
    display: 'none'

  }
};
export const ProductCreate = (props) => (

  <Create {...props}>
    <SimpleForm>
      <TextInput source='MerchantID' defaultValue={window.localStorage.getItem("MerchantID")} style={styles.hide}/>
      <TextInput source='CategoryID' defaultValue={window.localStorage.getItem("CategoryID")} style={styles.hide}/>
      <TextInput source="Translations[0].DisplayName"/>
      <TextInput source="Translations[0].Description"/>
      <TextInput source="Translations[0].LanguageCode"/>

      <TextInput source="ImageURLs[0]"/>
      <NumberInput source="Price"/>
      <NumberInput source="AverageCookTime"/>
      <NumberInput source="Ordering"/>
      <BooleanInput source="Feature"/>


      <BooleanInput source="AttributeGroups[0].Multiple"/>
      <NumberInput source="AttributeGroups[0].Ordering"/>
      <TextInput source="AttributeGroups[0].Translations[0].DisplayName"/>
      <TextInput source="AttributeGroups[0].Translations[0].LanguageCode"/>

      <NumberInput source="AttributeGroups[0].Attributes[0].Price"/>
      <TextInput source="AttributeGroups[0].Attributes[0].Translations[0].DisplayName"/>
      <TextInput source="AttributeGroups[0].Attributes[0].Translations[0].LanguageCode"/>
    </SimpleForm>
  </Create>
);
export const ProductEdit = (props) => (

  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source='id'/>
      <TextInput source='MerchantID' defaultValue={window.localStorage.getItem("MerchantID")} style={styles.hide}/>
      <TextInput source='CategoryID' defaultValue={window.localStorage.getItem("CategoryID")} style={styles.hide}/>
      <TextInput source="Translations[0].DisplayName"/>
      <TextInput source="Translations[0].Description"/>
      <TextInput source="Translations[0].LanguageCode"/>

      <TextInput source="ImageURLs[0]"/>
      <NumberInput source="Price"/>
      <NumberInput source="AverageCookTime"/>
      <NumberInput source="Ordering"/>
      <BooleanInput source="Feature"/>


      <BooleanInput source="AttributeGroups[0].Multiple"/>
      <NumberInput source="AttributeGroups[0].Ordering"/>
      <TextInput source="AttributeGroups[0].Translations[0].DisplayName"/>
      <TextInput source="AttributeGroups[0].Translations[0].LanguageCode"/>

      <NumberInput source="AttributeGroups[0].Attributes[0].Price"/>
      <TextInput source="AttributeGroups[0].Attributes[0].Translations[0].DisplayName"/>
      <TextInput source="AttributeGroups[0].Attributes[0].Translations[0].LanguageCode"/>
    </SimpleForm>
  </Edit>
);

export const Products = (props) => (
  <List {...props} title="商品管理" filters={<PostFilter />}>
    <Datagrid>
      <TextField source="Translations[0].DisplayName" label="商品名"/>
      <ReferenceField label="分类" source="CategoryID" reference="Categories">
        <TextField source="name"/>

      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);
