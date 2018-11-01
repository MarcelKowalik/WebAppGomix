'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarkStore = {

  store: new JsonStore('./models/bookmark-store.json', { bookmarkCollection: [] }),
  collection: 'bookmarkCollection',

  getAllBookmarks() {
    return this.store.findAll(this.collection);
  },

  getBookmark(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBookmark(bookmark) {
    this.store.add(this.collection, bookmark);
  },

  removeBookmark(id) {
    const bookmark = this.getBookmark(id);
    this.store.remove(this.collection, bookmark);
  },

  removeAllBookmarks() {
    this.store.removeAll(this.collection);
  },

  addWebsite(id, website) {
    const bookmark = this.getBookmark(id);
    bookmark.websites.push(website);
  },
  
    getUserBookmarks(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeWebsite(id, websiteId) {
    const bookmark = this.getBookmark(id);
    const websites = bookmark.websites;
    _.remove(websites, { id: websiteId});
  },
};

module.exports = bookmarkStore;
