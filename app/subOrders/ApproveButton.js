import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';

class ApproveButton extends Component {
  handleClick = () => {
    const { push, record, showNotification } = this.props;
    const updatedRecord = { ...record, SubOrderStatus: 'AcceptedOrder' };
    console.log(updatedRecord)
    console.log("!!!!!!!")
    fetch('/SubOrders/'+record.ID, { method: 'PUT', body: JSON.stringify(updatedRecord),headers: {
      'Content-Type': 'application/json'
    },
    })
      .then(() => {
        showNotification('SubOrder approved');
        push('/SubOrders');
      })
      .catch((e) => {
        console.error(e);
        showNotification('Error: SubOrder not approved', 'warning')
      });
  }

  render() {
    return <button  onClick={this.handleClick}> approve</button>;
  }
}

ApproveButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction,
})(ApproveButton);
