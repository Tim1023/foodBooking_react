/**
 * Created by zhaodeyang on 10/03/17.
 */
import React from 'react';
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { Merchants, MerchantIcon, MerchantCreate, MerchantEdit, Languages } from './merchants/merchants';
import { Categories, CategoryCreate,CategoryEdit } from './categories/categories';
import { Products, ProductCreate,ProductEdit } from './products/products';
import {SubOrders} from './subOrders/subOrder'
import Dashboard from './dashboard/Dashboard';
import authClient from './authClient';
import myApiRestClient from './restClient'
import { Delete } from 'admin-on-rest/lib/mui';

import Layout from './Layout'

const App = () => (
  <Admin
    restClient={myApiRestClient}
    authClient={authClient}
    title="商户平台"
    dashboard={Dashboard}
  >
    <Resource name="Merchants" list={Merchants} options={{ label: '我的店铺' }} icon={MerchantIcon} edit={MerchantEdit} create={MerchantCreate} remove={Delete}  />
    <Resource name="Categories" list={Categories} options={{ label: '分类' }}  create={CategoryCreate} edit={CategoryEdit} remove={Delete} />
    <Resource name="Products" list={Products} options={{ label: '产品' }} create={ProductCreate} edit={ProductEdit} remove={Delete}   />
    <Resource name="TopCategories" list={Categories} options={{ label: 'Top' }}   />
    <Resource name="Languages" list={Languages}   />
    <Resource name="SubOrders" list={SubOrders}   />

  </Admin>
);

export default App;
