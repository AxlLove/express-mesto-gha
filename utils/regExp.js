const emailRegExp = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
const urlRegExp = /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/i;

module.exports = { emailRegExp, urlRegExp };
