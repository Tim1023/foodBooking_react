/**
 * Created by zhaodeyang on 17/03/17.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { translate } from 'admin-on-rest';


const LinkToRelatedProducts = ({ record, translate }) => (
  <FlatButton
    primary
    label='管理'
    containerElement={<Link to={{ pathname: "/Products", query: { filter: JSON.stringify({CategoryID :record.id})}}} />}
  />
);
export default translate(LinkToRelatedProducts);
