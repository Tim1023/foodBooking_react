import React from 'react';
import ReactDOM from 'react-dom';
import {GridList as MuiGridList, GridTile} from 'material-ui/GridList';
import {NumberField, EditButton} from 'admin-on-rest/lib/mui';
import moment from 'moment';
import 'moment/src/locale/zh-cn';
import ApproveButton from './ApproveButton';
import RejectedButton from './RejectedButton';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore((state = {}, action) => state);


//GET UNIQUE ARRAY WITH OBJECT ELEMENT
function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
moment.locale('zh-cn');

var comingOrder =[];

var streamData = [];
const styles = {
  root: {
    margin: '-2px',
  },
  gridList: {
    width: '100%',
    margin: 0,
  },
  gridTile: {
    height: '100%',
    width: '100%',
    background: 'yellow'
  }
};

var token = window.localStorage.getItem('userToken')
var id = window.localStorage.getItem('userID')


if (id) {
  console.log(token)
  // var EventSource = require('eventsource');
  // var eventSourceInitDict = {headers: {'Authorization': 'Bearer ' + token}};
  // const url = 'http://localhost:3000/room/xxx';
  // var es = new EventSource(url, eventSourceInitDict);
// var es = new EventSource(url);
//
//   es.onmessage = function (e) {
//     console.log(e);
//   };
//   es.onerror = function () {
//     console.log('ERROR!');
//   };
  var source = new EventSource("http://localhost:3000/room/" + window.localStorage.getItem('MerchantID'));

  source.addEventListener("event", function (e) {
    console.log("!1111")
    console.log(JSON.parse(e.data));
    streamData.push(JSON.parse(e.data));
    streamData = removeDuplicates(streamData, 'ID')
    console.log(streamData)

    // document.getElementById("result").innerHTML =
    //   '<MuiGridList cellHeight=240 cols=4 style=width:100%;margin: 0>'+
    //   streamData.map(subOrder =>
    //   '<div style=background-color:yellowgreen>' +
    //   subOrder.ID + "<br/>" + subOrder.SubOrderStatus)+
    //   '</div>'+
    //   '</MuiGridList>'
    //   "<br /><br /><br /><br /><br /><br /><br /><br />";
    streamData.map(function (item,index) {
      comingOrder.push(

        <div key={index} style={{float:'left'}}>
          <h1>Order</h1>
          {item.ID}
          <br/>
          {item.SubOrderStatus}
          <ApproveButton style={{ padding: 0 }} record={item}/>

        </div>
      )
      comingOrder=removeDuplicates(comingOrder,"key")
      console.log(comingOrder)
    })
    // function tick() {
    //   ReactDOM.render(
    //
    //     <Clock  />,
    //
    //     document.getElementById('result')
    //   );
    // }
    // tick()
    function Clock(props) {
      return (
        <div>

          {comingOrder}
        </div>
      );
    }


  });
  // source.onmessage = function (e) {
  //   console.log(e)
  //
  //   //called when data is provided without event name
  // }
  source.onopen = function (e) {
    console.log("listening")
    //called when socket is listening
  }
  source.onerror = function (e) {
    console.log(e)
  }


}

function Clock(props) {
  return (
    <div>

      {comingOrder}
    </div>
  );
}


const GridList = ({ids, isLoading, data, currentSort, basePath, rowStyle}) => (
  <div style={styles.root}>
    <Clock  />
    <MuiGridList cellHeight={280} cols={4} style={styles.gridList}>
      {ids.map((id) => (
        <GridTile
          key={id}
          title={moment(data[id].CreatedAt).fromNow()}

          actionIcon={<EditButton basePath={basePath} record={data[id]} label="修改"/>}

        >
          <div style={styles.gridTile}>
            <MuiGridList cols={6} cellHeight='auto'>
              <GridTile cols={2}>
                <div>
                  时间:
                </div>
              </GridTile>
              <GridTile cols={4}>
                <div>
                  {moment(data[id].CreatedAt).format('llll')}
                </div>
              </GridTile>
              <GridTile cols={2}>
                <div>
                  价格：
                </div>
              </GridTile>
              <GridTile cols={4}>
                <div>
                  ${data[id].SubtotalAmount / 100}
                </div>
              </GridTile>

              <GridTile cols={2}>
                <div>
                  外卖：
                </div>
              </GridTile>
              <GridTile cols={4}>
                <div>
                  {data[id].ShippingType}
                </div>
              </GridTile>
              <GridTile cols={2}>
                <div>
                  菜品：
                </div>
              </GridTile>
              <GridTile cols={4}>
                <div>
                  {data[id].Snapshot.Products.map(item=>item.Translations[0].DisplayName)}
                </div>
              </GridTile>
              <GridTile cols={2}>
                <div>
                  留言：
                </div>
              </GridTile>
              <GridTile cols={4}>
                <div>
                  {data[id].MessageToMerchant ? data[id].MessageToMerchant : '无'}
                </div>
              </GridTile>
              <GridTile cols={3}>
              <ApproveButton style={{ padding: 0 }} record={data[id]}/>
                </GridTile>
              <GridTile cols={3}>
                <RejectedButton style={{ padding: 0 }} record={data[id]}/>
              </GridTile>
            </MuiGridList>
          </div>
        </GridTile>
      ))}
    </MuiGridList>
  </div>
);

export default GridList;
