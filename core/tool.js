"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMembers = exports.objectMapToArray = exports.jsonToObject = exports.objectToJson = void 0;
const lodash_1 = require("lodash");
/**
 * 对象转字符串
 **/
function objectToJson(val) {
    if ((0, lodash_1.isArray)(val) || (0, lodash_1.isPlainObject)(val))
        return JSON.stringify(val);
    return val.toString();
}
exports.objectToJson = objectToJson;
/**
 * 字符串转对象
 **/
function jsonToObject(val) {
    try {
        return JSON.parse(val);
    }
    catch (e) {
        return val;
    }
}
exports.jsonToObject = jsonToObject;
/**
 * map对象转为数组
 **/
function objectMapToArray(map) {
    const array = [];
    for (const [key, value] of map.entries()) {
        array.push({
            label: value,
            value: key
        });
    }
}
exports.objectMapToArray = objectMapToArray;
/**
 * 遍历寻找成员方法
 */
function findMembers(instance, options) {
    function _find(instance) {
        if (instance.__proto__ === null)
            return [];
        // 获取自身属性
        let names = Reflect.ownKeys(instance);
        // 过滤
        names = names.filter((name) => _shouldKeep(name));
        return [...names, ..._find(instance.__proto__)];
    }
    // 过滤条件
    function _shouldKeep(value) {
        if (options.filter)
            if (options.filter(value))
                return true;
        if (options.prefix)
            if (value.startsWith(options.prefix))
                return true;
        if (options.specifiedType)
            if (instance[value] instanceof options.specifiedType)
                return true;
    }
    return _find(instance);
}
exports.findMembers = findMembers;
//# sourceMappingURL=tool.js.map