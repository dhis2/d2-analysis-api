import {isString, isObject} from 'd2-utilizr';

export var Record;

Record = function(config) {
    var t = this;
    t.klass = Record;

    config = isObject(config) ? config : {};

    // constructor
    t.id = config.id;
    t.name = config.name;
};

Record.prototype.log = function(text, noError) {
    if (!noError) {
        console.log(text, this, config);
    }
};

Record.prototype.val = function(noError) {
    if (!isString(this.id)) {
        this.log('(Record) Id is not a string', noError);
        return null;
    }

    return this;
};
