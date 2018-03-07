'use strict';

(function ($) {

  /**
    * Jquery Plugin FormGenerator
    *
    * Build and render a Form dom element with the given configuration.
    *
    * @param options - The Form configuration.
    */
  $.fn.FormGenerator = function (options) {

    /**
      * @var object el - Dom element.
      */
    var el = $(this) || [];
    /**
      * @var object configForm - Form configuration object.
      */
    var configForm = options.form;
    /**
      * @var object config - Form configuration object elements.
      */
    var config = options.config;
    /**
      * @var array types - Available form types.
      */
    var types = ['input', 'select'];
    /**
      * @var object priv - Private function object.
      */
    var priv = {};
    /**
      * @var object exception - Private exception function object.
      */
    var exception = {}; 
    /**
      * @var object form - Form Dom object.
      */
    var form = null;

    /**
      * Public function available.
      */
    Object.assign(this, {
    });

    /**
      * Private exception function available.
      */
    Object.assign(exception, {
      /**
        * Return an object with the throw exception.
        *
        * @param type - The given type.
        * @param message - The error message.
        * @return object - An error object.
        */
      'typeException': function(type, message) {
        return {
          'param': type,
          'message': message
        };
      }
    });

    /**
      * Private function available.
      */
    Object.assign(priv, {
      /**
        * Test if the configuration is valid.
        *
        * @param array criterias - The criteries for the test.
        * @param array values - The values for the test.
        * @throww {Exception.typeException} - Throw an exception if the tests fails.
        */
      'testConfig': function(criterias, values) {
        for(var criteria in criterias) {
          if(typeof values[criterias[criteria]] === 'undefined') {
            var strConf = criterias.join(', ');
            throw exception.typeException(null, 'Wrong Config. Minimal config is : ' + strConf);
          }
        }
      },
      /**
        * Form function.
        */
      'create': {
        /**
          * Create a dom Input element.
          *
          * @param object params - The input configuration.
          * @throww {Exception.typeException} - Throw an exception if the tests fails.
          * @return object - The dom Input element.
          */
        'input': function(params) {
          var miniConfig = ['type', 'name'];
          priv.testConfig(miniConfig, params.config);
          return $('<input />', params.config);
        },
        /**
          * Create a dom Select element.
          *
          * @param object params - The select configuration.
          * @throww {Exception.typeException} - Throw an exception if the tests fails.
          * @return object - The dom Select element.
          */
        'select': function(params) {
          var miniConfig = ['name'];
          priv.testConfig(miniConfig, params.config);
          var selectObj = $('<select />', params.config);
          for(var option in params.options) {
            selectObj.append(priv.create.option(params.options[option]));
          }
          return selectObj;
        },
        /**
          * Create a dom Option element.
          *
          * @param object params - The option configuration.
          * @throww {Exception.typeException} - Throw an exception if the tests fails.
          * @return object - The dom Option element.
          */
        'option': function(params) {
          var miniConfig = ['value', 'text'];
          priv.testConfig(miniConfig, params);
          return $('<option />', params);
        },
        /**
          * Create a dom Form element.
          *
          * @param object params - The input configuration.
          * @throww {Exception.typeException} - Throw an exception if the tests fails.
          * @return object - The dom Form element.
          */
        'form': function(params) {
          var availableMethod = ['GET', 'POST'];
          priv.typeExist(availableMethod, params.method);
          return $('<form />', params);
        }
      },
      /**
        * Test if the configuration is valid.
        *
        * @param array data - The criteries for the test.
        * @param string target - The value for the test.
        * @throww {Exception.typeException} - Throw an exception if the tests fails.
        */
      'typeExist': function(data, target) {
        if (data.indexOf(target) == -1) {
          var strTypes = data.join(', ');
          throw exception.typeException(target, 'Wrong Parameter "type". Available types are : ' + strTypes);
        }
        return true;
      },
      /**
        * Initialize and build the Form in the DOM.
        *
        * @throww {Exception.typeException} - Throw an exception if the tests fails.
        */
      'init': function() {
        try {
          if (config.length === 0) { 
            return null; 
          }

          form = priv.create.form(configForm);

          for (var conf in config) {

            if (typeof config[conf].type == 'undefined') {
              throw exception.typeException(null, 'Parameter "type" is missing');
            }

            priv.typeExist(types, config[conf].type);
            form.append(priv.create[config[conf].type](config[conf]));
          }

          el.append(form);

        } catch(e) {
          console.table(e);
        }
      }
    });

    /**
      * Call priv.init function.
      */
    priv.init();

    /**
      * Return this object.
      */
    return this;
  };
}(jQuery));
