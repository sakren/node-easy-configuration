/** Generated by SimQ **/
/** modules **/

// Generated by CoffeeScript 1.6.3
(function() {
  var SUPPORTED, cache, modules, require, resolve, stats;

  if (!this.require) {
    SUPPORTED = ['js', 'json', 'ts', 'coffee', 'eco'];
    modules = {};
    stats = {};
    cache = {};
    require = function(name, parent) {
      var fullName, m;
      if (parent == null) {
        parent = null;
      }
      fullName = resolve(name, parent);
      if (fullName === null) {
        throw new Error('Module ' + name + ' was not found.');
      }
      if (typeof cache[fullName] === 'undefined') {
        m = {
          exports: {},
          id: fullName,
          filename: fullName,
          loaded: false,
          parent: null,
          children: null
        };
        modules[fullName].apply(modules[fullName], [m.exports, m]);
        m.loaded = true;
        cache[fullName] = m;
      }
      if (typeof stats[fullName] === 'undefined') {
        stats[fullName] = {
          atime: null,
          mtime: null,
          ctime: null
        };
      }
      stats[fullName].atime = new Date;
      return cache[fullName].exports;
    };
    resolve = function(name, parent) {
      var ext, num, part, parts, prev, result, _i, _j, _k, _len, _len1, _len2;
      if (parent == null) {
        parent = null;
      }
      if (parent !== null && name[0] === '.') {
        num = parent.lastIndexOf('/');
        if (num !== -1) {
          parent = parent.substr(0, num);
        }
        name = parent + '/' + name;
        parts = name.split('/');
        result = [];
        prev = null;
        for (_i = 0, _len = parts.length; _i < _len; _i++) {
          part = parts[_i];
          if (part === '.' || part === '') {
            continue;
          } else if (part === '..' && prev) {
            result.pop();
          } else {
            result.push(part);
          }
          prev = part;
        }
        name = result.join('/');
        if (parent[0] === '/') {
          name = '/' + name;
        }
      }
      if (typeof modules[name] !== 'undefined') {
        return name;
      }
      for (_j = 0, _len1 = SUPPORTED.length; _j < _len1; _j++) {
        ext = SUPPORTED[_j];
        if (typeof modules[name + '.' + ext] !== 'undefined') {
          return name + '.' + ext;
        }
      }
      for (_k = 0, _len2 = SUPPORTED.length; _k < _len2; _k++) {
        ext = SUPPORTED[_k];
        if (typeof modules[name + '/index.' + ext] !== 'undefined') {
          return name + '/index.' + ext;
        }
      }
      return null;
    };
    this.require = function(name, parent) {
      if (parent == null) {
        parent = null;
      }
      return require(name, parent);
    };
    this.require.simq = true;
    this.require.version = 1;
    this.require.resolve = function(name, parent) {
      if (parent == null) {
        parent = null;
      }
      return resolve(name, parent);
    };
    this.require.define = function(bundle) {
      var m, name, _results;
      _results = [];
      for (name in bundle) {
        m = bundle[name];
        _results.push(modules[name] = m);
      }
      return _results;
    };
    this.require.release = function() {
      var name, _results;
      _results = [];
      for (name in cache) {
        _results.push(delete cache[name]);
      }
      return _results;
    };
    this.require.getStats = function(name, parent) {
      var fullName;
      if (parent == null) {
        parent = null;
      }
      fullName = resolve(name, parent);
      if (fullName === null) {
        throw new Error('Module ' + name + ' was not found.');
      }
      if (typeof stats[fullName] === 'undefined') {
        stats[fullName] = {
          atime: null,
          mtime: null,
          ctime: null
        };
      }
      return stats[fullName];
    };
    this.require.__setStats = function(bundle) {
      var data, name, _results;
      _results = [];
      for (name in bundle) {
        data = bundle[name];
        _results.push(stats[name] = {
          atime: new Date(data.atime),
          mtime: new Date(data.mtime),
          ctime: new Date(data.ctime)
        });
      }
      return _results;
    };
    this.require.cache = cache;
  }

  return this.require.define;

}).call(this)({
 'recursive-merge/lib/Merge.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'recursive-merge/lib/Merge.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'recursive-merge/lib/Merge.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'recursive-merge/lib/Merge.js';
	var __dirname = 'recursive-merge/lib';
	var process = {cwd: function() {return '/';}, argv: ['node', 'recursive-merge/lib/Merge.js'], env: {}};

	/** code **/
	// Generated by CoffeeScript 1.6.3
	(function() {
	  var merge,
	    __slice = [].slice;
	
	  merge = function(left, right) {
	    var i, leftType, name, rightType, type, value, valueType, _i, _len;
	    type = Object.prototype.toString;
	    leftType = type.call(left);
	    rightType = type.call(right);
	    if (leftType !== rightType) {
	      throw new Error('Can not merge ' + leftType + ' with ' + rightType);
	    }
	    switch (leftType) {
	      case '[object Array]':
	        for (i = _i = 0, _len = right.length; _i < _len; i = ++_i) {
	          value = right[i];
	          valueType = type.call(value);
	          if (valueType === '[object Array]' || valueType === '[object Object]') {
	            left[i] = merge(left[i], value);
	          } else {
	            left.push(value);
	          }
	        }
	        break;
	      case '[object Object]':
	        for (name in right) {
	          value = right[name];
	          valueType = type.call(value);
	          if (typeof left[name] === 'undefined') {
	            left[name] = value;
	          } else if (valueType === '[object Array]' || valueType === '[object Object]') {
	            left[name] = merge(left[name], value);
	          }
	        }
	        break;
	      default:
	        throw new Error('Can not merge ' + leftType + ' objects');
	    }
	    return left;
	  };
	
	  module.exports = function() {
	    var left, r, right, _i, _len;
	    left = arguments[0], right = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    for (_i = 0, _len = right.length; _i < _len; _i++) {
	      r = right[_i];
	      left = merge(left, r);
	    }
	    return left;
	  };
	
	}).call(this);
	

}, '/lib/Extension.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/lib/Extension.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/lib/Extension.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/lib/Extension.js';
	var __dirname = '/lib';
	var process = {cwd: function() {return '/';}, argv: ['node', '/lib/Extension.js'], env: {}};

	/** code **/
	// Generated by CoffeeScript 1.6.3
	(function() {
	  var Extension;
	
	  Extension = (function() {
	    function Extension() {}
	
	    Extension.prototype.configurator = null;
	
	    Extension.prototype.data = null;
	
	    Extension.prototype.getConfig = function(defaults) {
	      if (defaults == null) {
	        defaults = null;
	      }
	      if (this.data === null) {
	        this.configurator.load();
	      }
	      if (defaults !== null) {
	        this.data = this.configurator.merge(this.data, defaults);
	      }
	      return this.data;
	    };
	
	    Extension.prototype.loadConfiguration = function() {
	      return this.getConfig();
	    };
	
	    Extension.prototype.afterCompile = function(data) {
	      return data;
	    };
	
	    return Extension;
	
	  })();
	
	  module.exports = Extension;
	
	}).call(this);
	

}, '/lib/Helpers.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/lib/Helpers.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/lib/Helpers.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/lib/Helpers.js';
	var __dirname = '/lib';
	var process = {cwd: function() {return '/';}, argv: ['node', '/lib/Helpers.js'], env: {}};

	/** code **/
	// Generated by CoffeeScript 1.6.3
	(function() {
	  var Helpers;
	
	  Helpers = (function() {
	    function Helpers() {}
	
	    Helpers.dirName = function(path) {
	      var num;
	      num = path.lastIndexOf('/');
	      return path.substr(0, num);
	    };
	
	    Helpers.normalizePath = function(path) {
	      var part, parts, prev, result, _i, _len;
	      parts = path.split('/');
	      result = [];
	      prev = null;
	      for (_i = 0, _len = parts.length; _i < _len; _i++) {
	        part = parts[_i];
	        if (part === '.' || part === '') {
	          continue;
	        } else if (part === '..' && prev) {
	          result.pop();
	        } else {
	          result.push(part);
	        }
	        prev = part;
	      }
	      return '/' + result.join('/');
	    };
	
	    Helpers.arrayIndexOf = function(array, search) {
	      var element, i, _i, _len;
	      if (typeof Array.prototype.indexOf !== 'undefined') {
	        return array.indexOf(search);
	      }
	      if (array.length === 0) {
	        return -1;
	      }
	      for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
	        element = array[i];
	        if (element === search) {
	          return i;
	        }
	      }
	      return -1;
	    };
	
	    Helpers.clone = function(obj) {
	      var key, result, value, _i, _len, _ref, _ref1, _type;
	      _type = Object.prototype.toString;
	      switch (_type.call(obj)) {
	        case '[object Array]':
	          result = [];
	          for (key = _i = 0, _len = obj.length; _i < _len; key = ++_i) {
	            value = obj[key];
	            if (value !== null && ((_ref = _type.call(value)) === '[object Array]' || _ref === '[object Object]')) {
	              result[key] = Helpers.clone(value);
	            } else {
	              result[key] = value;
	            }
	          }
	          break;
	        case '[object Object]':
	          result = {};
	          for (key in obj) {
	            value = obj[key];
	            if (value !== null && ((_ref1 = _type.call(value)) === '[object Array]' || _ref1 === '[object Object]')) {
	              result[key] = Helpers.clone(value);
	            } else {
	              result[key] = value;
	            }
	          }
	          break;
	        default:
	          return obj;
	      }
	      return result;
	    };
	
	    return Helpers;
	
	  })();
	
	  module.exports = Helpers;
	
	}).call(this);
	

}, '/lib/EasyConfiguration.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/lib/EasyConfiguration.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/lib/EasyConfiguration.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/lib/EasyConfiguration.js';
	var __dirname = '/lib';
	var process = {cwd: function() {return '/';}, argv: ['node', '/lib/EasyConfiguration.js'], env: {}};

	/** code **/
	// Generated by CoffeeScript 1.6.3
	(function() {
	  var EasyConfiguration, Extension, Helpers, merge;
	
	  merge = require('recursive-merge');
	
	  Extension = require('./Extension');
	
	  Helpers = require('./Helpers');
	
	  EasyConfiguration = (function() {
	    EasyConfiguration.PARAMETER_REGEXP = /%([a-zA-Z.-_]+)%/g;
	
	    EasyConfiguration.prototype.fileName = null;
	
	    EasyConfiguration.prototype.reserved = ['includes', 'parameters'];
	
	    EasyConfiguration.prototype.extensions = null;
	
	    EasyConfiguration.prototype.files = null;
	
	    EasyConfiguration.prototype._parameters = null;
	
	    EasyConfiguration.prototype.parameters = null;
	
	    EasyConfiguration.prototype.data = null;
	
	    function EasyConfiguration(fileName) {
	      this.fileName = fileName;
	      this.extensions = {};
	      this.files = [];
	      this._parameters = {};
	      this.parameters = {};
	    }
	
	    EasyConfiguration.prototype.addSection = function(name) {
	      return this.addExtension(name, new Extension);
	    };
	
	    EasyConfiguration.prototype.addExtension = function(name, extension) {
	      if (Helpers.arrayIndexOf(this.reserved, name) !== -1) {
	        throw new Error('Extension\'s name ' + name + ' is reserved.');
	      }
	      extension.configurator = this;
	      this.extensions[name] = extension;
	      return this.extensions[name];
	    };
	
	    EasyConfiguration.prototype.removeExtension = function(name) {
	      if (typeof this.extensions[name] === 'undefined') {
	        throw new Error('Extension with name ' + name + ' was not found.');
	      }
	      delete this.extensions[name];
	      this.invalidate();
	      return this;
	    };
	
	    EasyConfiguration.prototype.invalidate = function() {
	      this.data = null;
	      return this;
	    };
	
	    EasyConfiguration.prototype.load = function() {
	      var config, data;
	      if (this.data === null) {
	        config = this.loadConfig(this.fileName);
	        data = this.parse(config);
	        this.files = data.files;
	        this.parameters = data.parameters;
	        this.data = data.sections;
	      }
	      return this.data;
	    };
	
	    EasyConfiguration.prototype.loadConfig = function(file) {
	      var data, include, path, _i, _len, _ref;
	      data = require(file);
	      data = Helpers.clone(data, false);
	      if (typeof data.includes !== 'undefined') {
	        _ref = data.includes;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          include = _ref[_i];
	          path = Helpers.normalizePath(Helpers.dirName(file) + '/' + include);
	          data = this.merge(data, this.loadConfig(path));
	        }
	      }
	      return data;
	    };
	
	    EasyConfiguration.prototype.parse = function(data) {
	      var name, result, section, sections, _ref;
	      result = {
	        files: [],
	        parameters: {},
	        sections: {}
	      };
	      if (typeof data.includes !== 'undefined') {
	        result.files = data.includes;
	      }
	      if (typeof data.parameters !== 'undefined') {
	        this._parameters = data.parameters;
	        result.parameters = this.expandParameters(data.parameters);
	      }
	      _ref = this.extensions;
	      for (name in _ref) {
	        section = _ref[name];
	        if (typeof data[name] === 'undefined') {
	          data[name] = {};
	        }
	      }
	      sections = data;
	      if (typeof sections.parameters !== 'undefined') {
	        delete sections.parameters;
	      }
	      if (typeof sections.includes !== 'undefined') {
	        delete sections.includes;
	      }
	      for (name in sections) {
	        section = sections[name];
	        if (sections.hasOwnProperty(name) && (name !== '__proto__')) {
	          if (typeof this.extensions[name] === 'undefined') {
	            throw new Error('Found section ' + name + ' but there is no coresponding extension.');
	          }
	          this.extensions[name].data = section;
	          section = this.extensions[name].loadConfiguration();
	          section = this.expandParameters(section);
	          section = this.extensions[name].afterCompile(section);
	          result.sections[name] = section;
	        }
	      }
	      return result;
	    };
	
	    EasyConfiguration.prototype.expandParameters = function(parameters) {
	      var name, param, parse, type, _i, _len, _type,
	        _this = this;
	      _type = Object.prototype.toString;
	      parse = function(name, param) {
	        switch (_type.call(param)) {
	          case '[object String]':
	            return parameters[name] = param.replace(EasyConfiguration.PARAMETER_REGEXP, function(match, variable) {
	              return _this._getParameter(variable, [name]);
	            });
	          case '[object Object]':
	          case '[object Array]':
	            return parameters[name] = _this.expandParameters(param);
	          default:
	            return parameters[name] = param;
	        }
	      };
	      type = _type.call(parameters);
	      switch (type) {
	        case '[object Object]':
	          for (name in parameters) {
	            param = parameters[name];
	            parse(name, param);
	          }
	          break;
	        case '[object Array]':
	          for (name = _i = 0, _len = parameters.length; _i < _len; name = ++_i) {
	            param = parameters[name];
	            parse(name, param);
	          }
	          break;
	        default:
	          throw new Error("Can not parse " + type + " parameters.");
	      }
	      return parameters;
	    };
	
	    EasyConfiguration.prototype._getParameter = function(parameter, previous) {
	      var actual, part, parts, s, _i, _len,
	        _this = this;
	      if (previous == null) {
	        previous = [];
	      }
	      parts = parameter.split('.');
	      actual = this._parameters;
	      for (_i = 0, _len = parts.length; _i < _len; _i++) {
	        part = parts[_i];
	        if (typeof actual[part] === 'undefined') {
	          throw new Error("Parameter " + parameter + " is not defined.");
	        }
	        actual = actual[part];
	      }
	      if (Helpers.arrayIndexOf(previous, parameter) !== -1) {
	        s = previous.length === 1 ? '' : 's';
	        previous = previous.join(', ');
	        throw new Error("Found circular reference in parameter" + s + " " + previous + ".");
	      }
	      previous.push(parameter);
	      actual = actual.replace(EasyConfiguration.PARAMETER_REGEXP, function(match, param) {
	        return _this._getParameter(param, previous);
	      });
	      return actual;
	    };
	
	    EasyConfiguration.prototype.getParameter = function(parameter) {
	      return this._getParameter(parameter);
	    };
	
	    EasyConfiguration.prototype.merge = function(left, right) {
	      right = Helpers.clone(right, false);
	      return merge(left, right);
	    };
	
	    return EasyConfiguration;
	
	  })();
	
	  module.exports = EasyConfiguration;
	
	}).call(this);
	

}, '/test/browser/tests/EasyConfiguration.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/browser/tests/EasyConfiguration.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/browser/tests/EasyConfiguration.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/browser/tests/EasyConfiguration.coffee';
	var __dirname = '/test/browser/tests';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/browser/tests/EasyConfiguration.coffee'], env: {}};

	/** code **/
	(function() {
	  var EasyConfiguration, Extension, configuration, dir;
	
	  EasyConfiguration = require('/lib/EasyConfiguration');
	
	  Extension = require('/lib/Extension');
	
	  dir = '/test/data';
	
	  configuration = null;
	
	  describe('EasyConfiguration', function() {
	    beforeEach(function() {
	      return configuration = new EasyConfiguration("" + dir + "/config.json");
	    });
	    describe('#load()', function() {
	      it('should return loaded configuration without parameters', function() {
	        return expect(configuration.load()).to.be.eql({});
	      });
	      return it('should throw an error with information about circular reference', function() {
	        configuration = new EasyConfiguration("" + dir + "/circular.json");
	        return expect(function() {
	          return configuration.load();
	        }).to["throw"](Error, 'Found circular reference in parameters first, second, third, other.inner.fourth.');
	      });
	    });
	    describe('#addSection()', function() {
	      it('should return instance of newly registered section', function() {
	        return expect(configuration.addSection('newSection')).to.be.an["instanceof"](Extension);
	      });
	      return it('should throw exception if section with reserved name is trying to register', function() {
	        return expect(function() {
	          configuration.addSection('includes');
	          return configuration.addSection('parameters');
	        }).to["throw"](Error);
	      });
	    });
	    describe('#getParameter()', function() {
	      beforeEach(function() {
	        return configuration.load();
	      });
	      it('should throw an error for unknown parameter', function() {
	        return expect(function() {
	          return configuration.getParameter('unknown');
	        }).to["throw"](Error, 'Parameter unknown is not defined.');
	      });
	      it('should return parameter', function() {
	        return expect(configuration.getParameter('base')).to.be.equal('./www');
	      });
	      it('should return parameter from not first depth', function() {
	        return expect(configuration.getParameter('paths.cdn')).to.be.equal('./cdn/data');
	      });
	      it('should return parameter pointing to other parameter', function() {
	        expect(configuration.getParameter('paths.lang')).to.be.equal('./www/lang');
	        return expect(configuration.getParameter('paths.translator')).to.be.equal('./www/lang/translator.js');
	      });
	      return it('should return parameter pointing to other parameter from included file', function() {
	        return expect(configuration.getParameter('paths.videos')).to.be.equal('./www/videos');
	      });
	    });
	    return describe('sections', function() {
	      it('should throw an error for unknown section', function() {
	        configuration = new EasyConfiguration("" + dir + "/unknownSection");
	        return expect(function() {
	          return configuration.load();
	        }).to["throw"](Error, 'Found section unknown but there is no coresponding extension.');
	      });
	      it('should load data of section', function() {
	        configuration = new EasyConfiguration("" + dir + "/advanced");
	        configuration.addSection('application');
	        return expect(configuration.load()).to.be.eql({
	          application: {
	            path: './www',
	            data: ['./cdn/data', './www/lang', './www/lang/translator.js', './www/images', './www/videos']
	          }
	        });
	      });
	      return it('should load data from section with defaults', function() {
	        var section;
	        configuration = new EasyConfiguration("" + dir + "/advanced");
	        section = configuration.addSection('application');
	        section.loadConfiguration = function() {
	          var config, i, _i, _len, _path, _ref;
	          config = this.getConfig({
	            data: [],
	            run: true,
	            favicon: null,
	            cache: '%base%/temp/cache'
	          });
	          _ref = config.data;
	          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	            _path = _ref[i];
	            config.data[i] = {
	              path: _path
	            };
	          }
	          return config;
	        };
	        return expect(configuration.load()).to.be.eql({
	          application: {
	            path: './www',
	            data: [
	              {
	                path: './cdn/data'
	              }, {
	                path: './www/lang'
	              }, {
	                path: './www/lang/translator.js'
	              }, {
	                path: './www/images'
	              }, {
	                path: './www/videos'
	              }
	            ],
	            run: true,
	            favicon: null,
	            cache: './www/temp/cache'
	          }
	        });
	      });
	    });
	  });
	
	}).call(this);
	

}, '/test/browser/tests/Helpers.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/browser/tests/Helpers.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/browser/tests/Helpers.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/browser/tests/Helpers.coffee';
	var __dirname = '/test/browser/tests';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/browser/tests/Helpers.coffee'], env: {}};

	/** code **/
	(function() {
	  var Helpers, dir;
	
	  Helpers = require('/lib/Helpers');
	
	  dir = '/test/data';
	
	  describe('Helpers', function() {
	    describe('#dirName()', function() {
	      return it('should return name of file\'s directory', function() {
	        return expect(Helpers.dirName('/var/www/data/something.js')).to.be.equal('/var/www/data');
	      });
	    });
	    describe('#normalizePath()', function() {
	      return it('should return normalized and resolved path', function() {
	        return expect(Helpers.normalizePath('/var/www/../www/data/././../../www/data/something.js')).to.be.equal('/var/www/data/something.js');
	      });
	    });
	    describe('#arrayIndexOf()', function() {
	      it('should return index of needed item', function() {
	        return expect(Helpers.arrayIndexOf(['one', 'two', 'three', 'four', 'five'], 'four')).to.be.equal(3);
	      });
	      return it('should return minus one for not found item', function() {
	        return expect(Helpers.arrayIndexOf(['one'], 'two')).to.be.equal(-1);
	      });
	    });
	    return describe('#clone()', function() {
	      it('should clone array', function() {
	        var cloned, original;
	        original = ['one', 'two', 'three', 'four', 'five'];
	        cloned = Helpers.clone(original);
	        return expect(cloned).to.be.eql(['one', 'two', 'three', 'four', 'five']).and.not.equal(original);
	      });
	      it('should clone object', function() {
	        var cloned, original;
	        original = {
	          one: 'one',
	          two: 'two',
	          three: 'three',
	          four: 'four',
	          five: 'five'
	        };
	        cloned = Helpers.clone(original);
	        expect(cloned).to.be.eql({
	          one: 'one',
	          two: 'two',
	          three: 'three',
	          four: 'four',
	          five: 'five'
	        }).and.not.equal(original);
	        original.three = 'test';
	        return expect(cloned.three).to.be.equal('three');
	      });
	      return it('should clone advanced object', function() {
	        var cloned, original;
	        original = require("" + dir + "/advanced.json");
	        cloned = Helpers.clone(original);
	        expect(cloned).to.be.eql({
	          includes: ['./config.json'],
	          application: {
	            path: '%base%',
	            data: ['%paths.cdn%', '%paths.lang%', '%paths.translator%', '%paths.images%', '%paths.videos%']
	          }
	        }).and.not.equal(original);
	        original.application.path = '/app';
	        return expect(cloned.application.path).to.be.equal('%base%');
	      });
	    });
	  });
	
	}).call(this);
	

}, '/test/data/advanced.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/data/advanced.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/data/advanced.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/data/advanced.json';
	var __dirname = '/test/data';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/data/advanced.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"includes": [
			"./config.json"
		],
		"application": {
			"path": "%base%",
			"data": [
				"%paths.cdn%",
				"%paths.lang%",
				"%paths.translator%",
				"%paths.images%",
				"%paths.videos%"
			]
		}
	}
	}).call(this);
	

}, '/test/data/circular.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/data/circular.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/data/circular.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/data/circular.json';
	var __dirname = '/test/data';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/data/circular.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"parameters": {
			"first": "%second%",
			"second": "%third%",
			"third": "%other.inner.fourth%",
			"other": {
				"inner": {
					"fourth": "%first%"
				}
			}
		}
	}
	}).call(this);
	

}, '/test/data/config.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/data/config.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/data/config.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/data/config.json';
	var __dirname = '/test/data';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/data/config.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"includes": [
			"./other.json"
		],
		"parameters": {
			"base": "./www",
			"paths": {
				"cdn": "./cdn/data",
				"lang": "%base%/lang",
				"translator": "%paths.lang%/translator.js",
				"images": "%base%/images"
			},
			"cached": [
				"%paths.translator%"
			]
		}
	}
	}).call(this);
	

}, '/test/data/other.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/data/other.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/data/other.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/data/other.json';
	var __dirname = '/test/data';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/data/other.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"parameters": {
			"paths": {
				"videos": "%base%/videos"
			}
		}
	}
	}).call(this);
	

}, '/test/data/unknownSection.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/data/unknownSection.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/data/unknownSection.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/data/unknownSection.json';
	var __dirname = '/test/data';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/data/unknownSection.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"unknown": {
	
		}
	}
	}).call(this);
	

}, '/package.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/package.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/package.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/package.json';
	var __dirname = '/';
	var process = {cwd: function() {return '/';}, argv: ['node', '/package.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"name": "easy-configuration",
		"description": "Simply extensible loader for json config files",
		"version": "1.6.4",
		"author": {
			"name": "David Kudera",
			"email": "sakren@gmail.com"
		},
		"keywords": [
			"config",
			"configurator",
			"configuration",
			"setup",
			"settings",
			"json"
		],
		"repository": {
			"type": "git",
			"url": "git@github.com:sakren/node-easy-configuration.git"
		},
		"license": "MIT",
		"engines": {
			"node": "*"
		},
		"main": "./lib/EasyConfiguration.js",
		"dependencies": {
			"recursive-merge": "~1.1.2"
		},
		"devDependencies": {
			"chai": "~1.8.0",
			"mocha": "~1.14.0"
		},
		"scripts": {
			"test": "cd ./test; echo \"Testing in node:\"; mocha ./node/index.js --reporter spec; cd ./browser; echo \"Testing in browser:\"; simq build; mocha-phantomjs ./index.html;"
		}
	}
	}).call(this);
	

}, 'recursive-merge/package.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'recursive-merge/package.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'recursive-merge/package.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'recursive-merge/package.json';
	var __dirname = 'recursive-merge';
	var process = {cwd: function() {return '/';}, argv: ['node', 'recursive-merge/package.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
	  "name": "recursive-merge",
	  "description": "Recursive merge tool for arrays and objects",
	  "version": "1.0.0",
	  "author": {
	    "name": "David Kudera",
	    "email": "sakren@gmail.com"
	  },
	  "keywords": [
	    "merge",
	    "recursive",
	    "browser",
	    "array",
	    "object"
	  ],
	  "license": "MIT",
	  "repository": {
	    "type": "git",
	    "url": "git@github.com:sakren/node-recursive-merge.git"
	  },
	  "engines": {
	    "node": "*"
	  },
	  "main": "./lib/Merge.js",
	  "devDependencies": {
	    "should": "1.2.2"
	  },
	  "scripts": {
	    "test": "cd ./test; mocha ./index.js;"
	  },
	  "readme": "# Recursive merge\n\nRecursive merge tool for arrays and objects\n\n## Changelog\n\nChangelog is in the bottom of this readme.\n\n## Usage\n\nWith this tool, you can recursivelly merge arrays or objects.\n\n```\nvar merge = require('merge');\n\nvar result = merge(\n\t[1, 1, 2, 3],\n\t[3, 4, 4, 5],\n\t[10, 9, 8, 1]\n);\t\t\t\t// result: [1, 1, 2, 3, 3, 4, 4, 5, 10, 9, 8, 1]\n```\n\nAs you can see, this library just merging objects and not removing duplicates.\n\nYou should also know, that this affects first object passed to merge function. Overy other objects (arrays, objects) are\nadded to the first one. There is not any fast simple and universal solution for cloning objects (arrays yes).\n\nIn the same way, you can merge also objects.\n\nIf you will try to merge two different types of objects, exception will be thrown. Also if you will try to merge other\nobjects than arrays or objects, exception will be also thrown.\n\n## Changelog\n\n* 1.0.0\n\t+ Initial first version",
	  "readmeFilename": "README.md",
	  "bugs": {
	    "url": "https://github.com/sakren/node-recursive-merge/issues"
	  },
	  "homepage": "https://github.com/sakren/node-recursive-merge",
	  "_id": "recursive-merge@1.0.0",
	  "_from": "recursive-merge@~1.0.0"
	}
	
	}).call(this);
	

}, 'recursive-merge': function(exports, module) { module.exports = window.require('recursive-merge/lib/Merge.js'); }

});
require.__setStats({"recursive-merge/lib/Merge.js":{"atime":1385385635000,"mtime":1375346181000,"ctime":1385285362000},"/lib/Extension.js":{"atime":1385388163000,"mtime":1385388139000,"ctime":1385388139000},"/lib/Helpers.js":{"atime":1385388163000,"mtime":1385388139000,"ctime":1385388139000},"/lib/EasyConfiguration.js":{"atime":1385388163000,"mtime":1385388139000,"ctime":1385388139000},"/test/browser/tests/EasyConfiguration.coffee":{"atime":1385385683000,"mtime":1385385677000,"ctime":1385385677000},"/test/browser/tests/Helpers.coffee":{"atime":1385301964000,"mtime":1385301962000,"ctime":1385301962000},"/test/data/advanced.json":{"atime":1385385635000,"mtime":1385285347000,"ctime":1385285347000},"/test/data/circular.json":{"atime":1385308755000,"mtime":1385308754000,"ctime":1385308754000},"/test/data/config.json":{"atime":1385385635000,"mtime":1385285347000,"ctime":1385285347000},"/test/data/other.json":{"atime":1385385635000,"mtime":1385285347000,"ctime":1385285347000},"/test/data/unknownSection.json":{"atime":1385385635000,"mtime":1385285347000,"ctime":1385285347000},"/package.json":{"atime":1385388171000,"mtime":1385388166000,"ctime":1385388166000},"recursive-merge/package.json":{"atime":1385385635000,"mtime":1385285362000,"ctime":1385285362000}});
require.version = '5.1.2';

/** run section **/

/** /test/browser/tests/EasyConfiguration.coffee **/
require('/test/browser/tests/EasyConfiguration.coffee');

/** /test/browser/tests/Helpers.coffee **/
require('/test/browser/tests/Helpers.coffee');