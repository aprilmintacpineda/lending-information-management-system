/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monthList = monthList;
exports.maxYear = maxYear;
exports.minYear = minYear;
exports.monthMaxdays = monthMaxdays;
exports.toFormalDateTime = toFormalDateTime;
exports.toFormalDate = toFormalDate;
exports.getFormalDueDate = getFormalDueDate;
exports.toUnixTimestamp = toUnixTimestamp;
exports.unixTimestampNow = unixTimestampNow;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function monthList() {
  return months;
}

function maxYear() {
  var date = new Date();
  return date.getFullYear() - 8;
}

function minYear() {
  var date = new Date();
  return date.getFullYear() - 100;
}

function monthMaxdays(month, year) {
  var date = new Date(year, months.indexOf(month) + 1, 0);
  return date.getDate();
}

function toFormalDateTime(timestamp) {
  var date = new Date(timestamp);

  var hours_raw = date.getHours();
  var notation = hours_raw >= 12 ? 'PM' : 'AM';

  var minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + ((hours_raw + 11) % 12 + 1) + ':' + minutes + ' ' + notation;
}

function toFormalDate(timestamp) {
  var date = new Date(timestamp);
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function getFormalDueDate(loan) {
  var date = void 0;

  if (loan.loan_payments.length) {
    date = new Date(loan.loan_payments[0].date_paid);
  } else {
    date = new Date(loan.loan_date);
  }

  if (loan.payment_method == 2) {
    // semi monthly
    date = new Date(date.getTime() + 1296000000);
  } else if (loan.payment_method == 1) {
    // monthly
    date = new Date(months[date.getMonth() + 1] + ' ' + date.getDate() + ', ' + date.getFullYear());
  } else {
    // daily
    date = new Date(date.getTime() + 86400000);
  }

  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function toUnixTimestamp(timestamp) {
  var date = new Date(timestamp);
  return Math.floor(date.getTime() / 1000);
}

function unixTimestampNow() {
  return Math.floor(Date.now() / 1000);
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCssTransitionGroup = __webpack_require__(16);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Sidebar = __webpack_require__(59);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithSidebar = function (_Component) {
  _inherits(WithSidebar, _Component);

  function WithSidebar() {
    _classCallCheck(this, WithSidebar);

    return _possibleConstructorReturn(this, (WithSidebar.__proto__ || Object.getPrototypeOf(WithSidebar)).apply(this, arguments));
  }

  _createClass(WithSidebar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className ? 'default-content-wrapper with-sidebar ' + this.props.className : 'default-content-wrapper with-sidebar' },
        _react2.default.createElement(_Sidebar2.default, { onLink: this.props.onLink }),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: 'view',
            transitionAppear: true,
            transitionAppearTimeout: 350,
            transitionEnterTimeout: 350,
            transitionLeaveTimeout: 350 },
          _react2.default.createElement(
            'div',
            { className: 'side-contents' },
            this.props.children
          )
        )
      );
    }
  }]);

  return WithSidebar;
}(_react.Component);

WithSidebar.propTypes = {
  className: _propTypes2.default.string,
  onLink: _propTypes2.default.string,
  children: function children(props, propName, componentName) {
    if (props[propName].constructor !== Array && props[propName].constructor !== Object) {
      console.error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Expecting Array or a single element. Type of ' + _typeof(props[propName]) + ' given.');
    }
  }
};
exports.default = WithSidebar;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithIcon = function (_Component) {
  _inherits(WithIcon, _Component);

  function WithIcon() {
    _classCallCheck(this, WithIcon);

    return _possibleConstructorReturn(this, (WithIcon.__proto__ || Object.getPrototypeOf(WithIcon)).apply(this, arguments));
  }

  _createClass(WithIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'with-icon' },
        _react2.default.createElement('img', { src: this.props.icon }),
        this.props.children
      );
    }
  }]);

  return WithIcon;
}(_react.Component);

WithIcon.propTypes = {
  children: _propTypes2.default.element.isRequired,
  icon: _propTypes2.default.string.isRequired
};
exports.default = WithIcon;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currency = currency;
exports.comma = comma;
function currency(value) {
  return Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function comma(value) {
  return Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputButton = function (_Component) {
  _inherits(InputButton, _Component);

  function InputButton() {
    _classCallCheck(this, InputButton);

    return _possibleConstructorReturn(this, (InputButton.__proto__ || Object.getPrototypeOf(InputButton)).apply(this, arguments));
  }

  _createClass(InputButton, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var errors = this.props.errors ? this.props.errors.map(function (error, index) {
        return _react2.default.createElement(
          'p',
          { className: 'errors', key: index },
          error
        );
      }) : null;

      return _react2.default.createElement(
        'div',
        { className: this.props.className ? 'input-button-wrapper ' + this.props.className : 'input-button-wrapper' },
        this.props.sending ? _react2.default.createElement(
          'div',
          {
            className: this.props.disabled ? 'btn-submit-default icon-active disabled' : 'btn-submit-default icon-active',
            onClick: function onClick() {
              return !_this2.props.disabled ? _this2.props.onClick() : false;
            } },
          _react2.default.createElement(
            'div',
            { className: 'sending' },
            _react2.default.createElement('img', { src: _path2.default.join(_electron.remote.app.getAppPath(), 'app/images/processing.gif') })
          ),
          this.props.value
        ) : _react2.default.createElement(
          'div',
          {
            className: this.props.disabled ? 'btn-submit-default disabled' : 'btn-submit-default',
            onClick: function onClick() {
              return !_this2.props.disabled ? _this2.props.onClick() : false;
            } },
          this.props.value
        ),
        _react2.default.createElement(
          'div',
          { className: 'error-list' },
          errors
        )
      );
    }
  }]);

  return InputButton;
}(_react.Component);

InputButton.propTypes = {
  value: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  sending: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  errors: _propTypes2.default.array.isRequired,
  className: _propTypes2.default.string
};
exports.default = InputButton;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _electron = __webpack_require__(2);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


var InputText = function (_Component) {
  _inherits(InputText, _Component);

  function InputText(props) {
    _classCallCheck(this, InputText);

    var _this = _possibleConstructorReturn(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(InputText, [{
    key: 'handleChange',
    value: function handleChange(changeEvent) {
      var value = changeEvent.target.value;

      if (this.props.numberOnly !== undefined) {
        if (value.length) {
          if (!isNaN(value) && value > 0) {
            this.props.onChange(value);
          }
        } else {
          this.props.onChange(value);
        }
      } else if (this.props.numberOnly === undefined) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var app_path = _electron.remote.app.getAppPath();

      var errors = this.props.errors.map(function (error, index) {
        return _react2.default.createElement(
          _WithIcon2.default,
          { icon: _path2.default.join(app_path, 'app/images/cross.png'), key: index },
          _react2.default.createElement(
            'p',
            { className: 'errors' },
            error
          )
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'input-area-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'input-type-box' },
          _react2.default.createElement('input', {
            disabled: this.props.disabled,
            className: this.props.className && this.props.className.length ? 'input-text-default ' + this.props.className : 'input-text-default',
            maxLength: this.props.maxlength ? this.props.maxlength : false,
            ref: 'input',
            type: this.props.password ? 'password' : 'text',
            value: this.props.value,
            onChange: this.handleChange,
            placeholder: this.props.placeholder }),
          this.props.children !== undefined ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('br', null),
            this.props.children
          ) : null
        ),
        this.props.errors.length ? _react2.default.createElement(
          'div',
          { className: 'error-list' },
          errors
        ) : null
      );
    }
  }]);

  return InputText;
}(_react.Component);

InputText.propTypes = {
  value: function value(props, propName, componentName) {
    if (props[propName] === undefined) {
      console.error('Prop `' + propName + '` is required at ' + ' `' + componentName);
    }
  },
  className: _propTypes2.default.string,
  placeholder: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  errors: _propTypes2.default.array.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  maxlength: _propTypes2.default.number,
  children: _propTypes2.default.element,
  password: _propTypes2.default.bool,
  numberOnly: _propTypes2.default.bool
};
exports.default = InputText;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputSelect = function (_Component) {
  _inherits(InputSelect, _Component);

  function InputSelect() {
    _classCallCheck(this, InputSelect);

    return _possibleConstructorReturn(this, (InputSelect.__proto__ || Object.getPrototypeOf(InputSelect)).apply(this, arguments));
  }

  _createClass(InputSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var errors = this.props.errors ? this.props.errors.map(function (error, index) {
        return _react2.default.createElement(
          'p',
          { className: 'errors', key: index },
          error
        );
      }) : null;

      return _react2.default.createElement(
        'div',
        { className: 'input-area-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'input-select-box' },
          _react2.default.createElement(
            'select',
            {
              value: this.props.value,
              disabled: this.props.disabled,
              className: this.props.className ? 'input-select-default ' + this.props.className : 'input-select-default',
              onChange: function onChange(event) {
                return _this2.props.onChange(event.target.value);
              } },
            this.props.children
          )
        ),
        this.props.errors.length ? _react2.default.createElement(
          'div',
          { className: 'error-list' },
          errors
        ) : null
      );
    }
  }]);

  return InputSelect;
}(_react.Component);

InputSelect.propTypes = {
  value: function value(props, propName, componentName) {
    if (props[propName] == undefined || props[propName].constructor !== Number && props[propName].constructor !== String) {
      console.error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Expecting String or number. Type of ' + _typeof(props[propName]) + ' given.');
    }
  },
  onChange: _propTypes2.default.func.isRequired,
  errors: _propTypes2.default.array.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  className: _propTypes2.default.string,
  children: function children(props, propName, componentName) {
    if (props[propName] == undefined || props[propName].constructor !== Array && props[propName].constructor !== Object) {
      console.error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Expecting Array or a single element. Type of ' + _typeof(props[propName]) + ' given.');
    }
  }
};
exports.default = InputSelect;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAddress = validateAddress;
exports.validateAmount = validateAmount;
exports.validateRemarks = validateRemarks;
exports.validateAmountPaid = validateAmountPaid;
exports.validatePhoneNumber = validatePhoneNumber;
exports.validatePaymentMethod = validatePaymentMethod;
exports.validateInterestRate = validateInterestRate;
exports.validateMonthsToPay = validateMonthsToPay;
exports.validateAmountLoan = validateAmountLoan;
exports.validateBirthdates = validateBirthdates;
exports.validateLoanDate = validateLoanDate;
exports.isValidDate = isValidDate;
exports.validateGender = validateGender;
exports.validateName = validateName;
exports.validatePasswords = validatePasswords;
exports.validatePasswordAgain = validatePasswordAgain;
exports.validatePassword = validatePassword;

var _DateTime = __webpack_require__(3);

/**
 * valdiates address
 */

function validateAddress(value) {
  var errors = [];

  if (!value.length) {
    errors.push('Address is required.');
  }

  return errors;
}

/**
 * validates the amount
 */
function validateAmount(value, payment_type) {
  var errors = [];

  if (!value.length) {
    errors.push('Amount is required.');
  } else if (isNaN(value) || Number(value) <= 0) {
    errors.push('Invalid amount.');
  }

  return errors;
}

/**
 * validates the remarks
 */
function validateRemarks(value, payment_type) {
  var errors = [];

  if (!value.length) {
    errors.push('Remarks is required.');
  }

  return errors;
}

/**
 * validates the amount paid
 */
function validateAmountPaid(value, payment_type) {
  var errors = [];

  if (isNaN(value) || Number(value) <= 0) {
    errors.push('Invalid amount paid.');
  }

  return errors;
}

/**
 * validates phone number
 */
function validatePhoneNumber(phone_number) {
  var errors = [];

  if (isNaN(phone_number)) {
    errors.push('Invalid phone number.');
  }

  return errors;
}

/**
 * validates mode of payments
 * @param  value, number
 * @return array errors
 *
 * 1 = monthly
 * 2 = semi-monthly
 * 3 = daily
 */
function validatePaymentMethod(value) {
  var errors = [];

  if (value < 1 || value > 4) {
    errors.push('Invalid payment method.');
  }

  return errors;
}

/**
 * validates interest rate
 * @param  value, number
 * @return array errors
 */
function validateInterestRate(value) {
  var errors = [];

  if (isNaN(value) || Number(value) <= 0) {
    errors.push('Invalid interest rate.');
  }

  return errors;
}

/**
 * validates months to pay
 * @param  value, number
 * @return array, errors
 */
function validateMonthsToPay(value) {
  var errors = [];

  if (isNaN(value) || Number(value) <= 0) {
    errors.push('Invalid months to pay.');
  }

  return errors;
}

/**
 * validates the amount of loan
 * @param  value, number
 * @return array, errors
 */
function validateAmountLoan(value) {
  var errors = [];

  if (isNaN(value) || Number(value) <= 0) {
    errors.push('Invalid loan amount.');
  }

  return errors;
}

/**
 * validates the birthdate
 * @param  str month, int date, int year
 * @return array      error list
 */
function validateBirthdates(month, date, year) {
  var max_days_in_month = (0, _DateTime.monthMaxdays)(month, year);
  var month_list = (0, _DateTime.monthList)();
  var max_year = (0, _DateTime.maxYear)();
  var min_year = (0, _DateTime.minYear)();
  var errors = [];

  if (date > max_days_in_month || month_list.indexOf(month) < 0 || isNaN(year) || isNaN(date) || year > max_year || year < min_year) {
    return false;
  }

  return errors;
}

/**
 * validates the loan date
 * @param  str month, int date, int year
 * @return array      error list
 */
function validateLoanDate(month, date, year) {
  var errors = [];

  if (!isValidDate(month, date, year)) {
    errors.push('Invalid loan date.');
  }

  return errors;
}

/**
 * validates the birthdate
 * @param  str month, int date, int year
 * @return array      error list
 */
function isValidDate(month, date, year) {
  var max_days_in_month = (0, _DateTime.monthMaxdays)(month, year);
  var month_list = (0, _DateTime.monthList)();

  if (date > max_days_in_month || month_list.indexOf(month) < 0 || isNaN(year) || isNaN(date)) {
    return false;
  }

  return true;
}

/**
 * validates gender, 1 = male, 0 = female
 * @param  integer gender
 * @return array      error list
 */
function validateGender(gender) {
  var errors = [];

  if (gender != 1 && gender != 0) {
    errors.push('Invalid gender.');
  }

  return errors;
}

/**
 * validates name
 * @param  string what name type, i.e. first name, middle name
 * @param  string name value
 * @return array      error list
 */
function validateName(what, name) {
  var errors = [],
      names = name.split(' '),
      excessiveSpaces = false,
      invalidName = false;

  if (!name.trim().length) {
    errors.push(what + ' is required.');
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var substr = _step.value;

        if (!substr.length || /( {2,})/.test(substr)) {
          if (!excessiveSpaces) {
            errors.push(what + ' contains excessive spaces.');
            excessiveSpaces = true;
          }
        } else if (!/^[a-zA-Z ]+$/.test(substr) || substr.length <= 1 || name.length > 50) {
          if (!invalidName) {
            errors.push(what + ' is invalid.');
            invalidName = true;
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return errors;
}

/**
 * validates password in accordance to password again
 * for sign up/registration only
 * @param  string password      value of password
 * @param  string passwordAgain value of password again
 * @return array               error list
 */
function validatePasswords(password, passwordAgain) {
  var errors = [];

  if (!password.trim().length && passwordAgain.trim().length || !password.trim().length) {
    errors.push('Password is required.');
  } else if (password.length < 6) {
    errors.push('Password is too weak.');
  } else if (password.length > 255) {
    errors.push('Password is too long.');
  } else if (password != passwordAgain) {
    errors.push('Passwords do not match.');
  }

  return errors;
}

/**
 * validate password again in accordance to password
 * for sign up/registration only
 * @param  string password      value of password
 * @param  string passwordAgain value of password again
 * @return array               error list
 */
function validatePasswordAgain(password, passwordAgain) {
  var errors = [];

  if (password.trim().length) {
    if (!passwordAgain.trim().length) {
      errors.push('Enter your password again.');
    } else if (password != passwordAgain) {
      errors.push('Passwords do not match.');
    }
  }

  return errors;
}

/**
 * validates password with no password again
 * @param  string password value of password
 * @return array          error list
 */
function validatePassword(password) {
  var errors = [];

  if (!password.trim().length) {
    errors.push('Password is required.');
  }

  return errors;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetch = fetch;
exports.reset = reset;
exports.togglePaymentForm = togglePaymentForm;
exports.changePaymentType = changePaymentType;
exports.changePeriodMonth = changePeriodMonth;
exports.changePeriodYear = changePeriodYear;
exports.changeAmountPaid = changeAmountPaid;
exports.changePaymentMonth = changePaymentMonth;
exports.changePaymentDate = changePaymentDate;
exports.changePaymentYear = changePaymentYear;
exports.makePayment = makePayment;
exports.toggleEditPaymentInformation = toggleEditPaymentInformation;
exports.editPaymentInformationAmount = editPaymentInformationAmount;
exports.editPaymentInformationPeriodYear = editPaymentInformationPeriodYear;
exports.editPaymentInformationPeriodMonth = editPaymentInformationPeriodMonth;
exports.editPaymentInformationPaymentType = editPaymentInformationPaymentType;
exports.editPaymentInformationPaymentYear = editPaymentInformationPaymentYear;
exports.editPaymentInformationPaymentDate = editPaymentInformationPaymentDate;
exports.editPaymentInformationPaymentMonth = editPaymentInformationPaymentMonth;
exports.editPaymentInformationSend = editPaymentInformationSend;
exports.toggleEditLoanInformation = toggleEditLoanInformation;
exports.editLoanInformationAmount = editLoanInformationAmount;
exports.editLoanInformationCondition = editLoanInformationCondition;
exports.editLoanInformationInterestRate = editLoanInformationInterestRate;
exports.editLoanInformationInterestType = editLoanInformationInterestType;
exports.editLoanInformationMonthsToPay = editLoanInformationMonthsToPay;
exports.editLoanInformationDateLoanMonth = editLoanInformationDateLoanMonth;
exports.editLoanInformationDateLoanDate = editLoanInformationDateLoanDate;
exports.editLoanInformationDateLoanYear = editLoanInformationDateLoanYear;
exports.editLoanInformatioPaymentMethod = editLoanInformatioPaymentMethod;
exports.editLoanInformatioSend = editLoanInformatioSend;
exports.togglePenaltyForm = togglePenaltyForm;
exports.changePenaltyFormAmount = changePenaltyFormAmount;
exports.changePenaltyFormRemarks = changePenaltyFormRemarks;
exports.changePenaltyDate = changePenaltyDate;
exports.changePenaltyMonth = changePenaltyMonth;
exports.changePenaltyYear = changePenaltyYear;
exports.createPenalty = createPenalty;
exports.togglePenaltyPaymentForm = togglePenaltyPaymentForm;
exports.changePenaltyPaymentFormAmount = changePenaltyPaymentFormAmount;
exports.changePenaltyPaymentFormMonth = changePenaltyPaymentFormMonth;
exports.changePenaltyPaymentFormDate = changePenaltyPaymentFormDate;
exports.changePenaltyPaymentFormYear = changePenaltyPaymentFormYear;
exports.submitPenaltyPaymentForm = submitPenaltyPaymentForm;
exports.togglePenaltyEdit = togglePenaltyEdit;
exports.changePenaltyEditAmount = changePenaltyEditAmount;
exports.changePenaltyEditMonth = changePenaltyEditMonth;
exports.changePenaltyEditDate = changePenaltyEditDate;
exports.changePenaltyEditYear = changePenaltyEditYear;
exports.changePenaltyEditRemarks = changePenaltyEditRemarks;
exports.savePenaltyEdit = savePenaltyEdit;
exports.togglePenaltyPaymentEdit = togglePenaltyPaymentEdit;
exports.changePenaltyPaymentEditAmount = changePenaltyPaymentEditAmount;
exports.changePenaltyPaymentEditDate = changePenaltyPaymentEditDate;
exports.changePenaltyPaymentEditYear = changePenaltyPaymentEditYear;
exports.changePenaltyPaymentEditMonth = changePenaltyPaymentEditMonth;
exports.changePenaltyPaymentEditSave = changePenaltyPaymentEditSave;
exports.putHash = putHash;
exports.removeHash = removeHash;
exports.wavePenaltyToggle = wavePenaltyToggle;
exports.wavePenaltyChangeRemarks = wavePenaltyChangeRemarks;
exports.wavePenaltySubmit = wavePenaltySubmit;
exports.editLoanInformationDateOfPaymentMonth = editLoanInformationDateOfPaymentMonth;
exports.editLoanInformationDateOfPaymentDate = editLoanInformationDateOfPaymentDate;
exports.editLoanInformationDateOfPaymentYear = editLoanInformationDateOfPaymentYear;
function fetch(id) {
  return {
    type: '_BORROWER_PROFILE_FETCH',
    id: id
  };
}

function reset() {
  return {
    type: 'BORROWER_PROFILE_RESET'
  };
}

function togglePaymentForm(visibility, index) {
  return {
    type: 'BORROWER_PROFILE_TPF',
    visibility: visibility,
    index: index
  };
}

function changePaymentType(payment_type, index) {
  return {
    type: 'BORROWER_PROFILE_CPT',
    payment_type: payment_type,
    index: index
  };
}

function changePeriodMonth(month, index) {
  return {
    type: 'BORROWER_PROFILE_CPM',
    month: month,
    index: index
  };
}

function changePeriodYear(year, index) {
  return {
    type: 'BORROWER_PROFILE_CPY',
    year: year,
    index: index
  };
}

function changeAmountPaid(value, index) {
  return {
    type: 'BORROWER_PROFILE_CAP',
    value: value,
    index: index
  };
}

function changePaymentMonth(value, index) {
  return {
    type: 'BORROWER_PROFILE_CPDM',
    index: index,
    value: value
  };
}

function changePaymentDate(value, index) {
  return {
    type: 'BORROWER_PROFILE_CPDD',
    index: index,
    value: value
  };
}

function changePaymentYear(value, index) {
  return {
    type: 'BORROWER_PROFILE_CPDY',
    index: index,
    value: value
  };
}

function makePayment(fields, index) {
  return _extends({
    type: '_BORROWER_PROFILE_SEND_PAYMENT'
  }, fields, {
    index: index
  });
}

function toggleEditPaymentInformation(visibility, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPI',
    payment_index: payment_index,
    loan_index: loan_index,
    visibility: visibility
  };
}

function editPaymentInformationAmount(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIA',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationPeriodYear(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPY',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationPeriodMonth(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPM',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationPaymentType(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPT',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationPaymentYear(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPDY',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationPaymentDate(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPDD',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationPaymentMonth(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPDM',
    value: value,
    payment_index: payment_index,
    loan_index: loan_index
  };
}

function editPaymentInformationSend(fields, payment_index, loan_index) {
  return _extends({
    type: '_BORROWER_PROFILE_EPI_SEND'
  }, fields, {
    payment_index: payment_index,
    loan_index: loan_index
  });
}

function toggleEditLoanInformation(visibility, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIT',
    visibility: visibility,
    loan_index: loan_index
  };
}

function editLoanInformationAmount(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIA',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationCondition(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIC',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationInterestRate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIIR',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationInterestType(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIIT',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationMonthsToPay(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIMTP',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationDateLoanMonth(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIDLM',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationDateLoanDate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIDLD',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationDateLoanYear(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIDY',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformatioPaymentMethod(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIPM',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformatioSend(fields, loan_index) {
  return _extends({
    type: '_BORROWER_PROFILE_ELI_SEND'
  }, fields, {
    loan_index: loan_index
  });
}

function togglePenaltyForm(visibility, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_TOGGLE',
    visibility: visibility,
    loan_index: loan_index
  };
}

function changePenaltyFormAmount(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_AMOUNT',
    value: value,
    loan_index: loan_index
  };
}

function changePenaltyFormRemarks(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_REMARKS',
    value: value,
    loan_index: loan_index
  };
}

function changePenaltyDate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_DATE',
    value: value,
    loan_index: loan_index
  };
}

function changePenaltyMonth(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_MONTH',
    value: value,
    loan_index: loan_index
  };
}

function changePenaltyYear(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_YEAR',
    value: value,
    loan_index: loan_index
  };
}

function createPenalty(fields, loan_index) {
  return _extends({
    type: '_BORROWER_PROFILE_PENALTYFIELD_CREATE'
  }, fields, {
    loan_index: loan_index
  });
}

function togglePenaltyPaymentForm(visibility, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_TOGGLE',
    visibility: visibility,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentFormAmount(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_AMOUNT',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentFormMonth(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_MONTH',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentFormDate(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_DATE',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentFormYear(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_YEAR',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function submitPenaltyPaymentForm(fields, penalty_index, loan_index) {
  return _extends({
    type: '_BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE'
  }, fields, {
    penalty_index: penalty_index,
    loan_index: loan_index
  });
}

function togglePenaltyEdit(visibility, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_TOGGLE',
    visibility: visibility,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyEditAmount(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_AMOUNT',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyEditMonth(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_MONTH',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyEditDate(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_DATE',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyEditYear(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_YEAR',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyEditRemarks(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_REMARKS',
    value: value,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function savePenaltyEdit(fields, penalty_index, loan_index) {
  return _extends({
    type: '_BORROWER_PROFILE_EDITPENALTYFORM_SAVE'
  }, fields, {
    penalty_index: penalty_index,
    loan_index: loan_index
  });
}

function togglePenaltyPaymentEdit(visibility, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT',
    visibility: visibility,
    penalty_payment_index: penalty_payment_index,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentEditAmount(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_AMOUNT',
    value: value,
    penalty_payment_index: penalty_payment_index,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentEditDate(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_DATE',
    value: value,
    penalty_payment_index: penalty_payment_index,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}
function changePenaltyPaymentEditYear(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_YEAR',
    value: value,
    penalty_payment_index: penalty_payment_index,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentEditMonth(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_MONTH',
    value: value,
    penalty_payment_index: penalty_payment_index,
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function changePenaltyPaymentEditSave(fields, penalty_payment_index, penalty_index, loan_index) {
  return _extends({
    type: '_BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE'
  }, fields, {
    penalty_payment_index: penalty_payment_index,
    penalty_index: penalty_index,
    loan_index: loan_index
  });
}

function putHash(target, parent) {
  return {
    type: 'BORROWER_PROFILE_HASH_PUT',
    value: target,
    parent: parent
  };
}

function removeHash(value) {
  return {
    type: 'BORROWER_PROFILE_HASH_REMOVE'
  };
}

function wavePenaltyToggle(penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_WAVE_PENALTY_TOGGLE',
    penalty_index: penalty_index,
    loan_index: loan_index
  };
}

function wavePenaltyChangeRemarks(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_WAVE_PENALTY_CHANGE_REMARKS',
    penalty_index: penalty_index,
    loan_index: loan_index,
    value: value
  };
}

function wavePenaltySubmit(penalty_id, penalty_index, loan_index, wave_remarks) {
  return {
    type: '_BORROWER_PROFILE_WAVE_SUBMIT',
    penalty_id: penalty_id,
    penalty_index: penalty_index,
    loan_index: loan_index,
    wave_remarks: wave_remarks
  };
}

function editLoanInformationDateOfPaymentMonth(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_CHANGE_DOP_MONTH',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationDateOfPaymentDate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_CHANGE_DOP_DATE',
    value: value,
    loan_index: loan_index
  };
}

function editLoanInformationDateOfPaymentYear(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_CHANGE_DOP_YEAR',
    value: value,
    loan_index: loan_index
  };
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ucfirst = ucfirst;
exports.ucwords = ucwords;
function ucfirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function ucwords(value) {
  var result = '';
  var words = value.split(' ');

  words.forEach(function (word, index) {
    result += ucfirst(word);

    if (index < words.length - 1) {
      result += ' ';
    }
  });

  return result;
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-addons-css-transition-group");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserCredebility = checkUserCredebility;
exports.loggedIn = loggedIn;
exports.logout = logout;
exports.getUserData = getUserData;
function checkUserCredebility() {
  return {
    type: '_SESSION_CHECK'
  };
}

function loggedIn(user_data) {
  return {
    type: 'SESSION_LOGGED_IN',
    user_data: user_data
  };
}

function logout() {
  return {
    type: 'SESSION_CLEAR'
  };
}

function getUserData() {
  return {
    type: '_SESSION_GET_USER_DATA'
  };
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithLabel = function (_Component) {
  _inherits(WithLabel, _Component);

  function WithLabel() {
    _classCallCheck(this, WithLabel);

    return _possibleConstructorReturn(this, (WithLabel.__proto__ || Object.getPrototypeOf(WithLabel)).apply(this, arguments));
  }

  _createClass(WithLabel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'with-label' },
        _react2.default.createElement(
          'span',
          { className: 'label' },
          this.props.label
        ),
        this.props.children
      );
    }
  }]);

  return WithLabel;
}(_react.Component);

WithLabel.propTypes = {
  children: _propTypes2.default.element.isRequired,
  label: _propTypes2.default.string.isRequired
};
exports.default = WithLabel;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: null,
  backend: {
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
function fetch(id) {
  return {
    type: '_LOANREPORTS_INITIAL_FETCH',
    id: id
  };
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeFirstname = changeFirstname;
exports.changeMiddlename = changeMiddlename;
exports.changeSurname = changeSurname;
exports.changeGender = changeGender;
exports.changeBirthmonth = changeBirthmonth;
exports.changeBirthdate = changeBirthdate;
exports.changeBirthyear = changeBirthyear;
exports.changePassword = changePassword;
exports.changeConfirmPassword = changeConfirmPassword;
exports.submit = submit;
function changeFirstname(value) {
  return {
    type: 'SETUP_CFN',
    value: value
  };
}

function changeMiddlename(value) {
  return {
    type: 'SETUP_CMN',
    value: value
  };
}

function changeSurname(value) {
  return {
    type: 'SETUP_CSN',
    value: value
  };
}

function changeGender(value) {
  return {
    type: 'SETUP_CG',
    value: value
  };
}

function changeBirthmonth(value) {
  return {
    type: 'SETUP_CBDM',
    value: value
  };
}

function changeBirthdate(value) {
  return {
    type: 'SETUP_CBDD',
    value: value
  };
}

function changeBirthyear(value) {
  return {
    type: 'SETUP_CBDY',
    value: value
  };
}

function changePassword(value) {
  return {
    type: 'SETUP_CPW',
    value: value
  };
}

function changeConfirmPassword(value) {
  return {
    type: 'SETUP_CCPW',
    value: value
  };
}

function submit(setup) {
  return {
    type: '_SETUP_SUBMIT',
    setup: setup
  };
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
function fetch(id) {
  return {
    type: '_BORROWERREPORTS_INITIAL_FETCH',
    id: id
  };
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayTextBox = function (_Component) {
  _inherits(DisplayTextBox, _Component);

  function DisplayTextBox() {
    _classCallCheck(this, DisplayTextBox);

    return _possibleConstructorReturn(this, (DisplayTextBox.__proto__ || Object.getPrototypeOf(DisplayTextBox)).apply(this, arguments));
  }

  _createClass(DisplayTextBox, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'input-area-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'input-type-box' },
          _react2.default.createElement('input', {
            className: 'input-text-default',
            value: this.props.value,
            readOnly: true })
        )
      );
    }
  }]);

  return DisplayTextBox;
}(_react.Component);

DisplayTextBox.propTypes = {
  value: function value(props, propName, componentName) {
    if (props[propName] === undefined) {
      console.error('Prop `' + propName + '` is required at ' + ' `' + componentName);
    }
  }
};
exports.default = DisplayTextBox;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeInterestPercentage = computeInterestPercentage;
exports.computeProfit = computeProfit;
exports.computeInterest = computeInterest;
exports.computePerMonth = computePerMonth;
exports.computePerDay = computePerDay;
exports.computePerHalfMonth = computePerHalfMonth;
function computeInterestPercentage(interest_rate, interest_type) {
  if (interest_type != 'percentage') {
    return interest_rate;
  }

  // interest rate / 100
  return Number(interest_rate) / 100;
}

function computeProfit(computed_interest, months_to_pay) {
  // interest * months to pay
  return Number(computed_interest) * Number(months_to_pay);
}

function computeInterest(amount_loan, interest_percentage, interest_type, interest_rate) {
  if (interest_type == 'percentage') {
    // amount loan * interest percentage
    return Number(amount_loan) * Number(interest_percentage);
  }

  return Number(interest_rate);
}

function computePerMonth(condition, amount_loan, months_to_pay, computed_profit) {
  if (condition == 'interest-only' || condition == 'due-date-and-interest') {
    // per payment = (profit + loan amount) / months to pay
    return Number((Number(computed_profit) + Number(amount_loan)) / Number(months_to_pay));
  }

  return Number(amount_loan) / Number(months_to_pay);
}

function computePerDay(computed_per_month) {
  // monthly / 30
  return Number(computed_per_month) / 30;
}

function computePerHalfMonth(computed_per_month) {
  // monthly / 2
  return Number(computed_per_month) / 2;
}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(25);

var _electron = __webpack_require__(2);

var _catchee = __webpack_require__(61);

var _catchee2 = _interopRequireDefault(_catchee);

var _reducers = __webpack_require__(75);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// middlewares
exports.default = (0, _redux.compose)((0, _redux.applyMiddleware)(_catchee2.default))(_redux.createStore)(_reducers2.default);

// reducers

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
            value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


var About = function (_Component) {
            _inherits(About, _Component);

            function About() {
                        _classCallCheck(this, About);

                        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
            }

            _createClass(About, [{
                        key: 'render',
                        value: function render() {
                                    return _react2.default.createElement(
                                                _WithSidebar2.default,
                                                null,
                                                _react2.default.createElement(
                                                            'div',
                                                            { className: 'about-wrapper' },
                                                            _react2.default.createElement(
                                                                        'section',
                                                                        null,
                                                                        _react2.default.createElement(
                                                                                    'h1',
                                                                                    null,
                                                                                    'Lending Information Management System'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    '\xA9 April Mintac Pineda.'
                                                                        )
                                                            ),
                                                            _react2.default.createElement(
                                                                        'section',
                                                                        null,
                                                                        _react2.default.createElement(
                                                                                    'h1',
                                                                                    null,
                                                                                    'End-User License Agreement ("Agreement")'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'Last updated: September 1, 2017'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'Please read this End-user License Agreement ("Agreement") carefully.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Definition of terms'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'ul',
                                                                                    null,
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'Software'
                                                                                                ),
                                                                                                ', ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'the software'
                                                                                                ),
                                                                                                ', or ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'this software'
                                                                                                ),
                                                                                                ', in any case, refer to the ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'Lending Information Management System'
                                                                                                ),
                                                                                                '.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'You'
                                                                                                ),
                                                                                                ', in any case, refers to the ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'end user(s)'
                                                                                                ),
                                                                                                ' using the ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'Lending Information Management System'
                                                                                                ),
                                                                                                '.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'The developer'
                                                                                                ),
                                                                                                ', in any case, refers to ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'April Mintac Pineda'
                                                                                                ),
                                                                                                ', the person who developed the ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'Lending Information Management System'
                                                                                                ),
                                                                                                '.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'Device'
                                                                                                ),
                                                                                                ', in any case, refers to the computer/machine where you installed the ',
                                                                                                _react2.default.createElement(
                                                                                                            'u',
                                                                                                            null,
                                                                                                            'Lending Information Management System'
                                                                                                ),
                                                                                                '.'
                                                                                    )
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'Because you installed this software and by using this software, you agree to the following terms.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'If you do not agree to this EULA, do not use the software and remove the software and all its components.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'License'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'The developer, grants you a revocable, non\xADexclusive, non\xADtransferable, limited license to install and use the software solely for your lending business strictly in accordance with the terms of this Agreement.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Restrictions'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'You agree not to, and you will not permit others to:'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'ul',
                                                                                    null,
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                'License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the software or make the software available to any third party.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                'Modify the system or any of its source codes.'
                                                                                    )
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Modifications to the software'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'The developer reserves the right to modify, suspend or discontinue, temporarily or permanently, the software or any service to which it connects, with or without notice and without liability to you.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Term and termination'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'ul',
                                                                                    null,
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                'This Agreement shall remain in effect until terminated by you or by the developer.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                'The developer may, in his sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                'This Agreement will terminate immediately, without prior notice from the developer, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the software and all copies thereof from your mobile device or from your desktop.'
                                                                                    ),
                                                                                    _react2.default.createElement(
                                                                                                'li',
                                                                                                null,
                                                                                                'Upon termination of this Agreement, you shall cease all use of the software and delete all its copies and components from your device.'
                                                                                    )
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Severability'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Amendments to this Agreement'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'The developer reserves the right, at its sole discretion, to modify or replace this Agreement at any time. The developer will provide at least 10 days\' notice prior to any new terms taking effect.'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'h3',
                                                                                    null,
                                                                                    'Contact information'
                                                                        ),
                                                                        _react2.default.createElement(
                                                                                    'p',
                                                                                    null,
                                                                                    'If you have any questions about this agreement, please contact the developer.'
                                                                        )
                                                            )
                                                )
                                    );
                        }
            }]);

            return About;
}(_react.Component);

exports.default = About;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _session = __webpack_require__(17);

var actions = _interopRequireWildcard(_session);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// actions


var Main = function (_Component) {
  _inherits(Main, _Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
  }

  _createClass(Main, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.checkUserCredebility();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.session.accounts !== null) {
        if (!nextProps.session.accounts) {
          this.props.router.push('/setup');
        } else {
          this.props.router.push('/login');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'landing-wrapper default-content-wrapper' },
        _react2.default.createElement(
          'p',
          null,
          'Checking Session...'
        )
      );
    }
  }]);

  return Main;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    session: _extends({}, store.session)
  };
}, {
  checkUserCredebility: actions.checkUserCredebility
})(Main);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(2);

var _login = __webpack_require__(48);

var loginActions = _interopRequireWildcard(_login);

var _session = __webpack_require__(17);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// actions

// components


var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Login - LIMS';
      this.props.getUserData();
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      if (!this.props.login_info.password.errors.length) {
        this.props.login(this.props.login_info.password.value);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.login_info.backend.status == 'logged_in') {
        if (this.props.session.is_logged_in) {
          this.props.clearLogin();
          this.props.router.push('/dashboard');
        } else {
          this.props.loggedIn(false);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        'div',
        { className: 'login-wrapper default-content-wrapper' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit, method: 'post', action: '' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement('img', { className: 'profile-image', src: _path2.default.join(app_path, 'app/images/profile_avatar.jpg') })
            ),
            _react2.default.createElement(
              'li',
              null,
              this.props.session.user_data !== null ? _react2.default.createElement(
                'h1',
                null,
                this.props.session.user_data.firstname + ' ' + this.props.session.user_data.surname
              ) : _react2.default.createElement('img', { className: 'loading-form', src: _path2.default.join(app_path, 'app/images/processing-blue.gif') })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputText2.default, {
                password: true,
                value: this.props.login_info.password.value,
                placeholder: 'Admin password...',
                onChange: this.props.changePassword,
                errors: this.props.login_info.password.errors,
                disabled: this.props.login_info.backend.processing })
            ),
            this.props.login_info.backend.processing ? _react2.default.createElement(
              'li',
              { className: 'logging-in' },
              _react2.default.createElement('img', { src: _path2.default.join(app_path, 'app/images/processing-blue.gif') }),
              ' Verifying password...'
            ) : null
          )
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    session: _extends({}, store.session),
    login_info: _extends({}, store.login)
  };
}, {
  login: loginActions.login,
  changePassword: loginActions.changePassword,
  clearLogin: loginActions.clearLogin,
  getUserData: _session.getUserData,
  loggedIn: _session.loggedIn
})(Login);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(5);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _app = __webpack_require__(49);

var _session = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// actions


var Logout = function (_Component) {
  _inherits(Logout, _Component);

  function Logout(props) {
    _classCallCheck(this, Logout);

    return _possibleConstructorReturn(this, (Logout.__proto__ || Object.getPrototypeOf(Logout)).call(this, props));
  }

  _createClass(Logout, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Logged out - LIMS';
      this.props.logout();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'greet-wrapper default-content-wrapper' },
        _react2.default.createElement(
          'h1',
          null,
          'You have been logged out.'
        ),
        _react2.default.createElement(
          'div',
          { className: 'button' },
          _react2.default.createElement(
            'a',
            { onClick: function onClick() {
                return _this2.props.exitApp();
              } },
            'Exit application',
            _react2.default.createElement('span', { className: 'decor' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/login' },
            'Login again',
            _react2.default.createElement('span', { className: 'decor' })
          )
        )
      );
    }
  }]);

  return Logout;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(null, {
  exitApp: _app.exitApp,
  logout: _session.logout
})(Logout);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(5);

var _DateTime = __webpack_require__(3);

var _Strings = __webpack_require__(15);

var _setup = __webpack_require__(21);

var actions = _interopRequireWildcard(_setup);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputSelect = __webpack_require__(12);

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// helpers

// actions

// components


var Setup = function (_Component) {
  _inherits(Setup, _Component);

  function Setup(props) {
    _classCallCheck(this, Setup);

    var _this = _possibleConstructorReturn(this, (Setup.__proto__ || Object.getPrototypeOf(Setup)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Setup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Set up account information - LIMS';
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (event) event.preventDefault();
      this.props.router.push('/setup-password');
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var max_days_in_month = (0, _DateTime.monthMaxdays)(nextProps.setup.birth_date.month, nextProps.setup.birth_date.year);

      if (nextProps.setup.birth_date.date > max_days_in_month) {
        this.props.changeBirthdate('1');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'setup-wrapper default-content-wrapper' },
        _react2.default.createElement(
          'h1',
          null,
          'Hi there! It looks like this is your first time using this software. Let\'s setup your account.'
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit, action: '', method: 'post' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputText2.default, {
                value: this.props.setup.firstname.value,
                placeholder: 'Your first name...',
                onChange: function onChange(value) {
                  return _this2.props.changeFirstname((0, _Strings.ucfirst)(value));
                },
                errors: this.props.setup.firstname.errors,
                disabled: this.props.setup.backend.processing,
                maxlength: 50 })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputText2.default, {
                value: this.props.setup.middlename.value,
                placeholder: 'Your middle name...',
                onChange: function onChange(value) {
                  return _this2.props.changeMiddlename((0, _Strings.ucfirst)(value));
                },
                errors: this.props.setup.middlename.errors,
                disabled: this.props.setup.backend.processing,
                maxlength: 50 })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputText2.default, {
                value: this.props.setup.surname.value,
                placeholder: 'Your surname...',
                onChange: function onChange(value) {
                  return _this2.props.changeSurname((0, _Strings.ucfirst)(value));
                },
                errors: this.props.setup.surname.errors,
                disabled: this.props.setup.backend.processing,
                maxlength: 50 })
            ),
            _react2.default.createElement(
              'li',
              null,
              'I am a...',
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  onChange: this.props.changeGender,
                  value: this.props.setup.gender.value,
                  disabled: this.props.setup.backend.processing,
                  errors: this.props.setup.gender.errors },
                _react2.default.createElement(
                  'option',
                  { value: '1' },
                  'Male'
                ),
                _react2.default.createElement(
                  'option',
                  { value: '0' },
                  'Female'
                )
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'clear-floats' },
              'I was born on',
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  className: 'birth-date',
                  onChange: function onChange(value) {
                    return _this2.props.changeBirthmonth((0, _Strings.ucfirst)(value));
                  },
                  value: this.props.setup.birth_date.month,
                  disabled: this.props.setup.backend.processing,
                  errors: [] },
                (0, _DateTime.monthList)().map(function (month, index) {
                  return _react2.default.createElement(
                    'option',
                    { key: index },
                    month
                  );
                })
              ),
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  className: 'birth-date',
                  onChange: this.props.changeBirthdate,
                  value: this.props.setup.birth_date.date,
                  disabled: this.props.setup.backend.processing,
                  errors: [] },
                function () {
                  var months = (0, _DateTime.monthList)().map(function (month, index) {
                    return _react2.default.createElement(
                      'option',
                      { key: index },
                      month
                    );
                  });
                  var max_days_in_month = (0, _DateTime.monthMaxdays)(_this2.props.setup.birth_date.month, _this2.props.setup.birth_date.year);
                  var dates = [];

                  for (var a = 1; a <= max_days_in_month; a++) {
                    dates.push(_react2.default.createElement(
                      'option',
                      { key: a },
                      a
                    ));
                  }

                  return dates;
                }()
              ),
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  className: 'birth-date',
                  onChange: this.props.changeBirthyear,
                  value: this.props.setup.birth_date.year,
                  disabled: this.props.setup.backend.processing,
                  errors: [] },
                function () {
                  var years = [];
                  var min_year = (0, _DateTime.minYear)();
                  var max_year = (0, _DateTime.maxYear)();

                  for (var a = min_year; a <= max_year; a++) {
                    years.push(_react2.default.createElement(
                      'option',
                      { key: a },
                      a
                    ));
                  }

                  return years;
                }()
              ),
              this.props.setup.birth_date.errors.length ? _react2.default.createElement(
                'div',
                { className: 'error-list' },
                this.props.setup.birth_date.errors.map(function (error, index) {
                  return _react2.default.createElement(
                    'p',
                    { key: index },
                    error
                  );
                })
              ) : null
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputButton2.default, {
                value: 'Next',
                onClick: this.handleSubmit,
                sending: false,
                disabled: this.props.setup.firstname.value.length && this.props.setup.middlename.value.length && this.props.setup.surname.value.length && !this.props.setup.firstname.errors.length && !this.props.setup.middlename.errors.length && !this.props.setup.surname.errors.length && !this.props.setup.gender.errors.length ? false : true,
                errors: [] })
            )
          )
        )
      );
    }
  }]);

  return Setup;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    setup: _extends({}, store.setup)
  };
}, {
  changeFirstname: actions.changeFirstname,
  changeMiddlename: actions.changeMiddlename,
  changeSurname: actions.changeSurname,
  changeGender: actions.changeGender,
  changeBirthmonth: actions.changeBirthmonth,
  changeBirthdate: actions.changeBirthdate,
  changeBirthyear: actions.changeBirthyear
})(Setup);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(5);

var _Strings = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Welcome = function (_Component) {
  _inherits(Welcome, _Component);

  function Welcome(props) {
    _classCallCheck(this, Welcome);

    return _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this, props));
  }

  _createClass(Welcome, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Welcome ' + this.props.session.user_data.firstname + '! - LIMS';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'greet-wrapper default-content-wrapper' },
        _react2.default.createElement(
          'h1',
          null,
          'Hi ',
          this.props.session.user_data.firstname,
          '! Since this is your first time, I have logged you in automatically, but next time you will be required to log in so don\'t forget your password!'
        ),
        _react2.default.createElement(
          'div',
          { className: 'button' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/dashboard' },
            'To the dashboard',
            _react2.default.createElement('span', { className: 'decor' })
          )
        )
      );
    }
  }]);

  return Welcome;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    session: _extends({}, store.session)
  };
}, {})(Welcome);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetPassword = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _setup = __webpack_require__(21);

var setupActions = _interopRequireWildcard(_setup);

var _session = __webpack_require__(17);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

var _Strings = __webpack_require__(15);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// actions

// components

// helpers


var SetPassword = exports.SetPassword = function (_Component) {
  _inherits(SetPassword, _Component);

  function SetPassword(props) {
    _classCallCheck(this, SetPassword);

    var _this = _possibleConstructorReturn(this, (SetPassword.__proto__ || Object.getPrototypeOf(SetPassword)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(SetPassword, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Set password - LIMS';
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (event) event.preventDefault();

      return this.props.submit(this.props.setup);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.setup.backend.status == 'successful') {
        if (nextProps.session.is_logged_in) {
          nextProps.router.push('/welcome');
        } else {
          nextProps.loggedIn({
            firstname: (0, _Strings.ucfirst)(nextProps.setup.firstname.value),
            middlename: (0, _Strings.ucfirst)(nextProps.setup.middlename.value),
            surname: (0, _Strings.ucfirst)(nextProps.setup.surname.value),
            gender: nextProps.setup.gender.value,
            password: nextProps.setup.password.value,
            birth_date: {
              month: nextProps.setup.birth_date.month,
              date: nextProps.setup.birth_date.date,
              year: nextProps.setup.birth_date.year
            }
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'setup-wrapper default-content-wrapper' },
        _react2.default.createElement(
          'h1',
          null,
          'Set up a password'
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit, action: '', method: 'post' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputText2.default, {
                password: true,
                value: this.props.setup.password.value,
                placeholder: 'Desired password...',
                onChange: this.props.changePassword,
                errors: this.props.setup.password.errors,
                disabled: this.props.setup.backend.processing })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputText2.default, {
                password: true,
                value: this.props.setup.confirm_password.value,
                placeholder: 'Retype your password above...',
                onChange: this.props.changeConfirmPassword,
                errors: this.props.setup.confirm_password.errors,
                disabled: this.props.setup.backend.processing,
                maxlength: 50 })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(_InputButton2.default, {
                value: 'Create account',
                onClick: this.handleSubmit,
                sending: this.props.setup.backend.processing,
                disabled: !this.props.setup.password.value.length || !this.props.setup.confirm_password.value.length || this.props.setup.password.errors.length || this.props.setup.confirm_password.errors.length || this.props.setup.backend.processing ? true : false,
                errors: [this.props.setup.backend.message] })
            )
          )
        )
      );
    }
  }]);

  return SetPassword;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    setup: _extends({}, store.setup),
    session: _extends({}, store.session)
  };
}, {
  changePassword: setupActions.changePassword,
  changeConfirmPassword: setupActions.changeConfirmPassword,
  submit: setupActions.submit,
  loggedIn: _session.loggedIn
})(SetPassword);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _DateTime = __webpack_require__(3);

var _Numbers = __webpack_require__(8);

var _borrower_reports = __webpack_require__(22);

var reportsActions = _interopRequireWildcard(_borrower_reports);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// helpers

// actions


var BorrowerComprehensiveReport = function (_Component) {
  _inherits(BorrowerComprehensiveReport, _Component);

  function BorrowerComprehensiveReport(props) {
    _classCallCheck(this, BorrowerComprehensiveReport);

    var _this = _possibleConstructorReturn(this, (BorrowerComprehensiveReport.__proto__ || Object.getPrototypeOf(BorrowerComprehensiveReport)).call(this, props));

    _this.print = _this.print.bind(_this);
    return _this;
  }

  _createClass(BorrowerComprehensiveReport, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'print',
    value: function print() {
      window.print();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'report-container' },
          this.props.borrower.data ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'h1',
                null,
                'Borrower Comprehensive Report'
              ),
              _react2.default.createElement(
                'div',
                { className: 'borrower-info' },
                _react2.default.createElement(
                  'table',
                  { className: 'left short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Full Name'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.borrower.data.firstname,
                        ' ',
                        this.props.borrower.data.middlename,
                        ' ',
                        this.props.borrower.data.surname
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Sex'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.borrower.data.gender ? 'Male' : 'Female'
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Contact Numbers'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.borrower.data.contact_numbers.length ? this.props.borrower.data.contact_numbers.map(function (contact_number, contact_number_index) {
                          if (contact_number_index + 1 != _this2.props.borrower.data.contact_numbers.length) {
                            return contact_number.number + ', ';
                          } else {
                            return contact_number.number;
                          }
                        }) : 'No record.'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'right short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Date'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _DateTime.toFormalDate)(new Date())
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'body' },
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loans, Penalties, and Payments'
                ),
                this.props.borrower.data.loans.map(function (loan, loan_index) {
                  return _react2.default.createElement(
                    'section',
                    { key: loan_index },
                    _react2.default.createElement(
                      'table',
                      { className: 'short-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Loan Trace ID'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.id
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Fully paid'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.loan_summary.remaining_balance > 0 ? 'No' : 'Yes'
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Date Loan'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            (0, _DateTime.toFormalDate)(loan.loan_date)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Loan Amount'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.amount)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Interest'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.interest_type == 'percentage' ? (0, _Numbers.currency)(loan.interest_rate) + ' Percent' : 'PHP ' + (0, _Numbers.currency)(loan.interest_rate)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Total Amount To Pay'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.amount + loan.profit)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Payment'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.payment_method == 1 ? 'Monthly installments of PHP ' + (0, _Numbers.currency)(loan.per_month) : loan.payment_method == 2 ? 'Semi-monthly installments of PHP ' + (0, _Numbers.currency)(loan.per_month) : loan.payment_method == 4 ? 'One give of PHP ' + (0, _Numbers.currency)(loan.amount + loan.profit) + ' on ' + (0, _DateTime.toFormalDate)(loan.expected_date_of_payment) : 'Daily installments of PHP ' + (0, _Numbers.currency)(loan.per_month)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Months To Pay'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.payment_method == 4 ? 'N/A' : loan.months_to_pay > 1 ? loan.months_to_pay + ' months' : loan.months_to_pay + ' month'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'Loan Payments'
                      )
                    ),
                    !loan.loan_payments.length ? _react2.default.createElement(
                      'p',
                      null,
                      'No payments made since ',
                      (0, _DateTime.toFormalDate)(loan.loan_date)
                    ) : _react2.default.createElement(
                      'table',
                      { className: 'long-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'th',
                            null,
                            'Payment Trace ID'
                          ),
                          _react2.default.createElement(
                            'th',
                            null,
                            'Date Paid'
                          ),
                          _react2.default.createElement(
                            'th',
                            null,
                            'For the month'
                          ),
                          _react2.default.createElement(
                            'th',
                            null,
                            'Amount'
                          )
                        ),
                        loan.loan_payments.map(function (loan_payment, loan_payment_index) {
                          return _react2.default.createElement(
                            'tr',
                            { key: loan_payment_index },
                            _react2.default.createElement(
                              'td',
                              null,
                              loan_payment.id
                            ),
                            _react2.default.createElement(
                              'td',
                              null,
                              (0, _DateTime.toFormalDate)(loan_payment.date_paid)
                            ),
                            _react2.default.createElement(
                              'td',
                              null,
                              (0, _DateTime.monthList)()[new Date(loan_payment.period_paid).getMonth() + 1]
                            ),
                            _react2.default.createElement(
                              'td',
                              null,
                              'PHP ',
                              (0, _Numbers.currency)(loan_payment.amount)
                            )
                          );
                        })
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'Penalties'
                      )
                    ),
                    !loan.penalties.length ? _react2.default.createElement(
                      'p',
                      null,
                      'No penalties.'
                    ) : loan.penalties.map(function (penalty, penalty_index) {
                      return _react2.default.createElement(
                        'section',
                        { key: penalty_index },
                        _react2.default.createElement(
                          'table',
                          { className: 'short-table' },
                          _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Penalty Trace ID'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                penalty.id
                              )
                            ),
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Date Given'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                (0, _DateTime.toFormalDate)(penalty.date_given)
                              )
                            ),
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Amount'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                'PHP ',
                                (0, _Numbers.currency)(penalty.amount)
                              )
                            ),
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Remarks'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                penalty.remarks
                              )
                            ),
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Waved'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                penalty.was_waved ? 'Yes' : 'No'
                              )
                            ),
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Date Waved'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                penalty.was_waved ? (0, _DateTime.toFormalDate)(penalty.date_waved) : '------'
                              )
                            ),
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'td',
                                null,
                                'Wave Remarks'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                ':'
                              ),
                              _react2.default.createElement(
                                'td',
                                null,
                                penalty.was_waved ? penalty.wave_remarks : '------'
                              )
                            )
                          )
                        ),
                        _react2.default.createElement(
                          'p',
                          null,
                          _react2.default.createElement(
                            'strong',
                            null,
                            'Penalty Payments'
                          )
                        ),
                        !penalty.penalty_payments.length ? _react2.default.createElement(
                          'p',
                          null,
                          'No payments since ',
                          (0, _DateTime.toFormalDate)(penalty.date_given)
                        ) : _react2.default.createElement(
                          'table',
                          { className: 'long-table' },
                          _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                              'tr',
                              null,
                              _react2.default.createElement(
                                'th',
                                null,
                                'Payment Trace ID'
                              ),
                              _react2.default.createElement(
                                'th',
                                null,
                                'Amount'
                              ),
                              _react2.default.createElement(
                                'th',
                                null,
                                'Date Paid'
                              )
                            ),
                            penalty.penalty_payments.map(function (penalty_payment, penalty_payment_index) {
                              return _react2.default.createElement(
                                'tr',
                                { key: penalty_payment_index },
                                _react2.default.createElement(
                                  'td',
                                  null,
                                  penalty_payment.id
                                ),
                                _react2.default.createElement(
                                  'td',
                                  null,
                                  'PHP ',
                                  (0, _Numbers.currency)(penalty_payment.amount)
                                ),
                                _react2.default.createElement(
                                  'td',
                                  null,
                                  (0, _DateTime.toFormalDate)(penalty_payment.date_paid)
                                )
                              );
                            })
                          )
                        )
                      );
                    })
                  );
                })
              ),
              _react2.default.createElement(
                'a',
                {
                  className: 'default-btn-blue print-btn',
                  onClick: this.print },
                'Print'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                {
                  to: '/borrowers/' + this.props.params.id + '/view',
                  className: 'default-btn-blue print-btn' },
                'Go back'
              )
            )
          ) : this.props.borrower.backend.status == 'failed' ? _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/cross.gif') },
            _react2.default.createElement(
              'p',
              null,
              this.props.borrower.backend.message
            )
          ) : _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
            _react2.default.createElement(
              'p',
              null,
              'Please wait...'
            )
          )
        )
      );
    }
  }]);

  return BorrowerComprehensiveReport;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    borrower: _extends({}, store.borrower_reports)
  };
}, {
  fetch: reportsActions.fetch
})(BorrowerComprehensiveReport);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactAddonsCssTransitionGroup = __webpack_require__(16);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputSelect = __webpack_require__(12);

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

var _edit_borrower_profile = __webpack_require__(53);

var editProfileActions = _interopRequireWildcard(_edit_borrower_profile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components

// actions


var BorrowerEditProfile = function (_Component) {
  _inherits(BorrowerEditProfile, _Component);

  function BorrowerEditProfile() {
    _classCallCheck(this, BorrowerEditProfile);

    return _possibleConstructorReturn(this, (BorrowerEditProfile.__proto__ || Object.getPrototypeOf(BorrowerEditProfile)).apply(this, arguments));
  }

  _createClass(BorrowerEditProfile, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.reset();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'edit-borrower-profile' },
          this.props.edit_borrower_profile.data.backend.processing ? _react2.default.createElement(
            'div',
            { className: 'loading-component' },
            _react2.default.createElement('img', { src: _path2.default.join(app_path, 'app/images/processing-blue.gif') })
          ) : this.props.edit_borrower_profile.data.backend.status == 'successful' ? _react2.default.createElement(
            'div',
            { className: 'edit-form' },
            _react2.default.createElement(
              'ul',
              { className: 'left' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Contact numbers'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'This information is optional.'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactAddonsCssTransitionGroup2.default,
                  {
                    transitionName: 'emphasize-entry',
                    transitionEnterTimeout: 400,
                    transitionLeaveTimeout: 400 },
                  this.props.edit_borrower_profile.edit.contact_numbers.map(function (contact_number, index) {
                    return _react2.default.createElement(
                      'div',
                      { className: 'closable-field', key: contact_number.id ? contact_number.id : contact_number.key },
                      _react2.default.createElement(_InputText2.default, {
                        className: contact_number.value.length || index > 0 ? 'closable-input' : '',
                        numberOnly: true,
                        placeholder: 'Borrower\'s contact number...',
                        onChange: function onChange(value) {
                          return _this2.props.editContactNumber(value, index);
                        },
                        disabled: _this2.props.edit_borrower_profile.edit.backend.processing,
                        errors: contact_number.errors,
                        value: contact_number.value }),
                      index > 0 ? _react2.default.createElement(
                        'span',
                        { onClick: function onClick() {
                            return _this2.props.edit_borrower_profile.edit.backend.processing ? false : _this2.props.removeContactNumber(index);
                          }, className: 'remove-contact-field' },
                        'X'
                      ) : null
                    );
                  })
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { className: this.props.edit_borrower_profile.edit.backend.processing ? 'default-btn-blue disabled' : 'default-btn-blue',
                    onClick: function onClick() {
                      return _this2.props.edit_borrower_profile.edit.backend.processing ? false : _this2.props.addMoreContactNumbers();
                    } },
                  'Add more fields'
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'right' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Personal information'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputText2.default, {
                  placeholder: 'Borrower\'s first name...',
                  onChange: this.props.editFirstname,
                  disabled: this.props.edit_borrower_profile.edit.backend.processing,
                  errors: this.props.edit_borrower_profile.edit.firstname.errors,
                  value: this.props.edit_borrower_profile.edit.firstname.value })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputText2.default, {
                  placeholder: 'Borrower\'s middle name...',
                  onChange: this.props.editMiddlename,
                  disabled: this.props.edit_borrower_profile.edit.backend.processing,
                  errors: this.props.edit_borrower_profile.edit.middlename.errors,
                  value: this.props.edit_borrower_profile.edit.middlename.value })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputText2.default, {
                  placeholder: 'Borrower\'s surname...',
                  onChange: this.props.editSurname,
                  disabled: this.props.edit_borrower_profile.edit.backend.processing,
                  errors: this.props.edit_borrower_profile.edit.surname.errors,
                  value: this.props.edit_borrower_profile.edit.surname.value })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    onChange: this.props.editGender,
                    disabled: this.props.edit_borrower_profile.edit.backend.processing,
                    errors: this.props.edit_borrower_profile.edit.gender.errors,
                    value: this.props.edit_borrower_profile.edit.gender.value.toString() },
                  _react2.default.createElement(
                    'option',
                    { value: '1' },
                    'Male'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '0' },
                    'Female'
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputText2.default, {
                  placeholder: 'Borrower\'s address...',
                  onChange: this.props.editAddress,
                  disabled: this.props.edit_borrower_profile.edit.backend.processing,
                  errors: this.props.edit_borrower_profile.edit.address.errors,
                  value: this.props.edit_borrower_profile.edit.address.value })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputButton2.default, {
                  value: 'Save changes',
                  disabled: this.props.edit_borrower_profile.edit.backend.allow_submit && !this.props.edit_borrower_profile.edit.backend.processing ? false : true,
                  sending: this.props.edit_borrower_profile.edit.backend.processing,
                  onClick: function onClick() {
                    return _this2.props.send({
                      firstname: _this2.props.edit_borrower_profile.edit.firstname.value,
                      middlename: _this2.props.edit_borrower_profile.edit.middlename.value,
                      surname: _this2.props.edit_borrower_profile.edit.surname.value,
                      gender: _this2.props.edit_borrower_profile.edit.gender.value,
                      address: _this2.props.edit_borrower_profile.edit.address.value,
                      contact_numbers: _this2.props.edit_borrower_profile.edit.contact_numbers,
                      id: _this2.props.params.id
                    });
                  },
                  errors: [] })
              ),
              this.props.edit_borrower_profile.edit.backend.status == 'failed' ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _WithIcon2.default,
                  { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                  _react2.default.createElement(
                    'p',
                    { className: 'errors' },
                    'Failed to save changes ',
                    _react2.default.createElement(
                      'u',
                      null,
                      this.props.edit_borrower_profile.edit.backend.message
                    )
                  )
                )
              ) : this.props.edit_borrower_profile.edit.backend.status == 'successful' ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _WithIcon2.default,
                  { icon: _path2.default.join(app_path, 'app/images/check.png') },
                  _react2.default.createElement(
                    'p',
                    { className: 'okay' },
                    'Changes saved successfully.'
                  )
                )
              ) : null
            )
          ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              null,
              this.props.edit_borrower_profile.data.backend.message
            )
          )
        )
      );
    }
  }]);

  return BorrowerEditProfile;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    edit_borrower_profile: _extends({}, store.edit_borrower_profile)
  };
}, {
  fetch: editProfileActions.fetch,
  editAddress: editProfileActions.editAddress,
  editFirstname: editProfileActions.editFirstname,
  editMiddlename: editProfileActions.editMiddlename,
  editSurname: editProfileActions.editSurname,
  editGender: editProfileActions.editGender,
  editContactNumber: editProfileActions.editContactNumber,
  addMoreContactNumbers: editProfileActions.addMoreContactNumbers,
  removeContactNumber: editProfileActions.removeContactNumber,
  send: editProfileActions.send,
  reset: editProfileActions.reset
})(BorrowerEditProfile);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

var _InputSelect = __webpack_require__(12);

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DisplayTextBox = __webpack_require__(23);

var _DisplayTextBox2 = _interopRequireDefault(_DisplayTextBox);

var _borrower_new_loan = __webpack_require__(50);

var borrowerNewLoanActions = _interopRequireWildcard(_borrower_new_loan);

var _DateTime = __webpack_require__(3);

var _Numbers = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components

// actions

// helpers


var BorrowerNewLoan = function (_Component) {
  _inherits(BorrowerNewLoan, _Component);

  function BorrowerNewLoan(props) {
    _classCallCheck(this, BorrowerNewLoan);

    var _this = _possibleConstructorReturn(this, (BorrowerNewLoan.__proto__ || Object.getPrototypeOf(BorrowerNewLoan)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(BorrowerNewLoan, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.reset();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.new_loan.backend.status == 'successful') {
        this.props.router.push('/borrowers/' + this.props.params.id + '/view');
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      this.props.submit(_extends({
        borrower_id: this.props.params.id,
        amount_loan: this.props.new_loan.amount_loan.value,
        payment_method: this.props.new_loan.apply_interest_only || this.props.new_loan.no_due_date_no_interest ? null : this.props.new_loan.payment_method.value,
        months_to_pay: this.props.new_loan.amount_loan.condition == 'due-date-and-interest' || this.props.new_loan.amount_loan.condition == 'due-date-only' ? this.props.new_loan.months_to_pay.value : null,
        expected_date_of_payment: (this.props.new_loan.amount_loan.condition == 'due-date-and-interest' || this.props.new_loan.amount_loan.condition == 'due-date-only') && this.props.new_loan.payment_method.value == 4 ? new Date(this.props.new_loan.date_of_payment.month + ' ' + this.props.new_loan.date_of_payment.date + ', ' + this.props.new_loan.date_of_payment.year).toISOString() : null,
        condition_applied: this.props.new_loan.amount_loan.condition,
        date_loan: new Date(this.props.new_loan.date_loan.month + ' ' + this.props.new_loan.date_loan.date + ', ' + this.props.new_loan.date_loan.year).toISOString(),
        interest_type: this.props.new_loan.interest_rate.type,
        interest_rate: this.props.new_loan.interest_rate.value
      }, this.props.new_loan.calculated_values));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'borrower-new-loan-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'columns' },
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loan information'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Loan condition',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', {
                  id: 'apply-due-date-interest',
                  type: 'radio',
                  disabled: this.props.new_loan.backend.processing,
                  checked: this.props.new_loan.amount_loan.condition == 'due-date-and-interest',
                  onChange: function onChange(changeEvent) {
                    if (changeEvent.target.checked) _this2.props.changeLoanCondition('due-date-and-interest');
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'apply-due-date-interest' },
                  'Apply due date and interest'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', {
                  id: 'apply-interest-only',
                  type: 'radio',
                  disabled: this.props.new_loan.backend.processing,
                  checked: this.props.new_loan.amount_loan.condition == 'interest-only',
                  onChange: function onChange(changeEvent) {
                    if (changeEvent.target.checked) _this2.props.changeLoanCondition('interest-only');
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'apply-interest-only' },
                  'Apply interest only'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', {
                  id: 'apply-due-date-only',
                  type: 'radio',
                  disabled: this.props.new_loan.backend.processing,
                  checked: this.props.new_loan.amount_loan.condition == 'due-date-only',
                  onChange: function onChange(changeEvent) {
                    if (changeEvent.target.checked) _this2.props.changeLoanCondition('due-date-only');
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'apply-due-date-only' },
                  'Apply due date only'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', {
                  id: 'no-due-date-no-interest',
                  type: 'radio',
                  disabled: this.props.new_loan.backend.processing,
                  checked: this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest',
                  onChange: function onChange(changeEvent) {
                    if (changeEvent.target.checked) _this2.props.changeLoanCondition('no-due-date-and-interest');
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'no-due-date-no-interest' },
                  'Don\'t apply due date and interest'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Amount loan',
                _react2.default.createElement(_InputText2.default, {
                  numberOnly: true,
                  placeholder: 'Amount loan...',
                  onChange: this.props.changeAmount,
                  disabled: this.props.new_loan.backend.processing,
                  errors: this.props.new_loan.amount_loan.errors,
                  value: this.props.new_loan.amount_loan.value }),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    (0, _Numbers.currency)(this.props.new_loan.amount_loan.value)
                  ),
                  ' Pesos'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: 'clear-floats' },
                'Date loan',
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'date-loan',
                    onChange: this.props.changeDateLoanMonth,
                    value: this.props.new_loan.date_loan.month,
                    disabled: this.props.new_loan.backend.processing,
                    errors: [] },
                  function () {
                    return (0, _DateTime.monthList)().map(function (month, month_index) {
                      return _react2.default.createElement(
                        'option',
                        { key: month_index },
                        month
                      );
                    });
                  }()
                ),
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'date-loan',
                    onChange: this.props.changeDateLoanDate,
                    value: this.props.new_loan.date_loan.date,
                    disabled: this.props.new_loan.backend.processing,
                    errors: [] },
                  function () {
                    var dates = [];
                    var max_days_in_month = (0, _DateTime.monthMaxdays)(_this2.props.new_loan.date_loan.month, _this2.props.new_loan.date_loan.year);

                    for (var a = 1; a <= max_days_in_month; a++) {
                      dates.push(_react2.default.createElement(
                        'option',
                        { key: a },
                        a
                      ));
                    }

                    return dates;
                  }()
                ),
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'date-loan',
                    onChange: this.props.changeDateLoanYear,
                    value: this.props.new_loan.date_loan.year,
                    disabled: this.props.new_loan.backend.processing,
                    errors: [] },
                  function () {
                    var years = [];
                    var max_year = new Date().getFullYear();
                    var min_year = max_year - 10;

                    for (var a = max_year; a >= min_year; a--) {
                      years.push(_react2.default.createElement(
                        'option',
                        { key: a },
                        a
                      ));
                    }

                    return years;
                  }()
                ),
                this.props.new_loan.date_loan.errors.length ? _react2.default.createElement(
                  'div',
                  { className: 'error-list' },
                  this.props.new_loan.date_loan.errors.map(function (error, index) {
                    return _react2.default.createElement(
                      'p',
                      { key: index },
                      error
                    );
                  })
                ) : null
              ),
              _react2.default.createElement(
                'li',
                null,
                'Interest rate',
                _react2.default.createElement(_InputText2.default, {
                  numberOnly: true,
                  placeholder: 'Interest rate...',
                  onChange: this.props.changeInterestRate,
                  disabled: (this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest') && !this.props.new_loan.backend.processing ? false : true,
                  errors: this.props.new_loan.interest_rate.errors,
                  value: this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest' ? this.props.new_loan.interest_rate.value : 'N/A' }),
                this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest' ? _react2.default.createElement(
                  'p',
                  null,
                  (0, _Numbers.currency)(this.props.new_loan.interest_rate.value),
                  ' ',
                  this.props.new_loan.interest_rate.type == 'percentage' ? 'Percent' : 'Pesos'
                ) : null
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('input', {
                  id: 'interest-type-percentage',
                  type: 'radio',
                  disabled: this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest',
                  checked: this.props.new_loan.interest_rate.type == 'percentage',
                  onChange: function onChange() {
                    return _this2.props.changeInterestType('percentage');
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'interest-type-percentage' },
                  'Percentage'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', {
                  id: 'interest-type-fixed',
                  type: 'radio',
                  disabled: this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest',
                  checked: this.props.new_loan.interest_rate.type == 'fixed',
                  onChange: function onChange() {
                    return _this2.props.changeInterestType('fixed');
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'interest-type-fixed' },
                  'Fixed value'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Payment Method',
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'notification-method',
                    onChange: this.props.changePaymentMethod,
                    value: this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest' ? '0' : this.props.new_loan.payment_method.value,
                    disabled: this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest',
                    errors: this.props.new_loan.payment_method.errors },
                  this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest' ? _react2.default.createElement(
                    'option',
                    { value: '0' },
                    'N/A'
                  ) : null,
                  _react2.default.createElement(
                    'option',
                    { value: '1' },
                    'Monthly'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '2' },
                    'Semi-monthly'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '3' },
                    'Daily'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '4' },
                    'One Give'
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Months to pay',
                _react2.default.createElement(_InputText2.default, {
                  placeholder: 'Months to pay...',
                  numberOnly: true,
                  onChange: this.props.changeMonthsToPay,
                  value: (this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest') && this.props.new_loan.payment_method.value != 4 ? this.props.new_loan.months_to_pay.value : 'N/A',
                  errors: this.props.new_loan.months_to_pay.errors,
                  disabled: (this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest') && !this.props.new_loan.backend.processing && this.props.new_loan.payment_method.value != 4 ? false : true,
                  maxlength: 50 })
              ),
              _react2.default.createElement(
                'li',
                { className: 'clear-floats' },
                'Expected date of payment (One Give)',
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'date-loan',
                    onChange: this.props.changeDateOfPaymentMonth,
                    value: this.props.new_loan.date_of_payment.month,
                    disabled: (this.props.new_loan.amount_loan.condition == 'due-date-and-interest' || this.props.new_loan.amount_loan.condition == 'due-date-only') && !this.props.new_loan.backend.processing && this.props.new_loan.payment_method.value == 4 ? false : true,
                    errors: [] },
                  function () {
                    return (0, _DateTime.monthList)().map(function (month, index) {
                      return _react2.default.createElement(
                        'option',
                        { key: index },
                        month
                      );
                    });
                  }()
                ),
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'date-loan',
                    onChange: this.props.changeDateOfPaymentDate,
                    value: this.props.new_loan.date_of_payment.date,
                    disabled: (this.props.new_loan.amount_loan.condition == 'due-date-and-interest' || this.props.new_loan.amount_loan.condition == 'due-date-only') && !this.props.new_loan.backend.processing && this.props.new_loan.payment_method.value == 4 ? false : true,
                    errors: [] },
                  function () {
                    var date = new Date();
                    var max_days_in_month = (0, _DateTime.monthMaxdays)(_this2.props.new_loan.date_of_payment.month, _this2.props.new_loan.date_of_payment.year);
                    var dates = [];

                    for (var a = 1; a <= max_days_in_month; a++) {
                      dates.push(_react2.default.createElement(
                        'option',
                        { key: a },
                        a
                      ));
                    }

                    return dates;
                  }()
                ),
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    className: 'date-loan',
                    onChange: this.props.changeDateOfPaymentYear,
                    value: this.props.new_loan.date_of_payment.year,
                    disabled: (this.props.new_loan.amount_loan.condition == 'due-date-and-interest' || this.props.new_loan.amount_loan.condition == 'due-date-only') && !this.props.new_loan.backend.processing && this.props.new_loan.payment_method.value == 4 ? false : true,
                    errors: [] },
                  function () {
                    var min_year = new Date().getFullYear();
                    var max_year = min_year + 25;
                    var years = [];

                    for (var a = min_year; a <= max_year; a++) {
                      years.push(_react2.default.createElement(
                        'option',
                        { key: a },
                        a
                      ));
                    }

                    return years;
                  }()
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'columns' },
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Computed values'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Interest rate'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_loan.interest_rate.value) + (this.props.new_loan.interest_rate.type == 'percentage' ? ' Percent' : ' Pesos') })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Profit per month'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: this.props.new_loan.payment_method.value == 4 ? '0.00 Pesos' : (0, _Numbers.currency)(this.props.new_loan.calculated_values.computed_interest) + ' Pesos' })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Total profit'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_loan.calculated_values.computed_profit) + ' Pesos' })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Total amount to pay'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(Number(this.props.new_loan.calculated_values.computed_profit) + Number(this.props.new_loan.amount_loan.value)) + ' Pesos' })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Monthly payment'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_loan.calculated_values.monthly) + ' Pesos' })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Semi-monthly payment'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_loan.calculated_values.semi_monthly) + ' Pesos' })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  'Daily payment'
                ),
                _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_loan.calculated_values.daily) + ' Pesos' })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputButton2.default, {
                  value: 'Add new loan',
                  onClick: this.handleSubmit,
                  sending: this.props.new_loan.backend.processing,
                  disabled: this.props.new_loan.allow_submit && !this.props.new_loan.backend.processing ? false : true,
                  errors: [] })
              ),
              this.props.new_loan.backend.message ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'p',
                  { className: 'error-list' },
                  this.props.new_loan.backend.message
                )
              ) : null
            )
          )
        )
      );
    }
  }]);

  return BorrowerNewLoan;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    new_loan: _extends({}, store.borrower_new_loan)
  };
}, {
  reset: borrowerNewLoanActions.reset,
  changeLoanCondition: borrowerNewLoanActions.changeLoanCondition,
  changeAmount: borrowerNewLoanActions.changeAmount,
  changeInterestRate: borrowerNewLoanActions.changeInterestRate,
  changeInterestType: borrowerNewLoanActions.changeInterestType,
  changePaymentMethod: borrowerNewLoanActions.changePaymentMethod,
  changeMonthsToPay: borrowerNewLoanActions.changeMonthsToPay,
  changeDateLoanMonth: borrowerNewLoanActions.changeDateLoanMonth,
  changeDateLoanDate: borrowerNewLoanActions.changeDateLoanDate,
  changeDateLoanYear: borrowerNewLoanActions.changeDateLoanYear,
  changeDateOfPaymentMonth: borrowerNewLoanActions.changeDateOfPaymentMonth,
  changeDateOfPaymentDate: borrowerNewLoanActions.changeDateOfPaymentDate,
  changeDateOfPaymentYear: borrowerNewLoanActions.changeDateOfPaymentYear,
  submit: borrowerNewLoanActions.submit
})(BorrowerNewLoan);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _reactAddonsCssTransitionGroup = __webpack_require__(16);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithLabel = __webpack_require__(18);

var _WithLabel2 = _interopRequireDefault(_WithLabel);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputSelect = __webpack_require__(12);

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

var _borrower_profile = __webpack_require__(14);

var borrowerProfileActions = _interopRequireWildcard(_borrower_profile);

var _Numbers = __webpack_require__(8);

var _DateTime = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components

// actions

// helpers


var BorrowerProfile = function (_Component) {
  _inherits(BorrowerProfile, _Component);

  function BorrowerProfile(props) {
    _classCallCheck(this, BorrowerProfile);

    var _this = _possibleConstructorReturn(this, (BorrowerProfile.__proto__ || Object.getPrototypeOf(BorrowerProfile)).call(this, props));

    _this.showLoanInformation = _this.showLoanInformation.bind(_this);
    _this.showLoanPayment = _this.showLoanPayment.bind(_this);
    return _this;
  }

  _createClass(BorrowerProfile, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Borrower profile - LIMS';
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.reset();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.props.borrower_profile.hash.value && this.props.borrower_profile.data && !this.props.borrower_profile.hash.removed) {
        if (this['loan_id_' + this.props.borrower_profile.hash.value]) {
          window.scrollTo(0, this['loan_id_' + this.props.borrower_profile.hash.value].offsetTop - 40);
        } else if (this['penalty_id_' + this.props.borrower_profile.hash.value]) {
          window.scrollTo(0, this['loan_id_' + this.props.borrower_profile.hash.parent].offsetTop + this['penalty_id_' + this.props.borrower_profile.hash.value].offsetTop - 15);
        } else if (this['loan_payment_id_' + this.props.borrower_profile.hash.value]) {
          window.scrollTo(0, this['loan_id_' + this.props.borrower_profile.hash.parent].offsetTop + this['loan_payment_id_' + this.props.borrower_profile.hash.value].offsetTop - 15);
        } else if (this['penalty_payment_id_' + this.props.borrower_profile.hash.value]) {
          window.scrollTo(0, this['loan_id_' + this.props.borrower_profile.hash.parent].offsetTop + this['penalty_payment_id_' + this.props.borrower_profile.hash.value].offsetTop - 15);
        }

        setTimeout(function () {
          return _this2.props.removeHash();
        }, 1000);
      }
    }
  }, {
    key: 'showPenaltyPayment',
    value: function showPenaltyPayment(penalty_payment, penalty_payment_index, app_path) {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Trace ID' },
            _react2.default.createElement(
              'p',
              null,
              penalty_payment.id
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Amount' },
            _react2.default.createElement(
              'p',
              null,
              (0, _Numbers.currency)(penalty_payment.amount),
              ' Pesos'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Date paid' },
            _react2.default.createElement(
              'p',
              null,
              (0, _DateTime.toFormalDate)(penalty_payment.date_paid)
            )
          )
        ),
        penalty_payment.edit.backend.status == 'successful' ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/check.png') },
            _react2.default.createElement(
              'p',
              { className: 'okay' },
              'Changes saved successfully.'
            )
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'a',
            {
              className: !penalty_payment.edit.backend.processing ? 'default-btn-blue' : 'default-btn-blue disabled',
              onClick: function onClick() {
                return penalty_payment.edit.backend.processing ? false : _this3.props.togglePenaltyPaymentEdit(true, penalty_payment_index, penalty_index, loan_index);
              } },
            'Edit payment information'
          )
        )
      );
    }
  }, {
    key: 'showLoanPayment',
    value: function showLoanPayment(loan, loan_payment, loan_payment_index, loan_index, app_path) {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Trace ID' },
            _react2.default.createElement(
              'p',
              null,
              loan_payment.id
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Payment period' },
            loan.payment_method == 1 ? _react2.default.createElement(
              'p',
              null,
              'For the Month of ',
              (0, _DateTime.monthList)()[new Date(loan_payment.period_paid).getMonth()]
            ) : loan.payment_method == 2 ? _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                loan_payment.quarter == 'q1' ? '1st' : '2nd',
                ' quarter'
              ),
              ' of ',
              _react2.default.createElement(
                'strong',
                null,
                (0, _DateTime.monthList)()[new Date(loan_payment.period_paid).getMonth()]
              )
            ) : _react2.default.createElement(
              'p',
              null,
              'blank day of the period'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Amount' },
            _react2.default.createElement(
              'p',
              null,
              (0, _Numbers.currency)(loan_payment.amount),
              ' Pesos'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Date paid' },
            _react2.default.createElement(
              'p',
              null,
              (0, _DateTime.toFormalDate)(loan_payment.date_paid)
            )
          )
        ),
        loan_payment.edit.backend.status == 'successful' ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/check.png') },
            _react2.default.createElement(
              'p',
              { className: 'okay' },
              'Changes saved successfully.'
            )
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'a',
            {
              className: loan.payment_fields.backend.processing ? 'default-btn-blue disabled' : 'default-btn-blue',
              onClick: function onClick() {
                return loan.payment_fields.backend.processing ? false : _this4.props.toggleEditPaymentInformation(!loan_payment.edit.shown, loan_payment_index, loan_index);
              } },
            'Edit payment information'
          )
        )
      );
    }
  }, {
    key: 'showPenalty',
    value: function showPenalty(penalty, penalty_index, app_path, loan_index) {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Trace ID' },
            _react2.default.createElement(
              'p',
              null,
              penalty.id
            )
          )
        ),
        penalty.was_waved ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/exclamation.png') },
            _react2.default.createElement(
              'p',
              null,
              'This penalty has been waived.'
            )
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'row' },
          !penalty.summary.remaining_balance ? _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/check.png') },
            _react2.default.createElement(
              'p',
              { className: 'okay' },
              'Fully paid'
            )
          ) : _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/cross.png') },
            _react2.default.createElement(
              'p',
              { className: 'errors' },
              'Not yet fully paid'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Amount' },
            _react2.default.createElement(
              'p',
              null,
              (0, _Numbers.currency)(penalty.amount),
              ' Pesos'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Remarks' },
            _react2.default.createElement(
              'p',
              null,
              penalty.remarks
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Date given' },
            _react2.default.createElement(
              'p',
              null,
              (0, _DateTime.toFormalDate)(penalty.date_given)
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Total amount paid' },
            _react2.default.createElement(
              'p',
              null,
              (0, _Numbers.currency)(penalty.summary.total_amount_paid),
              ' Pesos'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Remaining balance' },
            penalty.summary.remaining_balance < 0 ? _react2.default.createElement(
              'p',
              { className: 'errors' },
              (0, _Numbers.currency)(penalty.summary.remaining_balance),
              ' Pesos'
            ) : _react2.default.createElement(
              'p',
              null,
              (0, _Numbers.currency)(penalty.summary.remaining_balance),
              ' Pesos'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          penalty.edit.backend.status == 'successful' ? _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              _WithIcon2.default,
              { icon: _path2.default.join(app_path, 'app/images/check.png') },
              _react2.default.createElement(
                'p',
                { className: 'okay' },
                'Changes saved successfully.'
              )
            )
          ) : null,
          penalty.wave.shown ? _react2.default.createElement(
            'ul',
            { className: 'penalty-waiving-form' },
            _react2.default.createElement(
              'li',
              null,
              'Remarks',
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/information.png') },
                _react2.default.createElement(
                  'p',
                  null,
                  'A short description for waving this penalty.'
                )
              ),
              _react2.default.createElement(_InputText2.default, {
                value: penalty.wave.remarks.value,
                placeholder: 'Remarks...',
                onChange: function onChange(value) {
                  return _this5.props.wavePenaltyChangeRemarks(value, penalty_index, loan_index);
                },
                errors: penalty.wave.remarks.errors,
                disabled: penalty.wave.backend.processing })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: 'buttons' },
                _react2.default.createElement(_InputButton2.default, {
                  value: 'Waive this penalty',
                  onClick: function onClick() {
                    return _this5.props.wavePenaltySubmit(penalty.id, penalty_index, loan_index, penalty.wave.remarks.value);
                  },
                  sending: penalty.wave.backend.processing,
                  disabled: !penalty.wave.backend.processing && penalty.wave.backend.allow_submit ? false : true,
                  errors: [] })
              ),
              _react2.default.createElement(
                'div',
                { className: 'buttons' },
                _react2.default.createElement(
                  'a',
                  {
                    className: penalty.wave.backend.processing ? 'default-btn-red disabled' : 'default-btn-red',
                    onClick: function onClick() {
                      return penalty.wave.backend.processing ? false : _this5.props.wavePenaltyToggle(penalty_index, loan_index);
                    } },
                  'Cancel'
                )
              )
            ),
            penalty.wave.backend.status == 'failed' ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'p',
                { className: 'errors' },
                penalty.wave.backend.message
              )
            ) : null
          ) : !penalty.penalty_payment_fields.shown && !penalty.was_waved ? _react2.default.createElement(
            'ul',
            { className: 'actions' },
            penalty.summary.remaining_balance > 0 ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                {
                  className: !penalty.edit.backend.processing ? 'default-btn-blue' : 'default-btn-blue disabled',
                  onClick: function onClick() {
                    return penalty.edit.backend.processing ? false : _this5.props.togglePenaltyEdit(true, penalty_index, loan_index);
                  } },
                'Edit penalty information'
              )
            ) : null,
            penalty.summary.remaining_balance > 0 ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                {
                  className: !penalty.penalty_payment_fields.backend.processing ? 'default-btn-blue' : 'default-btn-blue disabled',
                  onClick: function onClick() {
                    return penalty.penalty_payment_fields.backend.processing ? false : _this5.props.togglePenaltyPaymentForm(true, penalty_index, loan_index);
                  } },
                'Add new payment'
              )
            ) : null,
            !penalty.penalty_payments.length ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                {
                  className: 'default-btn-red',
                  onClick: function onClick() {
                    return _this5.props.wavePenaltyToggle(penalty_index, loan_index);
                  } },
                'Waive this penalty'
              )
            ) : null
          ) : penalty.penalty_payment_fields.shown && !penalty.was_waved ? _react2.default.createElement(
            'ul',
            { className: 'penalty-payment-form' },
            _react2.default.createElement(
              'li',
              null,
              'Amount',
              _react2.default.createElement(_InputText2.default, {
                numberOnly: true,
                value: penalty.penalty_payment_fields.amount.value,
                placeholder: 'Amount...',
                onChange: function onChange(value) {
                  return _this5.props.changePenaltyPaymentFormAmount(value, penalty_index, loan_index);
                },
                errors: penalty.penalty_payment_fields.amount.errors,
                disabled: penalty.penalty_payment_fields.backend.processing }),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  (0, _Numbers.currency)(penalty.penalty_payment_fields.amount.value)
                ),
                ' Pesos'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'select-collection' },
              _react2.default.createElement(
                'p',
                null,
                'Date paid'
              ),
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  className: 'date',
                  onChange: function onChange(value) {
                    return _this5.props.changePenaltyPaymentFormMonth(value, penalty_index, loan_index);
                  },
                  value: penalty.penalty_payment_fields.date_paid.month,
                  disabled: penalty.penalty_payment_fields.backend.processing,
                  errors: [] },
                (0, _DateTime.monthList)().map(function (month, index) {
                  return _react2.default.createElement(
                    'option',
                    { key: index },
                    month
                  );
                })
              ),
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  className: 'date',
                  onChange: function onChange(value) {
                    return _this5.props.changePenaltyPaymentFormDate(value, penalty_index, loan_index);
                  },
                  value: penalty.penalty_payment_fields.date_paid.date,
                  disabled: penalty.penalty_payment_fields.backend.processing,
                  errors: [] },
                function () {
                  var max_days_in_month = (0, _DateTime.monthMaxdays)(penalty.penalty_payment_fields.date_paid.month, penalty.penalty_payment_fields.date_paid.year);
                  var dates = [];

                  for (var a = 1; a <= max_days_in_month; a++) {
                    dates.push(_react2.default.createElement(
                      'option',
                      { key: a },
                      a
                    ));
                  }

                  return dates;
                }()
              ),
              _react2.default.createElement(
                _InputSelect2.default,
                {
                  className: 'date',
                  onChange: function onChange(value) {
                    return _this5.props.changePenaltyPaymentFormYear(value, penalty_index, loan_index);
                  },
                  value: penalty.penalty_payment_fields.date_paid.year,
                  disabled: penalty.penalty_payment_fields.backend.processing,
                  errors: [] },
                function () {
                  var date = new Date();
                  var years = [];
                  var max_year = date.getFullYear();
                  var min_year = max_year - 10;

                  for (var a = max_year; a >= min_year; a--) {
                    years.push(_react2.default.createElement(
                      'option',
                      { key: a },
                      a
                    ));
                  }

                  return years;
                }()
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: 'buttons' },
                _react2.default.createElement(_InputButton2.default, {
                  value: 'Encode payment',
                  onClick: function onClick() {
                    return _this5.props.submitPenaltyPaymentForm({
                      amount: penalty.penalty_payment_fields.amount.value,
                      date_paid: new Date(penalty.penalty_payment_fields.date_paid.month + ' ' + penalty.penalty_payment_fields.date_paid.date + ', ' + penalty.penalty_payment_fields.date_paid.year).toISOString(),
                      penalty_id: penalty.id,
                      loan_index: loan_index,
                      penalty_index: penalty_index
                    }, penalty_index, loan_index);
                  },
                  sending: penalty.penalty_payment_fields.backend.processing,
                  disabled: penalty.penalty_payment_fields.allow_submit && !penalty.penalty_payment_fields.backend.processing ? false : true,
                  errors: [] })
              ),
              _react2.default.createElement(
                'div',
                { className: 'buttons' },
                _react2.default.createElement(
                  'a',
                  {
                    className: !penalty.penalty_payment_fields.backend.processing ? 'default-btn-red' : 'default-btn-red disabled',
                    onClick: function onClick() {
                      return penalty.penalty_payment_fields.backend.processing ? false : _this5.props.togglePenaltyPaymentForm(false, penalty_index, loan_index);
                    } },
                  'Cancel'
                )
              )
            ),
            penalty.edit.backend.status == 'failed' ? _react2.default.createElement(
              'li',
              { className: 'row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                _react2.default.createElement(
                  'p',
                  { className: 'errors' },
                  'Failed to save changes: ',
                  _react2.default.createElement(
                    'u',
                    null,
                    penalty.edit.backend.message
                  )
                )
              )
            ) : null
          ) : null
        ),
        penalty.wave.backend.status == 'successful' ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/check.png') },
            _react2.default.createElement(
              'p',
              { className: 'okay' },
              'Penalty waived successfully.'
            )
          )
        ) : null,
        penalty.penalty_payment_fields.backend.status == 'successful' ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/check.png') },
            _react2.default.createElement(
              'p',
              { className: 'okay' },
              'Payment added successfully.'
            )
          )
        ) : penalty.penalty_payment_fields.backend.status == 'failed' ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/check.png') },
            _react2.default.createElement(
              'p',
              { className: 'errors' },
              'Failed to encode payment: ',
              _react2.default.createElement(
                'u',
                null,
                penalty.penalty_payment_fields.backend.message
              )
            )
          )
        ) : null,
        !penalty.was_waved ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Penalty payments'
          ),
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              transitionName: 'emphasize-entry',
              transitionEnterTimeout: 400,
              transitionLeaveTimeout: 400 },
            penalty.penalty_payments.length ? penalty.penalty_payments.filter(function (penalty_payment, index) {
              return index < 3;
            }).map(function (penalty_payment, penalty_payment_index) {
              return _react2.default.createElement(
                'div',
                { ref: function ref(element) {
                    return _this5['penalty_payment_id_' + penalty_payment.id] = element;
                  }, className: 'payment-container', key: penalty.penalty_payments.length - penalty_payment_index },
                penalty_payment.edit.shown ? _react2.default.createElement(
                  'ul',
                  { className: 'penalty-form' },
                  _react2.default.createElement(
                    'li',
                    null,
                    'Amount',
                    _react2.default.createElement(_InputText2.default, {
                      numberOnly: true,
                      value: penalty_payment.edit.amount.value,
                      placeholder: 'Amount...',
                      onChange: function onChange(value) {
                        return _this5.props.changePenaltyPaymentEditAmount(value, penalty_payment_index, penalty_index, loan_index);
                      },
                      errors: penalty_payment.edit.amount.errors,
                      disabled: penalty_payment.edit.backend.processing }),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        (0, _Numbers.currency)(penalty_payment.edit.amount.value)
                      ),
                      ' Pesos'
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'select-collection' },
                    _react2.default.createElement(
                      'p',
                      null,
                      'Date paid'
                    ),
                    _react2.default.createElement(
                      _InputSelect2.default,
                      {
                        className: 'date',
                        onChange: function onChange(value) {
                          return _this5.props.changePenaltyPaymentEditMonth(value, penalty_payment_index, penalty_index, loan_index);
                        },
                        value: penalty_payment.edit.date_paid.month,
                        disabled: penalty_payment.edit.backend.processing,
                        errors: [] },
                      (0, _DateTime.monthList)().map(function (month, index) {
                        return _react2.default.createElement(
                          'option',
                          { key: index },
                          month
                        );
                      })
                    ),
                    _react2.default.createElement(
                      _InputSelect2.default,
                      {
                        className: 'date',
                        onChange: function onChange(value) {
                          return _this5.props.changePenaltyPaymentEditDate(value, penalty_payment_index, penalty_index, loan_index);
                        },
                        value: penalty_payment.edit.date_paid.date,
                        disabled: penalty_payment.edit.backend.processing,
                        errors: [] },
                      function () {
                        var max_days_in_month = (0, _DateTime.monthMaxdays)(penalty_payment.edit.date_paid.month, penalty_payment.edit.date_paid.year);
                        var dates = [];

                        for (var a = 1; a <= max_days_in_month; a++) {
                          dates.push(_react2.default.createElement(
                            'option',
                            { key: a },
                            a
                          ));
                        }

                        return dates;
                      }()
                    ),
                    _react2.default.createElement(
                      _InputSelect2.default,
                      {
                        className: 'date',
                        onChange: function onChange(value) {
                          return _this5.props.changePenaltyPaymentEditYear(value, penalty_payment_index, penalty_index, loan_index);
                        },
                        value: penalty_payment.edit.date_paid.year,
                        disabled: penalty_payment.edit.backend.processing,
                        errors: [] },
                      function () {
                        var date = new Date();
                        var years = [];
                        var max_year = date.getFullYear();
                        var min_year = max_year - 10;

                        for (var a = max_year; a >= min_year; a--) {
                          years.push(_react2.default.createElement(
                            'option',
                            { key: a },
                            a
                          ));
                        }

                        return years;
                      }()
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'buttons' },
                      _react2.default.createElement(_InputButton2.default, {
                        value: 'Save changes',
                        onClick: function onClick() {
                          return _this5.props.changePenaltyPaymentEditSave({
                            amount: penalty_payment.edit.amount.value,
                            date_paid: new Date(penalty_payment.edit.date_paid.month + ' ' + penalty_payment.edit.date_paid.date + ', ' + penalty_payment.edit.date_paid.year).toISOString(),
                            id: penalty_payment.id,
                            penalty_payment_index: penalty_payment_index,
                            penalty_index: penalty_index,
                            loan_index: loan_index
                          }, penalty_payment_index, penalty_index, loan_index);
                        },
                        sending: penalty_payment.edit.backend.processing,
                        disabled: penalty_payment.edit.allow_submit && !penalty_payment.edit.backend.processing ? false : true,
                        errors: [] })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'buttons' },
                      _react2.default.createElement(
                        'a',
                        {
                          className: !penalty_payment.edit.backend.processing ? 'default-btn-red' : 'default-btn-red disabled',
                          onClick: function onClick() {
                            return penalty_payment.edit.backend.processing ? false : _this5.props.togglePenaltyPaymentEdit(false, penalty_payment_index, penalty_index, loan_index);
                          } },
                        'Cancel'
                      )
                    )
                  ),
                  penalty_payment.edit.backend.status == 'failed' ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                      _react2.default.createElement(
                        'p',
                        { className: 'errors' },
                        penalty_payment.edit.backend.message
                      )
                    )
                  ) : null
                ) : penalty_payment.id == _this5.props.borrower_profile.hash.value && !_this5.props.borrower_profile.hash.removed ? _react2.default.createElement(
                  _reactAddonsCssTransitionGroup2.default,
                  {
                    transitionName: 'emphasize-background',
                    transitionAppear: true,
                    transitionAppearTimeout: 1000,
                    transitionEnterTimeout: 400,
                    transitionLeaveTimeout: 400 },
                  _this5.showPenaltyPayment(penalty_payment, penalty_payment_index, app_path)
                ) : _this5.showPenaltyPayment(penalty_payment, penalty_payment_index, app_path)
              );
            }) : _react2.default.createElement(
              'p',
              null,
              'No payments since ',
              _react2.default.createElement(
                'strong',
                null,
                (0, _DateTime.toFormalDate)(penalty.date_given)
              )
            )
          )
        ) : null
      );
    }
  }, {
    key: 'showLoanInformation',
    value: function showLoanInformation(loan, loan_index, app_path) {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'loan-date-h1' },
          (0, _DateTime.toFormalDate)(loan.loan_date)
        ),
        _react2.default.createElement(
          'div',
          { className: 'loan-container' },
          _react2.default.createElement(
            'div',
            { className: 'left-right-columned' },
            loan.edit.shown ? _react2.default.createElement(
              'div',
              { className: 'left' },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  { className: 'warning' },
                  _react2.default.createElement(
                    _WithIcon2.default,
                    { icon: _path2.default.join(app_path, 'app/images/exclamation.png') },
                    _react2.default.createElement(
                      'p',
                      { className: 'title' },
                      'NOTICE'
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'message' },
                    'You can only change loan information before the first payment. If the first payment has been made, you can no longer change these information.'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'clear-floats' },
                  'Date loan',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformationDateLoanMonth(value, loan_index);
                      },
                      value: loan.edit.loan_date.month,
                      disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                      errors: [] },
                    (0, _DateTime.monthList)().map(function (month, month_index) {
                      return _react2.default.createElement(
                        'option',
                        { key: month_index },
                        month
                      );
                    })
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformationDateLoanDate(value, loan_index);
                      },
                      value: loan.edit.loan_date.date,
                      disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                      errors: [] },
                    function () {
                      var max_days_in_month = (0, _DateTime.monthMaxdays)(loan.edit.loan_date.month, loan.edit.loan_date.year);
                      var dates = [];

                      for (var a = 1; a <= max_days_in_month; a++) {
                        dates.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return dates;
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformationDateLoanYear(value, loan_index);
                      },
                      value: loan.edit.loan_date.year,
                      disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                      errors: [] },
                    function () {
                      var date = new Date();
                      var years = [];
                      var max_year = date.getFullYear();
                      var min_year = max_year - 10;

                      for (var a = max_year; a >= min_year; a--) {
                        years.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return years;
                    }()
                  ),
                  loan.edit.loan_date.errors.length ? _react2.default.createElement(
                    'div',
                    { className: 'error-list' },
                    loan.edit.loan_date.errors.map(function (error, error_index) {
                      return _react2.default.createElement(
                        'p',
                        { key: error_index },
                        error
                      );
                    })
                  ) : null
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Amount loan',
                  _react2.default.createElement(_InputText2.default, {
                    value: loan.edit.amount_loan.value,
                    numberOnly: true,
                    placeholder: 'Amount loan...',
                    onChange: function onChange(value) {
                      return _this6.props.editLoanInformationAmount(value, loan_index);
                    },
                    errors: loan.edit.amount_loan.errors,
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false }),
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      (0, _Numbers.currency)(loan.edit.amount_loan.value)
                    ),
                    ' Pesos'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Loan condition',
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'apply-due-date-interest',
                    type: 'radio',
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                    checked: loan.edit.amount_loan.condition == 'due-date-and-interest',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this6.props.editLoanInformationCondition('due-date-and-interest', loan_index);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'apply-due-date-interest' },
                    'Apply due date and interest'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'apply-interest-only',
                    type: 'radio',
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                    checked: loan.edit.amount_loan.condition == 'interest-only',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this6.props.editLoanInformationCondition('interest-only', loan_index);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'apply-interest-only' },
                    'Apply interest only'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'apply-due-date-only',
                    type: 'radio',
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                    checked: loan.edit.amount_loan.condition == 'due-date-only',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this6.props.editLoanInformationCondition('due-date-only', loan_index);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'apply-due-date-only' },
                    'Apply due date only'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'no-due-date-no-interest',
                    type: 'radio',
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : false,
                    checked: loan.edit.amount_loan.condition == 'no-due-date-and-interest',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this6.props.editLoanInformationCondition('no-due-date-and-interest', loan_index);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'no-due-date-no-interest' },
                    'Don\'t apply due date and interest'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Interest rate',
                  _react2.default.createElement(_InputText2.default, {
                    value: loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest' ? loan.edit.interest_rate.value : 'N/A',
                    numberOnly: true,
                    placeholder: 'Interest rate...',
                    onChange: function onChange(value) {
                      return _this6.props.editLoanInformationInterestRate(value, loan_index);
                    },
                    errors: loan.edit.interest_rate.errors,
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : (loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && !loan.edit.backend.processing ? false : true }),
                  loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest' ? _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.edit.interest_rate.value),
                    ' ',
                    loan.edit.interest_rate.type == 'percentage' ? 'Percent' : 'Pesos'
                  ) : null
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement('input', {
                    id: 'interest-type-percentage',
                    type: 'radio',
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : loan.edit.backend.processing || loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest',
                    checked: loan.edit.interest_rate.type == 'percentage',
                    onChange: function onChange() {
                      return _this6.props.editLoanInformationInterestType('percentage', loan_index);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'interest-type-percentage' },
                    'Percentage'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'interest-type-fixed',
                    type: 'radio',
                    disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest',
                    checked: loan.edit.interest_rate.type == 'fixed',
                    onChange: function onChange() {
                      return _this6.props.editLoanInformationInterestType('fixed', loan_index);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'interest-type-fixed' },
                    'Fixed value'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Months to pay',
                  _react2.default.createElement(_InputText2.default, {
                    value: (loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && loan.edit.payment_method.value != 4 ? loan.edit.months_to_pay.value : loan.edit.payment_method.value == 4 ? 'N/A' : !loan.edit.months_to_pay.value ? '' : loan.edit.months_to_pay.value,
                    numberOnly: true,
                    placeholder: 'Months to pay...',
                    onChange: function onChange(value) {
                      return _this6.props.editLoanInformationMonthsToPay(value, loan_index);
                    },
                    errors: loan.edit.months_to_pay.errors,
                    disabled: loan.loan_payments.length || loan.edit.backend.processing || loan.edit.payment_method.value == 4 ? true : (loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && !loan.edit.backend.processing ? false : true })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Payment Method',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'payment-method',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformatioPaymentMethod(value, loan_index);
                      },
                      value: loan.edit.backend.processing || loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest' ? '0' : loan.edit.payment_method.value,
                      disabled: loan.loan_payments.length || loan.edit.backend.processing ? true : loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest',
                      errors: loan.edit.payment_method.errors },
                    loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest' ? _react2.default.createElement(
                      'option',
                      { value: '0' },
                      'N/A'
                    ) : null,
                    _react2.default.createElement(
                      'option',
                      { value: '1' },
                      'Monthly'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '2' },
                      'Semi-monthly'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '3' },
                      'Daily'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '4' },
                      'One Give'
                    )
                  )
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'clear-floats' },
                  'Expected date of payment (One Give)',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformationDateOfPaymentMonth(value, loan_index);
                      },
                      value: loan.edit.date_of_payment.month,
                      disabled: (loan.edit.amount_loan.condition == 'due-date-and-interest' || loan.edit.amount_loan.condition == 'due-date-only') && !loan.edit.backend.processing && loan.edit.payment_method.value == 4 ? false : true,
                      errors: [] },
                    function () {
                      return (0, _DateTime.monthList)().map(function (month, index) {
                        return _react2.default.createElement(
                          'option',
                          { key: index },
                          month
                        );
                      });
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformationDateOfPaymentDate(value, loan_index);
                      },
                      value: loan.edit.date_of_payment.date,
                      disabled: (loan.edit.amount_loan.condition == 'due-date-and-interest' || loan.edit.amount_loan.condition == 'due-date-only') && !loan.edit.backend.processing && loan.edit.payment_method.value == 4 ? false : true,
                      errors: [] },
                    function () {
                      var date = new Date();
                      var max_days_in_month = (0, _DateTime.monthMaxdays)(loan.edit.date_of_payment.month, loan.edit.date_of_payment.year);
                      var dates = [];

                      for (var a = 1; a <= max_days_in_month; a++) {
                        dates.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return dates;
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: function onChange(value) {
                        return _this6.props.editLoanInformationDateOfPaymentYear(value, loan_index);
                      },
                      value: loan.edit.date_of_payment.year,
                      disabled: (loan.edit.amount_loan.condition == 'due-date-and-interest' || loan.edit.amount_loan.condition == 'due-date-only') && !loan.edit.backend.processing && loan.edit.payment_method.value == 4 ? false : true,
                      errors: [] },
                    function () {
                      var min_year = new Date().getFullYear();
                      var max_year = min_year + 25;
                      var years = [];

                      for (var a = min_year; a <= max_year; a++) {
                        years.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return years;
                    }()
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'buttons' },
                  _react2.default.createElement(_InputButton2.default, {
                    value: 'Save changes',
                    onClick: function onClick() {
                      return _this6.props.editLoanInformatioSend({
                        amount: loan.edit.amount_loan.value,
                        condition_applied: loan.edit.amount_loan.condition,
                        interest_rate: loan.edit.interest_rate.value,
                        interest_type: loan.edit.interest_rate.type,
                        months_to_pay: loan.edit.months_to_pay.value,
                        date_loan: new Date(loan.edit.loan_date.month + ' ' + loan.edit.loan_date.date + ', ' + loan.edit.loan_date.year).toISOString(),
                        date_of_payment: loan.edit.payment_method.value == 4 ? new Date(loan.edit.date_of_payment.month + ' ' + loan.edit.date_of_payment.date + ', ' + loan.edit.date_of_payment.year).toISOString() : null,
                        payment_method: loan.edit.payment_method.value,
                        id: loan.id
                      }, loan_index);
                    },
                    sending: loan.edit.backend.processing,
                    disabled: !loan.loan_payments.length && loan.edit.backend.allow_submit && !loan.edit.backend.processing ? false : true,
                    errors: [] })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'buttons' },
                  _react2.default.createElement(
                    'a',
                    {
                      className: loan.edit.backend.processing ? 'default-btn-red disabled' : 'default-btn-red',
                      onClick: function onClick() {
                        return loan.edit.backend.processing ? false : _this6.props.toggleEditLoanInformation(!loan.edit.shown, loan_index);
                      } },
                    'Cancel'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                !loan.edit.backend.processing && loan.edit.backend.status == 'failed' ? _react2.default.createElement(
                  _WithIcon2.default,
                  { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                  _react2.default.createElement(
                    'p',
                    { className: 'errors' },
                    'Failed to save changes ',
                    _react2.default.createElement(
                      'u',
                      null,
                      loan.edit.backend.message
                    )
                  )
                ) : null
              )
            ) : _react2.default.createElement(
              'div',
              { className: 'left' },
              _react2.default.createElement(
                'h1',
                null,
                'Loan information'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'ul',
                  null,
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { className: 'default-btn-blue', to: '/loan/' + loan.id + '/comprehensive-report' },
                      'Comprehensive Report'
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { className: 'default-btn-blue', to: '/loan/' + loan.id + '/summary-report' },
                      'Summary Report'
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      _reactRouter.Link,
                      { className: 'default-btn-blue', to: '/loan/' + loan.id + '/contract' },
                      'Generate contract'
                    )
                  ),
                  loan.summary.remaining_balance > 0 ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      {
                        className: loan.edit.backend.processing ? 'default-btn-blue disabled' : 'default-btn-blue',
                        onClick: function onClick() {
                          return loan.edit.backend.processing ? false : _this6.props.toggleEditLoanInformation(!loan.edit.shown, loan_index);
                        } },
                      'Edit loan information'
                    )
                  ) : null
                )
              ),
              !loan.edit.backend.processing && loan.edit.backend.status == 'successful' ? _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithIcon2.default,
                  { icon: _path2.default.join(app_path, 'app/images/check.png') },
                  _react2.default.createElement(
                    'p',
                    { className: 'okay' },
                    'Changes saved successfully.'
                  )
                )
              ) : null,
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Trace ID' },
                  _react2.default.createElement(
                    'p',
                    null,
                    loan.id
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                !loan.summary.remaining_balance ? _react2.default.createElement(
                  _WithIcon2.default,
                  { icon: _path2.default.join(app_path, 'app/images/check.png') },
                  _react2.default.createElement(
                    'p',
                    { className: 'okay' },
                    'Fully paid'
                  )
                ) : _react2.default.createElement(
                  _WithIcon2.default,
                  { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                  _react2.default.createElement(
                    'p',
                    { className: 'errors' },
                    'Not yet fully paid'
                  )
                )
              ),
              !loan.fully_paid && loan.payment_method != 4 ? _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Next due date' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _DateTime.getFormalDueDate)(loan)
                  )
                )
              ) : loan.payment_method == 4 ? _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Due date' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _DateTime.toFormalDate)(loan.expected_date_of_payment)
                  )
                )
              ) : null,
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Amount' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.amount) + ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Conditions applied' },
                  _react2.default.createElement(
                    'div',
                    null,
                    loan.condition_applied == 'due-date-and-interest' || loan.condition_applied == 'interest-only' ? _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/check.png') },
                      _react2.default.createElement(
                        'p',
                        { className: 'okay' },
                        'Interest'
                      )
                    ) : _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                      _react2.default.createElement(
                        'p',
                        { className: 'errors' },
                        'Interest'
                      )
                    ),
                    loan.condition_applied == 'due-date-and-interest' || loan.condition_applied == 'due-date-only' ? _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/check.png') },
                      _react2.default.createElement(
                        'p',
                        { className: 'okay' },
                        'Due date'
                      )
                    ) : _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                      _react2.default.createElement(
                        'p',
                        { className: 'errors' },
                        'Due date'
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Loan date' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _DateTime.toFormalDate)(loan.loan_date)
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Months to pay' },
                  _react2.default.createElement(
                    'p',
                    null,
                    loan.payment_method != 4 ? loan.months_to_pay + (loan.months_to_pay > 1 ? ' Months' : ' Month') : 'N/A'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Payment method' },
                  loan.payment_method == 1 ? _react2.default.createElement(
                    'p',
                    null,
                    'Monthly'
                  ) : loan.payment_method == 2 ? _react2.default.createElement(
                    'p',
                    null,
                    'Semi-monthly'
                  ) : loan.payment_method == 3 ? _react2.default.createElement(
                    'p',
                    null,
                    'Daily'
                  ) : _react2.default.createElement(
                    'p',
                    null,
                    'One Give'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Interest rate' },
                  loan.condition_applied == 'interest-only' || loan.condition_applied == 'due-date-and-interest' ? _react2.default.createElement(
                    'p',
                    null,
                    loan.interest_rate,
                    ' ',
                    loan.interest_type == 'percentage' ? 'Percent' : 'Pesos'
                  ) : _react2.default.createElement(
                    'p',
                    null,
                    'N/A'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Interest' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.interest),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Profit' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.profit),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Total amount to pay' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(Number(loan.profit) + Number(loan.amount)),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Daily payment' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.per_day),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Semi-monthly payment' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.per_semi_month),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Monthly payment' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.per_month),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'h1',
                null,
                'Payments summary'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Total amount paid' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.summary.total_amount_paid),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Remaining balance' },
                  _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(loan.summary.remaining_balance),
                    ' Pesos'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Remaining months' },
                  loan.payment_method == 4 ? _react2.default.createElement(
                    'p',
                    null,
                    'N/A'
                  ) : loan.summary.months_left == 0 ? _react2.default.createElement(
                    'p',
                    null,
                    'None'
                  ) : loan.summary.months_left > 1 ? _react2.default.createElement(
                    'p',
                    null,
                    Math.ceil(loan.summary.months_left),
                    ' Months'
                  ) : _react2.default.createElement(
                    'p',
                    null,
                    Math.ceil(loan.summary.months_left),
                    ' Month'
                  )
                )
              ),
              _react2.default.createElement(
                'h1',
                null,
                'Penalties summary'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Total number of penalties' },
                  _react2.default.createElement(
                    'p',
                    null,
                    loan.penalties.length
                  )
                )
              ),
              function () {
                var total_amount_to_pay = 0;
                var total_amount_paid = 0;
                var remaining_balance = 0;

                loan.penalties.forEach(function (penalty) {
                  total_amount_to_pay += penalty.summary.remaining_balance + penalty.summary.total_amount_paid;
                  total_amount_paid += penalty.summary.total_amount_paid;
                  remaining_balance += penalty.summary.remaining_balance;
                });

                return _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount to pay' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(total_amount_to_pay),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(remaining_balance),
                        ' Pesos'
                      )
                    )
                  )
                );
              }()
            ),
            _react2.default.createElement(
              'div',
              { className: 'right left-right-columned inner' },
              _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loan payments'
                ),
                loan.summary.remaining_balance ? _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  !loan.payment_fields.shown ? _react2.default.createElement(
                    'ul',
                    { className: 'actions' },
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { className: loan.payment_fields.backend.processing ? 'default-btn-blue disabled' : 'default-btn-blue',
                          onClick: function onClick() {
                            return loan.payment_fields.backend.processing ? false : _this6.props.togglePaymentForm(true, loan_index);
                          } },
                        'Add new loan payment'
                      )
                    )
                  ) : _react2.default.createElement(
                    'ul',
                    { className: 'payment-form' },
                    _react2.default.createElement(
                      'li',
                      null,
                      'Amount Paid',
                      _react2.default.createElement(_InputText2.default, {
                        numberOnly: true,
                        value: loan.payment_fields.amount.value,
                        placeholder: 'Amount paid...',
                        onChange: function onChange(value) {
                          return _this6.props.changeAmountPaid(value, loan_index);
                        },
                        errors: loan.payment_fields.amount.errors,
                        disabled: loan.payment_fields.backend.processing }),
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'strong',
                          null,
                          (0, _Numbers.currency)(loan.payment_fields.amount.value)
                        ),
                        ' Pesos'
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'select-collection' },
                      _react2.default.createElement(
                        'p',
                        null,
                        'For the month of'
                      ),
                      _react2.default.createElement(
                        _InputSelect2.default,
                        {
                          className: 'date',
                          onChange: function onChange(value) {
                            return _this6.props.changePeriodMonth(value, loan_index);
                          },
                          value: loan.payment_fields.period.month,
                          disabled: loan.payment_fields.backend.processing,
                          errors: [] },
                        (0, _DateTime.monthList)().map(function (month, index) {
                          return _react2.default.createElement(
                            'option',
                            { key: index },
                            month
                          );
                        })
                      ),
                      _react2.default.createElement(
                        _InputSelect2.default,
                        {
                          className: 'date',
                          onChange: function onChange(value) {
                            return _this6.props.changePeriodYear(value, loan_index);
                          },
                          value: loan.payment_fields.period.year,
                          disabled: loan.payment_fields.backend.processing,
                          errors: [] },
                        function () {
                          var date = new Date();
                          var years = [];
                          var max_year = date.getFullYear();
                          var min_year = max_year - 10;

                          for (var a = max_year; a >= min_year; a--) {
                            years.push(_react2.default.createElement(
                              'option',
                              { key: a },
                              a
                            ));
                          }

                          return years;
                        }()
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      { className: 'select-collection' },
                      _react2.default.createElement(
                        'p',
                        null,
                        'Date paid'
                      ),
                      _react2.default.createElement(
                        _InputSelect2.default,
                        {
                          className: 'date',
                          onChange: function onChange(value) {
                            return _this6.props.changePaymentMonth(value, loan_index);
                          },
                          value: loan.payment_fields.date_paid.month,
                          disabled: loan.payment_fields.backend.processing,
                          errors: [] },
                        (0, _DateTime.monthList)().map(function (month, index) {
                          return _react2.default.createElement(
                            'option',
                            { key: index },
                            month
                          );
                        })
                      ),
                      _react2.default.createElement(
                        _InputSelect2.default,
                        {
                          className: 'date',
                          onChange: function onChange(value) {
                            return _this6.props.changePaymentDate(value, loan_index);
                          },
                          value: loan.payment_fields.date_paid.date,
                          disabled: loan.payment_fields.backend.processing,
                          errors: [] },
                        function () {
                          var max_days_in_month = (0, _DateTime.monthMaxdays)(loan.payment_fields.date_paid.month, loan.payment_fields.date_paid.year);
                          var dates = [];

                          for (var a = 1; a <= max_days_in_month; a++) {
                            dates.push(_react2.default.createElement(
                              'option',
                              { key: a },
                              a
                            ));
                          }

                          return dates;
                        }()
                      ),
                      _react2.default.createElement(
                        _InputSelect2.default,
                        {
                          className: 'date',
                          onChange: function onChange(value) {
                            return _this6.props.changePaymentYear(value, loan_index);
                          },
                          value: loan.payment_fields.date_paid.year,
                          disabled: loan.payment_fields.backend.processing,
                          errors: [] },
                        function () {
                          var date = new Date();
                          var years = [];
                          var max_year = date.getFullYear();
                          var min_year = max_year - 10;

                          for (var a = max_year; a >= min_year; a--) {
                            years.push(_react2.default.createElement(
                              'option',
                              { key: a },
                              a
                            ));
                          }

                          return years;
                        }()
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'div',
                        { className: 'buttons' },
                        _react2.default.createElement(_InputButton2.default, {
                          value: 'Encode payment',
                          onClick: function onClick() {
                            return _this6.props.makePayment({
                              loan_id: loan.id,
                              payment_coverage: loan.payment_fields.amount.type,
                              quarter: loan.payment_fields.period.quarter,
                              amount: loan.payment_fields.amount.value,
                              period_paid: new Date(loan.payment_fields.period.month + new Date(loan.loan_date).getDate().toString() + ', ' + loan.payment_fields.period.year).toISOString(),
                              date_paid: new Date(loan.payment_fields.date_paid.month + ' ' + loan.payment_fields.date_paid.date + ', ' + loan.payment_fields.date_paid.year).toISOString()
                            }, loan_index);
                          },
                          sending: loan.payment_fields.backend.processing,
                          disabled: loan.payment_fields.allow_submit && !loan.payment_fields.backend.processing ? false : true,
                          errors: [] })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'buttons' },
                        _react2.default.createElement(
                          'a',
                          {
                            className: loan.payment_fields.backend.processing ? 'default-btn-red disabled' : 'default-btn-red',
                            onClick: function onClick() {
                              return loan.payment_fields.backend.processing ? false : _this6.props.togglePaymentForm(false, loan_index);
                            } },
                          'Cancel'
                        )
                      ),
                      loan.payment_fields.backend.status == 'failed' ? _react2.default.createElement(
                        'p',
                        { className: 'errors' },
                        'Failed to make payment: ',
                        _react2.default.createElement(
                          'u',
                          null,
                          loan.payment_fields.backend.message
                        )
                      ) : null
                    )
                  )
                ) : null,
                loan.payment_fields.backend.status == 'successful' && !loan.payment_fields.shown ? _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    _WithIcon2.default,
                    { icon: _path2.default.join(app_path, 'app/images/check.png') },
                    _react2.default.createElement(
                      'p',
                      { className: 'okay' },
                      'Payment added successfully.'
                    )
                  )
                ) : null,
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    {
                      transitionName: 'emphasize-entry',
                      transitionEnterTimeout: 400,
                      transitionLeaveTimeout: 400 },
                    loan.loan_payments.length ? loan.loan_payments.filter(function (loan_payments, index) {
                      return index < 4;
                    }).map(function (loan_payment, loan_payment_index) {
                      return _react2.default.createElement(
                        'div',
                        { ref: function ref(element) {
                            return _this6['loan_payment_id_' + loan_payment.id] = element;
                          }, className: 'payment-container', key: loan.loan_payments.length - loan_payment_index },
                        loan_payment.edit.shown ? _react2.default.createElement(
                          'ul',
                          { className: 'payment-edit-fields' },
                          _react2.default.createElement(
                            'li',
                            null,
                            'Amount paid',
                            _react2.default.createElement(_InputText2.default, {
                              numberOnly: true,
                              value: loan_payment.edit.amount.value,
                              placeholder: 'Amount paid...',
                              onChange: function onChange(value) {
                                return _this6.props.editPaymentInformationAmount(value, loan_payment_index, loan_index);
                              },
                              errors: loan_payment.edit.amount.errors,
                              disabled: loan_payment.edit.backend.processing }),
                            _react2.default.createElement(
                              'p',
                              null,
                              _react2.default.createElement(
                                'strong',
                                null,
                                (0, _Numbers.currency)(loan_payment.edit.amount.value)
                              ),
                              ' Pesos'
                            )
                          ),
                          _react2.default.createElement(
                            'li',
                            { className: 'select-collection' },
                            _react2.default.createElement(
                              'p',
                              null,
                              'For the month of'
                            ),
                            _react2.default.createElement(
                              _InputSelect2.default,
                              {
                                className: 'date',
                                onChange: function onChange(value) {
                                  return _this6.props.editPaymentInformationPeriodMonth(value, loan_payment_index, loan_index);
                                },
                                value: loan_payment.edit.period.month,
                                disabled: loan_payment.edit.backend.processing,
                                errors: [] },
                              (0, _DateTime.monthList)().map(function (month, index) {
                                return _react2.default.createElement(
                                  'option',
                                  { key: index },
                                  month
                                );
                              })
                            ),
                            _react2.default.createElement(
                              _InputSelect2.default,
                              {
                                className: 'date',
                                onChange: function onChange(value) {
                                  return _this6.props.editPaymentInformationPeriodYear(value, loan_payment_index, loan_index);
                                },
                                value: loan_payment.edit.period.year,
                                disabled: loan_payment.edit.backend.processing,
                                errors: [] },
                              function () {
                                var date = new Date();
                                var years = [];
                                var max_year = date.getFullYear();
                                var min_year = max_year - 10;

                                for (var a = max_year; a >= min_year; a--) {
                                  years.push(_react2.default.createElement(
                                    'option',
                                    { key: a },
                                    a
                                  ));
                                }

                                return years;
                              }()
                            )
                          ),
                          _react2.default.createElement(
                            'li',
                            { className: 'select-collection' },
                            _react2.default.createElement(
                              'p',
                              null,
                              'Date paid'
                            ),
                            _react2.default.createElement(
                              _InputSelect2.default,
                              {
                                className: 'date',
                                onChange: function onChange(value) {
                                  return _this6.props.editPaymentInformationPaymentMonth(value, loan_payment_index, loan_index);
                                },
                                value: loan_payment.edit.date_paid.month,
                                disabled: loan_payment.edit.backend.processing,
                                errors: [] },
                              (0, _DateTime.monthList)().map(function (month, index) {
                                return _react2.default.createElement(
                                  'option',
                                  { key: index },
                                  month
                                );
                              })
                            ),
                            _react2.default.createElement(
                              _InputSelect2.default,
                              {
                                className: 'date',
                                onChange: function onChange(value) {
                                  return _this6.props.editPaymentInformationPaymentDate(value, loan_payment_index, loan_index);
                                },
                                value: loan_payment.edit.date_paid.date,
                                disabled: loan_payment.edit.backend.processing,
                                errors: [] },
                              function () {
                                var max_days_in_month = (0, _DateTime.monthMaxdays)(loan_payment.edit.date_paid.month, loan_payment.edit.date_paid.year);
                                var dates = [];

                                for (var a = 1; a <= max_days_in_month; a++) {
                                  dates.push(_react2.default.createElement(
                                    'option',
                                    { key: a },
                                    a
                                  ));
                                }

                                return dates;
                              }()
                            ),
                            _react2.default.createElement(
                              _InputSelect2.default,
                              {
                                className: 'date',
                                onChange: function onChange(value) {
                                  return _this6.props.editPaymentInformationPaymentYear(value, loan_payment_index, loan_index);
                                },
                                value: loan_payment.edit.date_paid.year,
                                disabled: loan_payment.edit.backend.processing,
                                errors: [] },
                              function () {
                                var date = new Date();
                                var years = [];
                                var max_year = date.getFullYear();
                                var min_year = max_year - 10;

                                for (var a = max_year; a >= min_year; a--) {
                                  years.push(_react2.default.createElement(
                                    'option',
                                    { key: a },
                                    a
                                  ));
                                }

                                return years;
                              }()
                            )
                          ),
                          _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                              'div',
                              { className: 'buttons' },
                              _react2.default.createElement(_InputButton2.default, {
                                value: 'Save changes',
                                onClick: function onClick() {
                                  return _this6.props.editPaymentInformationSend({
                                    payment_id: loan_payment.id,
                                    payment_coverage: loan_payment.edit.amount.type,
                                    quarter: loan_payment.edit.period.quarter,
                                    amount: loan_payment.edit.amount.value,
                                    period_paid: new Date(loan_payment.edit.period.month + ' ' + new Date(loan.loan_date).getDate().toString() + ', ' + loan_payment.edit.period.year).toISOString(),
                                    date_paid: new Date(loan_payment.edit.date_paid.month + ' ' + loan_payment.edit.date_paid.date + ', ' + loan_payment.edit.date_paid.year).toISOString()
                                  }, loan_payment_index, loan_index);
                                },
                                sending: loan_payment.edit.backend.processing,
                                disabled: loan_payment.edit.allow_submit && !loan_payment.edit.backend.processing ? false : true,
                                errors: [] })
                            ),
                            _react2.default.createElement(
                              'div',
                              { className: 'buttons' },
                              _react2.default.createElement(
                                'a',
                                {
                                  className: loan_payment.edit.backend.processing ? 'default-btn-red disabled' : 'default-btn-red',
                                  onClick: function onClick() {
                                    return loan_payment.edit.backend.processing ? false : _this6.props.toggleEditPaymentInformation(!loan_payment.edit.shown, loan_payment_index, loan_index);
                                  } },
                                'Cancel'
                              )
                            )
                          ),
                          loan_payment.edit.backend.status == 'failed' ? _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                              _WithIcon2.default,
                              { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                              _react2.default.createElement(
                                'p',
                                { className: 'errors' },
                                'Failed to save changes ',
                                _react2.default.createElement(
                                  'u',
                                  null,
                                  loan_payment.edit.backend.message
                                )
                              )
                            )
                          ) : null
                        ) : _react2.default.createElement(
                          'div',
                          null,
                          _this6.props.borrower_profile.hash.value == loan_payment.id && !_this6.props.borrower_profile.hash.removed ? _react2.default.createElement(
                            _reactAddonsCssTransitionGroup2.default,
                            {
                              transitionName: 'emphasize-background',
                              transitionAppear: true,
                              transitionAppearTimeout: 1000,
                              transitionEnterTimeout: 400,
                              transitionLeaveTimeout: 400 },
                            _this6.showLoanPayment(loan, loan_payment, loan_payment_index, loan_index, app_path)
                          ) : _this6.showLoanPayment(loan, loan_payment, loan_payment_index, loan_index, app_path)
                        )
                      );
                    }) : _react2.default.createElement(
                      'div',
                      { className: 'row' },
                      _react2.default.createElement(
                        'p',
                        null,
                        'No payments has been made since ',
                        _react2.default.createElement(
                          'strong',
                          null,
                          (0, _DateTime.toFormalDate)(loan.loan_date)
                        )
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'right' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'Penalties'
                ),
                !loan.penalty_fields.shown ? _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'a',
                    { className: loan.penalty_fields.backend.processing ? 'default-btn-blue disabled' : 'default-btn-blue',
                      onClick: function onClick() {
                        return loan.penalty_fields.backend.processing ? false : _this6.props.togglePenaltyForm(true, loan_index);
                      } },
                    'Add new penalty'
                  )
                ) : _react2.default.createElement(
                  'ul',
                  { className: 'penalty-form' },
                  _react2.default.createElement(
                    'li',
                    null,
                    'Amount',
                    _react2.default.createElement(_InputText2.default, {
                      numberOnly: true,
                      value: loan.penalty_fields.amount.value,
                      placeholder: 'Amount...',
                      onChange: function onChange(value) {
                        return _this6.props.changePenaltyFormAmount(value, loan_index);
                      },
                      errors: loan.penalty_fields.amount.errors,
                      disabled: loan.penalty_fields.backend.processing }),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        (0, _Numbers.currency)(loan.penalty_fields.amount.value)
                      ),
                      ' Pesos'
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'select-collection' },
                    _react2.default.createElement(
                      'p',
                      null,
                      'Date given'
                    ),
                    _react2.default.createElement(
                      _InputSelect2.default,
                      {
                        className: 'date',
                        onChange: function onChange(value) {
                          return _this6.props.changePenaltyMonth(value, loan_index);
                        },
                        value: loan.penalty_fields.date_given.month,
                        disabled: loan.penalty_fields.backend.processing,
                        errors: [] },
                      (0, _DateTime.monthList)().map(function (month, index) {
                        return _react2.default.createElement(
                          'option',
                          { key: index },
                          month
                        );
                      })
                    ),
                    _react2.default.createElement(
                      _InputSelect2.default,
                      {
                        className: 'date',
                        onChange: function onChange(value) {
                          return _this6.props.changePenaltyDate(value, loan_index);
                        },
                        value: loan.penalty_fields.date_given.date,
                        disabled: loan.penalty_fields.backend.processing,
                        errors: [] },
                      function () {
                        var max_days_in_month = (0, _DateTime.monthMaxdays)(loan.penalty_fields.date_given.month, loan.penalty_fields.date_given.year);
                        var dates = [];

                        for (var a = 1; a <= max_days_in_month; a++) {
                          dates.push(_react2.default.createElement(
                            'option',
                            { key: a },
                            a
                          ));
                        }

                        return dates;
                      }()
                    ),
                    _react2.default.createElement(
                      _InputSelect2.default,
                      {
                        className: 'date',
                        onChange: function onChange(value) {
                          return _this6.props.changePenaltyYear(value, loan_index);
                        },
                        value: loan.penalty_fields.date_given.year,
                        disabled: loan.penalty_fields.backend.processing,
                        errors: [] },
                      function () {
                        var date = new Date();
                        var years = [];
                        var max_year = date.getFullYear();
                        var min_year = max_year - 10;

                        for (var a = max_year; a >= min_year; a--) {
                          years.push(_react2.default.createElement(
                            'option',
                            { key: a },
                            a
                          ));
                        }

                        return years;
                      }()
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'p',
                      null,
                      'Remarks'
                    ),
                    _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/information.png') },
                      _react2.default.createElement(
                        'p',
                        null,
                        'A short description about this penalty, e.g., ',
                        _react2.default.createElement(
                          'i',
                          null,
                          'No payment in two months'
                        ),
                        '.'
                      )
                    ),
                    _react2.default.createElement(_InputText2.default, {
                      value: loan.penalty_fields.remarks.value,
                      placeholder: 'Remarks...',
                      onChange: function onChange(value) {
                        return _this6.props.changePenaltyFormRemarks(value, loan_index);
                      },
                      errors: loan.penalty_fields.remarks.errors,
                      disabled: loan.penalty_fields.backend.processing })
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'buttons' },
                      _react2.default.createElement(_InputButton2.default, {
                        value: 'Create penalty',
                        onClick: function onClick() {
                          return _this6.props.createPenalty({
                            amount: loan.penalty_fields.amount.value,
                            remarks: loan.penalty_fields.remarks.value,
                            date_given: new Date(loan.penalty_fields.date_given.month + ' ' + loan.penalty_fields.date_given.date + ', ' + loan.penalty_fields.date_given.year).toISOString(),
                            loan_id: loan.id
                          }, loan_index);
                        },
                        sending: loan.penalty_fields.backend.processing,
                        disabled: loan.penalty_fields.allow_submit && !loan.penalty_fields.backend.processing ? false : true,
                        errors: [] })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'buttons' },
                      _react2.default.createElement(
                        'a',
                        {
                          className: loan.penalty_fields.backend.processing ? 'default-btn-red disabled' : 'default-btn-red',
                          onClick: function onClick() {
                            return loan.penalty_fields.backend.processing ? false : _this6.props.togglePenaltyForm(false, loan_index);
                          } },
                        'Cancel'
                      )
                    )
                  ),
                  loan.penalty_fields.backend.status == 'failed' && !loan.penalty_fields.shown ? _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'p',
                      { className: 'errors' },
                      'Failed to create penalty: ',
                      _react2.default.createElement(
                        'u',
                        null,
                        loan.penalty_fields.backend.message
                      )
                    )
                  ) : null
                ),
                loan.penalty_fields.backend.status == 'successful' && !loan.penalty_fields.shown ? _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    _WithIcon2.default,
                    { icon: _path2.default.join(app_path, 'app/images/check.png') },
                    _react2.default.createElement(
                      'p',
                      { className: 'okay' },
                      'Penalty added successfully.'
                    )
                  )
                ) : null,
                _react2.default.createElement(
                  _reactAddonsCssTransitionGroup2.default,
                  {
                    transitionName: 'emphasize-entry',
                    transitionEnterTimeout: 400,
                    transitionLeaveTimeout: 400 },
                  loan.penalties.length ? loan.penalties.map(function (penalty, penalty_index) {
                    return _react2.default.createElement(
                      'div',
                      { ref: function ref(element) {
                          return _this6['penalty_id_' + penalty.id] = element;
                        }, className: 'payment-container', key: loan.penalties.length - penalty_index },
                      penalty.edit.shown ? _react2.default.createElement(
                        'ul',
                        { className: 'penalty-form' },
                        _react2.default.createElement(
                          'li',
                          null,
                          'Amount',
                          _react2.default.createElement(_InputText2.default, {
                            numberOnly: true,
                            value: penalty.edit.amount.value,
                            placeholder: 'Amount...',
                            onChange: function onChange(value) {
                              return _this6.props.changePenaltyEditAmount(value, penalty_index, loan_index);
                            },
                            errors: penalty.edit.amount.errors,
                            disabled: penalty.edit.backend.processing }),
                          _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                              'strong',
                              null,
                              (0, _Numbers.currency)(penalty.edit.amount.value)
                            ),
                            ' Pesos'
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          { className: 'select-collection' },
                          _react2.default.createElement(
                            'p',
                            null,
                            'Date given'
                          ),
                          _react2.default.createElement(
                            _InputSelect2.default,
                            {
                              className: 'date',
                              onChange: function onChange(value) {
                                return _this6.props.changePenaltyEditMonth(value, penalty_index, loan_index);
                              },
                              value: penalty.edit.date_given.month,
                              disabled: penalty.edit.backend.processing,
                              errors: [] },
                            (0, _DateTime.monthList)().map(function (month, index) {
                              return _react2.default.createElement(
                                'option',
                                { key: index },
                                month
                              );
                            })
                          ),
                          _react2.default.createElement(
                            _InputSelect2.default,
                            {
                              className: 'date',
                              onChange: function onChange(value) {
                                return _this6.props.changePenaltyEditDate(value, penalty_index, loan_index);
                              },
                              value: penalty.edit.date_given.date,
                              disabled: penalty.edit.backend.processing,
                              errors: [] },
                            function () {
                              var max_days_in_month = (0, _DateTime.monthMaxdays)(penalty.edit.date_given.month, penalty.edit.date_given.year);
                              var dates = [];

                              for (var a = 1; a <= max_days_in_month; a++) {
                                dates.push(_react2.default.createElement(
                                  'option',
                                  { key: a },
                                  a
                                ));
                              }

                              return dates;
                            }()
                          ),
                          _react2.default.createElement(
                            _InputSelect2.default,
                            {
                              className: 'date',
                              onChange: function onChange(value) {
                                return _this6.props.changePenaltyEditYear(value, penalty_index, loan_index);
                              },
                              value: penalty.edit.date_given.year,
                              disabled: penalty.edit.backend.processing,
                              errors: [] },
                            function () {
                              var date = new Date();
                              var years = [];
                              var max_year = date.getFullYear();
                              var min_year = max_year - 10;

                              for (var a = max_year; a >= min_year; a--) {
                                years.push(_react2.default.createElement(
                                  'option',
                                  { key: a },
                                  a
                                ));
                              }

                              return years;
                            }()
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            'p',
                            null,
                            'Remarks'
                          ),
                          _react2.default.createElement(
                            _WithIcon2.default,
                            { icon: _path2.default.join(app_path, 'app/images/information.png') },
                            _react2.default.createElement(
                              'p',
                              null,
                              'A short description about this penalty, e.g., ',
                              _react2.default.createElement(
                                'i',
                                null,
                                'No payment in two months'
                              ),
                              '.'
                            )
                          ),
                          _react2.default.createElement(_InputText2.default, {
                            value: penalty.edit.remarks.value,
                            placeholder: 'Remarks...',
                            onChange: function onChange(value) {
                              return _this6.props.changePenaltyEditRemarks(value, penalty_index, loan_index);
                            },
                            errors: penalty.edit.remarks.errors,
                            disabled: penalty.edit.backend.processing })
                        ),
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            'div',
                            { className: 'buttons' },
                            _react2.default.createElement(_InputButton2.default, {
                              value: 'Save changes',
                              onClick: function onClick() {
                                return _this6.props.savePenaltyEdit({
                                  amount: penalty.edit.amount.value,
                                  date_given: new Date(penalty.edit.date_given.month + ' ' + penalty.edit.date_given.date + ', ' + penalty.edit.date_given.year).toISOString(),
                                  penalty_id: penalty.id,
                                  remarks: penalty.edit.remarks.value,
                                  loan_index: loan_index,
                                  penalty_index: penalty_index
                                }, penalty_index, loan_index);
                              },
                              sending: penalty.edit.backend.processing,
                              disabled: penalty.edit.allow_submit && !penalty.edit.backend.processing ? false : true,
                              errors: [] })
                          ),
                          _react2.default.createElement(
                            'div',
                            { className: 'buttons' },
                            _react2.default.createElement(
                              'a',
                              {
                                className: !penalty.edit.backend.processing ? 'default-btn-red' : 'default-btn-red disabled',
                                onClick: function onClick() {
                                  return penalty.edit.backend.processing ? false : _this6.props.togglePenaltyEdit(false, penalty_index, loan_index);
                                } },
                              'Cancel'
                            )
                          )
                        )
                      ) : _react2.default.createElement(
                        'div',
                        null,
                        _this6.props.borrower_profile.hash.value == penalty.id && !_this6.props.borrower_profile.hash.removed ? _react2.default.createElement(
                          _reactAddonsCssTransitionGroup2.default,
                          {
                            transitionName: 'emphasize-background',
                            transitionAppear: true,
                            transitionAppearTimeout: 1000,
                            transitionEnterTimeout: 1000,
                            transitionLeaveTimeout: 1000 },
                          _this6.showPenalty(penalty, penalty_index, app_path, loan_index)
                        ) : _this6.showPenalty(penalty, penalty_index, app_path, loan_index)
                      )
                    );
                  }) : _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'p',
                      null,
                      'No penalties where given so far.'
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'borrower-profile' },
          this.props.borrower_profile.backend.processing || !this.props.borrower_profile.data && !this.props.borrower_profile.backend.status ? _react2.default.createElement(
            'div',
            { className: 'loading-contents' },
            _react2.default.createElement('img', { src: _path2.default.join(app_path, 'app/images/processing-blue.gif') })
          ) : !this.props.borrower_profile.backend.processing && this.props.borrower_profile.backend.status == 'failed' ? _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/cross.png') },
            _react2.default.createElement(
              'p',
              { className: 'errors' },
              this.props.borrower_profile.backend.message
            )
          ) : _react2.default.createElement(
            'section',
            null,
            _react2.default.createElement(
              'section',
              null,
              _react2.default.createElement(
                'h1',
                null,
                'Personal information'
              ),
              _react2.default.createElement(
                'p',
                null,
                this.props.borrower_profile.data.firstname,
                ' ',
                this.props.borrower_profile.data.middlename,
                ' ',
                this.props.borrower_profile.data.surname
              ),
              _react2.default.createElement(
                'p',
                null,
                this.props.borrower_profile.data.gender ? 'Male' : 'Female'
              ),
              _react2.default.createElement(
                'p',
                null,
                this.props.borrower_profile.data.address
              )
            ),
            _react2.default.createElement(
              'section',
              null,
              _react2.default.createElement(
                'h1',
                null,
                'Contact information'
              ),
              _react2.default.createElement(
                'ul',
                null,
                this.props.borrower_profile.data.contact_numbers.map(function (contact_number, index) {
                  return _react2.default.createElement(
                    'li',
                    { key: index },
                    contact_number.number
                  );
                })
              )
            ),
            _react2.default.createElement(
              'section',
              { className: 'action-buttons' },
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'default-btn-blue buttons', to: '/borrowers/' + this.props.params.id + '/edit' },
                'Edit borrower information'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'default-btn-blue buttons', to: '/borrowers/' + this.props.params.id + '/new-loan' },
                'Add loan'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'default-btn-blue buttons', to: '/borrowers/' + this.props.params.id + '/comprehensive-report' },
                'Comprehensive Report'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'default-btn-blue buttons', to: '/borrowers/' + this.props.params.id + '/summary-report' },
                'Summary Report'
              )
            ),
            this.props.borrower_profile.data.loans.map(function (loan, loan_index) {
              return _this7.props.borrower_profile.hash.value == loan.id && !_this7.props.borrower_profile.hash.removed ? _react2.default.createElement(
                'section',
                { ref: function ref(element) {
                    return _this7['loan_id_' + loan.id] = element;
                  }, key: loan_index },
                _react2.default.createElement(
                  _reactAddonsCssTransitionGroup2.default,
                  {
                    key: loan_index,
                    transitionName: 'emphasize-background',
                    transitionAppear: true,
                    transitionAppearTimeout: 1000,
                    transitionEnterTimeout: 1000,
                    transitionLeaveTimeout: 1000 },
                  _this7.showLoanInformation(loan, loan_index, app_path)
                )
              ) : _react2.default.createElement(
                'section',
                { ref: function ref(element) {
                    return _this7['loan_id_' + loan.id] = element;
                  }, key: loan_index },
                _this7.showLoanInformation(loan, loan_index, app_path)
              );
            })
          )
        )
      );
    }
  }]);

  return BorrowerProfile;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    borrower_profile: _extends({}, store.borrower_profile)
  };
}, {
  fetch: borrowerProfileActions.fetch,
  reset: borrowerProfileActions.reset,
  togglePaymentForm: borrowerProfileActions.togglePaymentForm,
  changePeriodMonth: borrowerProfileActions.changePeriodMonth,
  changePeriodYear: borrowerProfileActions.changePeriodYear,
  changePeriodQuarter: borrowerProfileActions.changePeriodQuarter,
  changeAmountPaid: borrowerProfileActions.changeAmountPaid,
  changePaymentType: borrowerProfileActions.changePaymentType,
  changePaymentMonth: borrowerProfileActions.changePaymentMonth,
  changePaymentDate: borrowerProfileActions.changePaymentDate,
  changePaymentYear: borrowerProfileActions.changePaymentYear,
  makePayment: borrowerProfileActions.makePayment,
  toggleEditPaymentInformation: borrowerProfileActions.toggleEditPaymentInformation,
  editPaymentInformationAmount: borrowerProfileActions.editPaymentInformationAmount,
  editPaymentInformationPaymentType: borrowerProfileActions.editPaymentInformationPaymentType,
  editPaymentInformationPeriodMonth: borrowerProfileActions.editPaymentInformationPeriodMonth,
  editPaymentInformationPeriodYear: borrowerProfileActions.editPaymentInformationPeriodYear,
  editPaymentInformationPaymentYear: borrowerProfileActions.editPaymentInformationPaymentYear,
  editPaymentInformationPaymentMonth: borrowerProfileActions.editPaymentInformationPaymentMonth,
  editPaymentInformationPaymentDate: borrowerProfileActions.editPaymentInformationPaymentDate,
  editPaymentInformationSend: borrowerProfileActions.editPaymentInformationSend,
  toggleEditLoanInformation: borrowerProfileActions.toggleEditLoanInformation,
  editLoanInformationAmount: borrowerProfileActions.editLoanInformationAmount,
  editLoanInformationCondition: borrowerProfileActions.editLoanInformationCondition,
  editLoanInformationInterestRate: borrowerProfileActions.editLoanInformationInterestRate,
  editLoanInformationInterestType: borrowerProfileActions.editLoanInformationInterestType,
  editLoanInformationMonthsToPay: borrowerProfileActions.editLoanInformationMonthsToPay,
  editLoanInformationDateLoanMonth: borrowerProfileActions.editLoanInformationDateLoanMonth,
  editLoanInformationDateLoanDate: borrowerProfileActions.editLoanInformationDateLoanDate,
  editLoanInformationDateLoanYear: borrowerProfileActions.editLoanInformationDateLoanYear,
  editLoanInformatioPaymentMethod: borrowerProfileActions.editLoanInformatioPaymentMethod,
  editLoanInformationDateOfPaymentMonth: borrowerProfileActions.editLoanInformationDateOfPaymentMonth,
  editLoanInformationDateOfPaymentDate: borrowerProfileActions.editLoanInformationDateOfPaymentDate,
  editLoanInformationDateOfPaymentYear: borrowerProfileActions.editLoanInformationDateOfPaymentYear,
  editLoanInformatioSend: borrowerProfileActions.editLoanInformatioSend,
  togglePenaltyForm: borrowerProfileActions.togglePenaltyForm,
  changePenaltyFormAmount: borrowerProfileActions.changePenaltyFormAmount,
  changePenaltyFormRemarks: borrowerProfileActions.changePenaltyFormRemarks,
  changePenaltyDate: borrowerProfileActions.changePenaltyDate,
  changePenaltyMonth: borrowerProfileActions.changePenaltyMonth,
  changePenaltyYear: borrowerProfileActions.changePenaltyYear,
  createPenalty: borrowerProfileActions.createPenalty,
  togglePenaltyPaymentForm: borrowerProfileActions.togglePenaltyPaymentForm,
  changePenaltyPaymentFormAmount: borrowerProfileActions.changePenaltyPaymentFormAmount,
  changePenaltyPaymentFormMonth: borrowerProfileActions.changePenaltyPaymentFormMonth,
  changePenaltyPaymentFormDate: borrowerProfileActions.changePenaltyPaymentFormDate,
  changePenaltyPaymentFormYear: borrowerProfileActions.changePenaltyPaymentFormYear,
  submitPenaltyPaymentForm: borrowerProfileActions.submitPenaltyPaymentForm,
  togglePenaltyEdit: borrowerProfileActions.togglePenaltyEdit,
  changePenaltyEditAmount: borrowerProfileActions.changePenaltyEditAmount,
  changePenaltyEditDate: borrowerProfileActions.changePenaltyEditDate,
  changePenaltyEditMonth: borrowerProfileActions.changePenaltyEditMonth,
  changePenaltyEditYear: borrowerProfileActions.changePenaltyEditYear,
  changePenaltyEditRemarks: borrowerProfileActions.changePenaltyEditRemarks,
  savePenaltyEdit: borrowerProfileActions.savePenaltyEdit,
  togglePenaltyPaymentEdit: borrowerProfileActions.togglePenaltyPaymentEdit,
  changePenaltyPaymentEditAmount: borrowerProfileActions.changePenaltyPaymentEditAmount,
  changePenaltyPaymentEditMonth: borrowerProfileActions.changePenaltyPaymentEditMonth,
  changePenaltyPaymentEditDate: borrowerProfileActions.changePenaltyPaymentEditDate,
  changePenaltyPaymentEditYear: borrowerProfileActions.changePenaltyPaymentEditYear,
  changePenaltyPaymentEditSave: borrowerProfileActions.changePenaltyPaymentEditSave,
  removeHash: borrowerProfileActions.removeHash,
  wavePenaltyToggle: borrowerProfileActions.wavePenaltyToggle,
  wavePenaltyChangeRemarks: borrowerProfileActions.wavePenaltyChangeRemarks,
  wavePenaltySubmit: borrowerProfileActions.wavePenaltySubmit
})(BorrowerProfile);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _DateTime = __webpack_require__(3);

var _Numbers = __webpack_require__(8);

var _borrower_reports = __webpack_require__(22);

var reportsActions = _interopRequireWildcard(_borrower_reports);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// helpers

// actions


var BorrowerSummaryReport = function (_Component) {
  _inherits(BorrowerSummaryReport, _Component);

  function BorrowerSummaryReport(props) {
    _classCallCheck(this, BorrowerSummaryReport);

    var _this = _possibleConstructorReturn(this, (BorrowerSummaryReport.__proto__ || Object.getPrototypeOf(BorrowerSummaryReport)).call(this, props));

    _this.print = _this.print.bind(_this);
    return _this;
  }

  _createClass(BorrowerSummaryReport, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'print',
    value: function print() {
      window.print();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'report-container' },
          this.props.borrower.data ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'h1',
                null,
                'Borrower Comprehensive Report'
              ),
              _react2.default.createElement(
                'div',
                { className: 'borrower-info' },
                _react2.default.createElement(
                  'table',
                  { className: 'left short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Full Name'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.borrower.data.firstname,
                        ' ',
                        this.props.borrower.data.middlename,
                        ' ',
                        this.props.borrower.data.surname
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Sex'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.borrower.data.gender ? 'Male' : 'Female'
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Contact Numbers'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.borrower.data.contact_numbers.length ? this.props.borrower.data.contact_numbers.map(function (contact_number, contact_number_index) {
                          if (contact_number_index + 1 != _this2.props.borrower.data.contact_numbers.length) {
                            return contact_number.number + ', ';
                          } else {
                            return contact_number.number;
                          }
                        }) : 'No record.'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'right short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Date'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _DateTime.toFormalDate)(new Date())
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'body' },
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loans, Penalties, and Payments'
                ),
                this.props.borrower.data.loans.map(function (loan, loan_index) {
                  return _react2.default.createElement(
                    'section',
                    { key: loan_index },
                    _react2.default.createElement(
                      'table',
                      { className: 'short-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Loan Trace ID'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.id
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Fully paid'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.loan_summary.remaining_balance == 0 ? 'Yes' : 'No'
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Date Loan'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            (0, _DateTime.toFormalDate)(loan.loan_date)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Loan Amount'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.amount)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Interest'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.interest_type == 'percentage' ? (0, _Numbers.currency)(loan.interest_rate) + ' Percent' : 'PHP ' + (0, _Numbers.currency)(loan.interest_rate)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Total Amount To Pay'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.amount + loan.profit)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Payment'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.payment_method == 1 ? 'Monthly installments of PHP ' + (0, _Numbers.currency)(loan.per_month) : loan.payment_method == 2 ? 'Semi-monthly installments of PHP ' + (0, _Numbers.currency)(loan.per_month) : loan.payment_method == 4 ? 'One give of PHP ' + (0, _Numbers.currency)(loan.amount + loan.profit) + ' on ' + (0, _DateTime.toFormalDate)(loan.expected_date_of_payment) : 'Daily installments of PHP ' + (0, _Numbers.currency)(loan.per_month)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Months To Pay'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            loan.payment_method == 4 ? 'N/A' : loan.months_to_pay > 1 ? loan.months_to_pay + ' months' : loan.months_to_pay + ' month'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'Loan Payments'
                      )
                    ),
                    _react2.default.createElement(
                      'table',
                      { className: 'short-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Total Amount To Pay'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.loan_summary.total_amount_to_pay)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Total Amount Paid'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.loan_summary.total_amount_paid)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Remaining Balance'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.loan_summary.remaining_balance)
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'Penalty'
                      )
                    ),
                    _react2.default.createElement(
                      'table',
                      { className: 'short-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Total Amount To Pay'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.penalties_summary.total_penalties)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Total Amount Paid'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.penalties_summary.total_amount_paid)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Remaining Balance'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(loan.penalties_summary.remaining_balance)
                          )
                        )
                      )
                    )
                  );
                })
              ),
              _react2.default.createElement(
                'a',
                {
                  className: 'default-btn-blue print-btn',
                  onClick: this.print },
                'Print'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                {
                  to: '/borrowers/' + this.props.params.id + '/view',
                  className: 'default-btn-blue print-btn' },
                'Go back'
              )
            )
          ) : this.props.borrower.backend.status == 'failed' ? _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/cross.gif') },
            _react2.default.createElement(
              'p',
              null,
              this.props.borrower.backend.message
            )
          ) : _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
            _react2.default.createElement(
              'p',
              null,
              'Please wait...'
            )
          )
        )
      );
    }
  }]);

  return BorrowerSummaryReport;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    borrower: _extends({}, store.borrower_reports)
  };
}, {
  fetch: reportsActions.fetch
})(BorrowerSummaryReport);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _reactRouter = __webpack_require__(5);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithLabel = __webpack_require__(18);

var _WithLabel2 = _interopRequireDefault(_WithLabel);

var _borrowers_list = __webpack_require__(51);

var borrowersListActions = _interopRequireWildcard(_borrowers_list);

var _Numbers = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components

// actions

// helpers


var BorrowersList = function (_Component) {
  _inherits(BorrowersList, _Component);

  function BorrowersList() {
    _classCallCheck(this, BorrowersList);

    return _possibleConstructorReturn(this, (BorrowersList.__proto__ || Object.getPrototypeOf(BorrowersList)).apply(this, arguments));
  }

  _createClass(BorrowersList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'List of borrowers - LIMS';
      this.props.fetch();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.reset();
    }
  }, {
    key: 'render',
    value: function render() {
      var app_path = _electron.remote.app.getAppPath();

      var borrowers = this.props.borrowers_list.list.map(function (borrower, index) {
        return _react2.default.createElement(
          'section',
          { className: 'borrower-info', key: index },
          _react2.default.createElement(
            'h1',
            { className: 'borrower-name' },
            borrower.firstname,
            ' ',
            borrower.middlename,
            ' ',
            borrower.surname
          ),
          _react2.default.createElement(
            'section',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _WithLabel2.default,
                { label: 'Gender' },
                _react2.default.createElement(
                  'p',
                  null,
                  borrower.gender ? 'Male' : 'Female'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _WithLabel2.default,
                { label: 'Contact numbers' },
                _react2.default.createElement(
                  'p',
                  null,
                  borrower.contact_numbers.map(function (contact_number, index) {
                    return contact_number.number + (index + 1 < borrower.contact_numbers.length ? ', ' : '');
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _WithLabel2.default,
                { label: 'Total unpaid loan balance' },
                _react2.default.createElement(
                  'p',
                  null,
                  (0, _Numbers.currency)(borrower.summary.total_unpaid_balance),
                  ' Pesos'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _WithLabel2.default,
                { label: 'Total unpaid penalties balance' },
                _react2.default.createElement(
                  'p',
                  null,
                  (0, _Numbers.currency)(borrower.summary.total_unpaid_penalties),
                  ' Pesos'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _WithLabel2.default,
                { label: 'Total loans' },
                _react2.default.createElement(
                  'div',
                  null,
                  borrower.summary.total_loans > 1 ? _react2.default.createElement(
                    'p',
                    null,
                    borrower.summary.total_loans,
                    ' total loans'
                  ) : _react2.default.createElement(
                    'p',
                    null,
                    borrower.summary.total_loans,
                    ' total loan'
                  ),
                  borrower.summary.total_unpaid_loans >= 0 ? _react2.default.createElement(
                    'p',
                    null,
                    borrower.summary.total_unpaid_loans,
                    ' total unpaid loans.'
                  ) : _react2.default.createElement(
                    'p',
                    null,
                    borrower.summary.total_unpaid_loans,
                    ' total unpaid loan.'
                  ),
                  borrower.summary.total_paid_loans >= 0 ? _react2.default.createElement(
                    'p',
                    null,
                    borrower.summary.total_paid_loans,
                    ' total paid loans.'
                  ) : _react2.default.createElement(
                    'p',
                    null,
                    borrower.summary.total_paid_loans,
                    ' total paid loan.'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'section',
            { className: 'buttons' },
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouter.Link,
                  { className: 'default-btn-blue', to: 'borrowers/' + borrower.id + '/view' },
                  'View borrower profile'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouter.Link,
                  { className: 'default-btn-blue', to: 'borrowers/' + borrower.id + '/edit' },
                  'Edit borrower information'
                )
              )
            )
          )
        );
      });

      return _react2.default.createElement(
        _WithSidebar2.default,
        { onLink: 'borrowers-list' },
        this.props.borrowers_list.backend.processing ? _react2.default.createElement('img', { src: _path2.default.join(app_path, 'app/images/processing-blue.gif') }) : _react2.default.createElement(
          'div',
          { className: 'borrowers-list-wrapper' },
          borrowers.length ? borrowers : _react2.default.createElement(
            'p',
            null,
            'There are no borrowers yet. To add a new borrower, click on the ',
            _react2.default.createElement(
              'strong',
              null,
              'Register new borrower'
            ),
            ' on the side bar.'
          )
        )
      );
    }
  }]);

  return BorrowersList;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    borrowers_list: _extends({}, store.borrowers_list)
  };
}, {
  fetch: borrowersListActions.fetch,
  reset: borrowersListActions.reset
})(BorrowersList);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _DateTime = __webpack_require__(3);

var _Numbers = __webpack_require__(8);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithLabel = __webpack_require__(18);

var _WithLabel2 = _interopRequireDefault(_WithLabel);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

var _InputSelect = __webpack_require__(12);

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _Modal = __webpack_require__(58);

var _Modal2 = _interopRequireDefault(_Modal);

var _dashboard = __webpack_require__(52);

var dashboardActions = _interopRequireWildcard(_dashboard);

var _search = __webpack_require__(56);

var searchActions = _interopRequireWildcard(_search);

var _borrower_profile = __webpack_require__(14);

var _income_expense_report = __webpack_require__(54);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// helpers

// components

// actions


var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.displayLoanDueDate = _this.displayLoanDueDate.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Dashboard - LIMS';

      this.props.searchReset();
      this.props.getDueDatesTomorrow();
      this.props.getDueDatesToday();
      this.props.getDueDatesThisMonth();
      this.props.getPastDueDates();
      this.props.fetch();
      this.props.getOneGives();
    }
  }, {
    key: 'displayLoanDueDate',
    value: function displayLoanDueDate(loan, app_path) {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Borrower' },
            _react2.default.createElement(
              'p',
              null,
              loan.borrower.firstname,
              ' ',
              loan.borrower.middlename,
              ' ',
              loan.borrower.surname
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Borrower trace ID' },
            _react2.default.createElement(
              'p',
              null,
              loan.borrower.id
            )
          )
        ),
        loan.due_date ? _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Due date' },
            _react2.default.createElement(
              'p',
              null,
              (0, _DateTime.toFormalDate)(loan.due_date)
            )
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Borrower contact numbers' },
            loan.borrower.contact_numbers.length ? _react2.default.createElement(
              'ul',
              null,
              loan.borrower.contact_numbers.map(function (contact_number, contact_number_index) {
                return _react2.default.createElement(
                  'li',
                  { key: contact_number_index },
                  contact_number.number
                );
              })
            ) : _react2.default.createElement(
              _WithIcon2.default,
              { icon: _path2.default.join(app_path, 'app/images/cross.png') },
              _react2.default.createElement(
                'p',
                null,
                'No contact numbers to show.'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Loan amount' },
            _react2.default.createElement(
              'p',
              null,
              (0, _Numbers.currency)(loan.amount),
              ' Pesos'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            _WithLabel2.default,
            { label: 'Loan trace ID' },
            _react2.default.createElement(
              'p',
              null,
              loan.id
            )
          )
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { className: 'default-btn-blue', to: '/borrowers/' + loan.borrower.id + '/view', onClick: function onClick() {
              return _this2.props.putHash(loan.id);
            } },
          'View loan'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        { onLink: 'dashboard' },
        _react2.default.createElement(
          'div',
          { className: 'dashboard' },
          this.props.search.search_results.length ? _react2.default.createElement(
            _Modal2.default,
            { dismiss: this.props.searchReset },
            this.props.search.query.type == 'borrower' ? _react2.default.createElement(
              'div',
              { className: 'search-result-list' },
              _react2.default.createElement(
                'div',
                { className: 'header' },
                this.props.search.search_results.length > 1 ? _react2.default.createElement(
                  'h1',
                  null,
                  this.props.search.search_results.length,
                  ' borrowers were found.'
                ) : _react2.default.createElement(
                  'h1',
                  null,
                  this.props.search.search_results.length,
                  ' borrower was found.'
                )
              ),
              this.props.search.search_results.map(function (search_result, search_result_index) {
                return _react2.default.createElement(
                  'div',
                  { className: 'search-result-row', key: search_result_index },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Full name' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.firstname,
                        ' ',
                        search_result.middlename,
                        ' ',
                        search_result.surname
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Date registered' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _DateTime.toFormalDate)(search_result.created_at)
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { className: 'default-btn-blue', to: '/borrowers/' + search_result.id + '/view' },
                    'View borrower profile'
                  )
                );
              })
            ) : this.props.search.query.type == 'loan' ? _react2.default.createElement(
              'div',
              { className: 'search-result-list' },
              _react2.default.createElement(
                'div',
                { className: 'header' },
                this.props.search.search_results.length > 1 ? _react2.default.createElement(
                  'h1',
                  null,
                  this.props.search.search_results.length,
                  ' loans were found.'
                ) : _react2.default.createElement(
                  'h1',
                  null,
                  this.props.search.search_results.length,
                  ' loan was found.'
                )
              ),
              this.props.search.search_results.map(function (search_result, search_result_index) {
                return _react2.default.createElement(
                  'div',
                  { className: 'search-result-row', key: search_result_index },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Loan date' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _DateTime.toFormalDate)(search_result.loan_date)
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Loan summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount loan' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.amount),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Penalties summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total number of penalties' },
                      _react2.default.createElement(
                        'div',
                        null,
                        search_result.penalties.length > 1 || search_result.penalties.length == 0 ? _react2.default.createElement(
                          'p',
                          null,
                          search_result.penalties.length,
                          ' Penalties'
                        ) : _react2.default.createElement(
                          'p',
                          null,
                          search_result.penalties.length,
                          ' Penalty'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total penalty amount' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_penalty),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Borrower'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.borrower.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Full name' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.borrower.firstname,
                        ' ',
                        search_result.borrower.middlename,
                        ' ',
                        search_result.borrower.surname
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Full name' },
                      search_result.borrower.gender ? _react2.default.createElement(
                        'p',
                        null,
                        'Male'
                      ) : _react2.default.createElement(
                        'p',
                        null,
                        'Female'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { onClick: function onClick() {
                        return _this3.props.putHash(search_result.id);
                      }, className: 'default-btn-blue', to: '/borrowers/' + search_result.borrower_id + '/view' },
                    'View loan'
                  )
                );
              })
            ) : this.props.search.query.type == 'penalty' ? _react2.default.createElement(
              'div',
              { className: 'search-result-list' },
              this.props.search.search_results.length > 1 ? _react2.default.createElement(
                'h1',
                null,
                this.props.search.search_results.length,
                ' penalties were found.'
              ) : _react2.default.createElement(
                'h1',
                null,
                this.props.search.search_results.length,
                ' penalty was found.'
              ),
              this.props.search.search_results.map(function (search_result, search_result_index) {
                return _react2.default.createElement(
                  'div',
                  { className: 'search-result-row', key: search_result_index },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.id
                      )
                    )
                  ),
                  search_result.was_waved ? _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/exclamation.png') },
                      _react2.default.createElement(
                        'p',
                        null,
                        'This penalty has been waved.'
                      )
                    )
                  ) : null,
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Date given' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _DateTime.toFormalDate)(search_result.date_given)
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remarks' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.remarks
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Loan summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount loan' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_loan),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Penalty summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total penalty' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_penalty),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Borrower'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.borrower.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Full name' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.borrower.firstname,
                        ' ',
                        search_result.loan.borrower.middlename,
                        ' ',
                        search_result.loan.borrower.surname
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Gender' },
                      search_result.loan.borrower.gender ? _react2.default.createElement(
                        'p',
                        null,
                        'Male'
                      ) : _react2.default.createElement(
                        'p',
                        null,
                        'Female'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { onClick: function onClick() {
                        return _this3.props.putHash(search_result.id, search_result.loan.id);
                      }, className: 'default-btn-blue', to: '/borrowers/' + search_result.loan.borrower.id + '/view' },
                    'View penalty'
                  )
                );
              })
            ) : this.props.search.query.type == 'loan-payment' ? _react2.default.createElement(
              'div',
              { className: 'search-result-list' },
              this.props.search.search_results.length > 1 ? _react2.default.createElement(
                'h1',
                null,
                this.props.search.search_results.length,
                ' loan payments were found.'
              ) : _react2.default.createElement(
                'h1',
                null,
                this.props.search.search_results.length,
                ' loan payment was found.'
              ),
              this.props.search.search_results.map(function (search_result, search_result_index) {
                return _react2.default.createElement(
                  'div',
                  { className: 'search-result-row', key: search_result_index },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Date paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _DateTime.toFormalDate)(search_result.date_paid)
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.amount),
                        ' Pesos'
                      )
                    )
                  ),
                  search_result.period_paid == 'paid-in-full' ? _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithIcon2.default,
                      { icon: _path2.default.join(app_path, 'app/images/check.png') },
                      _react2.default.createElement(
                        'p',
                        null,
                        'Full payment'
                      )
                    )
                  ) : _react2.default.createElement(
                    'div',
                    { className: 'multiple-rows' },
                    _react2.default.createElement(
                      'div',
                      { className: 'row' },
                      _react2.default.createElement(
                        _WithLabel2.default,
                        { label: 'Month of' },
                        _react2.default.createElement(
                          'p',
                          null,
                          (0, _DateTime.monthList)()[new Date(search_result.period_paid).getMonth()]
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'row' },
                      _react2.default.createElement(
                        _WithLabel2.default,
                        { label: 'Payment coverage' },
                        _react2.default.createElement(
                          'p',
                          null,
                          search_result.payment_coverage == 'period-ony' ? 'Period only' : 'Partial only'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Loan summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount loan' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_loan),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Penalties summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total penalty' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_penalty),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Borrower'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.borrower.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Full name' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.borrower.firstname,
                        ' ',
                        search_result.loan.borrower.middlename,
                        ' ',
                        search_result.loan.borrower.surname
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Gender' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.loan.borrower.gender ? 'Male' : 'Female'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { onClick: function onClick() {
                        return _this3.props.putHash(search_result.id, search_result.loan.id);
                      }, className: 'default-btn-blue', to: '/borrowers/' + search_result.loan.borrower.id + '/view' },
                    'View payment'
                  )
                );
              })
            ) : this.props.search.query.type == 'penalty-payment' ? _react2.default.createElement(
              'div',
              { className: 'search-result-list' },
              this.props.search.search_results.length > 1 ? _react2.default.createElement(
                'h1',
                null,
                this.props.search.search_results.length,
                ' penalty payments were found.'
              ) : _react2.default.createElement(
                'h1',
                null,
                this.props.search.search_results.length,
                ' penalty payment was found.'
              ),
              this.props.search.search_results.map(function (search_result, search_result_index) {
                return _react2.default.createElement(
                  'div',
                  { className: 'search-result-row', key: search_result_index },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Date paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _DateTime.toFormalDate)(search_result.date_paid)
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.amount),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Loan summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.penalty.loan.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total loan' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_loan),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.loan_payments_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Penalties summary'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total penalties' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_penalty),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Total amount paid' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.total_amount_paid),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Remaining balance' },
                      _react2.default.createElement(
                        'p',
                        null,
                        (0, _Numbers.currency)(search_result.penalties_summary.remaining_balance),
                        ' Pesos'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'h1',
                      null,
                      'Borrower'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Trace ID' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.penalty.loan.borrower.id
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Full name' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.penalty.loan.borrower.firstname,
                        ' ',
                        search_result.penalty.loan.borrower.middlename,
                        ' ',
                        search_result.penalty.loan.borrower.surname
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      _WithLabel2.default,
                      { label: 'Gender' },
                      _react2.default.createElement(
                        'p',
                        null,
                        search_result.penalty.loan.borrower.gender ? 'Male' : 'Female'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { onClick: function onClick() {
                        return _this3.props.putHash(search_result.id, search_result.penalty.loan.id);
                      }, className: 'default-btn-blue', to: '/borrowers/' + search_result.penalty.loan.borrower.id + '/view' },
                    'View payment'
                  )
                );
              })
            ) : null
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'search' },
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Search'
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputText2.default, {
                  placeholder: 'Trace ID...',
                  onChange: this.props.changeSearchString,
                  disabled: this.props.search.backend.processing,
                  value: this.props.search.query.value,
                  errors: [] })
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _InputSelect2.default,
                  {
                    onChange: this.props.changeSearchType,
                    value: this.props.search.query.type,
                    disabled: this.props.search.backend.processing,
                    errors: [] },
                  _react2.default.createElement(
                    'option',
                    { value: 'borrower' },
                    'Borrower'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'loan' },
                    'Loan'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'penalty' },
                    'Penalty'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'loan-payment' },
                    'Loan payment'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'penalty-payment' },
                    'Penalty payment'
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(_InputButton2.default, {
                  value: 'Search',
                  onClick: function onClick() {
                    return _this3.props.submit({
                      search_query: _this3.props.search.query.value,
                      at: _this3.props.search.query.type
                    });
                  },
                  sending: this.props.search.backend.processing,
                  disabled: this.props.search.query.allow_submit && !this.props.search.backend.processing ? false : true,
                  errors: [] })
              )
            ),
            this.props.search.backend.status == 'failed' ? _react2.default.createElement(
              'p',
              { className: 'errors' },
              this.props.search.backend.message
            ) : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'report-container' },
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Income Expense Report'
            ),
            _react2.default.createElement(
              'div',
              { className: 'data-row' },
              this.props.borrowers.data ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'table',
                  { className: 'short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Money Out'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.borrowers.data.money_out)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Money In'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.borrowers.data.money_in)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Borrowers'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _Numbers.comma)(this.props.borrowers.data.total_borrowers)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Borrowers with unpaid loans'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _Numbers.comma)(this.props.borrowers.data.active_borrowers)
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { className: 'default-btn-blue', to: '/status-report' },
                  'See status report'
                )
              ) : this.props.borrowers.backend.status == 'failed' ? _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/cross.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  this.props.borrowers.backend.message
                )
              ) : _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  'Loading contents'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'due-dates' },
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Unpaid due dates tomorrow'
            ),
            this.props.dashboard.tomorrows.backend.processing ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  'Loading contents'
                )
              )
            ) : !this.props.dashboard.tomorrows.data.length && this.props.dashboard.tomorrows.backend.status == 'successful' ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/check.png') },
                _react2.default.createElement(
                  'p',
                  null,
                  'You\'re all set. No unpaid due dates tomorrow.'
                )
              )
            ) : this.props.dashboard.tomorrows.data.map(function (due_date_tomorrow, due_date_tomorrow_index) {
              return _react2.default.createElement(
                'div',
                { className: 'data-row', key: due_date_tomorrow_index },
                _this3.displayLoanDueDate(due_date_tomorrow, app_path)
              );
            }),
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Unpaid due dates today'
            ),
            this.props.dashboard.todays.backend.processing ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  'Loading contents'
                )
              )
            ) : !this.props.dashboard.todays.data.length && this.props.dashboard.todays.backend.status == 'successful' ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/check.png') },
                _react2.default.createElement(
                  'p',
                  null,
                  'You\'re all set. No unpaid due dates today.'
                )
              )
            ) : this.props.dashboard.todays.data.map(function (due_date_today, due_date_today_index) {
              return _react2.default.createElement(
                'div',
                { className: 'data-row', key: due_date_today_index },
                _this3.displayLoanDueDate(due_date_today, app_path)
              );
            }),
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Unpaid due dates this month after tomorrow'
            ),
            this.props.dashboard.this_month.backend.processing ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  'Loading contents'
                )
              )
            ) : !this.props.dashboard.this_month.data.length && this.props.dashboard.this_month.backend.status == 'successful' ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/check.png') },
                _react2.default.createElement(
                  'p',
                  null,
                  'You\'re all set. No unpaid due dates this month after tomorrow.'
                )
              )
            ) : this.props.dashboard.this_month.data.map(function (this_month_due_date, this_month_due_date_index) {
              return _react2.default.createElement(
                'div',
                { className: 'data-row', key: this_month_due_date_index },
                _this3.displayLoanDueDate(this_month_due_date, app_path)
              );
            }),
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Past unpaid due dates'
            ),
            this.props.dashboard.past_due_dates.backend.processing ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  'Loading contents'
                )
              )
            ) : !this.props.dashboard.past_due_dates.data.length && this.props.dashboard.past_due_dates.backend.status == 'successful' ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/check.png') },
                _react2.default.createElement(
                  'p',
                  null,
                  'You\'re all set. No unpaid past due dates.'
                )
              )
            ) : this.props.dashboard.past_due_dates.data.map(function (past_due_date, past_due_date_index) {
              return _react2.default.createElement(
                'div',
                { className: 'data-row', key: past_due_date_index },
                _this3.displayLoanDueDate(past_due_date, app_path)
              );
            }),
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'One Gives'
            ),
            this.props.dashboard.one_gives.backend.processing ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
                _react2.default.createElement(
                  'p',
                  null,
                  'Loading contents'
                )
              )
            ) : !this.props.dashboard.one_gives.data.length && this.props.dashboard.one_gives.backend.status == 'successful' ? _react2.default.createElement(
              'div',
              { className: 'data-row' },
              _react2.default.createElement(
                _WithIcon2.default,
                { icon: _path2.default.join(app_path, 'app/images/check.png') },
                _react2.default.createElement(
                  'p',
                  null,
                  'You\'re all set. No one give loans.'
                )
              )
            ) : this.props.dashboard.one_gives.data.map(function (one_give, one_give_index) {
              return _react2.default.createElement(
                'div',
                { className: 'data-row', key: one_give_index },
                _this3.displayLoanDueDate(one_give, app_path)
              );
            })
          )
        )
      );
    }
  }]);

  return Dashboard;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    session: _extends({}, store.session),
    dashboard: _extends({}, store.dashboard),
    search: _extends({}, store.search),
    borrowers: _extends({}, store.income_expense_report)
  };
}, {
  getDueDatesTomorrow: dashboardActions.getDueDatesTomorrow,
  getDueDatesToday: dashboardActions.getDueDatesToday,
  getDueDatesThisMonth: dashboardActions.getDueDatesThisMonth,
  getPastDueDates: dashboardActions.getPastDueDates,
  getOneGives: dashboardActions.getOneGives,

  changeSearchString: searchActions.changeSearchString,
  changeSearchType: searchActions.changeSearchType,
  submit: searchActions.submit,
  searchReset: searchActions.reset,

  putHash: _borrower_profile.putHash,

  fetch: _income_expense_report.fetch
})(Dashboard);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _loan_reports = __webpack_require__(20);

var reportsActions = _interopRequireWildcard(_loan_reports);

var _borrower_profile = __webpack_require__(14);

var _DateTime = __webpack_require__(3);

var _Numbers = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// actions

// helpers


var LoanComprehensiveReport = function (_Component) {
  _inherits(LoanComprehensiveReport, _Component);

  function LoanComprehensiveReport(props) {
    _classCallCheck(this, LoanComprehensiveReport);

    var _this = _possibleConstructorReturn(this, (LoanComprehensiveReport.__proto__ || Object.getPrototypeOf(LoanComprehensiveReport)).call(this, props));

    _this.print = _this.print.bind(_this);
    return _this;
  }

  _createClass(LoanComprehensiveReport, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'print',
    value: function print() {
      window.print();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'report-container' },
          this.props.loan.data ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'h1',
                null,
                'Loan Comprehensive Report'
              ),
              _react2.default.createElement(
                'div',
                { className: 'borrower-info' },
                _react2.default.createElement(
                  'table',
                  { className: 'left short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Full Name'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.borrower.firstname,
                        ' ',
                        this.props.loan.data.borrower.middlename,
                        ' ',
                        this.props.loan.data.borrower.surname
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Sex'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.borrower.gender ? 'Male' : 'Female'
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Contact Numbers'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.borrower.contact_numbers.length ? this.props.loan.data.borrower.contact_numbers.map(function (contact_number, contact_number_index) {
                          if (contact_number_index + 1 != _this2.props.loan.data.borrower.contact_numbers.length) {
                            return contact_number.number + ', ';
                          } else {
                            return contact_number.number;
                          }
                        }) : 'No record.'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'right short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Date'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _DateTime.toFormalDate)(new Date())
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'body' },
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loan Information'
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Loan Trace ID'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.id
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Fully Paid'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.loan_payments_summary.is_fully_paid ? 'Yes' : 'No'
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Date Loan'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _DateTime.toFormalDate)(this.props.loan.data.loan_date)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Loan Amount'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.amount)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Interest'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.interest_type == 'percentage' ? this.props.loan.data.interest_rate + ' Percent' : 'PHP ' + this.props.loan.data.interest_rate
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Amount To Pay'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.amount + this.props.loan.data.profit)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Payment'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.payment_method == 1 ? 'Monthly installments of PHP ' + (0, _Numbers.currency)(this.props.loan.data.per_month) : this.props.loan.data.payment_method == 2 ? 'Semi-monthly installments of PHP ' + (0, _Numbers.currency)(this.props.loan.data.per_month) : this.props.loan.data.payment_method == 4 ? 'One give of PHP ' + (0, _Numbers.currency)(this.props.loan.data.amount + this.props.loan.data.profit) + ' on ' + (0, _DateTime.toFormalDate)(this.props.loan.data.expected_date_of_payment) : 'Daily installments of PHP ' + (0, _Numbers.currency)(this.props.loan.data.per_month)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Months To Pay'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.payment_method == 4 ? 'N/A' : this.props.loan.data.months_to_pay > 1 ? this.props.loan.data.months_to_pay + ' months' : this.props.loan.data.months_to_pay + ' month'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Loan Payments'
                  )
                ),
                !this.props.loan.data.loan_payments.length ? _react2.default.createElement(
                  'p',
                  null,
                  'No payments made since ',
                  (0, _DateTime.toFormalDate)(this.props.loan.data.loan_date)
                ) : _react2.default.createElement(
                  'table',
                  { className: 'long-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'th',
                        null,
                        'Payment Trace ID'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'Date Paid'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'For the month'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'Amount'
                      )
                    ),
                    this.props.loan.data.loan_payments.map(function (loan_payment, loan_payment_index) {
                      return _react2.default.createElement(
                        'tr',
                        { key: loan_payment_index },
                        _react2.default.createElement(
                          'td',
                          null,
                          loan_payment.id
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          (0, _DateTime.toFormalDate)(loan_payment.date_paid)
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          (0, _DateTime.monthList)()[new Date(loan_payment.period_paid).getMonth() + 1]
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          'PHP ',
                          (0, _Numbers.currency)(loan_payment.amount)
                        )
                      );
                    })
                  )
                )
              ),
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Penalties'
                ),
                !this.props.loan.data.penalties.length ? _react2.default.createElement(
                  'p',
                  null,
                  'No penalties.'
                ) : this.props.loan.data.penalties.map(function (penalty, penalty_index) {
                  return _react2.default.createElement(
                    'section',
                    { key: penalty_index },
                    _react2.default.createElement(
                      'table',
                      { className: 'short-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Penalty Trace ID'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            penalty.id
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Date Given'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            (0, _DateTime.toFormalDate)(penalty.date_given)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Amount'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            'PHP ',
                            (0, _Numbers.currency)(penalty.amount)
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Remarks'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            penalty.remarks
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Waved'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            penalty.was_waved ? 'Yes' : 'No'
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Date Waved'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            penalty.was_waved ? (0, _DateTime.toFormalDate)(penalty.date_waved) : '------'
                          )
                        ),
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'td',
                            null,
                            'Wave Remarks'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            ':'
                          ),
                          _react2.default.createElement(
                            'td',
                            null,
                            penalty.was_waved ? penalty.wave_remarks : '------'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'Penalty Payments'
                      )
                    ),
                    !penalty.penalty_payments.length ? _react2.default.createElement(
                      'p',
                      null,
                      'No payments since ',
                      (0, _DateTime.toFormalDate)(penalty.date_given)
                    ) : _react2.default.createElement(
                      'table',
                      { className: 'long-table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                            'th',
                            null,
                            'Payment Trace ID'
                          ),
                          _react2.default.createElement(
                            'th',
                            null,
                            'Amount'
                          ),
                          _react2.default.createElement(
                            'th',
                            null,
                            'Date Paid'
                          )
                        ),
                        penalty.penalty_payments.map(function (penalty_payment, penalty_payment_index) {
                          return _react2.default.createElement(
                            'tr',
                            { key: penalty_payment_index },
                            _react2.default.createElement(
                              'td',
                              null,
                              penalty_payment.id
                            ),
                            _react2.default.createElement(
                              'td',
                              null,
                              'PHP ',
                              (0, _Numbers.currency)(penalty_payment.amount)
                            ),
                            _react2.default.createElement(
                              'td',
                              null,
                              (0, _DateTime.toFormalDate)(penalty_payment.date_paid)
                            )
                          );
                        })
                      )
                    )
                  );
                })
              ),
              _react2.default.createElement(
                'a',
                {
                  className: 'default-btn-blue print-btn',
                  onClick: this.print },
                'Print'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                {
                  to: '/borrowers/' + this.props.loan.data.borrower.id + '/view',
                  className: 'default-btn-blue print-btn',
                  onClick: function onClick() {
                    return _this2.props.putHash(_this2.props.params.id);
                  } },
                'Go back'
              )
            )
          ) : this.props.loan.backend.status == 'failed' ? _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/cross.png') },
            _react2.default.createElement(
              'p',
              null,
              this.props.loan.backend.message
            )
          ) : _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
            _react2.default.createElement(
              'p',
              null,
              'Please wait...'
            )
          )
        )
      );
    }
  }]);

  return LoanComprehensiveReport;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    loan: _extends({}, store.loan_reports)
  };
}, {
  fetch: reportsActions.fetch,
  putHash: _borrower_profile.putHash
})(LoanComprehensiveReport);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _loan_reports = __webpack_require__(20);

var reportsAction = _interopRequireWildcard(_loan_reports);

var _borrower_profile = __webpack_require__(14);

var _Numbers = __webpack_require__(8);

var _DateTime = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// actions

// helpers


var LoanContract = function (_Component) {
  _inherits(LoanContract, _Component);

  function LoanContract(props) {
    _classCallCheck(this, LoanContract);

    var _this = _possibleConstructorReturn(this, (LoanContract.__proto__ || Object.getPrototypeOf(LoanContract)).call(this, props));

    _this.print = _this.print.bind(_this);
    return _this;
  }

  _createClass(LoanContract, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'print',
    value: function print() {
      window.print();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();
      var loan_date = void 0;

      if (this.props.loan.data) {
        loan_date = new Date(this.props.loan.data.loan_date).getDate();
      }

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        this.props.loan.data ? _react2.default.createElement(
          'div',
          { className: 'loan-contract-container' },
          _react2.default.createElement(
            'div',
            { className: 'header' },
            _react2.default.createElement(
              'h1',
              null,
              'Loan Agreement'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'THIS LOAN AGREEMENT (this "Agreement") dated this _____ day of _______________, 20___.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'BETWEEN'
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'centered-text' },
            this.props.session.user_data.firstname,
            ' ',
            this.props.session.user_data.middlename,
            ' ',
            this.props.session.user_data.surname,
            _react2.default.createElement('br', null),
            '(the "Lender")'
          ),
          _react2.default.createElement(
            'p',
            { className: 'right-aligned-text' },
            _react2.default.createElement(
              'strong',
              null,
              'OF THE FIRST PART'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            { className: 'centered-text' },
            _react2.default.createElement(
              'strong',
              null,
              'AND'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            { className: 'centered-text' },
            this.props.loan.data.borrower.firstname,
            ' ',
            this.props.loan.data.borrower.middlename,
            ' ',
            this.props.loan.data.borrower.surname,
            _react2.default.createElement('br', null),
            '(the "Borrower")'
          ),
          _react2.default.createElement(
            'p',
            { className: 'right-aligned-text' },
            _react2.default.createElement(
              'strong',
              null,
              'OF THE SECOND PART'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'IN CONSIDERATION OF'
            ),
            ' the Lender lending a certain amount of money (the "Loan") to the Borrower and the Borrower repaying the Loan to the Lender. Both parties agree to keep, perform, and fulfill the promises and conditions set out in this Agreement.'
          ),
          _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Loan Amount, Interest, and Total Amount Payable'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '1.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'The Lender promises to lend PHP ',
                    (0, _Numbers.currency)(this.props.loan.data.amount),
                    ' to the Borrower and the Borrower promises to repay this principal amount to the Lender, with interest payable on the principal at the rate of',
                    this.props.loan.data.interest_type == 'percentage' ? ' ' + (0, _Numbers.currency)(this.props.loan.data.interest_rate) + ' Percent' : ' PHP ' + (0, _Numbers.currency)(this.props.loan.data.interest_rate),
                    ' derived from',
                    this.props.loan.data.payment_method == 4 ? ' the principal amount' : ' the monthly payment',
                    ', the Borrower will pay a total amount of PHP ',
                    (0, _Numbers.currency)(this.props.loan.data.amount + this.props.loan.data.profit),
                    '.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Payment'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '2.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'This Loan will be repaid in',
                    this.props.loan.data.payment_method == 1 ? ' monthly installments of the principal together with the interest every ' + (loan_date == 1 ? '1st' : loan_date == 2 ? '2nd' : loan_date == 3 ? '3rd' : loan_date == 21 ? '21st' : loan_date == 23 ? '23rd' : loan_date == 31 ? '31st' : loan_date + 'th') + ' of the month commencing on ' + (0, _DateTime.getFormalDueDate)(this.props.loan.data) + '.' : this.props.loan.data.payment_method == 2 ? ' semi-monthly installments of the principal together with the interest every 15 days from the last payment date commencing on ' + (0, _DateTime.getFormalDueDate)(this.props.loan.data) + '.' : this.props.loan.data.payment_method == 4 ? ' one give on ' + (0, _DateTime.toFormalDate)(this.props.loan.data.expected_date_of_payment) + '.' : ' daily installments commencing on ' + (0, _DateTime.getFormalDueDate)(this.props.loan.data) + '.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Default'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '3.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'If the Borrower fails to pay 6 months consecutively, the Lender may declare the remaining balance and the penalties as due and payable on that day.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Governing Law'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '4.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'This Agreement will be construed in accordance with and governed by the Laws of the Philippines.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Penalties'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '5.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'The Lender may give penalties to the Borrower if the Borrower fails to perform ',
                    this.props.loan.data.borrower.gender ? 'his' : 'her',
                    ' obligations stated in this Agreement.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Amendments'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '6.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'This Agreement may only be amended or modified by a written instrument executed and agreed by both the Borrower and the Lender.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '7.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'The Loan may only be amended before the first payment.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Severability'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '8.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'The clauses and paragraphs contained in this Agreement are intended to be read and construed independently of each other. If any term, covenant, condition or provision of this Agreement is held by a court of confident jurisdiction to be invalid, void or unenforceable, it is the parties\' intent that such provision be reduced in scope by the court only to the extend deemed necessary by that court to render the provision reasonable and enforceable and the remainder of the provision of this Agreement will in no way be affected, impaired or invalidated as a result.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'General Provisions'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '9.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Headings were inserted for the convenience of the parties only and are not to be considered when interpreting this Agreement. Words in singular mean and include plural and vice versa. Words in the masculine mean and include the feminine and vice versa.'
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', null),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Entire Agreement'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    '10.'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'This Agreement constitutes the agreement between the parties and there are no further items or provisions, either oral or otherwise.'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'IN WITNESS WHEREOF'
            ),
            ', the Borrower and the Lender have duly affixed their signatures under the hand on this _____ day of _______________, 20___.'
          ),
          _react2.default.createElement(
            'div',
            { className: 'signatures' },
            _react2.default.createElement(
              'p',
              null,
              'Katherine Manalo Singson'
            ),
            _react2.default.createElement(
              'p',
              null,
              this.props.loan.data.borrower.firstname,
              ' ',
              this.props.loan.data.borrower.middlename,
              ' ',
              this.props.loan.data.borrower.surname
            )
          ),
          _react2.default.createElement(
            'a',
            {
              className: 'default-btn-blue print-btn',
              onClick: this.print },
            'Print'
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            {
              to: '/borrowers/' + this.props.loan.data.borrower.id + '/view',
              className: 'default-btn-blue print-btn',
              onClick: function onClick() {
                return _this2.props.putHash(_this2.props.params.id);
              } },
            'Go back'
          )
        ) : this.props.loan.backend.status == 'failed' ? _react2.default.createElement(
          _WithIcon2.default,
          { icon: _path2.default.join(app_path, 'app/images/cross.png') },
          _react2.default.createElement(
            'p',
            null,
            this.props.loan.backend.message
          )
        ) : _react2.default.createElement(
          _WithIcon2.default,
          { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
          _react2.default.createElement(
            'p',
            null,
            'Please wait...'
          )
        )
      );
    }
  }]);

  return LoanContract;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    loan: _extends({}, store.loan_reports),
    session: _extends({}, store.session)
  };
}, {
  fetch: reportsAction.fetch,
  putHash: _borrower_profile.putHash
})(LoanContract);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _reactRouter = __webpack_require__(5);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _loan_reports = __webpack_require__(20);

var reportsActions = _interopRequireWildcard(_loan_reports);

var _borrower_profile = __webpack_require__(14);

var _Numbers = __webpack_require__(8);

var _DateTime = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// actions

// helpers


var LoanSummaryReport = function (_Component) {
  _inherits(LoanSummaryReport, _Component);

  function LoanSummaryReport(props) {
    _classCallCheck(this, LoanSummaryReport);

    var _this = _possibleConstructorReturn(this, (LoanSummaryReport.__proto__ || Object.getPrototypeOf(LoanSummaryReport)).call(this, props));

    _this.print = _this.print.bind(_this);
    return _this;
  }

  _createClass(LoanSummaryReport, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch(this.props.params.id);
    }
  }, {
    key: 'print',
    value: function print() {
      window.print();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'report-container' },
          this.props.loan.data ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'h1',
                null,
                'Loan Summary Report'
              ),
              _react2.default.createElement(
                'div',
                { className: 'borrower-info' },
                _react2.default.createElement(
                  'table',
                  { className: 'left short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Full Name'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.borrower.firstname,
                        ' ',
                        this.props.loan.data.borrower.middlename,
                        ' ',
                        this.props.loan.data.borrower.surname
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Sex'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.borrower.gender ? 'Male' : 'Female'
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Contact Numbers'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.borrower.contact_numbers.length ? this.props.loan.data.borrower.contact_numbers.map(function (contact_number, contact_number_index) {
                          if (contact_number_index + 1 != _this2.props.loan.data.borrower.contact_numbers.length) {
                            return contact_number.number + ', ';
                          } else {
                            return contact_number.number;
                          }
                        }) : 'No record.'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'right short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Date'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _DateTime.toFormalDate)(new Date())
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'body' },
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loan Information'
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Loan Trace ID'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.id
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Fully Paid'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.loan_payments_summary.remaining_balance > 0 ? 'No' : 'Yes'
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Date Loan'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        (0, _DateTime.toFormalDate)(this.props.loan.data.loan_date)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Loan Amount'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.amount)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Interest'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.interest_type == 'percentage' ? this.props.loan.data.interest_rate + ' Percent' : 'PHP ' + this.props.loan.data.interest_rate
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Amount To Pay'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.amount + this.props.loan.data.profit)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Payment'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.payment_method == 1 ? 'Monthly installments of PHP ' + (0, _Numbers.currency)(this.props.loan.data.per_month) : this.props.loan.data.payment_method == 2 ? 'Semi-monthly installments of PHP ' + (0, _Numbers.currency)(this.props.loan.data.per_month) : this.props.loan.data.payment_method == 4 ? 'One give of PHP ' + (0, _Numbers.currency)(this.props.loan.data.amount + this.props.loan.data.profit) + ' on ' + (0, _DateTime.toFormalDate)(this.props.loan.data.expected_date_of_payment) : 'Daily installments of PHP ' + (0, _Numbers.currency)(this.props.loan.data.per_month)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Months To Pay'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        this.props.loan.data.payment_method == 4 ? 'N/A' : this.props.loan.data.months_to_pay > 1 ? this.props.loan.data.months_to_pay + ' months' : this.props.loan.data.months_to_pay + ' month'
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Loan Payments'
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Amount Paid'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.loan_payments_summary.total_amount_paid)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Amount To Pay'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.loan_payments_summary.total_amount_to_pay)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Remaining Balance'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.loan_payments_summary.remaining_balance)
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  'h1',
                  null,
                  'Penalties'
                ),
                _react2.default.createElement(
                  'table',
                  { className: 'short-table' },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Penalties'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.penalties_summary.total_amount_to_pay)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Total Amount Paid'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.penalties_summary.total_amount_paid)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        'Remaining Balance'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ':'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        'PHP ',
                        (0, _Numbers.currency)(this.props.loan.data.penalties_summary.remaining_balance)
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'a',
                {
                  className: 'default-btn-blue print-btn',
                  onClick: this.print },
                'Print'
              ),
              _react2.default.createElement(
                _reactRouter.Link,
                {
                  to: '/borrowers/' + this.props.loan.data.borrower.id + '/view',
                  className: 'default-btn-blue print-btn',
                  onClick: function onClick() {
                    return _this2.props.putHash(_this2.props.params.id);
                  } },
                'Go back'
              )
            )
          ) : this.props.loan.backend.status == 'failed' ? _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/cross.gif') },
            _react2.default.createElement(
              'p',
              null,
              this.props.loan.backend.message
            )
          ) : _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
            _react2.default.createElement(
              'p',
              null,
              'Please wait...'
            )
          )
        )
      );
    }
  }]);

  return LoanSummaryReport;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    loan: _extends({}, store.loan_reports)
  };
}, {
  fetch: reportsActions.fetch,
  putHash: _borrower_profile.putHash
})(LoanSummaryReport);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _reactAddonsCssTransitionGroup = __webpack_require__(16);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _DateTime = __webpack_require__(3);

var _Strings = __webpack_require__(15);

var _Numbers = __webpack_require__(8);

var _InputText = __webpack_require__(11);

var _InputText2 = _interopRequireDefault(_InputText);

var _InputSelect = __webpack_require__(12);

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _InputButton = __webpack_require__(10);

var _InputButton2 = _interopRequireDefault(_InputButton);

var _DisplayTextBox = __webpack_require__(23);

var _DisplayTextBox2 = _interopRequireDefault(_DisplayTextBox);

var _new_borrower = __webpack_require__(55);

var newBorrowerActions = _interopRequireWildcard(_new_borrower);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components

// helpers

// components

// actions


var NewBorrower = function (_Component) {
  _inherits(NewBorrower, _Component);

  function NewBorrower(props) {
    _classCallCheck(this, NewBorrower);

    var _this = _possibleConstructorReturn(this, (NewBorrower.__proto__ || Object.getPrototypeOf(NewBorrower)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(NewBorrower, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.title = 'Add new borrower - LIMS';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.reset();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.new_borrower.backend.status == 'successful') {
        nextProps.router.push('/borrowers/' + nextProps.new_borrower.id + '/view');
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (event) event.preventDefaut();

      this.props.submit(_extends({
        firstname: this.props.new_borrower.firstname.value,
        middlename: this.props.new_borrower.middlename.value,
        surname: this.props.new_borrower.surname.value,
        gender: this.props.new_borrower.gender.value,
        address: this.props.new_borrower.address.value,
        contact_numbers: this.props.new_borrower.contact_numbers,
        amount_loan: this.props.new_borrower.amount_loan.value,
        payment_method: this.props.new_borrower.apply_interest_only || this.props.new_borrower.no_due_date_no_interest ? null : this.props.new_borrower.payment_method.value,
        months_to_pay: this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'due-date-only' ? this.props.new_borrower.months_to_pay.value : null,
        expected_date_of_payment: this.props.new_borrower.payment_method.value == 4 && (this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'due-date-only') ? this.props.new_borrower.date_of_payment.month + ' ' + this.props.new_borrower.date_of_payment.date + ', ' + this.props.new_borrower.date_of_payment.year : null,
        condition_applied: this.props.new_borrower.amount_loan.condition,
        loan_date: this.props.new_borrower.loan_date.month + ' ' + this.props.new_borrower.loan_date.date + ', ' + this.props.new_borrower.loan_date.year,
        interest_type: this.props.new_borrower.interest_rate.type,
        interest_rate: this.props.new_borrower.interest_rate.value
      }, this.props.new_borrower.calculated_values));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        { onLink: 'new-borrower' },
        _react2.default.createElement(
          'div',
          { className: 'new-loan-wrapper' },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit, method: 'post', action: '' },
            _react2.default.createElement(
              'div',
              { className: 'information-container' },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'h1',
                    null,
                    'Borrower\'s information'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'First name',
                  _react2.default.createElement(_InputText2.default, {
                    value: this.props.new_borrower.firstname.value,
                    placeholder: 'Borrower\'s first name...',
                    onChange: function onChange(value) {
                      return _this2.props.changeFirstname((0, _Strings.ucwords)(value));
                    },
                    errors: this.props.new_borrower.firstname.errors,
                    disabled: this.props.new_borrower.backend.processing })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Middle name',
                  _react2.default.createElement(_InputText2.default, {
                    value: this.props.new_borrower.middlename.value,
                    placeholder: 'Borrower\'s middle name...',
                    onChange: function onChange(value) {
                      return _this2.props.changeMiddlename((0, _Strings.ucwords)(value));
                    },
                    errors: this.props.new_borrower.middlename.errors,
                    disabled: this.props.new_borrower.backend.processing })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Surname',
                  _react2.default.createElement(_InputText2.default, {
                    value: this.props.new_borrower.surname.value,
                    placeholder: 'Borrower\'s surname...',
                    onChange: function onChange(value) {
                      return _this2.props.changeSurname((0, _Strings.ucwords)(value));
                    },
                    errors: this.props.new_borrower.surname.errors,
                    disabled: this.props.new_borrower.backend.processing })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Gender',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      onChange: this.props.changeGender,
                      value: this.props.new_borrower.gender.value,
                      disabled: this.props.new_borrower.backend.processing,
                      errors: this.props.new_borrower.gender.errors },
                    _react2.default.createElement(
                      'option',
                      { value: '1' },
                      'Male'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '0' },
                      'Female'
                    )
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Address',
                  _react2.default.createElement(_InputText2.default, {
                    value: this.props.new_borrower.address.value,
                    placeholder: 'Borrower\'s address...',
                    onChange: function onChange(value) {
                      return _this2.props.changeAddress(value);
                    },
                    errors: this.props.new_borrower.address.errors,
                    disabled: this.props.new_borrower.backend.processing })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'h1',
                    null,
                    'Contact information'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'At least one contact number is required.'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    {
                      transitionName: 'emphasize-entry',
                      transitionEnterTimeout: 400,
                      transitionLeaveTimeout: 400 },
                    this.props.new_borrower.contact_numbers.map(function (field, index) {
                      return _react2.default.createElement(
                        'div',
                        { key: field.id, className: 'contact-fields' },
                        _react2.default.createElement(_InputText2.default, {
                          className: index > 0 ? 'closable-input' : '',
                          numberOnly: true,
                          value: field.value,
                          placeholder: 'Borrower\'s contact number...',
                          onChange: function onChange(value) {
                            return _this2.props.changeContactNumber(value, index);
                          },
                          errors: field.errors,
                          disabled: _this2.props.new_borrower.backend.processing }),
                        index > 0 ? _react2.default.createElement(
                          'a',
                          { className: 'remove-contact-field', onClick: function onClick() {
                              return _this2.props.new_borrower.backend.processing ? false : _this2.props.removeContactNumber(index);
                            } },
                          'X'
                        ) : null
                      );
                    })
                  ),
                  _react2.default.createElement(
                    'a',
                    { className: this.props.new_borrower.backend.processing ? 'default-btn-blue disabled' : 'default-btn-blue',
                      onClick: function onClick() {
                        return _this2.props.new_borrower.backend.processing ? false : _this2.props.addMoreContactNumbers();
                      } },
                    'Add more fields'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'information-container loan-info' },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'h1',
                    null,
                    'Loan information'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Loan condition',
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'apply-due-date-interest',
                    type: 'radio',
                    disabled: this.props.new_borrower.backend.processing,
                    checked: this.props.new_borrower.amount_loan.condition == 'due-date-and-interest',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this2.props.changeLoanCondition('due-date-and-interest');
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'apply-due-date-interest' },
                    'Apply due date and interest'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'apply-interest-only',
                    type: 'radio',
                    disabled: this.props.new_borrower.backend.processing,
                    checked: this.props.new_borrower.amount_loan.condition == 'interest-only',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this2.props.changeLoanCondition('interest-only');
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'apply-interest-only' },
                    'Apply interest only'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'apply-due-date-only',
                    type: 'radio',
                    disabled: this.props.new_borrower.backend.processing,
                    checked: this.props.new_borrower.amount_loan.condition == 'due-date-only',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this2.props.changeLoanCondition('due-date-only');
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'apply-due-date-only' },
                    'Apply due date only'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'no-due-date-no-interest',
                    type: 'radio',
                    disabled: this.props.new_borrower.backend.processing,
                    checked: this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest',
                    onChange: function onChange(changeEvent) {
                      if (changeEvent.target.checked) _this2.props.changeLoanCondition('no-due-date-and-interest');
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'no-due-date-no-interest' },
                    'Don\'t apply due date and interest'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'clear-floats' },
                  'Date loan',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: this.props.changeDateLoanMonth,
                      value: this.props.new_borrower.loan_date.month,
                      disabled: this.props.new_borrower.backend.processing,
                      errors: [] },
                    function () {
                      return (0, _DateTime.monthList)().map(function (month, index) {
                        return _react2.default.createElement(
                          'option',
                          { key: index },
                          month
                        );
                      });
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: this.props.changeDateLoanDate,
                      value: this.props.new_borrower.loan_date.date,
                      disabled: this.props.new_borrower.backend.processing,
                      errors: [] },
                    function () {
                      var date = new Date();
                      var max_days_in_month = (0, _DateTime.monthMaxdays)(_this2.props.new_borrower.loan_date.month, _this2.props.new_borrower.loan_date.year);
                      var dates = [];

                      for (var a = 1; a <= max_days_in_month; a++) {
                        dates.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return dates;
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: this.props.changeDateLoanYear,
                      value: this.props.new_borrower.loan_date.year,
                      disabled: this.props.new_borrower.backend.processing,
                      errors: [] },
                    function () {
                      var max_year = new Date().getFullYear();
                      var min_year = max_year - 10;
                      var years = [];

                      for (var a = max_year; a >= min_year; a--) {
                        years.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return years;
                    }()
                  ),
                  this.props.new_borrower.loan_date.errors.length ? _react2.default.createElement(
                    'div',
                    { className: 'error-list' },
                    this.props.new_borrower.loan_date.errors.map(function (error, index) {
                      return _react2.default.createElement(
                        'p',
                        { key: index },
                        error
                      );
                    })
                  ) : null
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Amount loan',
                  _react2.default.createElement(_InputText2.default, {
                    value: this.props.new_borrower.amount_loan.value,
                    placeholder: 'amount loan...',
                    numberOnly: true,
                    onChange: this.props.changeAmountLoan,
                    errors: this.props.new_borrower.amount_loan.errors,
                    disabled: this.props.new_borrower.backend.processing,
                    maxlength: 50 }),
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      (0, _Numbers.currency)(this.props.new_borrower.amount_loan.value)
                    ),
                    ' Pesos'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Interest rate',
                  _react2.default.createElement(_InputText2.default, {
                    placeholder: 'Interest rate...',
                    numberOnly: true,
                    onChange: this.props.changeInterest,
                    value: this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' ? this.props.new_borrower.interest_rate.value : 'N/A',
                    errors: this.props.new_borrower.interest_rate.errors,
                    disabled: (this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest') && !this.props.new_borrower.backend.processing ? false : true,
                    maxlength: 50 }),
                  this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' ? _react2.default.createElement(
                    'p',
                    null,
                    (0, _Numbers.currency)(this.props.new_borrower.interest_rate.value),
                    ' ',
                    this.props.new_borrower.interest_rate.type == 'percentage' ? 'Percent' : 'Pesos'
                  ) : null
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement('input', {
                    id: 'interest-type-percentage',
                    type: 'radio',
                    disabled: this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest',
                    checked: this.props.new_borrower.interest_rate.type == 'percentage',
                    onChange: function onChange() {
                      return _this2.props.changeInterestType('percentage');
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'interest-type-percentage' },
                    'Percentage'
                  ),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('input', {
                    id: 'interest-type-fixed',
                    type: 'radio',
                    disabled: this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest',
                    checked: this.props.new_borrower.interest_rate.type == 'fixed',
                    onChange: function onChange() {
                      return _this2.props.changeInterestType('fixed');
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'interest-type-fixed' },
                    'Fixed value'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Payment Method',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'notification-method',
                      onChange: this.props.changePaymentMethod,
                      value: this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest' ? '0' : this.props.new_borrower.payment_method.value,
                      disabled: this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest',
                      errors: this.props.new_borrower.payment_method.errors },
                    this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest' ? _react2.default.createElement(
                      'option',
                      { value: '0' },
                      'N/A'
                    ) : null,
                    _react2.default.createElement(
                      'option',
                      { value: '1' },
                      'Monthly'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '2' },
                      'Semi-monthly'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '3' },
                      'Daily'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: '4' },
                      'One Give'
                    )
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  'Months to pay',
                  _react2.default.createElement(_InputText2.default, {
                    placeholder: 'Months to pay...',
                    numberOnly: true,
                    onChange: this.props.changeMonthsToPay,
                    value: (this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest') && this.props.new_borrower.payment_method.value != 4 ? this.props.new_borrower.months_to_pay.value : 'N/A',
                    errors: this.props.new_borrower.months_to_pay.errors,
                    disabled: (this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest') && !this.props.new_borrower.backend.processing && this.props.new_borrower.payment_method.value != 4 ? false : true,
                    maxlength: 50 })
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'clear-floats' },
                  'Expected date of payment (One Give)',
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: this.props.changeDateOfPaymentMonth,
                      value: this.props.new_borrower.date_of_payment.month,
                      disabled: (this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'due-date-only') && !this.props.new_borrower.backend.processing && this.props.new_borrower.payment_method.value == 4 ? false : true,
                      errors: [] },
                    function () {
                      return (0, _DateTime.monthList)().map(function (month, index) {
                        return _react2.default.createElement(
                          'option',
                          { key: index },
                          month
                        );
                      });
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: this.props.changeDateOfPaymentDate,
                      value: this.props.new_borrower.date_of_payment.date,
                      disabled: (this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'due-date-only') && !this.props.new_borrower.backend.processing && this.props.new_borrower.payment_method.value == 4 ? false : true,
                      errors: [] },
                    function () {
                      var date = new Date();
                      var max_days_in_month = (0, _DateTime.monthMaxdays)(_this2.props.new_borrower.date_of_payment.month, _this2.props.new_borrower.date_of_payment.year);
                      var dates = [];

                      for (var a = 1; a <= max_days_in_month; a++) {
                        dates.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return dates;
                    }()
                  ),
                  _react2.default.createElement(
                    _InputSelect2.default,
                    {
                      className: 'date-loan',
                      onChange: this.props.changeDateOfPaymentYear,
                      value: this.props.new_borrower.date_of_payment.year,
                      disabled: (this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'due-date-only') && !this.props.new_borrower.backend.processing && this.props.new_borrower.payment_method.value == 4 ? false : true,
                      errors: [] },
                    function () {
                      var min_year = new Date().getFullYear();
                      var max_year = min_year + 25;
                      var years = [];

                      for (var a = min_year; a <= max_year; a++) {
                        years.push(_react2.default.createElement(
                          'option',
                          { key: a },
                          a
                        ));
                      }

                      return years;
                    }()
                  )
                )
              ),
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'h1',
                    null,
                    'Computed values'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Interest rate'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_borrower.interest_rate.value) + (this.props.new_borrower.interest_rate.type == 'percentage' ? ' Percent' : ' Pesos') })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Profit per month'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: this.props.new_borrower.payment_method.value == 4 ? '0.00 Pesos' : (0, _Numbers.currency)(this.props.new_borrower.calculated_values.computed_interest) + ' Pesos' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Total profit'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_borrower.calculated_values.computed_profit) + ' Pesos' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Total amount to pay'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(Number(this.props.new_borrower.calculated_values.computed_profit) + Number(this.props.new_borrower.amount_loan.value)) + ' Pesos' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Monthly payment'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_borrower.calculated_values.monthly) + ' Pesos' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Semi-monthly payment'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_borrower.calculated_values.semi_monthly) + ' Pesos' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    'Daily payment'
                  ),
                  _react2.default.createElement(_DisplayTextBox2.default, { value: (0, _Numbers.currency)(this.props.new_borrower.calculated_values.daily) + ' Pesos' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_InputButton2.default, {
                    value: 'Create borrower',
                    onClick: this.handleSubmit,
                    sending: this.props.new_borrower.backend.processing,
                    disabled: this.props.new_borrower.backend.allow_submit && !this.props.new_borrower.backend.processing ? false : true,
                    errors: [] })
                ),
                this.props.new_borrower.backend.status == 'failed' ? _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _WithIcon2.default,
                    { icon: _path2.default.join(app_path, 'app/images/cross.png') },
                    _react2.default.createElement(
                      'p',
                      { className: 'error-list' },
                      'Failed to create new borrower: ',
                      _react2.default.createElement(
                        'u',
                        null,
                        this.props.new_borrower.backend.message
                      )
                    )
                  )
                ) : this.props.new_borrower.backend.status == 'successful' ? _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _WithIcon2.default,
                    { icon: _path2.default.join(app_path, 'app/images/check.png') },
                    _react2.default.createElement(
                      'p',
                      { className: 'okay' },
                      'Failed to create new borrower: ',
                      _react2.default.createElement(
                        'u',
                        null,
                        this.props.new_borrower.backend.message
                      )
                    )
                  )
                ) : null
              )
            )
          )
        )
      );
    }
  }]);

  return NewBorrower;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    new_borrower: _extends({}, store.new_borrower)
  };
}, {
  changeAddress: newBorrowerActions.changeAddress,
  changeFirstname: newBorrowerActions.changeFirstname,
  changeMiddlename: newBorrowerActions.changeMiddlename,
  changeSurname: newBorrowerActions.changeSurname,
  changeGender: newBorrowerActions.changeGender,
  changeAmountLoan: newBorrowerActions.changeAmountLoan,
  changeInterest: newBorrowerActions.changeInterest,
  changeInterestType: newBorrowerActions.changeInterestType,
  changeMonthsToPay: newBorrowerActions.changeMonthsToPay,
  changeDateLoanMonth: newBorrowerActions.changeDateLoanMonth,
  changeDateLoanDate: newBorrowerActions.changeDateLoanDate,
  changeDateLoanYear: newBorrowerActions.changeDateLoanYear,
  changeLoanCondition: newBorrowerActions.changeLoanCondition,
  changeToApplyDueDateOnly: newBorrowerActions.changeToApplyDueDateOnly,
  changeToApplyInterestOnly: newBorrowerActions.changeToApplyInterestOnly,
  changeToApplyDueDateInterest: newBorrowerActions.changeToApplyDueDateInterest,
  changeToNoDueDateNoInterest: newBorrowerActions.changeToNoDueDateNoInterest,
  addMoreContactNumbers: newBorrowerActions.addMoreContactNumbers,
  removeContactNumber: newBorrowerActions.removeContactNumber,
  changeContactNumber: newBorrowerActions.changeContactNumber,
  changePaymentMethod: newBorrowerActions.changePaymentMethod,
  changeDateOfPaymentMonth: newBorrowerActions.changeDateOfPaymentMonth,
  changeDateOfPaymentDate: newBorrowerActions.changeDateOfPaymentDate,
  changeDateOfPaymentYear: newBorrowerActions.changeDateOfPaymentYear,
  reset: newBorrowerActions.reset,
  submit: newBorrowerActions.submit
})(NewBorrower);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _electron = __webpack_require__(2);

var _chart = __webpack_require__(87);

var _chart2 = _interopRequireDefault(_chart);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _DateTime = __webpack_require__(3);

var _WithSidebar = __webpack_require__(6);

var _WithSidebar2 = _interopRequireDefault(_WithSidebar);

var _WithIcon = __webpack_require__(7);

var _WithIcon2 = _interopRequireDefault(_WithIcon);

var _WithLabel = __webpack_require__(18);

var _WithLabel2 = _interopRequireDefault(_WithLabel);

var _status_report = __webpack_require__(57);

var _Numbers = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// actions

// helpers


var StatusReport = function (_Component) {
  _inherits(StatusReport, _Component);

  function StatusReport(props) {
    _classCallCheck(this, StatusReport);

    var _this = _possibleConstructorReturn(this, (StatusReport.__proto__ || Object.getPrototypeOf(StatusReport)).call(this, props));

    _this.print = _this.print.bind(_this);
    _this.createBorrowerIncreaseChart = _this.createBorrowerIncreaseChart.bind(_this);
    _this.createPaymentIncreaseChart = _this.createPaymentIncreaseChart.bind(_this);
    return _this;
  }

  _createClass(StatusReport, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetch();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.report.data) {
        this.createBorrowerIncreaseChart();
        this.createLoanIncreaseChart();
        this.createPaymentIncreaseChart();
      }
    }
  }, {
    key: 'createLoanIncreaseChart',
    value: function createLoanIncreaseChart() {
      var _this2 = this;

      var canvas = this.loan_increase_chart;

      var highest_value = function () {
        return Object.values(_this2.props.report.data.loan_increase).map(function (data) {
          return data.count;
        }).reduce(function (accumulator, current_value) {
          if (current_value > accumulator) {
            accumulator = current_value;
          }

          return accumulator;
        });
      }();

      var max = highest_value + 0.25 * (highest_value * 2);
      max = max > 0 ? max : 1000;

      var stepSize = highest_value <= 1000 ? 100 : highest_value <= 10000 ? 1000 : highest_value <= 100000 ? 10000 : 100000;

      var myChart = new _chart2.default(canvas, {
        type: 'line',
        data: {
          labels: Object.keys(this.props.report.data.loan_increase).map(function (index) {
            return (0, _DateTime.monthList)()[index];
          }),
          datasets: [{
            label: 'Total loans',
            data: Object.values(this.props.report.data.loan_increase).map(function (data) {
              return data.count;
            }),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: stepSize,
                max: max
              }
            }]
          }
        }
      });
    }
  }, {
    key: 'createPaymentIncreaseChart',
    value: function createPaymentIncreaseChart() {
      var _this3 = this;

      var canvas = this.payment_increase_chart;

      var highest_value = function () {
        return Object.values(_this3.props.report.data.payment_increase).map(function (data) {
          return data.count;
        }).reduce(function (accumulator, current_value) {
          if (current_value > accumulator) {
            accumulator = current_value;
          }

          return accumulator;
        });
      }();

      var max = highest_value + 0.25 * (highest_value * 2);
      max = max > 0 ? max : 100;

      var stepSize = highest_value <= 1000 ? 100 : highest_value <= 10000 ? 1000 : highest_value <= 100000 ? 10000 : 100000;

      var myChart = new _chart2.default(canvas, {
        type: 'line',
        data: {
          labels: Object.keys(this.props.report.data.payment_increase).map(function (index) {
            return (0, _DateTime.monthList)()[index];
          }),
          datasets: [{
            label: 'Total payments received',
            data: Object.values(this.props.report.data.payment_increase).map(function (data) {
              return data.count;
            }),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: stepSize,
                max: max
              }
            }]
          }
        }
      });
    }
  }, {
    key: 'createBorrowerIncreaseChart',
    value: function createBorrowerIncreaseChart() {
      var _this4 = this;

      var canvas = this.borrower_increase_chart;

      var highest_value = function () {
        return Object.values(_this4.props.report.data.borrower_increase).map(function (data) {
          return data.count;
        }).reduce(function (accumulator, current_value) {
          if (current_value > accumulator) {
            accumulator = current_value;
          }

          return accumulator;
        });
      }();

      var max = highest_value + 5;
      var stepSize = highest_value >= 5 ? 5 : 1;

      var myChart = new _chart2.default(canvas, {
        type: 'line',
        data: {
          labels: Object.keys(this.props.report.data.borrower_increase).map(function (index) {
            return (0, _DateTime.monthList)()[index];
          }),
          datasets: [{
            label: '# of new borrower',
            data: Object.values(this.props.report.data.borrower_increase).map(function (data) {
              return data.count;
            }),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: stepSize,
                max: max
              }
            }]
          }
        }
      });
    }
  }, {
    key: 'print',
    value: function print() {
      window.print();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var app_path = _electron.remote.app.getAppPath();

      return _react2.default.createElement(
        _WithSidebar2.default,
        { onLink: 'status-report' },
        _react2.default.createElement(
          'div',
          null,
          this.props.report.data ? _react2.default.createElement(
            'div',
            { className: 'report-container' },
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'h1',
                null,
                'Business Status Report'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'body' },
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Description' },
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'p',
                      null,
                      'The chart below shows you how many new borrowers registered this month and the past 5 months.'
                    )
                  )
                ),
                _react2.default.createElement('canvas', { ref: function ref(el) {
                    return _this5['borrower_increase_chart'] = el;
                  } })
              ),
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Description' },
                  _react2.default.createElement(
                    'p',
                    null,
                    'The chart below shows you the total amount of loans this month and the past 5 months.'
                  )
                ),
                _react2.default.createElement('canvas', { ref: function ref(el) {
                    return _this5['loan_increase_chart'] = el;
                  } })
              ),
              _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                  _WithLabel2.default,
                  { label: 'Description' },
                  _react2.default.createElement(
                    'p',
                    null,
                    'The chart below shows you the total amount of payments this month and the past 5 months.'
                  )
                ),
                _react2.default.createElement('canvas', { ref: function ref(el) {
                    return _this5['payment_increase_chart'] = el;
                  } })
              ),
              _react2.default.createElement(
                'a',
                {
                  className: 'default-btn-blue print-btn',
                  onClick: this.print },
                'Print'
              )
            )
          ) : _react2.default.createElement(
            _WithIcon2.default,
            { icon: _path2.default.join(app_path, 'app/images/processing-blue.gif') },
            _react2.default.createElement(
              'p',
              null,
              'Please wait...'
            )
          )
        )
      );
    }
  }]);

  return StatusReport;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (store) {
  return {
    report: _extends({}, store.status_report)
  };
}, {
  fetch: _status_report.fetch
})(StatusReport);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Array prototype functions
 */
Array.prototype.stringify = function () {
  var inject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var string = '';

  this.forEach(function (value, index) {
    if (inject && index > 0) {
      string += inject + value;
    } else {
      string += value;
    }
  });

  return string;
};

Array.prototype.removeFirst = function () {
  this.shift();
  return this;
};

Array.prototype.addFirst = function (field) {
  this.unshift(field);
  return this;
};

Array.prototype.sum = function () {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var sum = 0;

  this.forEach(function (value) {
    if (value.constructor == Object) {
      sum += Number(value[field]);
    } else {
      sum += Number(value);
    }
  });

  return sum;
};

Array.prototype.sumIf = function (callback) {
  var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var sum = 0;

  this.forEach(function (value) {
    if (callback(value)) {
      if (value.constructor == Object) {
        sum += value[field];
      } else {
        sum += value;
      }
    }
  });

  return sum;
};

Array.prototype.countIf = function (callback) {
  var count = 0;

  this.forEach(function (value) {
    if (callback(value)) count++;
  });

  return count;
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.changePassword = changePassword;
exports.clearLogin = clearLogin;
function login(password) {
  if (!password.length) {
    return {
      type: 'LOGIN_CPW',
      value: password
    };
  }

  return {
    type: '_LOGIN',
    password: password
  };
}

function changePassword(value) {
  return {
    type: 'LOGIN_CPW',
    value: value
  };
}

function clearLogin() {
  return {
    type: 'LOGIN_CLEAR'
  };
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exitApp = exitApp;
function exitApp() {
  return {
    type: '_APPLICATION_EXIT'
  };
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.changeAmount = changeAmount;
exports.changeInterestRate = changeInterestRate;
exports.changeInterestType = changeInterestType;
exports.changePaymentMethod = changePaymentMethod;
exports.changeDateOfPaymentMonth = changeDateOfPaymentMonth;
exports.changeDateOfPaymentDate = changeDateOfPaymentDate;
exports.changeDateOfPaymentYear = changeDateOfPaymentYear;
exports.changeMonthsToPay = changeMonthsToPay;
exports.changeLoanCondition = changeLoanCondition;
exports.changeDateLoanDate = changeDateLoanDate;
exports.changeDateLoanMonth = changeDateLoanMonth;
exports.changeDateLoanYear = changeDateLoanYear;
exports.submit = submit;
exports.reset = reset;
function changeAmount(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_AMOUNT',
    value: value
  };
}

function changeInterestRate(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_INTEREST_RATE',
    value: value
  };
}

function changeInterestType(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_INTEREST_TYPE',
    value: value
  };
}

function changePaymentMethod(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_PAYMENT_METHOD',
    value: value
  };
}

function changeDateOfPaymentMonth(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DOP_MONTH',
    value: value
  };
}

function changeDateOfPaymentDate(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DOP_DATE',
    value: value
  };
}

function changeDateOfPaymentYear(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DOP_YEAR',
    value: value
  };
}

function changeMonthsToPay(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_MONTHS_TO_PAY',
    value: value
  };
}

function changeLoanCondition(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_LOAN_CONDITION',
    value: value
  };
}

function changeDateLoanDate(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DATELOAN_DATE',
    value: value
  };
}

function changeDateLoanMonth(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DATELOAN_MONTH',
    value: value
  };
}

function changeDateLoanYear(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DATELOAN_YEAR',
    value: value
  };
}

function submit(fields) {
  return _extends({
    type: '_BORROWERNEWLOAN_SUBMIT'
  }, fields);
}

function reset() {
  return {
    type: 'BORROWERNEWLOAN_RESET'
  };
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
exports.reset = reset;
function fetch(id) {
  return {
    type: '_BORROWERS_LIST_FETCH',
    id: id
  };
}

function reset() {
  return {
    type: 'BORROWERS_LIST_RESET'
  };
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDueDatesTomorrow = getDueDatesTomorrow;
exports.getDueDatesToday = getDueDatesToday;
exports.getDueDatesThisMonth = getDueDatesThisMonth;
exports.getPastDueDates = getPastDueDates;
exports.getOneGives = getOneGives;
function getDueDatesTomorrow() {
  return {
    type: '_DASHBOARD_GET_DUEDATES_TOMORROW'
  };
}

function getDueDatesToday() {
  return {
    type: '_DASHBOARD_GET_DUEDATES_TODAY'
  };
}

function getDueDatesThisMonth() {
  return {
    type: '_DASHBOARD_GET_DUEDATES_THISMONTH'
  };
}

function getPastDueDates() {
  return {
    type: '_DASHBOARD_GET_PASTDUEDATES'
  };
}

function getOneGives() {
  return {
    type: '_DASHBOARD_GET_ONEGIVES'
  };
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetch = fetch;
exports.editAddress = editAddress;
exports.editFirstname = editFirstname;
exports.editMiddlename = editMiddlename;
exports.editSurname = editSurname;
exports.editGender = editGender;
exports.editContactNumber = editContactNumber;
exports.addMoreContactNumbers = addMoreContactNumbers;
exports.removeContactNumber = removeContactNumber;
exports.send = send;
exports.reset = reset;
function fetch(id) {
  return {
    type: '_EDITBORROWERPROFILE_FETCH',
    id: id
  };
}

function editAddress(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_ADDRESS',
    value: value
  };
}

function editFirstname(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_FIRSTNAME',
    value: value
  };
}

function editMiddlename(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_MIDDLENAME',
    value: value
  };
}

function editSurname(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_SURNAME',
    value: value
  };
}

function editGender(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_GENDER',
    value: value
  };
}

function editContactNumber(value, index) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_CONTACT_NUMBER',
    value: value,
    index: index
  };
}

function addMoreContactNumbers() {
  return {
    type: 'EDITBORRWOERPROFILE_ADD_CONTACT_NUMBER'
  };
}

function removeContactNumber(index) {
  return {
    type: 'EDITBORRWOERPROFILE_REMOVE_CONTACT_NUMBER',
    index: index
  };
}

function send(data) {
  return _extends({
    type: '_EDITBORRWOERPROFILE_SEND'
  }, data);
}

function reset() {
  return {
    type: 'EDITBORRWOERPROFILE_RESET'
  };
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
function fetch() {
  return {
    type: '_INCOMEEXPENSEREPORT_FETCH_ALL'
  };
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.changeAddress = changeAddress;
exports.changeFirstname = changeFirstname;
exports.changeMiddlename = changeMiddlename;
exports.changeSurname = changeSurname;
exports.changeGender = changeGender;
exports.changeAmountLoan = changeAmountLoan;
exports.changeMonthsToPay = changeMonthsToPay;
exports.changeInterest = changeInterest;
exports.submit = submit;
exports.changeDateLoanYear = changeDateLoanYear;
exports.changeDateLoanDate = changeDateLoanDate;
exports.changeDateLoanMonth = changeDateLoanMonth;
exports.reset = reset;
exports.changeLoanCondition = changeLoanCondition;
exports.addMoreContactNumbers = addMoreContactNumbers;
exports.removeContactNumber = removeContactNumber;
exports.changeContactNumber = changeContactNumber;
exports.changePaymentMethod = changePaymentMethod;
exports.changeInterestType = changeInterestType;
exports.changeDateOfPaymentMonth = changeDateOfPaymentMonth;
exports.changeDateOfPaymentDate = changeDateOfPaymentDate;
exports.changeDateOfPaymentYear = changeDateOfPaymentYear;
function changeAddress(value) {
  return {
    type: 'NEWBORROWER_CAV',
    value: value
  };
}

function changeFirstname(value) {
  return {
    type: 'NEWBORROWER_CFN',
    value: value
  };
}

function changeMiddlename(value) {
  return {
    type: 'NEWBORROWER_CMN',
    value: value
  };
}

function changeSurname(value) {
  return {
    type: 'NEWBORROWER_CSN',
    value: value
  };
}

function changeGender(value) {
  return {
    type: 'NEWBORROWER_CGD',
    value: value
  };
}

function changeAmountLoan(value) {
  return {
    type: 'NEWBORROWER_CAL',
    value: value
  };
}

function changeMonthsToPay(value) {
  return {
    type: 'NEWBORROWER_CMP',
    value: value
  };
}

function changeInterest(value) {
  return {
    type: 'NEWBORROWER_CIR',
    value: value
  };
}

function submit(fields) {
  return _extends({
    type: '_NEWBORROWER_SUBMIT'
  }, fields);
}

function changeDateLoanYear(value) {
  return {
    type: 'NEWBORROWER_CLY',
    value: value
  };
}

function changeDateLoanDate(value) {
  return {
    type: 'NEWBORROWER_CLD',
    value: value
  };
}

function changeDateLoanMonth(value) {
  return {
    type: 'NEWBORROWER_CLM',
    value: value
  };
}

function reset() {
  return {
    type: 'NEWBORROWER_RESET'
  };
}

function changeLoanCondition(value) {
  return {
    type: 'NEWBORROWER_CLC',
    value: value
  };
}

function addMoreContactNumbers() {
  return {
    type: 'NEWBORROWER_AMCN'
  };
}

function removeContactNumber(index) {
  return {
    type: 'NEWBORROWER_RCN',
    index: index
  };
}

function changeContactNumber(value, index) {
  return {
    type: 'NEWBORROWER_CCN',
    index: index,
    value: value
  };
}

function changePaymentMethod(value) {
  return {
    type: 'NEWBORROWER_CPM',
    value: value
  };
}

function changeInterestType(value) {
  return {
    type: 'NEWBORROWER_CIT',
    value: value
  };
}

function changeDateOfPaymentMonth(value) {
  return {
    type: 'NEWBORROWER_CEDOPM',
    value: value
  };
}

function changeDateOfPaymentDate(value) {
  return {
    type: 'NEWBORROWER_CEDOPD',
    value: value
  };
}

function changeDateOfPaymentYear(value) {
  return {
    type: 'NEWBORROWER_CEDOPY',
    value: value
  };
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.changeSearchString = changeSearchString;
exports.changeSearchType = changeSearchType;
exports.submit = submit;
exports.reset = reset;
function changeSearchString(value) {
  return {
    type: 'SEARCH_CHANGE_STRING',
    value: value
  };
}

function changeSearchType(value) {
  return {
    type: 'SEARCH_CHANGE_TYPE',
    value: value
  };
}

function submit(data) {
  return _extends({
    type: '_SEARCH_SUBMIT'
  }, data);
}

function reset() {
  return {
    type: 'SEARCH_RESET'
  };
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
function fetch() {
  return {
    type: '_STATUSREPORT_FETCH_DATA'
  };
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCssTransitionGroup = __webpack_require__(16);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.style.overflow = 'hidden';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.style.overflow = 'auto';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'modal-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'modal-container' },
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              transitionName: 'grow',
              transitionAppear: true,
              transitionAppearTimeout: 350,
              transitionEnterTimeout: 350,
              transitionLeaveTimeout: 350 },
            _react2.default.createElement(
              'div',
              { className: 'modal' },
              _react2.default.createElement(
                'div',
                { className: 'message' },
                this.props.children
              ),
              _react2.default.createElement(
                'div',
                { className: 'btns-wrapper' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn-dismiss', onClick: this.props.dismiss },
                  'Dismiss'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  dismiss: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.element.isRequired
};
exports.default = Modal;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(5);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'sidebar-wrapper' },
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: this.props.onLink == 'dashboard' ? 'on-link' : false, to: '/dashboard' },
                'Dashboard'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: this.props.onLink == 'borrowers-list' ? 'on-link' : false, to: '/borrowers' },
                'List of borrowers'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: this.props.onLink == 'new-borrower' ? 'on-link' : false, to: '/new-borrower' },
                'Register new borrower'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: this.props.onLink == 'status-report' ? 'on-link' : false, to: '/status-report' },
                'Status Report'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/logout' },
                'Logout'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: this.props.onLink == 'about' ? 'on-link' : false, to: '/about' },
                'About'
              )
            )
          )
        )
      );
    }
  }]);

  return Sidebar;
}(_react.Component);

Sidebar.propTypes = {
  onLink: _propTypes2.default.string
};
exports.default = Sidebar;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(46);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(47);

var _reactRouter = __webpack_require__(5);

var _reactRedux = __webpack_require__(1);

var _Landing = __webpack_require__(28);

var _Landing2 = _interopRequireDefault(_Landing);

var _Login = __webpack_require__(29);

var _Login2 = _interopRequireDefault(_Login);

var _Setup = __webpack_require__(31);

var _Setup2 = _interopRequireDefault(_Setup);

var _setPassword = __webpack_require__(33);

var _setPassword2 = _interopRequireDefault(_setPassword);

var _Welcome = __webpack_require__(32);

var _Welcome2 = _interopRequireDefault(_Welcome);

var _Logout = __webpack_require__(30);

var _Logout2 = _interopRequireDefault(_Logout);

var _Dashboard = __webpack_require__(40);

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _NewBorrower = __webpack_require__(44);

var _NewBorrower2 = _interopRequireDefault(_NewBorrower);

var _BorrowerProfile = __webpack_require__(37);

var _BorrowerProfile2 = _interopRequireDefault(_BorrowerProfile);

var _BorrowersList = __webpack_require__(39);

var _BorrowersList2 = _interopRequireDefault(_BorrowersList);

var _BorrowerEditProfile = __webpack_require__(35);

var _BorrowerEditProfile2 = _interopRequireDefault(_BorrowerEditProfile);

var _BorrowerNewLoan = __webpack_require__(36);

var _BorrowerNewLoan2 = _interopRequireDefault(_BorrowerNewLoan);

var _LoanContract = __webpack_require__(42);

var _LoanContract2 = _interopRequireDefault(_LoanContract);

var _LoanComprehensiveReport = __webpack_require__(41);

var _LoanComprehensiveReport2 = _interopRequireDefault(_LoanComprehensiveReport);

var _LoanSummaryReport = __webpack_require__(43);

var _LoanSummaryReport2 = _interopRequireDefault(_LoanSummaryReport);

var _BorrowerComprehensiveReport = __webpack_require__(34);

var _BorrowerComprehensiveReport2 = _interopRequireDefault(_BorrowerComprehensiveReport);

var _BorrowerSummaryReport = __webpack_require__(38);

var _BorrowerSummaryReport2 = _interopRequireDefault(_BorrowerSummaryReport);

var _StatusReport = __webpack_require__(45);

var _StatusReport2 = _interopRequireDefault(_StatusReport);

var _About = __webpack_require__(27);

var _About2 = _interopRequireDefault(_About);

var _createStore = __webpack_require__(26);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pages
(0, _reactDom.render)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: _createStore2.default },
      _react2.default.createElement(
            _reactRouter.Router,
            { history: _reactRouter.browserHistory },
            _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/setup', component: _Setup2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/setup-password', component: _setPassword2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/welcome', component: _Welcome2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/logout', component: _Logout2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/dashboard', component: _Dashboard2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/new-borrower', component: _NewBorrower2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/borrowers', component: _BorrowersList2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/borrowers/:id/view', component: _BorrowerProfile2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/borrowers/:id/edit', component: _BorrowerEditProfile2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/borrowers/:id/new-loan', component: _BorrowerNewLoan2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/borrowers/:id/comprehensive-report', component: _BorrowerComprehensiveReport2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/borrowers/:id/summary-report', component: _BorrowerSummaryReport2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/loan/:id/contract', component: _LoanContract2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/loan/:id/comprehensive-report', component: _LoanComprehensiveReport2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/loan/:id/summary-report', component: _LoanSummaryReport2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/status-report', component: _StatusReport2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: '*', component: _Landing2.default })
      )
), document.querySelector('#main'));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = catchee;

var _electron = __webpack_require__(2);

function removeTempListeners(action) {
  _electron.ipcRenderer.removeAllListeners(action.type + '_SUCCESSFUL');
  _electron.ipcRenderer.removeAllListeners(action.type + '_FAILED');
}

function catchee(_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      if (action.type.charAt(0) == '_') {
        setTimeout(function () {
          action.type = action.type.split('_').removeFirst().stringify('_');

          _electron.ipcRenderer.on(action.type + '_FAILED', function (event, arg) {
            removeTempListeners(action);
            dispatch(_extends({
              type: action.type + '_FAILED'
            }, arg));
          });

          _electron.ipcRenderer.on(action.type + '_SUCCESSFUL', function (event, arg) {
            removeTempListeners(action);
            dispatch(_extends({
              type: action.type + '_SUCCESSFUL'
            }, arg));
          });

          _electron.ipcRenderer.send(action.type, _extends({}, action));
        }, 1);
      }

      next(action);
    };
  };
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = login;

var _login = __webpack_require__(76);

var _login2 = _interopRequireDefault(_login);

var _Validator = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _login2.default;
  var action = arguments[1];

  switch (action.type) {
    case 'LOGIN':
      return _extends({}, state);
    case 'LOGIN_CPW':
      return _extends({}, state, {
        password: {
          value: action.value,
          errors: (0, _Validator.validatePassword)(action.value)
        }
      });
    case '_LOGIN':
      return _extends({}, state, {
        backend: {
          processing: true,
          status: null
        }
      });
    case 'LOGIN_SUCCESSFUL':
      return _extends({}, state, {
        backend: {
          processing: true,
          status: 'logged_in'
        }
      });
    case 'LOGIN_FAILED':
      return _extends({}, state, {
        password: {
          value: state.password.value,
          errors: action.errors
        },
        backend: {
          processing: false,
          status: 'failed'
        }
      });
    case 'LOGIN_CLEAR':
      return _extends({}, _login2.default);
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = setup;

var _setup = __webpack_require__(77);

var _setup2 = _interopRequireDefault(_setup);

var _Validator = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _setup2.default;
  var action = arguments[1];

  switch (action.type) {
    case 'SETUP_CFN':
      return _extends({}, state, {
        firstname: {
          value: action.value,
          errors: (0, _Validator.validateName)('First name', action.value)
        },
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CMN':
      return _extends({}, state, {
        middlename: {
          value: action.value,
          errors: (0, _Validator.validateName)('Middle name', action.value)
        },
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CSN':
      return _extends({}, state, {
        surname: {
          value: action.value,
          errors: (0, _Validator.validateName)('Surname', action.value)
        },
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CG':
      return _extends({}, state, {
        gender: {
          value: action.value,
          errors: (0, _Validator.validateGender)(action.value)
        },
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CBDM':
      return _extends({}, state, {
        birth_date: _extends({}, state.birth_date, {
          errors: (0, _Validator.validateBirthdates)(action.value, state.birth_date.date, state.birth_date.year),
          month: action.value
        }),
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CBDD':
      return _extends({}, state, {
        birth_date: _extends({}, state.birth_date, {
          errors: (0, _Validator.validateBirthdates)(state.birth_date.month, action.value, state.birth_date.year),
          date: action.value
        }),
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CBDY':
      return _extends({}, state, {
        birth_date: _extends({}, state.birth_date, {
          errors: (0, _Validator.validateBirthdates)(state.birth_date.month, state.birth_date.date, action.value),
          year: action.value
        }),
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CPW':
      return _extends({}, state, {
        password: {
          value: action.value,
          errors: (0, _Validator.validatePasswords)(action.value, state.confirm_password.value)
        },
        confirm_password: _extends({}, state.confirm_password, {
          errors: (0, _Validator.validatePasswordAgain)(action.value, state.confirm_password.value)
        }),
        backend: _extends({}, _setup2.default.backend)
      });
    case 'SETUP_CCPW':
      return _extends({}, state, {
        password: _extends({}, state.password, {
          errors: (0, _Validator.validatePasswords)(state.password.value, action.value)
        }),
        confirm_password: {
          value: action.value,
          errors: (0, _Validator.validatePasswordAgain)(state.password.value, action.value)
        },
        backend: _extends({}, _setup2.default.backend)
      });
    case '_SETUP_SUBMIT':
      return _extends({}, state, {
        backend: {
          processing: true,
          message: null,
          status: null
        }
      });
    case 'SETUP_SUBMIT_SUCCESSFUL':
      return _extends({}, state, {
        backend: {
          processing: true,
          message: null,
          status: 'successful'
        }
      });
    case 'SETUP_SUBMIT_FAILED':
      return _extends({}, state, {
        backend: {
          processing: false,
          message: action.message,
          status: 'failed'
        }
      });
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = borrower_new_loan;

var _borrower_new_loan = __webpack_require__(78);

var _borrower_new_loan2 = _interopRequireDefault(_borrower_new_loan);

var _Calculator = __webpack_require__(24);

var calculator = _interopRequireWildcard(_Calculator);

var _Validator = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allowSubmit(new_state) {
  if (new_state.amount_loan.condition == 'due-date-only') {
    return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || !new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length || new_state.payment_method == 4 ? false : true;
  } else if (new_state.amount_loan.condition == 'interest-only') {
    return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || !new_state.interest_rate.value.length || new_state.interest_rate.errors.length ? false : true;
  } else if (new_state.amount_loan.condition == 'no-due-date-and-interest') {
    return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length ? false : true;
  }

  return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || !new_state.interest_rate.value.length || new_state.interest_rate.errors.length || !new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length || new_state.payment_method == 4 ? false : true;
}

function calculatedValues(new_state) {
  var computed_interest = 0;
  var computed_profit = 0;
  var monthly = 0;
  var semi_monthly = 0;
  var daily = 0;
  var interest_percentage = 0;

  if (new_state.amount_loan.condition == 'interest-only' && new_state.amount_loan.value.length && !new_state.amount_loan.errors.length) {
    /**
      * applying of interest only
      * will compute and add the interest
      * but will not compute for a monthly payment
     */
    interest_percentage = calculator.computeInterestPercentage(new_state.interest_rate.value, new_state.interest_rate.type);
    computed_interest = calculator.computeInterest(new_state.amount_loan.value, interest_percentage, new_state.interest_rate.type, new_state.interest_rate.value);

    if (new_state.payment_method == 4) {
      computed_profit = computed_interest;
    } else {
      computed_profit = calculator.computeProfit(computed_interest, new_state.months_to_pay.value);
    }
  } else if (new_state.amount_loan.condition == 'due-date-only' && new_state.amount_loan.value.length && (new_state.months_to_pay.value.length && !new_state.months_to_pay.errors.length || new_state.payment_method.value == 4) && !new_state.amount_loan.errors.length) {
    /**
     * applying of due date only
     * will compute the monthly, half monthly and daily payment
     * but will not compute for the interest
     */

    if (new_state.payment_method.value != 4) {
      monthly = calculator.computePerMonth(new_state.amount_loan.condition, new_state.amount_loan.value, new_state.months_to_pay.value, computed_profit);
      semi_monthly = calculator.computePerHalfMonth(monthly);
      daily = calculator.computePerDay(monthly);
    }
  } else if (new_state.amount_loan.condition == 'due-date-and-interest' && new_state.amount_loan.value.length && !new_state.amount_loan.errors.length && (new_state.months_to_pay.value.length && !new_state.months_to_pay.errors.length || new_state.payment_method.value == 4) && new_state.interest_rate.value.length && !new_state.interest_rate.errors.length) {
    /**
     * apply due date and interest
     * will compute for the monthly, half monthly and daily payments
     * will compute for the interest
     */

    interest_percentage = calculator.computeInterestPercentage(new_state.interest_rate.value, new_state.interest_rate.type);
    computed_interest = calculator.computeInterest(new_state.amount_loan.value, interest_percentage, new_state.interest_rate.type, new_state.interest_rate.value);

    if (new_state.payment_method.value == 4) {
      computed_profit = calculator.computeProfit(interest_percentage, new_state.amount_loan.value);
    } else {
      computed_profit = calculator.computeProfit(computed_interest, new_state.months_to_pay.value);
      monthly = calculator.computePerMonth(new_state.amount_loan.condition, new_state.amount_loan.value, new_state.months_to_pay.value, computed_profit);
      semi_monthly = calculator.computePerHalfMonth(monthly);
      daily = calculator.computePerDay(monthly);
    }
  }

  return {
    computed_interest: computed_interest,
    computed_profit: computed_profit,
    monthly: monthly,
    semi_monthly: semi_monthly,
    daily: daily
  };
}

function borrower_new_loan() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _borrower_new_loan2.default;
  var action = arguments[1];

  var new_state = void 0;

  switch (action.type) {
    case 'BORROWERNEWLOAN_CHANGE_AMOUNT':
      new_state = _extends({}, state, {
        amount_loan: _extends({}, state.amount_loan, {
          value: action.value,
          errors: (0, _Validator.validateAmountLoan)(action.value)
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_INTEREST_RATE':
      new_state = _extends({}, state, {
        interest_rate: _extends({}, state.interest_rate, {
          value: action.value,
          errors: (0, _Validator.validateInterestRate)(action.value)
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_INTEREST_TYPE':
      new_state = _extends({}, state, {
        interest_rate: _extends({}, state.interest_rate, {
          type: action.value
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_PAYMENT_METHOD':
      new_state = _extends({}, state, {
        payment_method: _extends({}, state.payment_method, {
          value: action.value,
          errors: (0, _Validator.validatePaymentMethod)(action.value)
        }),
        months_to_pay: action.value == 4 ? _extends({}, state.months_to_pay, {
          value: '',
          errors: []
        }) : _extends({}, months_to_pay)
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_MONTHS_TO_PAY':
      new_state = _extends({}, state, {
        months_to_pay: _extends({}, state.months_to_pay, {
          value: action.value,
          errors: (0, _Validator.validateMonthsToPay)(action.value)
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_LOAN_CONDITION':
      new_state = _extends({}, state, {
        amount_loan: _extends({}, state.amount_loan, {
          condition: action.value
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_DATE':
      new_state = _extends({}, state, {
        date_loan: _extends({}, state.date_loan, {
          date: action.value,
          errors: (0, _Validator.validateLoanDate)(state.date_loan.month, action.value, state.date_loan.year)
        })
      });

      return _extends({}, new_state, {
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_MONTH':
      new_state = _extends({}, state, {
        date_loan: _extends({}, state.date_loan, {
          month: action.value,
          errors: (0, _Validator.validateLoanDate)(action.value, state.date_loan.date, state.date_loan.year)
        })
      });

      return _extends({}, new_state, {
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_YEAR':
      new_state = _extends({}, state, {
        date_loan: _extends({}, state.date_loan, {
          year: action.value,
          errors: (0, _Validator.validateLoanDate)(state.date_loan.month, state.date_loan.date, action.value)
        })
      });

      return _extends({}, new_state, {
        allow_submit: allowSubmit(new_state)
      });
    case 'BORROWERNEWLOAN_CHANGE_DOP_MONTH':
      return _extends({}, state, {
        date_of_payment: _extends({}, state.date_of_payment, {
          month: action.value
        })
      });
    case 'BORROWERNEWLOAN_CHANGE_DOP_DATE':
      return _extends({}, state, {
        date_of_payment: _extends({}, state.date_of_payment, {
          date: action.value
        })
      });
    case 'BORROWERNEWLOAN_CHANGE_DOP_YEAR':
      return _extends({}, state, {
        date_of_payment: _extends({}, state.date_of_payment, {
          year: action.value
        })
      });
    case '_BORROWERNEWLOAN_SUBMIT':
      return _extends({}, state, {
        backend: {
          processing: true,
          status: null,
          message: null
        }
      });
    case 'BORROWERNEWLOAN_SUBMIT_SUCCESSFUL':
      return _extends({}, state, {
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      });
    case 'BORROWERNEWLOAN_SUBMIT_FAILED':
      return _extends({}, state, {
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      });
    case 'BORROWERNEWLOAN_RESET':
      return _extends({}, _borrower_new_loan2.default);
    default:
      return _extends({}, state);
  }

  return state;
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = borrower_profile;

var _borrower_profile = __webpack_require__(79);

var _borrower_profile2 = _interopRequireDefault(_borrower_profile);

var _DateTime = __webpack_require__(3);

var _Validator = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allowLoanPaymentFieldsSubmit(fields) {
  return !fields.amount.value.toString().length || fields.amount.errors.length ? false : true;
}

function alterPaymentFields(loans, target_index, fields) {
  return loans.map(function (loan, index) {
    return index == target_index ? _extends({}, loan, {
      loan_payments: fields.loan_payments ? fields.loan_payments : loan.loan_payments,
      summary: fields.summary ? fields.summary : loan.summary,
      payment_fields: fields.amount ? _extends({}, loan.payment_fields, {
        amount: _extends({}, loan.payment_fields.amount, fields.amount)
      }) : fields.period ? _extends({}, loan.payment_fields, {
        period: _extends({}, loan.payment_fields.period, fields.period)
      }) : fields.backend ? _extends({}, loan.payment_fields, {
        backend: _extends({}, loan.payment_fields.backend, fields.backend)
      }) : fields.date_paid ? _extends({}, loan.payment_fields, {
        date_paid: _extends({}, loan.payment_fields.date_paid, fields.date_paid)
      }) : fields.payment_fields ? _extends({}, loan.payment_fields, fields.payment_fields) : _extends({}, loan.payment_fields, fields)
    }) : _extends({}, loan);
  });
}

function getInitialPaymentFields(loan) {
  return {
    shown: false,
    period: {
      month: loan.loan_payments.length ? (0, _DateTime.monthList)()[new Date(loan.loan_payments[0].period_paid).getMonth() + 1] : (0, _DateTime.monthList)()[new Date(loan.loan_date).getMonth() + 1],
      year: new Date().getFullYear()
    },
    amount: {
      value: '',
      errors: []
    },
    date_paid: {
      month: (0, _DateTime.monthList)()[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear()
    },
    allow_submit: false,
    backend: {
      processing: false,
      status: null,
      message: null
    }
  };
}

function getLoanSummary(loan) {
  var total_amount_paid = loan.loan_payments.sum('amount');
  var remaining_balance = Number(loan.amount) + Number(loan.profit) - total_amount_paid;

  return {
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance,
    months_left: remaining_balance / loan.per_month
  };
}

function getInitialPaymentEditFields(payment) {
  return _extends({}, payment, {
    edit: {
      shown: false,
      period: {
        month: (0, _DateTime.monthList)()[new Date(payment.period_paid).getMonth()],
        year: new Date(payment.period_paid).getFullYear()
      },
      amount: {
        value: payment.amount,
        errors: []
      },
      date_paid: {
        month: (0, _DateTime.monthList)()[new Date(payment.date_paid).getMonth()],
        date: new Date(payment.date_paid).getDate(),
        year: new Date(payment.date_paid).getFullYear()
      },
      allow_submit: true,
      backend: {
        processing: false,
        status: null,
        message: null
      }
    }
  });
}

function allowPaymentsEditFieldsSubmit(fields) {
  return !fields.amount.value.toString().length || fields.amount.errors.length ? false : true;
}

function alterPaymentEditFields(loan_payments, target_index, fields) {
  return loan_payments.map(function (payment, index) {
    return target_index == index ? _extends({}, payment, {
      edit: fields.amount ? _extends({}, payment.edit, {
        amount: _extends({}, payment.edit.amount, fields.amount)
      }) : fields.date_paid ? _extends({}, payment.edit, {
        date_paid: _extends({}, payment.edit.date_paid, fields.date_paid)
      }) : fields.period ? _extends({}, payment.edit, {
        period: _extends({}, payment.edit.period, fields.period)
      }) : fields.backend ? _extends({}, payment.edit, {
        backend: _extends({}, payment.edit.backend, fields.backend)
      }) : _extends({}, payment.edit, fields)
    }) : _extends({}, payment);
  });
}

function getInitialLoanEditFields(loan) {
  var loan_date = new Date(loan.loan_date);
  var date_of_payment = loan.expected_date_of_payment ? new Date(loan.expected_date_of_payment) : new Date();

  return {
    shown: false,
    amount_loan: {
      condition: loan.condition_applied,
      value: loan.amount,
      errors: []
    },
    months_to_pay: {
      value: loan.months_to_pay,
      errors: []
    },
    interest_rate: {
      type: loan.interest_type,
      value: loan.interest_rate,
      errors: []
    },
    payment_method: {
      value: loan.payment_method,
      errors: []
    },
    date_of_payment: {
      month: (0, _DateTime.monthList)()[date_of_payment.getMonth()],
      date: date_of_payment.getDate(),
      year: date_of_payment.getFullYear()
    },
    loan_date: {
      month: (0, _DateTime.monthList)()[loan_date.getMonth()],
      date: loan_date.getDate(),
      year: loan_date.getFullYear(),
      errors: []
    },
    backend: {
      allow_submit: true,
      processing: false,
      status: null,
      message: null
    }
  };
}

function alterLoanEditFields(loans, target_index, fields) {
  return loans.map(function (loan, loan_index) {
    return loan_index == target_index ? _extends({}, loan, {
      edit: fields.shown ? _extends({}, loan.edit, {
        shown: fields.shown
      }) : fields.amount_loan ? _extends({}, loan.edit, {
        amount_loan: _extends({}, loan.edit.amount_loan, fields.amount_loan)
      }) : fields.months_to_pay ? _extends({}, loan.edit, {
        months_to_pay: _extends({}, loan.edit.months_to_pay, fields.months_to_pay)
      }) : fields.interest_rate ? _extends({}, loan.edit, {
        interest_rate: _extends({}, loan.edit.interest_rate, fields.interest_rate)
      }) : fields.payment_method ? _extends({}, loan.edit, {
        payment_method: _extends({}, loan.edit.payment_method, fields.payment_method)
      }) : fields.loan_date ? _extends({}, loan.edit, {
        loan_date: _extends({}, loan.edit.loan_date, fields.loan_date)
      }) : fields.backend ? _extends({}, loan.edit, {
        backend: _extends({}, loan.edit.backend, fields.backend)
      }) : fields.date_of_payment ? _extends({}, loan.edit, {
        date_of_payment: _extends({}, loan.edit.date_of_payment, fields.date_of_payment)
      }) : _extends({}, loan.edit, fields)
    }) : _extends({}, loan);
  });
}

function allowLoanEditSubmit(new_state) {
  if (new_state.amount_loan.condition == 'due-date-only') {
    return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.loan_date.errors.length || !new_state.months_to_pay.value.length || new_state.months_to_pay.errors.length ? false : true;
  } else if (new_state.amount_loan.condition == 'interest-only') {
    return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.loan_date.errors.length || !new_state.interest_rate.value.length || new_state.interest_rate.errors.length ? false : true;
  } else if (new_state.amount_loan.condition == 'no-due-date-and-interest') {
    return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.loan_date.errors.length ? false : true;
  }

  return new_state.backend.processing || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.loan_date.errors.length || !new_state.interest_rate.value.length || new_state.interest_rate.errors.length || !new_state.months_to_pay.value.length || new_state.months_to_pay.errors.length ? false : true;
}

function getInitialPenaltyFields() {
  return {
    shown: false,
    amount: {
      value: '',
      errors: []
    },
    remarks: {
      value: '',
      errors: []
    },
    date_given: {
      month: (0, _DateTime.monthList)()[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear()
    },
    allow_submit: false,
    backend: {
      processing: false,
      status: null,
      message: null
    }
  };
}

function alterPenaltyFields(loans, target_index, fields) {
  return loans.map(function (loan, loan_index) {
    return loan_index == target_index ? _extends({}, loan, {
      penalty_fields: fields.amount ? _extends({}, loan.penalty_fields, {
        amount: _extends({}, loan.penalty_fields.amount, fields.amount)
      }) : fields.remarks ? _extends({}, loan.penalty_fields, {
        remarks: _extends({}, loan.penalty_fields.remarks, fields.remarks)
      }) : fields.date_given ? _extends({}, loan.penalty_fields, {
        date_given: _extends({}, loan.penalty_fields.date_given, fields.date_given)
      }) : fields.backend ? _extends({}, loan.penalty_fields, {
        backend: _extends({}, loan.penalty_fields.backend, fields.backend)
      }) : _extends({}, loan.penalty_fields, fields)
    }) : _extends({}, loan);
  });
}

function allowPenaltyFormSubmit(fields) {
  return fields.amount.value.toString().length && !fields.amount.errors.length && fields.remarks.value.length && !fields.remarks.errors.length ? true : false;
}

function getInitialPenaltyPaymentFields() {
  return {
    shown: false,
    allow_submit: false,
    amount: {
      value: '',
      errors: []
    },
    date_paid: {
      month: (0, _DateTime.monthList)()[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear()
    },
    backend: {
      processing: false,
      status: null,
      message: null
    }
  };
}

function alterPenaltyPaymentFields(penalties, target_index, fields) {
  return penalties.map(function (penalty, penalty_index) {
    return penalty_index == target_index ? _extends({}, penalty, {
      penalty_payment_fields: fields.amount ? _extends({}, penalty.penalty_payment_fields, {
        amount: _extends({}, penalty.penalty_payment_fields.amount, fields.amount)
      }) : fields.date_paid ? _extends({}, penalty.penalty_payment_fields, {
        date_paid: _extends({}, penalty.penalty_payment_fields.date_paid, fields.date_paid)
      }) : _extends({}, penalty.penalty_payment_fields, fields)
    }) : _extends({}, penalty);
  });
}

function allowPenaltyPaymentFormSubmit(fields) {
  return fields.amount.value.toString().length && !fields.amount.errors.length ? true : false;
}

function getPenaltySummary(penalty) {
  var total_amount_paid = penalty.penalty_payments.sum('amount');

  return {
    total_amount_paid: total_amount_paid,
    remaining_balance: penalty.amount - total_amount_paid
  };
}

function getInitialPenaltyEditFields(penalty) {
  return {
    shown: false,
    amount: {
      value: penalty.amount,
      errors: []
    },
    remarks: {
      value: penalty.remarks,
      errors: []
    },
    date_given: {
      month: (0, _DateTime.monthList)()[new Date(penalty.date_given).getMonth()],
      date: new Date(penalty.date_given).getDate(),
      year: new Date(penalty.date_given).getFullYear()
    },
    allow_submit: true,
    backend: {
      processing: false,
      status: null,
      message: null
    }
  };
}

function alterPenaltyEditFields(penalties, target_index, fields) {
  return penalties.map(function (penalty, penalty_index) {
    return penalty_index == target_index ? _extends({}, penalty, {
      edit: fields.amount ? _extends({}, penalty.edit, {
        amount: _extends({}, penalty.edit.amount, fields.amount)
      }) : fields.remarks ? _extends({}, penalty.edit, {
        remarks: _extends({}, penalty.edit.remarks, fields.remarks)
      }) : fields.date_given ? _extends({}, penalty.edit, {
        date_given: _extends({}, penalty.edit.date_given, fields.date_given)
      }) : _extends({}, penalty.edit, fields)
    }) : _extends({}, penalty);
  });
}

function getInitialPenaltyPaymentEditFields(penalty_payments, target_index) {
  if (penalty_payments.constructor == Array) {
    return penalty_payments.map(function (penalty_payment) {
      return _extends({}, penalty_payment, {
        edit: {
          shown: false,
          allow_submit: true,
          amount: {
            value: penalty_payment.amount,
            errors: []
          },
          date_paid: {
            month: (0, _DateTime.monthList)()[new Date(penalty_payment.date_paid).getMonth()],
            date: new Date(penalty_payment.date_paid).getDate(),
            year: new Date(penalty_payment.date_paid).getFullYear()
          },
          backend: {
            processing: false,
            message: null,
            status: null
          }
        }
      });
    });
  }

  return {
    shown: false,
    allow_submit: true,
    amount: {
      value: penalty_payments.amount,
      errors: []
    },
    date_paid: {
      month: (0, _DateTime.monthList)()[new Date(penalty_payments.date_paid).getMonth()],
      date: new Date(penalty_payments.date_paid).getDate(),
      year: new Date(penalty_payments.date_paid).getFullYear()
    },
    backend: {
      processing: false,
      message: null,
      status: null
    }
  };
}

function alterPenaltyPaymentEditFields(penalties, target_penalty, target_payment, fields) {
  return penalties.map(function (penalty, penalty_index) {
    return penalty_index == target_penalty ? _extends({}, penalty, {
      penalty_payments: penalty.penalty_payments.map(function (penalty_payment, penalty_payment_index) {
        return penalty_payment_index == target_payment ? _extends({}, penalty_payment, {
          edit: fields.amount ? _extends({}, penalty_payment.edit, {
            amount: _extends({}, penalty_payment.edit.amount, fields.amount)
          }) : fields.date_paid ? _extends({}, penalty_payment.edit, {
            date_paid: _extends({}, penalty_payment.edit.date_paid, fields.date_paid)
          }) : _extends({}, penalty_payment.edit, fields)
        }) : _extends({}, penalty_payment);
      })
    }) : _extends({}, penalty);
  });
}

function borrower_profile() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _borrower_profile2.default;
  var action = arguments[1];

  var new_state = void 0;

  switch (action.type) {
    case '_BORROWER_PROFILE_FETCH':
      return _extends({}, state, {
        backend: {
          processing: true,
          status: null,
          message: null
        }
      });
    case 'BORROWER_PROFILE_FETCH_SUCCESSFUL':
      return _extends({}, state, {
        data: _extends({}, action.data, {
          loans: action.data.loans.map(function (loan) {
            return _extends({}, loan, {
              edit: getInitialLoanEditFields(loan),
              payment_fields: getInitialPaymentFields(loan),
              penalty_fields: getInitialPenaltyFields(),
              penalties: loan.penalties.map(function (penalty) {
                return _extends({}, penalty, {
                  wave: {
                    remarks: {
                      errors: [],
                      value: ''
                    },
                    shown: false,
                    backend: {
                      processing: false,
                      status: null,
                      message: null
                    }
                  },
                  edit: getInitialPenaltyEditFields(penalty),
                  summary: getPenaltySummary(penalty),
                  penalty_payment_fields: getInitialPenaltyPaymentFields(),
                  penalty_payments: getInitialPenaltyPaymentEditFields(penalty.penalty_payments)
                });
              }),
              summary: getLoanSummary(loan),
              loan_payments: loan.loan_payments.map(function (payment) {
                return getInitialPaymentEditFields(payment);
              })
            });
          })
        }),
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      });
    case 'BORROWER_PROFILE_FETCH_FAILED':
      return _extends({}, state, {
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      });
    case 'BORROWER_PROFILE_TPF':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: alterPaymentFields(state.data.loans, action.index, {
              payment_fields: getInitialPaymentFields(state.data.loans[action.index])
            })
          })
        });
      }

      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: {
              shown: true
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_CPM':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            period: {
              month: action.month,
              date: 1,
              errors: (0, _Validator.validateAmountPaid)(action.value, 1, state.data.loans[action.index].payment_fields.period.year)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_CPY':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            period: {
              year: action.year,
              errors: (0, _Validator.validateAmountPaid)(state.data.loans[action.index].payment_fields.period.year, 1, action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_CAP':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            amount: {
              value: action.value,
              errors: (0, _Validator.validateAmountPaid)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_CPDM':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            date_paid: {
              month: action.value,
              date: 1
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_CPDD':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            date_paid: {
              date: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_CPDY':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            date_paid: {
              year: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case '_BORROWER_PROFILE_SEND_PAYMENT':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            backend: {
              processing: true,
              message: null,
              status: null
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_SEND_PAYMENT_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: getInitialPaymentFields(state.data.loans[action.index]),
            loan_payments: state.data.loans[action.index].loan_payments.addFirst(action.payment).map(function (payment) {
              return getInitialPaymentEditFields(payment);
            })
          })
        })
      });

      new_state = _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            summary: getLoanSummary(new_state.data.loans[action.index])
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            backend: {
              processing: false,
              message: null,
              status: 'successful'
            }
          })
        })
      });
    case 'BORROWER_PROFILE_SEND_PAYMENT_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: getInitialPaymentFields(state.data.loans[action.index]),
            backend: {
              status: 'failed',
              processing: false,
              message: action.message
            }
          })
        })
      });
    case 'BORROWER_PROFILE_EPI':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: state.data.loans.map(function (loan, loan_index) {
              return loan_index == action.loan_index ? _extends({}, loan, {
                loan_payments: loan.loan_payments.map(function (payment, payment_index) {
                  return payment_index == action.payment_index ? getInitialPaymentEditFields(payment) : _extends({}, payment);
                })
              }) : _extends({}, loan);
            })
          })
        });
      }

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                shown: true
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPIA':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                amount: {
                  value: action.value,
                  errors: (0, _Validator.validateAmountPaid)(action.value)
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter(function (payment, payment_index) {
                  return payment_index == action.payment_index;
                })[0].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPIPY':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                period: {
                  year: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter(function (payment, payment_index) {
                  return payment_index == action.payment_index;
                })[0].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPIPM':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                period: {
                  month: action.value,
                  date: 1
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter(function (payment, payment_index) {
                  return payment_index == action.payment_index;
                })[0].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPIPDY':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                date_paid: {
                  year: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter(function (payment, payment_index) {
                  return payment_index == action.payment_index;
                })[0].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPIPDD':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                date_paid: {
                  date: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter(function (payment, payment_index) {
                  return payment_index == action.payment_index;
                })[0].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPIPDM':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                date_paid: {
                  month: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter(function (payment, payment_index) {
                  return payment_index == action.payment_index;
                })[0].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case '_BORROWER_PROFILE_EPI_SEND':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                backend: {
                  processing: true,
                  message: null,
                  status: null
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EPI_SEND_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments.map(function (payment, payment_index) {
                return payment_index == action.payment_index ? getInitialPaymentEditFields(action.data) : _extends({}, payment);
              }), action.payment_index, {
                backend: {
                  status: 'successful',
                  processing: false,
                  message: null
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      new_state = _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              summary: getLoanSummary(loan)
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state);
    case 'BORROWER_PROFILE_EPI_SEND_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
                backend: {
                  processing: false,
                  status: 'failed',
                  message: action.message
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_ELIT':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: state.data.loans.map(function (loan) {
              return _extends({}, loan, {
                edit: getInitialLoanEditFields(loan)
              });
            })
          })
        });
      }

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            shown: action.visibility
          })
        })
      });
    case 'BORROWER_PROFILE_ELIA':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            amount_loan: {
              value: action.value,
              errors: (0, _Validator.validateAmountLoan)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIC':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            amount_loan: {
              condition: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIIR':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            interest_rate: {
              value: action.value,
              errors: (0, _Validator.validateInterestRate)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIIT':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            interest_rate: {
              type: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIMTP':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            months_to_pay: {
              value: action.value,
              errors: (0, _Validator.validateMonthsToPay)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIDLM':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            loan_date: {
              month: action.value,
              date: 1,
              errors: (0, _Validator.validateLoanDate)(action.value, state.data.loans[action.loan_index].edit.loan_date.date, state.data.loans[action.loan_index].edit.loan_date.year)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_CHANGE_DOP_MONTH':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            date_of_payment: {
              month: action.value,
              date: 1
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_CHANGE_DOP_DATE':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            date_of_payment: {
              date: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_CHANGE_DOP_YEAR':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            date_of_payment: {
              year: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIDLD':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            loan_date: {
              date: action.value,
              errors: (0, _Validator.validateLoanDate)(state.data.loans[action.loan_index].edit.loan_date.month, action.value, state.data.loans[action.loan_index].edit.loan_date.year)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIDY':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            loan_date: {
              year: action.value,
              errors: (0, _Validator.validateLoanDate)(state.data.loans[action.loan_index].edit.loan_date.month, state.data.loans[action.loan_index].edit.loan_date.date, action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case 'BORROWER_PROFILE_ELIPM':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            payment_method: {
              value: action.value,
              errors: (0, _Validator.validatePaymentMethod)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        })
      });
    case '_BORROWER_PROFILE_ELI_SEND':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            backend: {
              processing: true,
              message: null,
              status: null
            }
          })
        })
      });
    case 'BORROWER_PROFILE_ELI_SEND_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, action.data, {
              summary: getLoanSummary(_extends({}, action.data)),
              edit: getInitialLoanEditFields(action.data)
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            backend: {
              processing: false,
              message: null,
              status: 'successful'
            }
          })
        })
      });
    case 'BORROWER_PROFILE_ELI_SEND_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            backend: {
              processing: false,
              message: action.message,
              status: 'failed'
            }
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_TOGGLE':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: state.data.loans.map(function (loan, loan_index) {
              return loan_index == action.loan_index ? _extends({}, loan, {
                penalty_fields: getInitialPenaltyFields()
              }) : _extends({}, loan);
            })
          })
        });
      }

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            shown: true
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_AMOUNT':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            amount: {
              value: action.value,
              errors: (0, _Validator.validateAmount)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_REMARKS':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            remarks: {
              value: action.value,
              errors: (0, _Validator.validateRemarks)(action.value)
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_DATE':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            date_given: {
              date: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_MONTH':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            date_given: {
              month: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_YEAR':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            date_given: {
              year: action.value
            }
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        })
      });
    case '_BORROWER_PROFILE_PENALTYFIELD_CREATE':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            backend: {
              status: null,
              message: null,
              processing: true
            }
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_CREATE_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return action.loan_index == loan_index ? _extends({}, loan, {
              penalty_fields: getInitialPenaltyFields(),
              penalties: loan.penalties.addFirst(action.data).map(function (penalty, penalty_index) {
                return penalty_index == 0 ? _extends({}, penalty, {
                  edit: getInitialPenaltyEditFields(penalty),
                  summary: getPenaltySummary(penalty),
                  penalty_payment_fields: getInitialPenaltyPaymentFields(),
                  penalty_payments: [],
                  wave: {
                    remarks: {
                      value: '',
                      errors: []
                    },
                    shown: false,
                    backend: {
                      processing: false,
                      status: null,
                      message: null,
                      allow_submit: false
                    }
                  }
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            backend: {
              status: 'successful',
              message: null,
              processing: false
            }
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYFIELD_CREATE_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            backend: {
              status: 'failed',
              message: action.message,
              processing: false
            }
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_TOGGLE':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: state.data.loans.map(function (loan, loan_index) {
              return loan_index == action.loan_index ? _extends({}, loan, {
                penalties: loan.penalties.map(function (penalty, penalty_index) {
                  return penalty_index == action.penalty_index ? _extends({}, penalty, {
                    penalty_payment_fields: getInitialPenaltyPaymentFields()
                  }) : _extends({}, penalty);
                })
              }) : _extends({}, loan);
            })
          })
        });
      }

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                shown: true
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_AMOUNT':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                amount: {
                  value: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_MONTH':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                date_paid: {
                  month: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_DATE':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                date_paid: {
                  date: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_YEAR':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                date_paid: {
                  year: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case '_BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                backend: {
                  processing: true,
                  status: null,
                  message: null
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  penalty_payment_fields: getInitialPenaltyPaymentFields(),
                  penalty_payments: penalty.penalty_payments.addFirst(action.data)
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });

      new_state = _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  summary: getPenaltySummary(penalty),
                  penalty_payments: getInitialPenaltyPaymentEditFields(penalty.penalty_payments)
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                backend: {
                  processing: false,
                  status: 'successful',
                  message: null
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
                backend: {
                  processing: false,
                  status: 'failed',
                  message: action.message
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_TOGGLE':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: state.data.loans.map(function (loan, loan_index) {
              return loan_index == action.loan_index ? _extends({}, loan, {
                penalties: loan.penalties.map(function (penalty, penalty_index) {
                  return penalty_index == action.penalty_index ? _extends({}, penalty, {
                    edit: getInitialPenaltyEditFields(penalty)
                  }) : _extends({}, penalty);
                })
              }) : _extends({}, loan);
            })
          })
        });
      }

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                shown: true
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_AMOUNT':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                amount: {
                  value: action.value,
                  errors: (0, _Validator.validateAmount)(action.value)
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_REMARKS':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                remarks: {
                  value: action.value,
                  errors: (0, _Validator.validateRemarks)(action.value)
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_MONTH':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                date_given: {
                  month: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_DATE':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                date_given: {
                  date: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_YEAR':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                date_given: {
                  year: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case '_BORROWER_PROFILE_EDITPENALTYFORM_SAVE':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                backend: {
                  status: null,
                  message: null,
                  processing: true
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_SAVE_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, action.data, {
                  wave: {
                    remarks: {
                      value: '',
                      errors: []
                    },
                    shown: false,
                    backend: {
                      processing: false,
                      status: 'successful',
                      message: null,
                      allow_submit: false
                    }
                  },
                  edit: getInitialPenaltyEditFields(action.data),
                  summary: getPenaltySummary(_extends({}, penalty, action.data))
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                backend: {
                  status: 'successful',
                  message: null,
                  processing: false
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYFORM_SAVE_FAILED':
      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
                backend: {
                  status: 'failed',
                  message: action.message,
                  processing: false
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT':
      if (!action.visibility) {
        return _extends({}, state, {
          data: _extends({}, state.data, {
            loans: state.data.loans.map(function (loan, loan_index) {
              return loan_index == action.loan_index ? _extends({}, loan, {
                penalties: loan.penalties.map(function (penalty, penalty_index) {
                  return penalty_index == action.penalty_index ? _extends({}, penalty, {
                    penalty_payments: getInitialPenaltyPaymentEditFields(penalty.penalty_payments)
                  }) : _extends({}, penalty);
                })
              }) : _extends({}, loan);
            })
          })
        });
      }

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                shown: true
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_AMOUNT':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                amount: {
                  value: action.value,
                  errors: (0, _Validator.validateAmount)(action.value)
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_DATE':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                date_paid: {
                  date: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_MONTH':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                date_paid: {
                  month: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_YEAR':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                date_paid: {
                  year: action.value
                }
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
              })
            }) : _extends({}, loan);
          })
        })
      });
    case '_BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                backend: {
                  processing: true,
                  message: null,
                  status: null
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_SUCCESSFUL':
      new_state = _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  penalty_payments: penalty.penalty_payments.map(function (penalty_payment, penalty_payment_index) {
                    return penalty_payment_index == action.penalty_payment_index ? _extends({}, penalty_payment, action.data, {
                      edit: getInitialPenaltyPaymentEditFields(action.data)
                    }) : _extends({}, penalty_payment);
                  })
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });

      new_state = _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  summary: getPenaltySummary(penalty)
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });

      return _extends({}, new_state, {
        data: _extends({}, new_state.data, {
          loans: new_state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                backend: {
                  status: 'successful',
                  message: null,
                  processing: false
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
                backend: {
                  status: 'failed',
                  message: action.message,
                  processing: false
                }
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_HASH_PUT':
      return _extends({}, state, {
        hash: {
          value: action.value,
          parent: action.parent ? action.parent : null,
          removed: false
        }
      });
    case 'BORROWER_PROFILE_HASH_REMOVE':
      return _extends({}, state, {
        hash: {
          value: state.hash.value,
          parent: state.hash.parent,
          removed: true
        }
      });
    case 'BORROWER_PROFILE_WAVE_PENALTY_TOGGLE':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  wave: {
                    remarks: {
                      value: '',
                      errors: []
                    },
                    shown: !penalty.wave.shown,
                    backend: {
                      processing: false,
                      status: null,
                      message: null
                    }
                  }
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_WAVE_PENALTY_CHANGE_REMARKS':
      var errors = (0, _Validator.validateRemarks)(action.value);

      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  wave: {
                    remarks: {
                      errors: errors,
                      value: action.value
                    },
                    shown: penalty.wave.shown,
                    backend: {
                      processing: false,
                      status: null,
                      message: null,
                      allow_submit: errors.length ? false : true
                    }
                  }
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });
    case '_BORROWER_PROFILE_WAVE_SUBMIT':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  wave: _extends({}, penalty.wave, {
                    backend: _extends({}, penalty.wave.backend, {
                      processing: true,
                      status: null,
                      message: null
                    })
                  })
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_WAVE_SUBMIT_SUCCESSFUL':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, action.updated_penalty, {
                  edit: getInitialPenaltyEditFields(action.updated_penalty),
                  summary: getPenaltySummary(action.updated_penalty),
                  penalty_payment_fields: getInitialPenaltyPaymentFields(),
                  penalty_payments: getInitialPenaltyPaymentEditFields(action.updated_penalty.penalty_payments),
                  wave: {
                    remarks: {
                      value: '',
                      errors: []
                    },
                    shown: false,
                    backend: {
                      processing: false,
                      status: 'successful',
                      message: null,
                      allow_submit: false
                    }
                  }
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_WAVE_SUBMIT_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          loans: state.data.loans.map(function (loan, loan_index) {
            return loan_index == action.loan_index ? _extends({}, loan, {
              penalties: loan.penalties.map(function (penalty, penalty_index) {
                return penalty_index == action.penalty_index ? _extends({}, penalty, {
                  wave: _extends({}, penalty.wave, {
                    backend: _extends({}, penalty.wave.backend, {
                      processing: false,
                      status: 'failed',
                      message: action.message
                    })
                  })
                }) : _extends({}, penalty);
              })
            }) : _extends({}, loan);
          })
        })
      });
    case 'BORROWER_PROFILE_RESET':
      return _extends({}, _borrower_profile2.default);
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = borrower_reports;

var _reports = __webpack_require__(19);

var _reports2 = _interopRequireDefault(_reports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeLoansSummary(loans) {
  var total_loans = 0;
  var total_amount_paid = 0;
  var remaining_balance = void 0;

  loans.forEach(function (loan) {
    total_loans += loan.amount;
    loan.loan_payments.forEach(function (loan_payment) {
      total_amount_paid += loan_payment.amount;
    });
  });

  remaining_balance = total_loans - total_amount_paid;

  return {
    total_loans: total_loans,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function computePenaltiesSummary(loans) {
  var total_penalties = 0;
  var total_amount_paid = 0;
  var remaining_balance = void 0;

  loans.forEach(function (loan) {
    loan.penalties.forEach(function (penalty) {
      total_penalties += penalty.amount;
      penalty.penalty_payments.forEach(function (penalty_payment) {
        total_amount_paid += penalty_payment.amount;
      });
    });
  });

  remaining_balance = total_penalties - total_amount_paid;

  return {
    total_penalties: total_penalties,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function computeLoanSummary(loan) {
  var total_amount_to_pay = loan.amount + loan.profit;
  var total_amount_paid = 0;
  var remaining_balance = void 0;

  loan.loan_payments.forEach(function (loan_payment) {
    total_amount_paid += loan_payment.amount;
  });

  remaining_balance = total_amount_to_pay - total_amount_paid;

  return {
    total_amount_to_pay: total_amount_to_pay,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function computePenaltySummary(loan) {
  var total_penalties = 0;
  var total_amount_paid = 0;
  var remaining_balance = void 0;

  loan.penalties.forEach(function (penalty) {
    total_penalties += penalty.amount;
    penalty.penalty_payments.forEach(function (penalty_payment) {
      total_amount_paid += penalty_payment.amount;
    });
  });

  remaining_balance = total_penalties - total_amount_paid;

  return {
    total_penalties: total_penalties,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function borrower_reports() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reports2.default;
  var action = arguments[1];

  switch (action.type) {
    case '_BORROWERREPORTS_INITIAL_FETCH':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      };
    case 'BORROWERREPORTS_INITIAL_FETCH_SUCCESSFUL':
      return {
        data: _extends({}, action.data, {
          loans: action.data.loans.map(function (loan) {
            return _extends({}, loan, {
              loan_summary: computeLoanSummary(loan),
              penalties_summary: computePenaltySummary(loan)
            });
          }),
          loans_summary: computeLoansSummary(action.data.loans),
          penalties_summary: computePenaltiesSummary(action.data.loans)
        }),
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      };
    case 'BORROWERREPORTS_INITIAL_FETCH_FAILED':
      return {
        data: null,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      };
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = borrower_list;

var _borrowers_list = __webpack_require__(80);

var _borrowers_list2 = _interopRequireDefault(_borrowers_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSummary(loans) {
  var total_unpaid_loans = loans.countIf(function (loan) {
    return !loan.fully_paid;
  });
  var total_unpaid_balance = loans.sumIf(function (loan) {
    return !loan.fully_paid;
  }, 'amount');
  var total_unpaid_penalties = 0;

  loans.forEach(function (loan) {
    total_unpaid_balance -= loan.loan_payments.sum('amount');
    total_unpaid_penalties += loan.penalties.sum('amount');

    loan.penalties.forEach(function (penalty) {
      total_unpaid_penalties -= penalty.penalty_payments.sum('amount');
    });
  });

  return {
    total_unpaid_loans: total_unpaid_loans,
    total_unpaid_balance: total_unpaid_balance,
    total_unpaid_penalties: total_unpaid_penalties,
    total_loans: loans.length,
    total_paid_loans: loans.length - total_unpaid_loans
  };
}

function borrower_list() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _borrowers_list2.default;
  var action = arguments[1];

  switch (action.type) {
    case '_BORROWERS_LIST_FETCH':
      return _extends({}, state, {
        backend: {
          processing: true,
          status: null,
          message: null
        }
      });
    case 'BORROWERS_LIST_FETCH_SUCCESSFUL':
      return {
        list: action.list.map(function (borrower) {
          return _extends({}, borrower, {
            summary: getSummary(borrower.loans)
          });
        }),
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      };
    case 'BORROWERS_LIST_FETCH_FAILED':
      return {
        list: [],
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      };
    case 'BORROWERS_LIST_RESET':
      return _extends({}, _borrowers_list2.default);
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = dashboard;

var _dashboard = __webpack_require__(81);

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function dashboard() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _dashboard2.default;
  var action = arguments[1];

  switch (action.type) {
    case '_DASHBOARD_GET_DUEDATES_TOMORROW':
      return _extends({}, state, {
        tomorrows: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_DUEDATES_TOMORROW_SUCCESSFUL':
      return _extends({}, state, {
        tomorrows: {
          data: [].concat(_toConsumableArray(action.data)),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_DUEDATES_TOMORROW_FAILED':
      return _extends({}, state, {
        tomorrows: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      });
    case '_DASHBOARD_GET_DUEDATES_TODAY':
      return _extends({}, state, {
        todays: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_DUEDATES_TODAY_SUCCESSFUL':
      return _extends({}, state, {
        todays: {
          data: [].concat(_toConsumableArray(action.data)),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_DUEDATES_TODAY_FAILED':
      return _extends({}, state, {
        todays: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      });
    case '_DASHBOARD_GET_DUEDATES_THISMONTH':
      return _extends({}, state, {
        this_month: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_DUEDATES_THISMONTH_SUCCESSFUL':
      return _extends({}, state, {
        this_month: {
          data: [].concat(_toConsumableArray(action.data)),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_DUEDATES_THISMONTH_FAILED':
      return _extends({}, state, {
        this_month: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      });
    case '_DASHBOARD_GET_PASTDUEDATES':
      return _extends({}, state, {
        past_due_dates: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_PASTDUEDATES_SUCCESSFUL':
      return _extends({}, state, {
        past_due_dates: {
          data: [].concat(_toConsumableArray(action.data)),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_PASTDUEDATES_FAILED':
      return _extends({}, state, {
        past_due_dates: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      });
    case '_DASHBOARD_GET_ONEGIVES':
      return _extends({}, state, {
        one_gives: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_ONEGIVES_SUCCESSFUL':
      return _extends({}, state, {
        one_gives: {
          data: [].concat(_toConsumableArray(action.data)),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      });
    case 'DASHBOARD_GET_ONEGIVES_FAILED':
      return _extends({}, state, {
        one_gives: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      });
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = edit_borrower_profile;

var _edit_borrower_profile = __webpack_require__(82);

var _edit_borrower_profile2 = _interopRequireDefault(_edit_borrower_profile);

var _Validator = __webpack_require__(13);

var _Strings = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allowSubmit(newState) {
  return !newState.edit.address.value.length || newState.edit.address.errors.length || !newState.edit.firstname.value.length || newState.edit.firstname.errors.length || !newState.edit.middlename.value.length || newState.edit.middlename.errors.length || !newState.edit.surname.value.length || newState.edit.surname.errors.length || !newState.edit.contact_numbers.filter(function (contact_number) {
    return contact_number.value.length;
  }).length ? false : true;
}

function edit_borrower_profile() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _edit_borrower_profile2.default;
  var action = arguments[1];

  var new_state = void 0;

  switch (action.type) {
    case '_EDITBORROWERPROFILE_FETCH':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          backend: {
            processing: true,
            status: null,
            message: null
          }
        })
      });
    case 'EDITBORROWERPROFILE_FETCH_SUCCESSFUL':
      return _extends({}, state, {
        edit: _extends({}, state.edit, {
          firstname: {
            value: action.data.firstname,
            errors: []
          },
          middlename: {
            value: action.data.middlename,
            errors: []
          },
          surname: {
            value: action.data.surname,
            errors: []
          },
          gender: {
            value: action.data.gender,
            errors: []
          },
          address: {
            value: action.data.address,
            errors: []
          },
          contact_numbers: action.data.contact_numbers.length ? action.data.contact_numbers.map(function (contact_number) {
            return {
              id: contact_number.id,
              value: contact_number.number,
              errors: []
            };
          }) : [{
            id: null,
            value: '',
            errors: []
          }]
        }),
        data: _extends({}, action.data, {
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        })
      });
    case 'EDITBORROWERPROFILE_FETCH_FAILED':
      return _extends({}, state, {
        data: _extends({}, state.data, {
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        })
      });
    case 'EDITBORRWOERPROFILE_EDIT_ADDRESS':
      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          address: {
            value: action.value,
            errors: (0, _Validator.validateAddress)(action.value)
          }
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case 'EDITBORRWOERPROFILE_EDIT_FIRSTNAME':
      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          firstname: {
            value: (0, _Strings.ucwords)(action.value),
            errors: (0, _Validator.validateName)('Firstname', action.value)
          }
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case 'EDITBORRWOERPROFILE_EDIT_MIDDLENAME':
      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          middlename: {
            value: (0, _Strings.ucwords)(action.value),
            errors: (0, _Validator.validateName)('Middlename', action.value)
          }
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case 'EDITBORRWOERPROFILE_EDIT_SURNAME':
      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          surname: {
            value: (0, _Strings.ucwords)(action.value),
            errors: (0, _Validator.validateName)('Surname', action.value)
          }
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case 'EDITBORRWOERPROFILE_EDIT_GENDER':
      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          gender: {
            value: action.value,
            errors: (0, _Validator.validateGender)(action.value)
          }
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case 'EDITBORRWOERPROFILE_EDIT_CONTACT_NUMBER':
      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          contact_numbers: state.edit.contact_numbers.map(function (contact_number, index) {
            return index == action.index ? _extends({}, contact_number, {
              value: action.value,
              errors: (0, _Validator.validatePhoneNumber)(action.value)
            }) : contact_number;
          })
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case 'EDITBORRWOERPROFILE_ADD_CONTACT_NUMBER':
      return _extends({}, state, {
        edit: _extends({}, state.edit, {
          contact_numbers: state.edit.contact_numbers.concat({
            id: null,
            value: '',
            errors: [],
            key: new Date().getTime()
          })
        })
      });
    case 'EDITBORRWOERPROFILE_REMOVE_CONTACT_NUMBER':
      var contact_numbers = state.edit.contact_numbers.filter(function (contact_number, index) {
        return index != action.index;
      });

      new_state = _extends({}, state, {
        edit: _extends({}, state.edit, {
          contact_numbers: contact_numbers.length ? contact_numbers : [{
            id: null,
            value: '',
            errors: []
          }]
        })
      });

      return _extends({}, new_state, {
        edit: _extends({}, new_state.edit, {
          backend: _extends({}, new_state.edit.backend, {
            allow_submit: allowSubmit(new_state)
          })
        })
      });
    case '_EDITBORRWOERPROFILE_SEND':
      return _extends({}, state, {
        edit: _extends({}, state.edit, {
          backend: {
            processing: true,
            status: null,
            message: null
          }
        })
      });
    case 'EDITBORRWOERPROFILE_SEND_SUCCESSFUL':
      return _extends({}, state, {
        edit: {
          firstname: {
            value: action.data.firstname,
            errors: []
          },
          middlename: {
            value: action.data.middlename,
            errors: []
          },
          surname: {
            value: action.data.surname,
            errors: []
          },
          gender: {
            value: action.data.gender,
            errors: []
          },
          address: {
            value: action.data.address,
            errors: []
          },
          contact_numbers: action.data.contact_numbers.length ? action.data.contact_numbers.map(function (contact_number) {
            return {
              id: contact_number.id,
              value: contact_number.number,
              errors: []
            };
          }) : [{
            id: null,
            value: '',
            errors: []
          }],
          backend: {
            processing: false,
            status: 'successful',
            message: null,
            allow_submit: true
          }
        }
      });
    case 'EDITBORRWOERPROFILE_SEND_FAILED':
      return _extends({}, state, {
        edit: _extends({}, state.edit, {
          backend: _extends({}, state.edit.backend, {
            processing: false,
            status: 'failed',
            message: action.message,
            allow_submit: true
          })
        })
      });
    case 'EDITBORRWOERPROFILE_RESET':
      return _extends({}, _edit_borrower_profile2.default);
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = income_expense_report;

var _reports = __webpack_require__(19);

var _reports2 = _interopRequireDefault(_reports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMoneyOut(borrowers) {
  var money_out = 0;

  borrowers.forEach(function (borrower) {
    borrower.loans.forEach(function (loan) {
      money_out += loan.amount;
    });
  });

  return money_out;
}

function getMoneyIn(borrowers) {
  var money_in = 0;

  borrowers.forEach(function (borrower) {
    borrower.loans.forEach(function (loan) {
      loan.loan_payments.forEach(function (loan_payment) {
        money_in += loan_payment.amount;
      });

      loan.penalties.forEach(function (penalty) {
        penalty.penalty_payments.forEach(function (penalty_payment) {
          money_in += penalty_payment.amount;
        });
      });
    });
  });

  return money_in;
}

function getActiveBorrowers(borrowers) {
  var active_borrowers = 0;

  borrowers.forEach(function (borrower) {
    var total_loans = 0;
    var amount_paid = 0;

    borrower.loans.forEach(function (loan) {
      total_loans += loan.amount;

      loan.loan_payments.forEach(function (loan_payment) {
        amount_paid += loan_payment.amount;
      });
    });

    if (total_loans - amount_paid > 0) {
      active_borrowers++;
    }
  });

  return active_borrowers;
}

function income_expense_report() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reports2.default;
  var action = arguments[1];

  switch (action.type) {
    case '_INCOMEEXPENSEREPORT_FETCH_ALL':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      };
    case 'INCOMEEXPENSEREPORT_FETCH_ALL_SUCCESSFUL':
      return {
        data: {
          money_out: getMoneyOut(action.data),
          money_in: getMoneyIn(action.data),
          active_borrowers: getActiveBorrowers(action.data),
          total_borrowers: action.data.length
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      };
    case 'INCOMEEXPENSEREPORT_FETCH_ALL_FAILED':
      return {
        data: null,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      };
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = loan_reports;

var _reports = __webpack_require__(19);

var _reports2 = _interopRequireDefault(_reports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeLoanPaymentsSummary(loan) {
  var total_amount_to_pay = loan.amount + loan.profit;
  var total_amount_paid = loan.loan_payments.sum('amount');
  var remaining_balance = total_amount_to_pay - total_amount_paid;

  return {
    total_amount_to_pay: total_amount_to_pay,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance,
    is_fully_paid: remaining_balance == 0 ? true : false
  };
}

function computePenaltiesSummary(loan) {
  var total_amount_to_pay = loan.penalties.sum('amount');
  var total_amount_paid = 0;
  var remaining_balance = void 0;

  loan.penalties.forEach(function (penalty) {
    total_amount_paid += penalty.penalty_payments.sum('amount');
  });

  remaining_balance = total_amount_to_pay - total_amount_paid;

  return {
    total_amount_to_pay: total_amount_to_pay,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function loan_reports() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reports2.default;
  var action = arguments[1];

  switch (action.type) {
    case '_LOANREPORTS_INITIAL_FETCH':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      };
    case 'LOANREPORTS_INITIAL_FETCH_SUCCESSFUL':
      return {
        data: _extends({}, action.data, {
          loan_payments_summary: computeLoanPaymentsSummary(action.data),
          penalties_summary: computePenaltiesSummary(action.data)
        }),
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      };
    case 'LOANREPORTS_INITIAL_FETCH_FAILED':
      return {
        data: null,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      };
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = new_borrower;

var _new_borrower = __webpack_require__(83);

var _new_borrower2 = _interopRequireDefault(_new_borrower);

var _Calculator = __webpack_require__(24);

var calculator = _interopRequireWildcard(_Calculator);

var _Validator = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allowSubmit(new_state) {
  if (new_state.amount_loan.condition == 'due-date-only') {
    return !new_state.contact_numbers.filter(function (contact_number) {
      return contact_number.value.length;
    }).length || new_state.backend.processing || !new_state.address.value.length || new_state.address.errors.length || !new_state.firstname.value.length || new_state.firstname.errors.length || !new_state.middlename.value.length || new_state.middlename.errors.length || !new_state.surname.value.length || new_state.surname.errors.length || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.gender.errors.length || new_state.loan_date.errors.length || !new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length || new_state.payment_method == 4 ? false : true;
  } else if (new_state.amount_loan.condition == 'interest-only') {
    return !new_state.contact_numbers.filter(function (contact_number) {
      return contact_number.value.length;
    }).length || new_state.backend.processing || !new_state.address.value.length || new_state.address.errors.length || !new_state.firstname.value.length || new_state.firstname.errors.length || !new_state.middlename.value.length || new_state.middlename.errors.length || !new_state.surname.value.length || new_state.surname.errors.length || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.gender.errors.length || new_state.loan_date.errors.length || !new_state.interest_rate.value.length || new_state.interest_rate.errors.length ? false : true;
  } else if (new_state.amount_loan.condition == 'no-due-date-and-interest') {
    return !new_state.contact_numbers.filter(function (contact_number) {
      return contact_number.value.length;
    }).length || new_state.backend.processing || !new_state.address.value.length || new_state.address.errors.length || !new_state.firstname.value.length || new_state.firstname.errors.length || !new_state.middlename.value.length || new_state.middlename.errors.length || !new_state.surname.value.length || new_state.surname.errors.length || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.gender.errors.length || new_state.loan_date.errors.length ? false : true;
  }

  return !new_state.contact_numbers.filter(function (contact_number) {
    return contact_number.value.length;
  }).length || new_state.backend.processing || !new_state.address.value.length || new_state.address.errors.length || !new_state.firstname.value.length || new_state.firstname.errors.length || !new_state.middlename.value.length || new_state.middlename.errors.length || !new_state.surname.value.length || new_state.surname.errors.length || !new_state.amount_loan.value.length || new_state.amount_loan.errors.length || new_state.gender.errors.length || new_state.loan_date.errors.length || !new_state.interest_rate.value.length || new_state.interest_rate.errors.length || !new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length || new_state.payment_method == 4 ? false : true;
}

function calculatedValues(new_state) {
  var computed_interest = 0;
  var computed_profit = 0;
  var monthly = 0;
  var semi_monthly = 0;
  var daily = 0;
  var interest_percentage = 0;

  if (new_state.amount_loan.condition == 'interest-only' && new_state.amount_loan.value.length && !new_state.amount_loan.errors.length) {
    /**
      * applying of interest only
      * will compute and add the interest
      * but will not compute for a monthly payment
     */
    interest_percentage = calculator.computeInterestPercentage(new_state.interest_rate.value, new_state.interest_rate.type);
    computed_interest = calculator.computeInterest(new_state.amount_loan.value, interest_percentage, new_state.interest_rate.type, new_state.interest_rate.value);

    if (new_state.payment_method == 4) {
      computed_profit = computed_interest;
    } else {
      computed_profit = calculator.computeProfit(computed_interest, new_state.months_to_pay.value);
    }
  } else if (new_state.amount_loan.condition == 'due-date-only' && new_state.amount_loan.value.length && (new_state.months_to_pay.value.length && !new_state.months_to_pay.errors.length || new_state.payment_method.value == 4) && !new_state.amount_loan.errors.length) {
    /**
     * applying of due date only
     * will compute the monthly, half monthly and daily payment
     * but will not compute for the interest
     */

    if (new_state.payment_method.value != 4) {
      monthly = calculator.computePerMonth(new_state.amount_loan.condition, new_state.amount_loan.value, new_state.months_to_pay.value, computed_profit);
      semi_monthly = calculator.computePerHalfMonth(monthly);
      daily = calculator.computePerDay(monthly);
    }
  } else if (new_state.amount_loan.condition == 'due-date-and-interest' && new_state.amount_loan.value.length && !new_state.amount_loan.errors.length && (new_state.months_to_pay.value.length && !new_state.months_to_pay.errors.length || new_state.payment_method.value == 4) && new_state.interest_rate.value.length && !new_state.interest_rate.errors.length) {
    /**
     * apply due date and interest
     * will compute for the monthly, half monthly and daily payments
     * will compute for the interest
     */

    interest_percentage = calculator.computeInterestPercentage(new_state.interest_rate.value, new_state.interest_rate.type);
    computed_interest = calculator.computeInterest(new_state.amount_loan.value, interest_percentage, new_state.interest_rate.type, new_state.interest_rate.value);

    if (new_state.payment_method.value == 4) {
      computed_profit = calculator.computeProfit(interest_percentage, new_state.amount_loan.value);
    } else {
      computed_profit = calculator.computeProfit(computed_interest, new_state.months_to_pay.value);
      monthly = calculator.computePerMonth(new_state.amount_loan.condition, new_state.amount_loan.value, new_state.months_to_pay.value, computed_profit);
      semi_monthly = calculator.computePerHalfMonth(monthly);
      daily = calculator.computePerDay(monthly);
    }
  }

  return {
    computed_interest: computed_interest,
    computed_profit: computed_profit,
    monthly: monthly,
    semi_monthly: semi_monthly,
    daily: daily
  };
}

function new_borrower() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _new_borrower2.default;
  var action = arguments[1];

  var new_state = void 0;

  switch (action.type) {
    case 'NEWBORROWER_CAV':
      new_state = _extends({}, state, {
        address: {
          errors: (0, _Validator.validateAddress)(action.value),
          value: action.value
        }
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CFN':
      new_state = _extends({}, state, {
        firstname: {
          errors: (0, _Validator.validateName)('First name', action.value),
          value: action.value
        }
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CMN':
      new_state = _extends({}, state, {
        middlename: {
          errors: (0, _Validator.validateName)('Middle name', action.value),
          value: action.value
        }
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CSN':
      new_state = _extends({}, state, {
        surname: {
          errors: (0, _Validator.validateName)('Surname', action.value),
          value: action.value
        }
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CGD':
      new_state = _extends({}, state, {
        gender: {
          errors: (0, _Validator.validateGender)(action.value),
          value: action.value
        }
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CAL':
      new_state = _extends({}, state, {
        amount_loan: _extends({}, state.amount_loan, {
          errors: (0, _Validator.validateAmountLoan)(action.value),
          value: action.value
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CMP':
      new_state = _extends({}, state, {
        months_to_pay: _extends({}, state.months_to_pay, {
          errors: (0, _Validator.validateMonthsToPay)(action.value),
          value: action.value
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CIR':
      new_state = _extends({}, state, {
        interest_rate: _extends({}, state.interest_rate, {
          errors: (0, _Validator.validateInterestRate)(action.value),
          value: action.value
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CIT':
      new_state = _extends({}, state, {
        interest_rate: _extends({}, state.interest_rate, {
          type: action.value
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CLC':
      new_state = _extends({}, state, {
        amount_loan: _extends({}, state.amount_loan, {
          condition: action.value
        }),
        interest_rate: action.value == 'due-date-only' || action.value == 'no-due-date-and-interest' ? _extends({}, state.interest_rate, {
          value: '',
          errors: []
        }) : _extends({}, state.interest_rate)
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CLY':
      new_state = _extends({}, state, {
        loan_date: _extends({}, state.loan_date, {
          year: action.value,
          errors: (0, _Validator.validateLoanDate)(state.loan_date.month, state.loan_date.date, action.value)
        })
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CLD':
      new_state = _extends({}, state, {
        loan_date: _extends({}, state.loan_date, {
          date: action.value,
          errors: (0, _Validator.validateLoanDate)(state.loan_date.month, action.value, state.loan_date.year)
        })
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CLM':
      new_state = _extends({}, state, {
        loan_date: _extends({}, state.loan_date, {
          month: action.value,
          date: 1,
          errors: (0, _Validator.validateLoanDate)(action.value, state.loan_date.date, state.loan_date.year)
        })
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_AMCN':
      new_state = _extends({}, state, {
        contact_numbers: state.contact_numbers.concat({
          id: new Date().getTime(),
          value: '',
          errors: []
        })
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_RCN':
      if (state.contact_numbers.length == 1) {
        return _extends({}, state, {
          contact_numbers: [{
            id: new Date().getTime(),
            value: '',
            errors: []
          }]
        });
      }

      new_state = _extends({}, state, {
        contact_numbers: state.contact_numbers.filter(function (contact_number, index) {
          return index != action.index;
        })
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CCN':
      new_state = _extends({}, state, {
        contact_numbers: state.contact_numbers.map(function (contact_number, index) {
          return index == action.index ? _extends({}, contact_number, {
            value: action.value,
            errors: (0, _Validator.validatePhoneNumber)(action.value)
          }) : contact_number;
        })
      });

      return _extends({}, new_state, {
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CPM':
      new_state = _extends({}, state, {
        payment_method: {
          value: action.value,
          errors: (0, _Validator.validatePaymentMethod)(action.value)
        },
        months_to_pay: action.value == 4 ? _extends({}, state.months_to_pay, {
          errors: [],
          value: ''
        }) : _extends({}, state.months_to_pay),
        interest_rate: _extends({}, state.interest_rate, {
          errors: (0, _Validator.validateInterestRate)(state.interest_rate.value)
        })
      });

      return _extends({}, new_state, {
        calculated_values: calculatedValues(new_state),
        backend: _extends({}, new_state.backend, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'NEWBORROWER_CEDOPM':
      return _extends({}, state, {
        date_of_payment: _extends({}, state.date_of_payment, {
          month: action.value,
          date: 1
        })
      });
    case 'NEWBORROWER_CEDOPD':
      return _extends({}, state, {
        date_of_payment: _extends({}, state.date_of_payment, {
          date: action.value
        })
      });
    case 'NEWBORROWER_CEDOPY':
      return _extends({}, state, {
        date_of_payment: _extends({}, state.date_of_payment, {
          year: action.value
        })
      });
    case '_NEWBORROWER_SUBMIT':
      return _extends({}, state, {
        backend: {
          allow_submit: state.backend.allow_submit,
          processing: true,
          status: null,
          message: null
        }
      });
    case 'NEWBORROWER_SUBMIT_FAILED':
      return _extends({}, state, {
        backend: {
          allow_submit: state.backend.allow_submit,
          processing: false,
          status: 'failed',
          message: action.message
        }
      });
    case 'NEWBORROWER_SUBMIT_SUCCESSFUL':
      return _extends({}, state, {
        id: action.id,
        backend: {
          allow_submit: state.backend.allow_submit,
          processing: false,
          status: 'successful',
          message: null
        }
      });
    case 'NEWBORROWER_RESET':
      return _extends({}, _new_borrower2.default);
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = search;

var _search = __webpack_require__(84);

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allowSubmit(new_state) {
  return new_state.query.value.length ? true : false;
}

function getPenaltySummary(penalties) {
  var total_penalty = 0,
      total_amount_paid = 0,
      remaining_balance = 0;

  penalties.forEach(function (penalty) {
    total_penalty += penalty.amount;

    penalty.penalty_payments.forEach(function (penalty_payment) {
      total_amount_paid += penalty_payment.amount;
    });
  });

  remaining_balance = total_penalty - total_amount_paid;

  return {
    total_penalty: total_penalty,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function getLoanPaymentsSummary(loan) {
  var total_loan = loan.amount,
      total_amount_paid = 0,
      remaining_balance = 0;

  loan.loan_payments.forEach(function (loan_payment) {
    total_amount_paid += loan_payment.amount;
  });

  remaining_balance = total_loan - total_amount_paid;

  return {
    total_loan: total_loan,
    total_amount_paid: total_amount_paid,
    remaining_balance: remaining_balance
  };
}

function search() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _search2.default;
  var action = arguments[1];

  var new_state = void 0;

  switch (action.type) {
    case 'SEARCH_CHANGE_STRING':
      new_state = _extends({}, state, {
        query: _extends({}, state.query, {
          value: action.value
        })
      });

      return _extends({}, new_state, {
        query: _extends({}, new_state.query, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'SEARCH_CHANGE_TYPE':
      new_state = _extends({}, state, {
        query: _extends({}, state.query, {
          type: action.value
        })
      });

      return _extends({}, new_state, {
        query: _extends({}, new_state.query, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'SEARCH_RESET':
      return _extends({}, _search2.default);
    case '_SEARCH_SUBMIT':
      new_state = _extends({}, state, {
        backend: {
          processing: true,
          status: null,
          message: null
        }
      });

      return _extends({}, new_state, {
        query: _extends({}, new_state.query, {
          allow_submit: allowSubmit(new_state)
        })
      });
    case 'SEARCH_SUBMIT_SUCCESSFUL':
      if (state.query.type == 'loan') {
        return _extends({}, state, {
          search_results: action.search_results.map(function (search_result) {
            return _extends({}, search_result, {
              penalties_summary: getPenaltySummary(search_result.penalties),
              loan_payments_summary: getLoanPaymentsSummary(search_result)
            });
          }),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        });
      } else if (state.query.type == 'penalty') {
        return _extends({}, state, {
          search_results: action.search_results.map(function (search_result) {
            return _extends({}, search_result, {
              loan_payments_summary: getLoanPaymentsSummary(search_result.loan),
              penalties_summary: getPenaltySummary([search_result])
            });
          }),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        });
      } else if (state.query.type == 'loan-payment') {
        return _extends({}, state, {
          search_results: action.search_results.map(function (search_result) {
            return _extends({}, search_result, {
              loan_payments_summary: getLoanPaymentsSummary(search_result.loan),
              penalties_summary: getPenaltySummary(search_result.loan.penalties)
            });
          }),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        });
      } else if (state.query.type == 'penalty-payment') {
        return _extends({}, state, {
          search_results: action.search_results.map(function (search_result) {
            return _extends({}, search_result, {
              loan_payments_summary: getLoanPaymentsSummary(search_result.penalty.loan),
              penalties_summary: getPenaltySummary(search_result.penalty.loan.penalties)
            });
          }),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        });
      }

      return _extends({}, state, {
        search_results: action.search_results,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      });
    case 'SEARCH_SUBMIT_FAILED':
      return _extends({}, state, {
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      });
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = status_report;

var _reports = __webpack_require__(19);

var _reports2 = _interopRequireDefault(_reports);

var _DateTime = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getBorrowerIncrease(borrowers) {
  var borrower_increase = {};
  var max_date = new Date();
  var min_date = new Date(max_date.getTime() - 13148719000);
  var months = (0, _DateTime.monthList)();

  for (var a = 0; a <= 5; a++) {
    borrower_increase[min_date.getMonth() + a] = {
      month: months[min_date.getMonth() + a],
      count: 0
    };
  }

  borrowers.forEach(function (borrower) {
    var date_registered = new Date(borrower.loans[0].loan_date);
    var time = date_registered.getTime();

    if (time >= min_date.getTime() && time <= max_date.getTime()) {
      borrower_increase[date_registered.getMonth()] = _extends({}, borrower_increase[date_registered.getMonth()], {
        count: borrower_increase[date_registered.getMonth()].count + 1
      });
    }
  });

  return borrower_increase;
}

function getLoanIncrease(borrowers) {
  var loan_increase = {};
  var max_date = new Date();
  var min_date = new Date(max_date.getTime() - 13148719000);
  var months = (0, _DateTime.monthList)();

  for (var a = 0; a <= 5; a++) {
    loan_increase[min_date.getMonth() + a] = {
      month: months[min_date.getMonth() + a],
      count: 0
    };
  }

  borrowers.forEach(function (borrower) {
    var date_registered = new Date(borrower.loans[0].loan_date);
    var time = date_registered.getTime();

    if (time >= min_date.getTime() && time <= max_date.getTime()) {
      loan_increase[date_registered.getMonth()] = _extends({}, loan_increase[date_registered.getMonth()], {
        count: loan_increase[date_registered.getMonth()].count + borrower.loans.sum('amount')
      });
    }
  });

  return loan_increase;
}

function getPaymentIncrease(borrowers) {
  var payment_increase = {};
  var max_date = new Date();
  var min_date = new Date(max_date.getTime() - 13148719000);
  var months = (0, _DateTime.monthList)();

  for (var a = 0; a <= 5; a++) {
    payment_increase[min_date.getMonth() + a] = {
      month: months[min_date.getMonth() + a],
      count: 0
    };
  }

  borrowers.forEach(function (borrower) {
    var date_registered = new Date(borrower.loans[0].loan_date);
    var time = date_registered.getTime();

    if (time >= min_date.getTime() && time <= max_date.getTime()) {
      var total_payments = 0;

      borrower.loans.forEach(function (loan) {
        total_payments += loan.loan_payments.sum('amount');

        loan.penalties.forEach(function (penalty) {
          total_payments += penalty.penalty_payments.sum('amount');
        });
      });

      payment_increase[date_registered.getMonth()] = _extends({}, payment_increase[date_registered.getMonth()], {
        count: payment_increase[date_registered.getMonth()].count + total_payments
      });
    }
  });

  return payment_increase;
}

function status_report() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reports2.default;
  var action = arguments[1];

  switch (action.type) {
    case '_STATUSREPORT_FETCH_DATA':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      };
    case 'STATUSREPORT_FETCH_DATA_SUCCESSFUL':
      return {
        data: {
          borrowers: [].concat(_toConsumableArray(action.data)),
          borrower_increase: getBorrowerIncrease(action.data),
          loan_increase: getLoanIncrease(action.data),
          payment_increase: getPaymentIncrease(action.data)
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      };
    case 'STATUSREPORT_FETCH_DATA_FAILED':
      return {
        data: null,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      };
    default:
      return _extends({}, state);
  }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(25);

var _session = __webpack_require__(86);

var _session2 = _interopRequireDefault(_session);

var _setup = __webpack_require__(63);

var _setup2 = _interopRequireDefault(_setup);

var _login = __webpack_require__(62);

var _login2 = _interopRequireDefault(_login);

var _new_borrower = __webpack_require__(72);

var _new_borrower2 = _interopRequireDefault(_new_borrower);

var _dashboard = __webpack_require__(68);

var _dashboard2 = _interopRequireDefault(_dashboard);

var _borrowers_list = __webpack_require__(67);

var _borrowers_list2 = _interopRequireDefault(_borrowers_list);

var _borrower_profile = __webpack_require__(65);

var _borrower_profile2 = _interopRequireDefault(_borrower_profile);

var _borrower_new_loan = __webpack_require__(64);

var _borrower_new_loan2 = _interopRequireDefault(_borrower_new_loan);

var _edit_borrower_profile = __webpack_require__(69);

var _edit_borrower_profile2 = _interopRequireDefault(_edit_borrower_profile);

var _loan_reports = __webpack_require__(71);

var _loan_reports2 = _interopRequireDefault(_loan_reports);

var _borrower_reports = __webpack_require__(66);

var _borrower_reports2 = _interopRequireDefault(_borrower_reports);

var _search = __webpack_require__(73);

var _search2 = _interopRequireDefault(_search);

var _income_expense_report = __webpack_require__(70);

var _income_expense_report2 = _interopRequireDefault(_income_expense_report);

var _status_report = __webpack_require__(74);

var _status_report2 = _interopRequireDefault(_status_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  session: _session2.default,
  login: _login2.default,
  setup: _setup2.default,
  new_borrower: _new_borrower2.default,
  dashboard: _dashboard2.default,
  borrowers_list: _borrowers_list2.default,
  borrower_profile: _borrower_profile2.default,
  borrower_new_loan: _borrower_new_loan2.default,
  edit_borrower_profile: _edit_borrower_profile2.default,
  search: _search2.default,
  loan_reports: _loan_reports2.default,
  borrower_reports: _borrower_reports2.default,
  income_expense_report: _income_expense_report2.default,
  status_report: _status_report2.default
});
// control panel

// acount

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  password: {
    value: '',
    errors: []
  },
  backend: {
    processing: false,
    status: null
  }
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var current_date = new Date();
var current_year = current_date.getFullYear();

exports.default = {
  firstname: {
    value: '',
    errors: []
  },
  middlename: {
    value: '',
    errors: []
  },
  surname: {
    value: '',
    errors: []
  },
  gender: {
    value: 1,
    errors: []
  },
  password: {
    value: '',
    errors: []
  },
  confirm_password: {
    value: '',
    errors: []
  },
  birth_date: {
    month: 'January',
    date: 1,
    year: current_year - 100,
    errors: []
  },
  backend: {
    processing: false,
    message: null,
    status: null
  }
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateTime = __webpack_require__(3);

var current_date = new Date();

exports.default = {
  amount_loan: {
    value: '',
    condition: 'due-date-and-interest',
    errors: []
  },
  date_loan: {
    month: (0, _DateTime.monthList)()[current_date.getMonth()],
    date: current_date.getDate(),
    year: current_date.getFullYear(),
    errors: []
  },
  interest_rate: {
    value: '',
    type: 'percentage',
    errors: []
  },
  months_to_pay: {
    value: '',
    errors: []
  },
  payment_method: {
    value: '1',
    errors: []
  },
  date_of_payment: {
    month: (0, _DateTime.monthList)()[current_date.getMonth()],
    date: current_date.getDate(),
    year: current_date.getFullYear()
  },
  allow_submit: false,
  calculated_values: {
    computed_interest: 0,
    computed_profit: 0,
    monthly: 0,
    semi_monthly: 0,
    daily: 0
  },
  backend: {
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: null,
  hash: {
    value: null,
    parent: null,
    removed: false
  },
  backend: {
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  list: [],
  backend: {
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tomorrows: {
    data: [],
    backend: {
      processing: false,
      status: null,
      message: null
    }
  },
  todays: {
    data: [],
    backend: {
      processing: false,
      status: null,
      message: null
    }
  },
  this_month: {
    data: [],
    backend: {
      processing: false,
      status: null,
      message: null
    }
  },
  past_due_dates: {
    data: [],
    backend: {
      processing: false,
      status: null,
      message: null
    }
  },
  one_gives: {
    data: [],
    backend: {
      processing: false,
      status: null,
      message: null
    }
  }
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  edit: {
    backend: {
      processing: false,
      status: null,
      message: null,
      allow_submit: true
    }
  },
  data: {
    backend: {
      processing: true,
      status: null,
      message: null
    }
  }
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateTime = __webpack_require__(3);

var current_date = new Date();
var current_year = current_date.getFullYear();

exports.default = {
  firstname: {
    value: '',
    errors: []
  },
  middlename: {
    value: '',
    errors: []
  },
  surname: {
    value: '',
    errors: []
  },
  gender: {
    value: 1,
    errors: []
  },
  address: {
    value: '',
    errors: []
  },
  amount_loan: {
    condition: 'due-date-and-interest',
    value: '',
    errors: []
  },
  months_to_pay: {
    value: '',
    errors: []
  },
  interest_rate: {
    type: 'percentage',
    value: '',
    errors: []
  },
  payment_method: {
    value: '1',
    errors: []
  },
  loan_date: {
    month: (0, _DateTime.monthList)()[current_date.getMonth()],
    date: current_date.getDate(),
    year: current_year,
    errors: []
  },
  date_of_payment: {
    month: (0, _DateTime.monthList)()[current_date.getMonth()],
    date: current_date.getDate(),
    year: current_year
  },
  calculated_values: {
    computed_interest: 0,
    computed_profit: 0,
    monthly: 0,
    semi_monthly: 0,
    daily: 0
  },
  contact_numbers: [{
    id: new Date().getTime(),
    value: '',
    errors: []
  }],
  backend: {
    allow_submit: false,
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  search_results: [],
  query: {
    value: '',
    type: 'borrower',
    allow_submit: false,
    result_box_shown: false
  },
  backend: {
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  accounts: null,
  is_logged_in: false,
  user_data: null,
  backend: {
    processing: false,
    status: null,
    message: null
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _session2.default;
  var action = arguments[1];

  switch (action.type) {
    case 'SESSION_CHECK':
      return _extends({}, _session2.default, {
        backend: _extends({}, _session2.default.backend, {
          processing: true
        })
      });

    case 'SESSION_CHECK_SUCCESSFUL':
      return _extends({}, _session2.default, {
        accounts: action.accounts,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      });

    case 'SESSION_CHECK_FAILED':
      return _extends({}, _session2.default, {
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      });

    case 'SESSION_LOGGED_IN':
      return _extends({}, _session2.default, {
        is_logged_in: true,
        user_data: action.user_data ? action.user_data : state.user_data,
        backend: _extends({}, _session2.default.backend, {
          status: 'logged_in'
        })
      });

    case 'SESSION_CLEAR':
      return _extends({}, _session2.default);

    case 'SESSION_GET_USER_DATA_SUCCESSFUL':
      return _extends({}, state, {
        user_data: _extends({}, action.user_data)
      });

    default:
      return _extends({}, state);
  }
};

var _session = __webpack_require__(85);

var _session2 = _interopRequireDefault(_session);

var _electron = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("chart.js");

/***/ })
/******/ ]);