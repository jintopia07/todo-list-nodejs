"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.deleteTodoById = deleteTodoById;
exports.findManyTodoList = findManyTodoList;
exports.findTodolistById = findTodolistById;
exports.updateTodoById = updateTodoById;
var _todo = require("../models/todo.model");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function createTodo(todoData) {
  var newTodo = new _todo.TodoModel(todoData);
  return newTodo.save();
}
function updateTodoById(id, todoData) {
  return _todo.TodoModel.findByIdAndUpdate(id, todoData);
}
function deleteTodoById(id) {
  return _todo.TodoModel.findByIdAndDelete(id);
}
function findManyTodoList(query) {
  var baseQuery = {};
  if (query.search) {
    baseQuery = _objectSpread(_objectSpread({}, baseQuery), {
      title: {
        $regex: new RegExp(query.search, 'i')
      }
    });
  }
  if (query.status) {
    baseQuery = _objectSpread(_objectSpread({}, baseQuery), {}, {
      status: query.status
    });
  }
  if (query.assignee) {
    baseQuery = _objectSpread(_objectSpread({}, baseQuery), {}, {
      assignee: query.assignee
    });
  }
  if (query.subscriberCounter) {
    baseQuery = _objectSpread(_objectSpread({}, baseQuery), {}, {
      subscriberCounter: query.subscriberCounter
    });
  }

  /* การใช้  or  เป็นเงื่อนไขที่ว่าค้นหาด้วยคำ "subscriberCounter" หรือ "condition" */

  if ((query === null || query === void 0 ? void 0 : query.condition) === 'or') {
    baseQuery = {
      $or: Object.entries(baseQuery).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return _defineProperty({}, key, value);
      })
    };
  }
  console.log({
    entries: Object.entries(baseQuery).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        value = _ref5[1];
      return _defineProperty({}, key, value);
    })
  });
  return _todo.TodoModel.find(baseQuery);
}
function findTodolistById(id) {
  return _todo.TodoModel.findById(id);
}