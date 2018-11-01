'use strict';

const accounts = require('./accounts.js');
const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store')

const bookmark = {
  index(request, response) {
    const bookmarkId = request.params.id;
    logger.debug('Bookmark id = ', bookmarkId);
    const viewData = {
      title: 'Bookmark',
      bookmark: bookmarkStore.getBookmark(bookmarkId),
    };
    response.render('bookmark', viewData);
  },

  deleteWebsite(request, response) {
    const bookmarkId = request.params.id;
    const websiteId = request.params.websiteid;
    logger.debug(`Deleting Website ${websiteId} from Bookmark ${bookmarkId}`);
    bookmarkStore.removeWebsite(bookmarkId, websiteId);
    response.redirect('/bookmark/' + bookmarkId);
  },

  addWebsite(request, response) {
    const bookmarkId = request.params.id;
    const bookmark = bookmarkStore.getBookmark(bookmarkId);
    const newWebsite = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
      summary: request.body.summary,
    };
    bookmarkStore.addWebsite(bookmarkId, newWebsite);
    response.redirect('/bookmark/' + bookmarkId);
  },
};

module.exports = bookmark;
