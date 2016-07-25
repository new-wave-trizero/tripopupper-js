const $ = require('jquery');
import { API_URL } from './constants';

// noop
const noop = () => {};

// TODO: Maybe cache something...
// Fetch config from Tripopup API
export const fetchPopupConfig = (name, success = noop, fail = noop, always = noop) => (
  $.getJSON(`${API_URL}/popup/${name}`)
    .done(success)
    .fail(fail)
    .always(always)
);

// TODO: Maybe this can be a cool feature...
// {API_URL}/popup/{name} ---> X-VIEW-TOKEN (JWT <3) --->
//const notifyPopupViewed = PUT {API_URL}/popup/{name}/viewed;
