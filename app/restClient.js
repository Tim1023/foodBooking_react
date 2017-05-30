/**
 * Created by zhaodeyang on 8/03/17.
 */
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils,
} from 'admin-on-rest';

const API_URL = 'http://localhost:3000';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
  let url = '';
  const { queryParameters } = fetchUtils;
  const options = {};
  switch (type) {
    case GET_LIST: {
      console.log(params)

      if (resource == 'Merchants') {
        const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
        const query = {
          where: 'UserID = '+localStorage.getItem('userID'),
          // order: field + " " + order,
          offset: JSON.stringify((page - 1) * perPage),
          limit:perPage,
          // where: JSON.stringify(params.filter),
        };
        url = `${API_URL}/${resource}?${queryParameters(query)}`;
        console.log(url)

        break;
      }
      if (resource == 'Categories') {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        window.localStorage.setItem("MerchantID", params.filter.MerchantID);


        const query = {
          // order: field + " " + order,
          offset: JSON.stringify((page - 1) * perPage),
          limit: perPage,
          // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          where: 'MerchantID' + ' = ' + params.filter.MerchantID,
        };
          console.log(params.filter)

        url = `${API_URL}/${resource}?${queryParameters(query)}`;
        console.log(url)

        break;
      }
      if (resource == 'TopCategories') {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
          // order: field + " " + order,
          offset: JSON.stringify((page - 1) * perPage),
          limit: perPage,
          where: 'OwnerType = '+0
          // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        };
        console.log(params.filter)

        url = `${API_URL}/Categories?${queryParameters(query)}`;
        console.log(url)

        break;
      }
      if (resource == 'Languages') {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
          // order: field + " " + order,
          // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        };
console.log("ddd")
        url = `${API_URL}/Lang?${queryParameters(query)}`;
        console.log(url)

        break;
      }
      if (resource == 'Products') {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        window.localStorage.setItem("CategoryID", params.filter.CategoryID);


        const query = {
          // order: field + " " + order,
          offset: JSON.stringify((page - 1) * perPage),
          limit: perPage,
          // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          where: 'CategoryID' + ' = ' + params.filter.CategoryID,
        };
        console.log(params.filter)

        url = `${API_URL}/${resource}?${queryParameters(query)}`;
        console.log(url)

        break;
      }
      if (resource == 'SubOrders') {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        window.localStorage.setItem("MerchantID", params.filter.MerchantID);


        const query = {
          // order: field + " " + order,
          offset: JSON.stringify((page - 1) * perPage),
          limit: perPage,
          // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          where: 'MerchantID' + ' = ' + params.filter.MerchantID
        };
        console.log(params.filter)

        url = `${API_URL}/${resource}?${queryParameters(query)}`;
        console.log(url)

        break;
      }
    }
    case GET_ONE:
      url = `${API_URL}/${resource}?where = ${params.id}`;
      break;
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
      };
      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case UPDATE:
      url = `${API_URL}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${API_URL}/${resource}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${API_URL}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
  return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
  const { headers, json } = response;
  switch (type) {
    case GET_LIST:
      return {
        data: json.map(x =>  x ={...x,id:x.ID,name:x.hasOwnProperty('Translations')?x.Translations[0].DisplayName:x.Name}),
        total: parseInt(headers.get('x-total-count'), 10),
      }

      ;
    case CREATE:
      return { ...params.data, id: json.id };
    default:
      return json;
  }
};


/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;
  const { url, options } = convertRESTRequestToHTTP(type, resource, params);

  return fetchJson(url, options)
    .then(response => convertHTTPResponseToREST(response, type, resource, params));
};
