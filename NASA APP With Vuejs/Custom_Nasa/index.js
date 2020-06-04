const superagent = require('superagent');
const config = require('./config.json');
//
const fetch_pic = async (page_num) => {

    const Url_brows = `${config.url}Crab%Nebula&number=50`;
    try {
        const Response = await superagent.get(Url_brows);
        return Response.body;
    } catch (error) {
        return error;
    }
};

const search_pic = async (searck_key) => {

    const url_search = `${config.url}${searck_key}&number=50`;

    try {
        const searchList = await superagent.get(url_search);
        return searchList.body;
    } catch (error) {
        return error;
    }
};

// export these functions so they can be used
module.exports = {
    search_pic,
    fetch_pic
}
