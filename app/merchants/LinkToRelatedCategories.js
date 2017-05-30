/**
 * Created by zhaodeyang on 9/03/17.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { translate } from 'admin-on-rest';

import { CategoryIcon } from '../categories/categories';

const LinkToRelatedCategories = ({ record, translate }) => (
  <FlatButton
    primary
    label='管理'
    icon={<CategoryIcon />}
    containerElement={<Link to={{ pathname: "/Categories", query: { filter: JSON.stringify({MerchantID :record.id})}}} />}
  />
);
export default translate(LinkToRelatedCategories);
