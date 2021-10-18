/**
 * jspsych-survey-slider
 * a jspsych plugin for measuring items on a slider scale
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['survey-slider'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-slider',
    description: '',
    parameters: {
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'Questions that are associated with the slider.'
          },
          required: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Required',
            default: false,
            description: 'Makes answering the question required.'
          },
          name: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Question Name',
            default: '',
            description: 'Controls the name of data values associated with this question'
          },
          min: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Min slider',
            default: 0,
            description: 'Sets the minimum value of the slider.'
          },
          max: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Max slider',
            default: 100,
            description: 'Sets the maximum value of the slider',
          },
          slider_start: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Slider starting value',
            default: 50,
            description: 'Sets the starting value of the slider',
          },
          step: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Step',
            default: 1,
            description: 'Sets the step of the slider'
          },
          labels: {
            type: jsPsych.plugins.parameterType.HTML_STRING,
            pretty_name:'Labels',
            default: [],
            array: true,
            description: 'Labels of the slider.',
          },
        }
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'String to display at top of the page.'
      },
      scale_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Scale width',
        default: null,
        description: 'Width of the slider scales in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    if(trial.scale_width !== null){
      var w = trial.scale_width + 'px';
    } else {
      var w = '100%';
    }

    var html = "";
    // inject CSS for trial
    html += '<style id="jspsych-survey-slider-css">';
    html += ".jspsych-survey-slider-statement { display:block; font-size: 16px; padding-top: 40px; margin-bottom:10px; }"+
        ".jspsych-survey-slider-opts { list-style:none; width:"+w+"; margin:auto; padding:0 0 35px; display:block; font-size: 14px; line-height:1.1em; }"+
        ".jspsych-survey-slider-opt-label { line-height: 1.1em; color: #444; }"+
        ".jspsych-survey-slider-opts:before { content: ''; position:relative; top:11px; /*left:9.5%;*/ display:block; background-color:#efefef; height:4px; width:100%; }"+
        ".jspsych-survey-slider-opts:last-of-type { border-bottom: 0; }"+
        ".jspsych-survey-slider-opts li { display:inline-block; /*width:19%;*/ text-align:center; vertical-align: top; }"+
        ".jspsych-survey-slider-opts li input[type=radio] { display:block; position:relative; top:0; left:50%; margin-left:-6px; }"
    html += '</style>';

    // show preamble text
    if(trial.preamble !== null){
      html += '<div id="jspsych-survey-slider-preamble" class="jspsych-survey-slider-preamble">'+trial.preamble+'</div><br>';
    }
    html += '<form id="jspsych-survey-slider-form">';

    // add slider scale questions ///
    // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
    // so that the data are always associated with the same question regardless of order
    var question_order = [];
    for(var i=0; i<trial.questions.length; i++){
      question_order.push(i);
    }
    if(trial.randomize_question_order){
      question_order = jsPsych.randomization.shuffle(question_order);
    }
    for (var i = 0; i < trial.questions.length; i++) {
      var question = trial.questions[question_order[i]];

      // add question
      html += '<div id="jspsych-survey-slider-response-stimulus">' + question.prompt + '</div>';


      // set width
      if(trial.slider_width !== null){
        widthx = 'width:'+trial.slider_width+'px; ';
      } else {
        widthx = 'width:auto; ';
      }

      // set data-name and data-prompt
      dataname = 'name="' + question.name + '"; '

      // add slider
      html += '<input type="range" style="position:relative; margin: 0 auto 0em auto; ' + widthx + '"' +
          dataname +
          ' min="' + question.min + '" max="' + question.max + '" step="' + question.step + '" ' +
          'class="jspsych-survey-slider-response" id="jspsych-survey-slider-response-response"/>';
      html += '<div>'

      for(var j=0; j < question.labels.length; j++){

        var width = 100/(question.labels.length-1);
        var left_offset = (j * (100 /(question.labels.length - 1))) - (width/2);
        html += '<div style="display: inline-block; position: relative; left:'+left_offset+'%; text-align: center; float: left; top: -32px; width: '+ width/2 +'%;">';
        html += '<span style="text-align: center; font-size: 80%;">'+question.labels[j]+'</span>';
        html += '</div>'
      }

      html += '</div>';
      html += '</div><br>';

    }

    // add submit button
    html += '<button id="jspsych-survey-slider-next" class="jspsych-survey-slider jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';


    html += '</form>'

    display_element.innerHTML = html;

    if(trial.require_movement){
      display_element.querySelector('#jspsych-survey-slider-form .jspsych-survey-slider-response').addEventListener('click', function(){
        display_element.querySelector('#jspsych-survey-slider-next').disabled = false;
      });
    }


    display_element.querySelector('#jspsych-survey-slider-form').addEventListener('submit', function(e){
      e.preventDefault();
      // measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      var matches = display_element.querySelectorAll('#jspsych-survey-slider-form .jspsych-survey-slider-response');

      for(var index = 0; index < matches.length; index++){
        var el = matches[index].valueAsNumber;
        var response = el;

        var obje = {};
        var name = matches[index].name;

        obje[name] = response;
        Object.assign(question_data, obje);
      }

      // save data
      var trial_data = {
        "rt": response_time,
        "responses": JSON.stringify(question_data),
        "question_order": JSON.stringify(question_order)
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trial_data);
    });

    var startTime = performance.now();
  };

  return plugin;
})();
