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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, __dirname) {

var _fs = __webpack_require__(36);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _Database = __webpack_require__(5);

var _Database2 = _interopRequireDefault(_Database);

var _sequelize = __webpack_require__(4);

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basename = _path2.default.basename(module.filename);
var db = {};

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = _Database2.default['import'](_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = _Database2.default;
db.Sequelize = _sequelize2.default;

module.exports = db;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module), "models"))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueId = uniqueId;
function uniqueId() {
  return Math.floor(Math.random() * 999999999) + 1;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(4);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default({
  storage: _path2.default.join(__dirname, '../database/main.sqlite'),
  dialect: 'sqlite'
});

exports.default = sequelize;
/* WEBPACK VAR INJECTION */}.call(exports, "main_process"))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("password-hash");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(31);

__webpack_require__(12);

__webpack_require__(11);

__webpack_require__(10);

__webpack_require__(24);

__webpack_require__(16);

__webpack_require__(14);

__webpack_require__(13);

__webpack_require__(19);

__webpack_require__(18);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(25);

__webpack_require__(26);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(30);

__webpack_require__(29);

__webpack_require__(17);

__webpack_require__(23);

__webpack_require__(15);

__webpack_require__(22);

__webpack_require__(37);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

__webpack_require__(7);

var _electron = __webpack_require__(0);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _Database = __webpack_require__(5);

var _Database2 = _interopRequireDefault(_Database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainScreen = null;
var mainScreenShown = false;
var splashScreen = null;

function createSplashScreen() {
  // create the splash screen
  splashScreen = new _electron.BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    icon: _path2.default.join(__dirname, '../app/images/icon.png')
  });

  splashScreen.loadURL(_url2.default.format({
    pathname: _path2.default.join(__dirname, '../app/splash.html'),
    slashes: true,
    protocol: 'file'
  }));

  splashScreen.on('closed', function (closingEvent) {
    if (!mainScreenShown) {
      _electron.app.quit();
    }
  });
}

function createMainScreen() {
  // create the main screen
  mainScreen = new _electron.BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    show: false,
    icon: _path2.default.join(__dirname, '../app/images/icon.png')
  });

  // load the main.html
  mainScreen.loadURL(_url2.default.format({
    pathname: _path2.default.join(__dirname, '../app/main.html'),
    protocol: 'file',
    slashes: true
  }));

  mainScreen.on('closed', function () {
    mainScreen = null;
  });

  mainScreen.once('ready-to-show', function () {
    mainScreen.maximize();
    mainScreenShown = true;
    splashScreen.close();
    mainScreen.show();

    // open devtools on startup
    mainScreen.webContents.openDevTools();
  });
}

_electron.app.on('ready', function () {
  // create the splash screen first
  createSplashScreen();

  // check to see if sqlite file exists
  _Database2.default.authenticate().then(function () {
    // if SQLite database exists create the main screen
    createMainScreen();
  }).catch(function (err) {
    // show error message
    _electron.dialog.showErrorBox('Missing Dependency', 'The SQLite Database located on database directory was not found. Please contact your developer for more information about this: ' + err);
    _electron.app.quit();
  });
});

