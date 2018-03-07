# Jquery plugin - Form generator

## Configuration example

```
$(document).ready(function() {

  /**
    * @var object otps - plugin configuration.
    */
  var otps = {
    'form': {
      'method': 'get',
      'action': ''
    },
    'config': [
      {
        'type': 'input',
        'config': {
          'class': 'myClass',
          'type': 'text',
          'name': 'username',
          'value': '',
          'placeHolder': 'enter your username',
          'pattern': /(.*){3,10}/,
          'title': 'error username',
          'required': true
        }
      },
      {
        'type': 'select',
        'config': {
          'class': 'myClass',
          'name': 'age',
        },
        'options': [
          {'value': '1', 'text': '1'},
          {'value': '2', 'text': '2'},
          {'value': '2', 'text': '3'}
        ]
      },
      {
        'type': 'input',
        'config': {
          'class': 'myClass',
          'type': 'submit',
          'name': 'submit',
          'value': 'Valider',
        }
      }
    ]
  };

  /**
    * @var object myForm - Initialise the plugin.
    */
  var myForm = $('.myForm').FormGenerator(otps);

});
```
