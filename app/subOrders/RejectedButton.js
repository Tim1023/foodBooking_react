import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';

class RejectedButton extends Component {
  handleClick = () => {
    const { push, record, showNotification } = this.props;
    const updatedRecord = { ...record, SubOrderStatus: 'RejectedOrder' };
    console.log(updatedRecord)
    fetch(`/SubOrders/${record.id}`, { method: 'PUT', body: JSON.stringify(updatedRecord),headers: {
      'Content-Type': 'application/json'
    },
    })
      .then(() => {
        showNotification('SubOrder rejected');
        push('/SubOrders');
      })
      .catch((e) => {
        console.error(e);
        showNotification('Error: SubOrder not rejected', 'warning')
      });
  }

  render() {
    return <FlatButton label="Reject" onClick={this.handleClick} />;
  }
}

RejectedButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction,
})(RejectedButton);