// terminate all processes
_electron.app.on('window-all-closed', function () {
  _electron.app.quit();
});
/* WEBPACK VAR INJECTION */}.call(exports, "main_process"))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _passwordHash = __webpack_require__(6);

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('LOGIN', function (event, arg) {
  _models2.default.admins.findAll({
    limit: 1,
    offset: 0
  }).then(function (user_data) {
    if (_passwordHash2.default.verify(arg.password, user_data[0].dataValues.password)) {
      event.sender.send('LOGIN_SUCCESSFUL');
    } else {
      event.sender.send('LOGIN_FAILED', {
        errors: ['Password is incorrect.']
      });
    }
  });
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _passwordHash = __webpack_require__(6);

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _generators = __webpack_require__(2);

var _strings = __webpack_require__(34);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('SETUP_SUBMIT', function (event, arg) {
  _models2.default.admins.findAll().then(function (admins) {
    if (admins.length) {
      event.sender.send('SETUP_SUBMIT_FAILED', {
        message: 'An account already exists.'
      });
    } else {
      var birth_date = new Date(arg.setup.birth_date.month + ' ' + arg.setup.birth_date.date + ', ' + arg.setup.birth_date.year).toISOString();

      var created_at = void 0;
      var updated_at = created_at = new Date().toISOString();

      _models2.default.admins.create({
        id: (0, _generators.uniqueId)(),
        password: _passwordHash2.default.generate(arg.setup.password.value),
        firstname: (0, _strings.ucfirst)(arg.setup.firstname.value),
        middlename: (0, _strings.ucfirst)(arg.setup.middlename.value),
        surname: (0, _strings.ucfirst)(arg.setup.surname.value),
        gender: arg.setup.gender.value,
        birth_date: birth_date,
        created_at: created_at,
        updated_at: updated_at
      }).then(function () {
        event.sender.send('SETUP_SUBMIT_SUCCESSFUL');
      }).catch(function (err) {
        event.sender.send('SETUP_SUBMIT_FAILED', {
          message: 'An unexpected error occured. `' + err.original.errno + ':' + err.original.code + '`'
        });
      });
    }
  });
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

_electron.ipcMain.on('APPLICATION_EXIT', function (event, arg) {
  _electron.app.quit();
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _generators = __webpack_require__(2);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('EDITBORROWERPROFILE_FETCH', function (event, arg) {
  _models2.default.borrowers.findOne({
    where: {
      id: arg.id
    },
    include: [_models2.default.contact_numbers]
  }).then(function (borrower) {
    return event.sender.send('EDITBORROWERPROFILE_FETCH_SUCCESSFUL', {
      data: _extends({}, borrower.dataValues, {
        contact_numbers: borrower.dataValues.contact_numbers.map(function (contact_number) {
          return _extends({}, contact_number.dataValues);
        })
      })
    });
  }).catch(function (err) {
    return event.sender.send('EDITBORROWERPROFILE_FETCH_FAILED', {
      message: err.message
    });
  });
});

_electron.ipcMain.on('EDITBORRWOERPROFILE_SEND', function (event, arg) {
  _models2.default.borrowers.update({
    firstname: arg.firstname,
    middlename: arg.middlename,
    surname: arg.surname,
    gender: arg.gender,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: arg.id
    }
  }).then(function () {
    return _models2.default.contact_numbers.findAll({
      where: {
        borrower_id: arg.id
      }
    });
  }).then(function (borrower_contact_numbers) {
    var promises = [];
    var ids_found = [];

    borrower_contact_numbers = borrower_contact_numbers.map(function (contact_number) {
      return _extends({}, contact_number.dataValues);
    });

    arg.contact_numbers.filter(function (contact_number) {
      return contact_number.value.length;
    }).forEach(function (contact_number) {
      promises.push(new Promise(function (resolve, reject) {
        if (!contact_number.id) {
          var created_at = new Date();
          var _updated_at = created_at = created_at.toISOString();

          _models2.default.contact_numbers.create({
            id: (0, _generators.uniqueId)(),
            borrower_id: arg.id,
            number: contact_number.value,
            created_at: created_at,
            updated_at: _updated_at
          }).then(function () {
            return resolve();
          });
        } else {
          ids_found.push(contact_number.id);

          _models2.default.contact_numbers.update({
            number: contact_number.value,
            updated_at: updated_at
          }, {
            where: {
              id: contact_number.id
            }
          }).then(function () {
            return resolve();
          });
        }
      }));
    });

    if (ids_found.length) {
      borrower_contact_numbers.filter(function (contact_number) {
        return ids_found.indexOf(contact_number.id) < 0 && contact_number.id;
      }).forEach(function (contact_number) {
        promises.push(new Promise(function (resolve, reject) {
          _models2.default.contact_numbers.findOne({
            where: {
              id: contact_number.id,
              borrower_id: arg.id
            }
          }).then(function (target) {
            return target.destroy();
          }).then(function () {
            return resolve();
          });
        }));
      });
    }

    return Promise.all(promises);
  }).then(function () {
    return _models2.default.borrowers.findOne({
      where: {
        id: arg.id
      },
      include: {
        model: _models2.default.contact_numbers,
        order: ['created_at', 'desc']
      }
    });
  }).then(function (borrower) {
    return event.sender.send('EDITBORRWOERPROFILE_SEND_SUCCESSFUL', {
      data: _extends({}, borrower.dataValues, {
        contact_numbers: borrower.contact_numbers.map(function (contact_number) {
          return _extends({}, contact_number.dataValues);
        })
      })
    });
  }).catch(function (err) {
    return event.sender.send('EDITBORRWOERPROFILE_SEND_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_FETCH', function (event, args) {
  _models2.default.borrowers.findOne({
    where: {
      id: args.id
    },
    include: [
    // contact numbers
    {
      model: _models2.default.contact_numbers,
      order: ['created_at', 'desc']
    },
    // loans
    {
      model: _models2.default.loans,
      order: ['loan_date', 'desc'],
      include: [{
        model: _models2.default.loan_payments,
        order: ['date_paid', 'desc']
      },
      // penalties
      {
        model: _models2.default.penalties,
        order: ['created_at', 'desc'],
        include: [
        // penalty_payments
        {
          model: _models2.default.penalty_payments,
          order: ['created_at', 'desc']
        }]
      }]
    }]
  }).then(function (borrower) {
    return event.sender.send('BORROWER_PROFILE_FETCH_SUCCESSFUL', {
      data: _extends({}, borrower.dataValues, {
        contact_numbers: borrower.contact_numbers.map(function (contact_number) {
          return _extends({}, contact_number.dataValues);
        }),
        loans: borrower.loans.map(function (loan) {
          return _extends({}, loan.dataValues, {
            loan_payments: loan.loan_payments.reverse().map(function (payment) {
              return _extends({}, payment.dataValues);
            }),
            penalties: loan.penalties.map(function (penalty) {
              return _extends({}, penalty.dataValues, {
                penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                  return _extends({}, penalty_payment.dataValues);
                })
              });
            })
          });
        })
      })
    });
  }).catch(function (err) {
    return event.sender.send('BORROWER_PROFILE_FETCH_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWERREPORTS_INITIAL_FETCH', function (event, args) {
  _models2.default.borrowers.find({
    where: {
      id: args.id
    },
    include: [{
      model: _models2.default.loans,
      order: ['loan_date', 'desc'],
      include: [{
        model: _models2.default.loan_payments,
        order: ['date_paid', 'desc']
      }, {
        model: _models2.default.penalties,
        order: ['date_given', 'desc'],
        include: [{
          model: _models2.default.penalty_payments,
          order: ['date_paid', 'desc']
        }]
      }]
    }, {
      model: _models2.default.contact_numbers,
      order: ['created_at', 'desc']
    }]
  }).then(function (borrower) {
    return event.sender.send('BORROWERREPORTS_INITIAL_FETCH_SUCCESSFUL', {
      data: _extends({}, borrower.dataValues, {
        contact_numbers: borrower.contact_numbers.map(function (contact_number) {
          return _extends({}, contact_number.dataValues);
        }),
        loans: borrower.loans.map(function (loan) {
          return _extends({}, loan.dataValues, {
            loan_payments: loan.loan_payments.map(function (loan_payment) {
              return _extends({}, loan_payment.dataValues);
            }),
            penalties: loan.penalties.map(function (penalty) {
              return _extends({}, penalty.dataValues, {
                penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                  return _extends({}, penalty_payment.dataValues);
                })
              });
            })
          });
        })
      })
    });
  }).catch(function (err) {
    return event.sender.send('BORROWERREPORTS_INITIAL_FETCH_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _sequelize = __webpack_require__(4);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWERS_LIST_FETCH', function (event, arg) {
  _models2.default.borrowers.findAll({
    include: [{
      model: _models2.default.contact_numbers,
      order: ['created_at', 'desc']
    }, {
      model: _models2.default.loans,
      include: [{
        model: _models2.default.loan_payments,
        order: ['date_paid', 'desc']
      }, {
        model: _models2.default.penalties,
        order: ['created_at', 'desc'],
        include: [{
          model: _models2.default.penalty_payments,
          order: ['created_at', 'desc']
        }]
      }],
      order: ['loan_date', 'desc']
    }]
  }).then(function (borrowers) {
    return event.sender.send('BORROWERS_LIST_FETCH_SUCCESSFUL', {
      list: borrowers.map(function (borrower) {
        return _extends({}, borrower.dataValues, {
          contact_numbers: borrower.contact_numbers.map(function (contact_number) {
            return _extends({}, contact_number.dataValues);
          }),
          loans: borrower.loans.map(function (loan) {
            return _extends({}, loan.dataValues, {
              loan_payments: loan.loan_payments.map(function (payment) {
                return _extends({}, payment.dataValues);
              }),
              penalties: loan.penalties.map(function (penalty) {
                return _extends({}, penalty.dataValues, {
                  penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                    return _extends({}, penalty_payment.dataValues);
                  })
                });
              })
            });
          })
        });
      })
    });
  }).catch(function (err) {
    return event.sender.send('BORROWERS_LIST_FETCH_FAILED', { message: err.message });
  });
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _datetime = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spreadLoans(loans) {
  return loans.map(function (loan) {
    return _extends({}, loan.dataValues, {
      loan_payments: loan.loan_payments.map(function (loan_payment) {
        return _extends({}, loan_payment.dataValues);
      }),
      borrower: _extends({}, loan.borrower.dataValues, {
        contact_numbers: loan.borrower.contact_numbers.map(function (contact_number) {
          return _extends({}, contact_number.dataValues);
        })
      })
    });
  });
}

function getLoans() {
  return _models2.default.loans.all({
    include: [{
      model: _models2.default.loan_payments,
      order: ['date_paid', 'desc']
    }, {
      model: _models2.default.borrowers,
      include: [{
        model: _models2.default.contact_numbers,
        order: ['created_at', 'desc']
      }]
    }]
  });
}

_electron.ipcMain.on('DASHBOARD_GET_DUEDATES_TOMORROW', function (event, args) {
  getLoans().then(function (loans) {
    loans = spreadLoans(loans);

    var due_dates_tomorrow = [];

    loans.forEach(function (loan) {
      if (loan.payment_method != 4) {
        var today = new Date();
        today = new Date(today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear());
        var due_date = (0, _datetime.getDueDate)(loan);

        if (today.getMonth() - due_date.getMonth() == 0 && due_date.getDate() - today.getDate() == 1) {
          due_dates_tomorrow.push(loan);
        }
      }
    });

    event.sender.send('DASHBOARD_GET_DUEDATES_TOMORROW_SUCCESSFUL', {
      data: [].concat(due_dates_tomorrow)
    });
  }).catch(function (err) {
    return event.sender.send('DASHBOARD_GET_DUEDATES_TOMORROW_FAILED', {
      message: err.message
    });
  });
});

_electron.ipcMain.on('DASHBOARD_GET_DUEDATES_TODAY', function (event, args) {
  getLoans().then(function (loans) {
    loans = spreadLoans(loans);

    var due_dates_today = [];

    loans.forEach(function (loan) {
      var today = new Date();
      today = new Date(today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear());
      var due_date = (0, _datetime.getDueDate)(loan);

      if (due_date.getTime() == today.getTime()) {
        due_dates_today.push(loan);
      }
    });

    event.sender.send('DASHBOARD_GET_DUEDATES_TODAY_SUCCESSFUL', {
      data: [].concat(due_dates_today)
    });
  }).catch(function (err) {
    return event.sender.send('DASHBOARD_GET_DUEDATES_TODAY_FAILED', {
      message: err.message
    });
  });
});

_electron.ipcMain.on('DASHBOARD_GET_DUEDATES_THISMONTH', function (event, args) {
  getLoans().then(function (loans) {
    loans = spreadLoans(loans);

    var due_dates_this_month = [];

    loans.forEach(function (loan) {
      if (loan.payment_method == 1 || loan.payment_method == 2) {
        // monthly || semi-monthly
        var today = new Date();
        today = new Date(today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear());
        var due_date = (0, _datetime.getDueDate)(loan);

        if (due_date.getMonth() == today.getMonth() && due_date.getDate() > today.getDate()) {
          due_dates_this_month.push(loan);
        }
      }
    });

    event.sender.send('DASHBOARD_GET_DUEDATES_THISMONTH_SUCCESSFUL', {
      data: [].concat(due_dates_this_month)
    });
  }).catch(function (err) {
    return event.sender.send('DASHBOARD_GET_DUEDATES_THISMONTH_FAILED', {
      message: err.message
    });
  });
});

_electron.ipcMain.on('DASHBOARD_GET_PASTDUEDATES', function (event, args) {
  getLoans().then(function (loans) {
    loans = spreadLoans(loans);

    var past_due_dates = [];

    loans.forEach(function (loan) {
      var today = new Date();
      today = new Date(today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear());
      var due_date = (0, _datetime.getDueDate)(loan);

      if (due_date.getTime() < today.getTime()) {
        past_due_dates.push(loan);
      }
    });

    event.sender.send('DASHBOARD_GET_PASTDUEDATES_SUCCESSFUL', {
      data: [].concat(past_due_dates)
    });
  }).catch(function (err) {
    return event.sender.send('DASHBOARD_GET_PASTDUEDATES_FAILED', {
      message: err.message
    });
  });
});

_electron.ipcMain.on('DASHBOARD_GET_ONEGIVES', function (event, args) {
  getLoans().then(function (loans) {
    loans = spreadLoans(loans);

    var one_gives = [];

    loans.forEach(function (loan) {
      if (loan.payment_method == 4) {
        var today = new Date();
        today = new Date(today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear());
        var due_date = new Date(loan.expected_date_of_payment);

        if (today.getMonth() - due_date.getMonth() >= 0 && due_date.getDate() - today.getDate() != 1) {
          one_gives.push(_extends({}, loan, {
            due_date: due_date
          }));
        }
      }
    });

    event.sender.send('DASHBOARD_GET_ONEGIVES_SUCCESSFUL', {
      data: [].concat(one_gives)
    });
  }).catch(function (err) {
    return event.sender.send('DASHBOARD_GET_ONEGIVES_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _calculator = __webpack_require__(32);

var calculator = _interopRequireWildcard(_calculator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_ELI_SEND', function (event, args) {
  var interest_percentage = calculator.computeInterestPercentage(args.interest_rate, args.interest_type);
  var interest = calculator.computeInterest(args.amount, interest_percentage, args.interest_type, args.interest_rate);
  var profit = 0;
  var per_month = 0;
  var per_semi_month = 0;
  var per_day = 0;

  if (args.payment_method == 4) {
    profit = calculator.computeProfit(interest_percentage, args.amount);
  } else {
    profit = calculator.computeProfit(interest, args.months_to_pay);
    per_month = calculator.computePerMonth(args.condition_applied, args.amount, args.months_to_pay, profit);
    per_semi_month = calculator.computePerHalfMonth(per_month);
    per_day = calculator.computePerDay(per_month);
  }

  _models2.default.loans.update({
    amount: args.amount,
    condition_applied: args.condition_applied,
    loan_date: args.date_loan,
    interest_rate: args.interest_rate,
    interest_type: args.interest_type,
    months_to_pay: args.months_to_pay,
    expected_date_of_payment: args.date_of_payment,
    payment_method: args.payment_method,
    profit: profit,
    interest: interest,
    per_month: per_month,
    per_day: per_day,
    per_semi_month: per_semi_month,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: args.id
    }
  }).then(function () {
    return _models2.default.loans.findOne({
      where: {
        id: args.id
      },
      include: [{
        model: _models2.default.loan_payments,
        order: ['created_at', 'desc']
      }]
    });
  }).then(function (data) {
    return event.sender.send('BORROWER_PROFILE_ELI_SEND_SUCCESSFUL', {
      data: _extends({}, data.dataValues, {
        loan_payments: data.loan_payments.map(function (payment) {
          return payment.dataValues;
        })
      }),
      loan_index: args.loan_index
    });
  }).catch(function (err) {
    return event.sender.send('BORROWER_PROFILE_ELI_SEND_FAILED', {
      message: err.message,
      loan_index: args.loan_index
    });
  });
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_EPI_SEND', function (event, arg) {
  _models2.default.loan_payments.update({
    amount: arg.amount,
    quarter: arg.quarter,
    payment_coverage: arg.payment_coverage,
    period_paid: arg.period_paid,
    date_paid: arg.date_paid,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: arg.payment_id
    }
  }).then(function () {
    return _models2.default.loan_payments.findOne({
      where: {
        id: arg.payment_id
      }
    });
  }).then(function (payment) {
    return event.sender.send('BORROWER_PROFILE_EPI_SEND_SUCCESSFUL', {
      data: _extends({}, payment.dataValues),
      loan_index: arg.loan_index,
      payment_index: arg.payment_index
    });
  }).catch(function (err) {
    return event.sender.send('BORROWER_PROFILE_EPI_SEND_FAILED', {
      loan_index: arg.loan_index,
      payment_index: arg.payment_index,
      message: err.message
    });
  });
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_EDITPENALTYFORM_SAVE', function (event, args) {
  _models2.default.penalties.update({
    amount: args.amount,
    remarks: args.remarks,
    date_given: args.date_given,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: args.penalty_id
    }
  }).then(function () {
    return _models2.default.penalties.findOne({
      where: {
        id: args.penalty_id
      }
    });
  }).then(function (updated_penalty) {
    return event.sender.send('BORROWER_PROFILE_EDITPENALTYFORM_SAVE_SUCCESSFUL', {
      data: _extends({}, updated_penalty.dataValues),
      loan_index: args.loan_index,
      penalty_index: args.penalty_index
    });
  }).catch(function (error) {
    return event.sender.send('BORROWER_PROFILE_EDITPENALTYFORM_SAVE_FAILED', {
      message: error.message,
      loan_index: args.loan_index,
      penalty_index: args.penalty_index
    });
  });
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE', function (event, args) {
  _models2.default.penalty_payments.update({
    amount: args.amount,
    date_paid: args.date_paid,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: args.id
    }
  }).then(function () {
    return _models2.default.penalty_payments.findOne({
      where: {
        id: args.id
      }
    });
  }).then(function (penalty_payment) {
    return event.sender.send('BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_SUCCESSFUL', {
      data: _extends({}, penalty_payment.dataValues),
      loan_index: args.loan_index,
      penalty_index: args.penalty_index,
      penalty_payment_index: args.penalty_payment_index
    });
  }).catch(function (error) {
    return event.sender.send('BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_FAILED', {
      message: error.message,
      loan_index: args.loan_index,
      penalty_index: args.penalty_index,
      penalty_payment_index: args.penalty_payment_index
    });
  });
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('INCOMEEXPENSEREPORT_FETCH_ALL', function (event, args) {
  _models2.default.borrowers.all({
    include: [{
      model: _models2.default.loans,
      include: [{
        model: _models2.default.loan_payments
      }, {
        model: _models2.default.penalties,
        include: [{
          model: _models2.default.penalty_payments
        }]
      }]
    }]
  }).then(function (borrowers) {
    return event.sender.send('INCOMEEXPENSEREPORT_FETCH_ALL_SUCCESSFUL', {
      data: borrowers.map(function (borrower) {
        return _extends({}, borrower.dataValues, {
          loans: borrower.loans.map(function (loan) {
            return _extends({}, loan.dataValues, {
              loan_payments: loan.loan_payments.map(function (loan_payment) {
                return _extends({}, loan_payment.dataValues);
              }),
              penalties: loan.penalties.map(function (penalty) {
                return _extends({}, penalty.dataValues, {
                  penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                    return _extends({}, penalty_payment.dataValues);
                  })
                });
              })
            });
          })
        });
      })
    });
  }).catch(function (err) {
    return event.sender.send('INCOMEEXPENSEREPORT_FETCH_ALL_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('LOANREPORTS_INITIAL_FETCH', function (event, args) {
  _models2.default.loans.find({
    where: {
      id: args.id
    },
    include: [{
      model: _models2.default.borrowers,
      include: [{
        model: _models2.default.contact_numbers,
        order: ['created_at', 'desc']
      }]
    }, {
      model: _models2.default.loan_payments,
      order: ['date_paid', 'desc']
    }, {
      model: _models2.default.penalties,
      order: ['created_at', 'desc'],
      include: [{
        model: _models2.default.penalty_payments,
        order: ['date_paid', 'desc']
      }]
    }]
  }).then(function (loan) {
    return event.sender.send('LOANREPORTS_INITIAL_FETCH_SUCCESSFUL', {
      data: _extends({}, loan.dataValues, {
        loan_payments: loan.loan_payments.reverse().map(function (loan_payment) {
          return _extends({}, loan_payment.dataValues);
        }),
        penalties: loan.penalties.map(function (penalty) {
          return _extends({}, penalty.dataValues, {
            penalty_payments: penalty.penalty_payments.reverse().map(function (penalty_payment) {
              return _extends({}, penalty_payment.dataValues);
            })
          });
        }),
        borrower: _extends({}, loan.borrower.dataValues, {
          contact_numbers: loan.borrower.contact_numbers.map(function (contact_number) {
            return _extends({}, contact_number.dataValues);
          })
        })
      })
    });
  }).catch(function (err) {
    return event.sender.send('LOANREPORTS_INITIAL_FETCH_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _generators = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('NEWBORROWER_SUBMIT', function (event, arg) {
  // created_at and updated_at
  var created_at = void 0;
  var updated_at = created_at = new Date().toISOString();

  var new_borrower_id = (0, _generators.uniqueId)();
  var loan_date = new Date(arg.loan_date).toISOString();

  _models2.default.borrowers.create({
    id: new_borrower_id,
    firstname: arg.firstname,
    middlename: arg.middlename,
    surname: arg.surname,
    gender: arg.gender,
    created_at: created_at,
    updated_at: updated_at
  }).then(function (new_borrower) {
    return _models2.default.loans.create({
      id: (0, _generators.uniqueId)(),
      borrower_id: new_borrower_id,
      loan_date: loan_date,
      amount: Number(arg.amount_loan),
      interest: arg.computed_interest,
      profit: arg.computed_profit,
      interest_rate: Number(arg.interest_rate),
      interest_type: arg.interest_type,
      months_to_pay: Number(arg.months_to_pay),
      payment_method: arg.payment_method,
      expected_date_of_payment: new Date(arg.expected_date_of_payment).toISOString(),
      per_month: Math.ceil(arg.monthly),
      per_day: Math.ceil(arg.daily),
      per_semi_month: Math.ceil(arg.semi_monthly),
      condition_applied: arg.condition_applied,
      created_at: created_at,
      updated_at: updated_at
    });
  }).then(function () {
    if (arg.contact_numbers.filter(function (contact_number) {
      return contact_number.value.length;
    }).length > 0) {
      return _models2.default.contact_numbers.bulkCreate(arg.contact_numbers.filter(function (contact_number) {
        return contact_number.value.length;
      }).map(function (contact_number) {
        return {
          id: (0, _generators.uniqueId)(),
          borrower_id: new_borrower_id,
          number: contact_number.value,
          created_at: created_at,
          updated_at: updated_at
        };
      }));
    }

    event.sender.send('NEWBORROWER_SUBMIT_SUCCESSFUL', {
      id: new_borrower_id
    });
  }).then(function () {
    return event.sender.send('NEWBORROWER_SUBMIT_SUCCESSFUL', {
      id: new_borrower_id
    });
  }).catch(function (err) {
    event.sender.send('NEWBORROWER_SUBMIT_FAILED', {
      message: err.message
    });
  });
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _generators = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWERNEWLOAN_SUBMIT', function (event, args) {
  var created_at = void 0;
  var updated_at = created_at = new Date().toISOString();

  _models2.default.loans.create({
    id: (0, _generators.uniqueId)(),
    borrower_id: args.borrower_id,
    loan_date: args.date_loan,
    amount: Number(args.amount_loan),
    interest: args.computed_interest,
    profit: args.computed_profit,
    interest_rate: Number(args.interest_rate),
    interest_type: args.interest_type,
    months_to_pay: Number(args.months_to_pay),
    expected_date_of_payment: args.expected_date_of_payment,
    payment_method: args.payment_method,
    per_month: Math.ceil(args.monthly),
    per_day: Math.ceil(args.daily),
    per_semi_month: Math.ceil(args.semi_monthly),
    condition_applied: args.condition_applied,
    created_at: created_at,
    updated_at: updated_at
  }).then(function () {
    return event.sender.send('BORROWERNEWLOAN_SUBMIT_SUCCESSFUL');
  }).catch(function (error) {
    return event.sender.send('BORROWERNEWLOAN_SUBMIT_FAILED', {
      message: error.message
    });
  });
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _generators = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_SEND_PAYMENT', function (event, arg) {
  var created_at = void 0;
  var updated_at = created_at = new Date().toISOString();

  _models2.default.loan_payments.create({
    id: (0, _generators.uniqueId)(),
    loan_id: arg.loan_id,
    amount: arg.amount,
    period_paid: arg.period_paid,
    date_paid: arg.date_paid,
    created_at: created_at,
    updated_at: updated_at
  }).then(function (new_payment) {
    return event.sender.send('BORROWER_PROFILE_SEND_PAYMENT_SUCCESSFUL', {
      payment: _extends({}, new_payment.dataValues),
      index: arg.index
    });
  }).catch(function (err) {
    return event.sender.send('BORROWER_PROFILE_SEND_PAYMENT_FAILED', {
      message: err.message,
      index: arg.index
    });
  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _generators = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_PENALTYFIELD_CREATE', function (event, args) {
  var id = (0, _generators.uniqueId)();

  var created_at = void 0;
  var updated_at = created_at = new Date().toISOString();

  _models2.default.penalties.create({
    id: id,
    loan_id: args.loan_id,
    amount: args.amount,
    remarks: args.remarks,
    date_given: args.date_given,
    created_at: created_at,
    updated_at: updated_at
  }).then(function () {
    return _models2.default.penalties.findOne({
      where: { id: id },
      include: [
      // penalty_payments
      {
        model: _models2.default.penalty_payments,
        order: ['created_at', 'desc']
      }]
    });
  }).then(function (penalty) {
    return event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_SUCCESSFUL', {
      data: _extends({}, penalty.dataValues, {
        penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
          return _extends({}, penalty_payment.dataValues);
        })
      }),
      loan_index: args.loan_index
    });
  }).catch(function (error) {
    return event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_FAILED', {
      message: error.message,
      loan_index: args.loan_index
    });
  });
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

var _generators = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE', function (event, args) {
  var id = (0, _generators.uniqueId)();

  var created_at = void 0;
  var updated_at = created_at = new Date().toISOString();

  _models2.default.penalty_payments.create({
    id: id,
    penalty_id: args.penalty_id,
    amount: args.amount,
    date_paid: args.date_paid,
    created_at: created_at,
    updated_at: updated_at
  }).then(function (new_payment) {
    return event.sender.send('BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_SUCCESSFUL', {
      data: new_payment.dataValues,
      loan_index: args.loan_index,
      penalty_index: args.penalty_index
    });
  }).catch(function (error) {
    return event.sender.send('BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_FAILED', {
      message: error.message
    });
  });
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('SEARCH_SUBMIT', function (event, args) {
  switch (args.at) {
    case 'borrower':
      _models2.default.borrowers.findAll({
        where: {
          $or: [{
            id: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            firstname: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            middlename: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            surname: {
              $like: '%' + args.search_query + '%'
            }
          }]
        }
      }).catch(function (err) {
        return event.sender.send('SEARCH_SUBMIT_FAILED', {
          message: err.message
        });
      }).then(function (search_results) {
        if (search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(function (search_result) {
              return _extends({}, search_result.dataValues);
            })
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
      break;

    case 'loan':
      _models2.default.loans.findAll({
        where: {
          $or: [{
            id: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            borrower_id: {
              $like: '%' + args.search_query + '%'
            }
          }]
        },
        include: [
        // loan payments
        {
          model: _models2.default.loan_payments,
          order: [['created_at', 'desc']]
        },
        // penalties
        {
          model: _models2.default.penalties,
          order: [['created_at', 'desc']],
          include: [
          // penalty_payments
          {
            model: _models2.default.penalty_payments,
            order: ['created_at', 'desc']
          }]
        },
        // borrowers
        {
          model: _models2.default.borrowers
        }]
      }).catch(function (err) {
        return event.sender.send('SEARCH_SUBMIT_FAILED', {
          message: err.message
        });
      }).then(function (search_results) {
        if (search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(function (search_result) {
              return _extends({}, search_result.dataValues, {
                borrower: _extends({}, search_result.borrower.dataValues),
                loan_payments: search_result.loan_payments.map(function (loan_payment) {
                  return _extends({}, loan_payment.dataValues);
                }),
                penalties: search_result.penalties.map(function (penalty) {
                  return _extends({}, penalty.dataValues, {
                    penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                      return _extends({}, penalty_payment.dataValues);
                    })
                  });
                })
              });
            })
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
      break;

    case 'penalty':
      _models2.default.penalties.findAll({
        where: {
          $or: [{
            id: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            loan_id: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            remarks: {
              $like: '%' + args.search_query + '%'
            }
          }]
        },
        include: [{
          model: _models2.default.loans,
          include: [{
            model: _models2.default.loan_payments,
            order: ['date_given', 'desc']
          }, {
            model: _models2.default.borrowers
          }]
        }, {
          model: _models2.default.penalty_payments,
          order: ['date_paid', 'desc']
        }]
      }).catch(function (err) {
        return event.sender.send('SEARCH_SUBMIT_FAILED', {
          message: err.message
        });
      }).then(function (search_results) {
        if (search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(function (search_result) {
              return _extends({}, search_result.dataValues, {
                penalty_payments: search_result.penalty_payments.map(function (penalty_payment) {
                  return _extends({}, penalty_payment.dataValues);
                }),
                loan: _extends({}, search_result.loan.dataValues, {
                  borrower: _extends({}, search_result.loan.borrower.dataValues),
                  loan_payments: search_result.loan.loan_payments.map(function (loan_payment) {
                    return _extends({}, loan_payment.dataValues);
                  })
                })
              });
            })
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
      break;

    case 'loan-payment':
      _models2.default.loan_payments.findAll({
        where: {
          $or: [{
            id: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            loan_id: {
              $like: '%' + args.search_query + '%'
            }
          }]
        },
        include: [{
          model: _models2.default.loans,
          include: [{
            model: _models2.default.loan_payments,
            order: ['date_paid', 'desc']
          }, {
            model: _models2.default.penalties,
            order: ['date_given', 'desc'],
            include: [{
              model: _models2.default.penalty_payments,
              order: ['date_paid', 'desc']
            }]
          }, {
            model: _models2.default.borrowers
          }]
        }]
      }).catch(function (err) {
        return event.sender.send('SEARCH_SUBMIT_FAILED', {
          message: err.message
        });
      }).then(function (search_results) {
        if (search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(function (search_result) {
              return _extends({}, search_result.dataValues, {
                loan: _extends({}, search_result.loan.dataValues, {
                  penalties: search_result.loan.penalties.map(function (penalty) {
                    return _extends({}, penalty.dataValues, {
                      penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                        return _extends({}, penalty_payment.dataValues);
                      })
                    });
                  }),
                  loan_payments: search_result.loan.loan_payments.map(function (loan_payment) {
                    return _extends({}, loan_payment.dataValues);
                  }),
                  borrower: _extends({}, search_result.loan.borrower.dataValues)
                })
              });
            })
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
      break;

    case 'penalty-payment':
      _models2.default.penalty_payments.findAll({
        where: {
          $or: [{
            id: {
              $like: '%' + args.search_query + '%'
            }
          }, {
            penalty_id: {
              $like: '%' + args.search_query + '%'
            }
          }]
        },
        include: [{
          model: _models2.default.penalties,
          include: [{
            model: _models2.default.loans,
            include: [{
              model: _models2.default.loan_payments,
              order: ['date_paid', 'desc']
            }, {
              model: _models2.default.penalties,
              order: ['date_given', 'desc'],
              include: [{
                model: _models2.default.penalty_payments,
                order: ['date_paid', 'desc']
              }]
            }, {
              model: _models2.default.borrowers
            }]
          }, {
            model: _models2.default.penalty_payments,
            order: ['date_paid', 'desc']
          }]
        }]
      }).catch(function (err) {
        return event.sender.send('SEARCH_SUBMIT_FAILED', {
          message: err.message
        });
      }).then(function (search_results) {
        if (search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(function (search_result) {
              return _extends({}, search_result.dataValues, {
                penalty: _extends({}, search_result.penalty.dataValues, {
                  penalty_payments: search_result.penalty.penalty_payments.map(function (penalty_payment) {
                    return _extends({}, penalty_payment.dataValues);
                  }),
                  loan: _extends({}, search_result.penalty.loan.dataValues, {
                    borrower: _extends({}, search_result.penalty.loan.borrower.dataValues),
                    loan_payments: search_result.penalty.loan.loan_payments.map(function (loan_payment) {
                      return _extends({}, loan_payment.dataValues);
                    }),
                    penalties: search_result.penalty.loan.penalties.map(function (penalty) {
                      return _extends({}, penalty.dataValues, {
                        penalty_payments: penalty.penalty_payments.map(function (penalty_payment) {
                          return _extends({}, penalty_payment.dataValues);
                        })
                      });
                    })
                  })
                })
              });
            })
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
      break;
    default:
      event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: 'Unknown search type.'
      });
      break;
  }
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('BORROWER_PROFILE_WAVE_SUBMIT', function (event, args) {
  var current_date = new Date().toISOString();

  _models2.default.penalties.update({
    was_waved: true,
    date_waved: current_date,
    updated_at: current_date,
    wave_remarks: args.wave_remarks
  }, {
    where: {
      id: args.penalty_id
    }
  }).then(function () {
    return _models2.default.penalties.findOne({
      where: {
        id: args.penalty_id
      },
      include: [{
        model: _models2.default.penalty_payments,
        order: ['date_paid', 'desc']
      }]
    });
  }).then(function (updated_penalty) {
    return event.sender.send('BORROWER_PROFILE_WAVE_SUBMIT_SUCCESSFUL', {
      updated_penalty: _extends({}, updated_penalty.dataValues, {
        penalty_payments: updated_penalty.penalty_payments.map(function (penalty_payment) {
          return _extends({}, penalty_payment.dataValues);
        })
      }),
      loan_index: args.loan_index,
      penalty_index: args.penalty_index
    });
  }).catch(function (err) {
    return event.sender.send('BORROWER_PROFILE_WAVE_SUBMIT_FAILED', {
      message: err.message,
      loan_index: args.loan_index,
      penalty_index: args.penalty_index
    });
  });
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('SESSION_CHECK', function (event, arg) {
  _models2.default.admins.findAll().then(function (admins) {
    event.sender.send('SESSION_CHECK_SUCCESSFUL', {
      accounts: admins.length
    });
  });
});

_electron.ipcMain.on('SESSION_GET_USER_DATA', function (event, arg) {
  _models2.default.admins.findAll({
    limit: 1,
    offset: 0
  }).then(function (user_data) {
    event.sender.send('SESSION_GET_USER_DATA_SUCCESSFUL', {
      user_data: user_data[0].dataValues
    });
  });
});

/***/ }),
/* 32 */
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

function computeInterest(amount_loan, computed_interest, interest_type, interest_rate) {
  if (interest_type == 'percentage') {
    // amount loan * interest percentage
    return Number(amount_loan) * Number(computed_interest);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDueDate = getDueDate;
function getDueDate(loan) {
  var date = void 0;

  if (loan.loan_payments.length) {
    date = new Date(loan.loan_payments[loan.loan_payments.length - 1].date_paid);
  } else {
    date = new Date(loan.loan_date);
  }

  if (loan.payment_method == 2) {
    // semi monthly
    return new Date(date.getTime() + 1296000000);
  } else if (loan.payment_method == 1) {
    // monthly
    return new Date(date.getMonth() + 2 + '-' + date.getDate() + '-' + date.getFullYear());
  } else {
    // daily
    return new Date(date.getTime() + 86400000);
  }
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ucfirst = ucfirst;
function ucfirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(0);

var _models = __webpack_require__(1);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.ipcMain.on('STATUSREPORT_FETCH_DATA', function (event, args) {
  _models2.default.borrowers.all({
    include: [{
      model: _models2.default.loans,
      include: [{
        model: _models2.default.loan_payments
      }, {
        model: _models2.default.penalties,
        include: [{
          model: _models2.default.penalty_payments
        }]
      }]
    }]
  }).then(function (borrowers) {
    return event.sender.send('STATUSREPORT_FETCH_DATA_SUCCESSFUL', {
      data: borrowers.map(function (borrower) {
        return _extends({}, borrower.dataValues, {
          loans: borrower.loans.reverse().map(function (loan) {
            return _extends({}, loan.dataValues, {
              loan_payments: loan.loan_payments.reverse().map(function (loan_payment) {
                return _extends({}, loan_payment.dataValues);
              }),
              penalties: loan.penalties.reverse().map(function (penalty) {
                return _extends({}, penalty.dataValues, {
                  penalty_payments: penalty.penalty_payments.reverse().map(function (penalty_payment) {
                    return _extends({}, penalty_payment.dataValues);
                  })
                });
              })
            });
          })
        });
      })
    });
  }).catch(function (err) {
    return event.sender.send('STATUSREPORT_FETCH_DATA_FAILED', {
      message: err.message
    });
  });
});

/***/ })
/******/ ]);