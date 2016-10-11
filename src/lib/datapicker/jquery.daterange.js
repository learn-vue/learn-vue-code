;
(function($) {

	// 在弹出层下拉框的输入框无法聚焦
	if ($.fn.modal)
		$.fn.modal.Constructor.prototype.enforceFocus = function() {
		};

	if (!$.fn.DropDown) {

		function defaultTriggerEventRegister($trigger) {

			var self = this, event = this._opts_.event;

			if (event == 'hover') {

				$trigger.on("mouseover." + this.widgetName, function(e) {

					self.show();
				}).on("mouseout." + this.widgetName, function(e) {

					var $dom = self.$dom;

					if ($dom[0] == e.relatedTarget)
						return;

					if ($dom.find(e.relatedTarget).length)
						return;

					self.hide();
				});

				this.$dom.on("mouseleave." + this.widgetName, function(e) {

					var $trigger = self.$trigger || self.$target;

					if ($trigger[0] == e.relatedTarget)
						return;

					if ($trigger.find(e.relatedTarget).length)
						return;

					self.hide();
				});
			} else if (event == 'focus') {

				$trigger.on("focusin." + this.widgetName, function(e) {

					self.show();
				}).on("focusout." + this.widgetName, function(e) {

					self.hide();
				});
			} else {

				$trigger.on("click." + this.widgetName, function(e) {

					self._show_ ? self.hide() : self.show();
				});
			}
		}

		function DropDown($target, opts) {

			this._opts_ = opts;

			this.$target = $target;

			this.$target.data(this.widgetName, this);

			this.$dom = $(
					'<div class="dd-panel dropdown-menu"><div class="dd-container"><div class="dd-body"></div></div></div>')
					.appendTo($(document.body));

			opts.cls && this.$dom.addClass(opts.cls);

			delete opts.cls;

			this.$body = this.$dom.find("> .dd-container > .dd-body");

			this.init();

			// 下拉宽度
			if (opts.dropWidth == "equal") {

				var $trigger = this.$trigger || this.$target;

				if (!$trigger.is(":visible"))
					this.one("show", function(e, f) {

						f.$dom.width($trigger.width());
					});
				else
					this.$dom.width($trigger.width());

			} else if (opts.dropWidth)
				this.$dom.width(opts.dropWidth);

			delete opts.dropWidth;

			return this;
		}

		DropDown.prototype = {

			widgetName : "DropDown",

			init : function(opts) {

				this.timestamp = +new Date();

				this.renderTrigger();

				this.renderHead({}, {
					ignoreRepos : true
				});

				this.renderFoot({}, {
					ignoreRepos : true
				});

				this.renderBody({}, {
					ignoreRepos : true
				});

				// ///////////////////////注册触发元素事件，提供默认实现///////////////////////////////

				var eventRegister = this._opts_.triggerEventRegister
						|| defaultTriggerEventRegister;

				delete this._opts_.triggerEventRegister;

				eventRegister
						&& eventRegister.call(this, this.$trigger
								|| this.$target);

				delete this._opts_.event;

				// ////////////////////////注册头部事件//////////////////////////////

				eventRegister = this._opts_.headEventRegister;

				delete this._opts_.headEventRegister;

				eventRegister && eventRegister.call(this, this.$head);

				// ////////////////////////注册底部事件//////////////////////////////

				eventRegister = this._opts_.footEventRegister;

				delete this._opts_.footEventRegister;

				eventRegister && eventRegister.call(this, this.$foot);

				// /////////////////////////注册内容体事件/////////////////////////////

				eventRegister = this._opts_.bodyEventRegister;

				delete this._opts_.bodyEventRegister;

				eventRegister && eventRegister.call(this, this.$body);

				// //////////////////////////////////////////////////////

				var self = this, nameSpaceFix = this.widgetName
						+ this.timestamp;

				// /////////////////////////页面其它地方点击，隐藏之///////////////////////
				$(document).on(
						"click." + nameSpaceFix,
						function(e) {

							var shouldJustReturn = function($parent, target) {

								if (!$parent)
									return false;

								if ($parent[0] == target)
									return true;

								if ($parent.find(target).length)
									return true;

								return false;
							};

							if (shouldJustReturn(self.$dom, e.target))
								return;

							if (shouldJustReturn(self.$trigger || self.$target,
									e.target))
								return;

							self.hide();
						});

			},

			renderTrigger : function(opts) {

				opts = opts || {};

				if (typeof opts == 'function')
					opts = {
						triggerRenderer : opts
					};

				$.extend(this._opts_, opts);

				if (!this._opts_.triggerRenderer)
					return;

				this._opts_.triggerRenderer.call(this, this.$target);

				this.trigger("rendertrigger");
			},

			// 渲染头部
			renderHead : function(opts, _extra) {

				opts = opts || {};

				if (typeof opts == 'function')
					opts = {
						headRenderer : opts
					};

				$.extend(this._opts_, opts);

				if (!this._opts_.headRenderer)
					return;

				if (!this.$head)
					this.$head = $('<div class="dd-head clearfix"></div>')
							.insertBefore(this.$body);

				this._opts_.headRenderer.call(this, this.$head);

				this.trigger("renderhead");

				if (!_extra || !_extra.ignoreRepos)
					this.repos();
			},

			// 渲染底部
			renderFoot : function(opts, _extra) {

				opts = opts || {};

				if (typeof opts == 'function')
					opts = {
						footRenderer : opts
					};

				$.extend(this._opts_, opts);

				if (!this._opts_.footRenderer)
					return;

				if (!this.$foot)
					this.$foot = $('<div class="dd-foot clearfix"></div>')
							.insertAfter(this.$body);

				this._opts_.footRenderer.call(this, this.$foot);

				this.trigger("rendfoot");

				if (!_extra || !_extra.ignoreRepos)
					this.repos();
			},

			// 渲染内容体
			renderBody : function(opts, _extra) {

				opts = opts || {};

				if (typeof opts == 'function')
					opts = {
						bodyRenderer : opts
					};

				$.extend(this._opts_, opts);

				// 过滤空结果集提示信息
				this.$empty && this.$empty.hide();

				// 加载提示信息
				this.$loading && this.$loading.hide();

				this.$body.show();

				if (this._opts_.bodyRenderer)
					this._opts_.bodyRenderer.call(this, this.$body);

				this.trigger("renderbody");

				if (!_extra || !_extra.ignoreRepos)
					this.repos();
			},

			renderLoading : function(opts, _extra) {

				opts = opts || {};

				if (typeof opts == 'function')
					opts = {
						loadingRenderer : opts
					};

				$.extend(this._opts_, opts);

				// 内容体隐藏
				this.$body.hide();

				// 过滤结果集空提示信息隐藏
				this.$empty && this.$empty.hide();

				if (!this.$loading)
					this.$loading = $('<div class="dd-loading">努力加载中</div>')
							.insertBefore(this.$body);

				if (this._opts_.loadingRenderer)
					this._opts_.loadingRenderer.call(this, this.$loading);

				this.$loading.show();

				this.trigger("renderloading");

				if (!_extra || !_extra.ignoreRepos)
					this.repos();
			},

			renderEmpty : function(opts, _extra) {

				opts = opts || {};

				if (typeof opts == 'function')
					opts = {
						emptyRenderer : opts
					};

				$.extend(this._opts_, opts);

				// 内容体隐藏
				this.$body.hide();

				// 加载提示信息隐藏
				this.$loading && this.$loading.hide();

				if (!this.$empty)
					this.$empty = $('<div class="dd-empty">没有结果</div>')
							.insertBefore(this.$body);

				if (this._opts_.emptyRenderer)
					this._opts_.emptyRenderer.call(this, this.$empty);

				this.$empty.show();

				this.trigger("renderempty");

				if (!_extra || !_extra.ignoreRepos)
					this.repos();
			},

			hide : function() {

				if (this._show_ !== true)
					return;

				var event = this.trigger("beforehide");

				if (event.result === false)
					return;

				this._show_ = false;

				this.$dom.stop();

				this.$dom.hide();

				this.trigger("hide");
			},

			hideDelayed : function(timeout) {

				this._hide_delayed_timer_
						&& clearTimeout(this._hide_delayed_timer_);

				this._show_delayed_timer_
						&& clearTimeout(this._show_delayed_timer_);

				this._hide_delayed_timer_ = setTimeout(
						$.proxy(this.hide, this), timeout);
			},

			show : function() {

				if (this._show_ === true)
					return;

				var self = this;

				var event = this.trigger("beforeshow");

				if (event.result === false)
					return;

				this._show_ = true;

				this.$dom.stop();

				this.$dom.show();

				this.trigger("show");

				// 如果AJAX请求还未发送，那么先发送
				if (this._opts_.ajax)
					if (!this._ajax_started_)
						this.ajax();

				this.repos();
			},

			showDelayed : function(timeout) {

				this._hide_delayed_timer_
						&& clearTimeout(this._hide_delayed_timer_);

				this._show_delayed_timer_
						&& clearTimeout(this._show_delayed_timer_);

				this._show_delayed_timer_ = setTimeout(
						$.proxy(this.show, this), timeout);
			},

			ajax : function(opts, callback) {

				var self = this;

				this._ajax_started_ = true;

				// URL
				if (typeof opts == 'string')
					opts = {
						url : opts
					};

				if (arguments.length == 1) {

					// 认定为回调函数
					if (typeof opts == 'function') {

						callback = opts;

						opts = {};
					}
				} else
					opts = {
						success : opts
					};

				opts = opts || {};

				var event = this.trigger("beforeload", opts);

				if (event.result === false)
					return;

				$.extend(this._opts_.ajax, opts);

				var success = this._opts_.ajax.success;

				this._opts_.ajax.success = function(result) {

					self.trigger("afterload");

					success && success.call(self, result);

					self.renderBody({
						data : result.result,
						filter : ""
					});

					callback && callback.call(self, result);
				};

				this._opts_.ajax.error = function() {

					self.hide();
				};

				this.renderLoading();

				$.ajax(this._opts_.ajax).done(function() {

					self._opts_.ajax.success = success;
				});

			},

			repos : function() {

				var $trigger = this.$trigger || this.$target;

				var offset=$trigger.offset();
				
				var pos = {left:offset.left,top:offset.top + $trigger.outerHeight()};

				var func=this._opts_.pos || {top:0,left:0};
				
				if(typeof func =='function')
					pos = func.call(this,$trigger,pos);
				else{
					pos.left+=func.left;
					pos.top+=func.top;
				}
				
				this.$dom.css({
					"left" : pos.left + "px",
					"top" : pos.top + "px"
				});
			},

			setValue : function(value) {

				var oldValue = this.getValue();

				if (this._opts_.valueSetter) {

					if (this._opts_.valueSetter.call(this, value) === true)
						return;

				} else {

					var tagName = this.$target[0].tagName;

					if (tagName == 'DIV' || tagName == 'SPAN')
						this.$target.data("value");
					else
						this.$target.val(value);
				}

				var newValue = this.getValue();

				if (oldValue !== newValue) {

					// JSON格式数据要做比较的，特别是日期范围
					if (oldValue && newValue) {

						var change = false;

						for (key in newValue)
							if (newValue.hasOwnProperty(key))
								if (oldValue[key] !== newValue[key]) {

									change = true;

									break;
								}

						if (change === false)
							return;

					}

					this.trigger("change", newValue, oldValue);

				}

			},

			getValue : function() {

				if (this._opts_.valueGetter)
					return this._opts_.valueGetter.call(this, this.$target);

				var tagName = this.$target[0].tagName;

				if (tagName == 'DIV' || tagName == 'SPAN')
					return this.$target.data("value");

				return this.$target.val();
			},

			getRawValue : function() {

				var $trigger = this.$trigger || this.$target;

				if (this._opts_.rawValueGetter)
					return this._opts_.rawValueGetter.call(this, $trigger);

				var tagName = $trigger.tagName;

				if (tagName == 'DIV' || tagName == 'SPAN')
					return $trigger.text();

				return $trigger.val();
			},

			on : function(event, handler) {

				var events = event.split(",");

				for (var i = 0, l = events.length; i < l; i++)
					events[i] = events[i].toUpperCase() + "." + this.widgetName;

				this.$target.on(events.join(","), handler);

				return this;
			},

			one : function(event, handler) {

				var events = event.split(",");

				for (var i = 0, l = events.length; i < l; i++)
					events[i] = events[i].toUpperCase() + "." + this.widgetName;

				this.$target.one(events.join(","), handler);

				return this;
			},

			off : function(event, handler) {

				if (!event) {

					this.$target.off("." + this.widgetName);

					return this;
				}

				var events = event.split(",");

				for (var i = 0, l = events.length; i < l; i++)
					events[i] = events[i].toUpperCase() + "." + this.widgetName;

				this.$target.off(events.join(","), handler);

				return this;
			},

			trigger : function(event) {

				var params = [ this ];

				for (var i = 1, l = arguments.length; i < l; i++)
					params[i] = arguments[i];

				var type = event.toUpperCase();

				event = new jQuery.Event(type, type + "." + this.widgetName);

				this.$target.triggerHandler(event, params);

				return event;
			},

			destroy : function() {

			}
		};

		$.fn.DropDown = function(options) {

			options = options || {
				event : 'click'
			};

			var api = this.data('DropDown');

			return api ? api : new DropDown(this, options);
		};
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////////////////////////////////////////////////////////////

	// 已经定义了
	if ($.fn.DateRange)
		return;

	// 补0函数
	var rpad = function(value) {

		return value > 9 ? value : "0" + value;
	};

	var formatDate = function(date, format) {

		format = format || "/";

		return date.getFullYear() + format + rpad(date.getMonth() + 1) + format
				+ rpad(date.getDate());
	};

	// 判断日期是否在某范围内
	var isDateInRange = function(date, rangeMinDate, rangeMaxDate) {

		var dateTime = date.getTime();

		return dateTime >= rangeMinDate && dateTime <= rangeMaxDate ? true
				: false;
	};

	// 日期0时0分0秒
	var setFirstSecondOfDay = function(date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
	};

	// 日期23时59分59秒
	var setLastSecondOfDay = function(date) {
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		date.setMilliseconds(999);
	};

	// 获取周序号
	var getWeekNo = function(d1) {

		var d2 = new Date(d1.getFullYear(), 0, 1), d = Math
				.round((d1 - d2) / 86400000);

		return rpad(Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7));
	};

	// 验证日期合法性
	var isDateLegal = function(date, opts) {

		if (opts.minDate && opts.minDate.getTime() > date.getTime())
			return false;

		if (opts.maxDate && opts.maxDate.getTime() < date.getTime())
			return false;

		var dateStr = formatDate(date, "-");

		// 禁用特定正则表达式的天，格式必须YYYY-MM-DD
		if (opts.disableDates) {

			var disableDates = typeof opts.disableDates == "string" ? [ opts.disableDates ]
					: opts.disableDates;

			for (var i = 0, l = disableDates.length; i < l; i++)
				if (new RegExp(disableDates[i]).test(dateStr))
					return false;
		}

		// 禁用周几0-6
		if (opts.disableDays) {

			var disableDays = typeof opts.disableDays == "string" ? [ opts.disableDays ]
					: opts.disableDays;

			// 0-6
			var day = date.getDay();

			for (var i = 0, l = disableDays.length; i < l; i++)
				if (day == disableDays[i])
					return false;
		}

		return true;
	};

	var DateRangeConfig = {

		cls : "daterangepicker dropdown-menu",

		disableDays : [],

		disableDates : [],

		buttons : [ {
			text : " 今 天",
			delta : "0d"
		}, {
			text : " 昨 天",
			delta : "-1d",
			mode : "equal"
		}, "|", {
			text : " 近一周",
			delta : "-7d"
		}, {
			text : " 近两周",
			delta : "-14d"
		}, {
			text : "近一个月",
			delta : "-1m"
		} ],

		minDate : false,

		maxDate : false,

		showClear : true,

		showWeek : false,

		showOtherMonth : true,

		firstDayOfWeek : 0,

		startDateName : "startDate",

		endDateName : "endDate",

		triggerRenderer : function($target) {

			var html = '<span class="combo combo-container combo-container--default combo-container--below" dir="ltr">'
					+ '<span class="selection">'
					+ '<span aria-expanded="false" aria-haspopup="true" aria-autocomplete="list" role="combobox" class="combo-selection combo-selection--single" aria-labelledby="combo-dbsh-container">'
					+ '<span class="combo-selection__rendered">'
					+ '<span class="combo-selection__placeholder">'
					+ (this._opts_.placeholder || '')
					+ '</span>'
					+ (this._opts_.showClear ? '<span class="combo-selection__clear" style="display:none;">×</span>'
							: '')
					+ '<span class="combo-selection__text" style="display:none;"></span>'
					+ '</span>'
					+ '<span role="presentation" class="combo-selection__arrow"><b role="presentation"></b></span>'
					+ '</span>' + '</span>' + '</span>';

			this.$trigger = $(html).insertAfter(this.$target);

			// 触发器宽度
			var width = this._opts_.width;

			if (width == 'equal')
				this.$trigger.width(this.$target.width()
						|| this.$target.css("width"));
			else if (width)
				this.$trigger.width(width);

			delete this._opts_.width;

			this.$target.hide();
		},

		triggerEventRegister : function($trigger) {

			var self = this;

			$trigger.on("click." + this.widgetName, function(e) {

				if ($(e.target).hasClass("combo-selection__clear")) {

					// 注意，先设值再触发select事件,否则事件回调函数内部无法调用getValue方法获取值
					self.setValue("");

					self.trigger("select", null);

					self.hide();

					return;
				}

				self._show_ ? self.hide() : self.show();

			});

			this.on("show", function(e, f) {

				f.$trigger.addClass("combo-container--open");
			});

			this.on("hide", function(e, f) {

				f.$trigger.removeClass("combo-container--open");
			});

		},

		valueSetter : function(json) {

			var opts = this._opts_, sdn = opts.startDateName, edn = opts.endDateName;

			if (json === undefined || json === null)
				json = "";

			var value = json;

			if (typeof json == 'string') {

				value = {};

				// 竖线分割
				json = json.split("|");

				// 起始日期
				value[sdn] = json.length && json[0] || "";

				// 结束日期
				value[edn] = json.length > 1 && json[1] || "";
			}

			json = value;

			var startDate = json[sdn] || "", endDate = json[edn] || "";

			if (startDate instanceof Date)
				startDate = formatDate(startDate);

			if (endDate instanceof Date)
				endDate = formatDate(endDate);

			// 真实值
			this.$target.val(startDate ? startDate + "|" + endDate : "");

			// 占位符DOM
			var $placeholder = this.$trigger
					.find(".combo-selection__placeholder");

			// 清除DOM
			var $clear = this.$trigger.find(".combo-selection__clear");

			// 显示文本DOM
			var $text = this.$trigger.find(".combo-selection__text");

			startDate && this.$head.find(".dr-date-start").val(startDate);

			endDate && this.$head.find(".dr-date-end").val(endDate);

			// ///////////////////////////////////////////

			// 清空选择框值
			if (!startDate) {

				$text.hide();

				$clear.hide();

				$placeholder.show();

				return;

			}

			$clear.show();

			$placeholder.hide();

			$text.show().text(startDate + " - " + endDate);

			return this;
		},

		valueGetter : function() {

			var json = {};

			var opts = this._opts_;

			var value = this.$target.val().split("|");

			if (value.length)
				json[opts.startDateName] = value[0];

			if (value.length > 1)
				json[opts.endDateName] = value[1];

			return json;
		},

		rawValueGetter : function() {

			return this.$trigger.find(".combo-selection__text").text();
		},

		headRenderer : function($head) {

			var today = formatDate(new Date());

			var html = [ '<div class="dd-dr-btns">' ];

			// 快捷按钮
			var buttons = this._opts_.buttons, l = buttons.length;

			for (var i = 0, l = buttons.length; i < l; i++) {

				if (i == 0)
					html.push('<div class="clearfix">');

				if (buttons[i] === "|") {

					html.push('</div><div class="clearfix">');

					continue;
				}

				html
						.push(
								'<button class="btn btn-default btn-sm" type="button" data-mode=',
								buttons[i].mode || "start", ' data-delta="',
								buttons[i].delta.toLowerCase(), '">',
								buttons[i].text, '</button>');
			}

			html.push("</div></div>");

			html.push('<div class="dr-label-range">自定义范围:</div>');

			html.push('<div class="dr-date-input clearfix">')
			html
					.push(
							'<input type="text" value="',
							today,
							'" class="pull-left form-control dr-date-start dr-date-focus" readOnly="readOnly">');

			html.push('<div class="pull-left spliter">-</div>');

			html
					.push('<input type="text" value="', today,
							'" class="pull-left form-control dr-date-end" readOnly="readOnly">');

			html
					.push('<button class="btn btn-success btn-sm btn-dr-ok pull-right">应用</button>');

			html.push('</div>');

			$head.html(html.join(""));

		},

		headEventRegister : function($head) {

			var self = this;

			var getPrevMonth=function(date) {
				  
			   var year = date.getFullYear(); //获取当前日期的年份
			   var month = date.getMonth()+1; //获取当前日期的月份
			   var day = date.getDate(); //获取当前日期的日
			  
			   var days = new Date(year, month, 0);
			   days = days.getDate(); //获取当前日期中月的天数
			  
			   var year2 = year;
			   var month2 = parseInt(month) - 1;
			   if (month2 == 0) {
			       year2 = parseInt(year2) - 1;
			       month2 = 12;
			   }
			  
			   var day2 = day;
			   var days2 = new Date(year2, month2, 0);
			  
			   days2 = days2.getDate();
			   if (day2 > days2) 
			       day2 = days2;
			       
			   if (month2 < 10) 
			       month2 = '0' + month2;
				       
			   return new Date(year2+'/'+month2+'/'+day2);
		   };
		   
		   var getNextMonth=function(date) {
			   
			   var year = date.getFullYear(); //获取当前日期的年份
			   var month = date.getMonth()+1; //获取当前日期的月份
			   var day = date.getDate(); //获取当前日期的日
		
			   var days = new Date(year, month, 0);
			   days = days.getDate(); //获取当前日期中的月的天数
			   var year2 = year;
			   var month2 = parseInt(month) + 1;
			   if (month2 == 13) {
			     year2 = parseInt(year2) + 1;
			     month2 = 1;
			   }
				   
			   var day2 = day;
			   var days2 = new Date(year2, month2, 0);
			   days2 = days2.getDate();
			   if (day2 > days2) 
			     day2 = days2;
			   
			   if (month2 < 10) 
			     month2 = '0' + month2;
				
			   return new Date(year2+'/'+month2+'/'+day2);
			
		   	};
		   	
			// 移除年月选择弹出层
			$head.on("click." + this.widgetName, function(e) {

				var $pop = self.$body.find(".dr-pop");

				if ($pop == e.target || $pop.find(e.target).length != 0)
					return;

				$pop.remove();
			});

			var onQuickButtonsClick = function(e) {

				var $button = $(this);

				$button.closest(".dd-dr-btns").find("button").removeClass(
						"btn-primary");

				$button.addClass("btn-primary");

				var delta = $button.data("delta"), mode = $button.data("mode");

				// 年月日相对值
				var deltaD = 0, deltaM = 0, deltaY = 0;

				var type = delta.match(/d|m|y$/);

				// 默认天
				type = type ? type[0] : 'd';

				delta = +delta.replace(/d|m|y$/, '');

				var startDate = null, endDate = null, tmpDate=null,today = new Date();

				// 负值表示往前推,正值表示往后推
				if (type == 'd'){
					
					deltaD = delta;
					
					tmpDate = new Date(today.getFullYear() + deltaY, today.getMonth()+ deltaM, today.getDate() + deltaD);

				}
				
				if (type == 'y'){
					
					deltaD = delta;
					
					tmpDate = new Date(today.getFullYear() + deltaY, today.getMonth()+ deltaM, today.getDate() + deltaD);

				}
				
				if (type == 'm'){
					
					deltaM = delta;
					
					tmpDate=new Date();
					
					for(var i=0,l=Math.abs(deltaM);i<l;i++)
						tmpDate=deltaM > 0 ? getNextMonth(tmpDate) : getPrevMonth(tmpDate);
						
				}

				var $startDate = $head.find(".dr-date-start");

				var $endDate = $head.find(".dr-date-end");

				var $focusDate = $head.find(".dr-date-focus");

				if (!$focusDate.length)
					$focusDate = $startDate.addClass("dr-date-focus");

				// 要求仅仅选择一天
				if (mode == 'equal') {

					$startDate.val(formatDate(tmpDate));

					$endDate.val(formatDate(tmpDate));

				} else {

					if (delta > 0) {

						startDate = today;

						endDate = tmpDate;

					} else {

						endDate = today;

						startDate = tmpDate;

					}

					$startDate.val(formatDate(startDate));

					$endDate.val(formatDate(endDate));

				}

				self.renderBody({
					date : new Date($focusDate.val())
				});

				self.setValue($startDate.val() + "|" + $endDate.val());

				self.hide();

			};

			// 点击快捷按钮
			$head.on("click." + this.widgetName, ".dd-dr-btns button",
					onQuickButtonsClick);

			// 点击应用按钮
			$head.on("click." + this.widgetName, ".btn-dr-ok", function() {

				var $startDate = $head.find(".dr-date-start");

				var $endDate = $head.find(".dr-date-end");

				self.setValue($startDate.val() + "|" + $endDate.val());

				self.hide();
			});

			var onDateInputClick = function(e) {

				self.$head.find(".dr-date-focus").removeClass("dr-date-focus");

				var $focus = $(this).addClass("dr-date-focus");

				var date = $focus.val();

				self.renderBody({
					date : new Date(date)
				});

			};

			// 聚焦文本录入框
			$head.on("click." + this.widgetName, ".dr-date-start,.dr-date-end",
					onDateInputClick);
		},

		bodyRenderer : function($body) {

			// Bootstrap Style
			if (!$body.hasClass("calendar-date"))
				$body.addClass("calendar-date");

			if (!$body.find("> .dr-nav").length)
				$body
						.append('<div class="dr-nav clearfix">'
								+ '<span aria-hidden="true" class="pull-left glyphicon glyphicon-arrow-left">'
								+ '</span><span class="pull-left dr-date-month"></span>'
								+ '<span class="pull-left dr-date-year"></span>'
								+ '<span aria-hidden="true" class="pull-right glyphicon glyphicon-arrow-right"></span>'
								+ '</div>');

			if (!$body.find("> table").length)
				$body
						.append("<table class='table-condensed' cellspacing=10></table>");

			var opts = this._opts_;

			var date = opts.date || new Date();

			$body.find(".dr-date-month").data("month", date.getMonth()).html(
					[ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一",
							"十二", ][date.getMonth()]
							+ "月<i class='caret'></i>");

			$body.find(".dr-date-year").data("year", date.getFullYear()).html(
					date.getFullYear() + '<i class="caret"></i>');

			// 最小值处理
			opts.minDate && setFirstSecondOfDay(opts.minDate);

			// 最大值处理
			opts.maxDate && setLastSecondOfDay(opts.maxDate);

			// 这两个日期限定范围
			var rangeMinDate = this.$head.find(".dr-date-start").val();

			rangeMinDate = rangeMinDate ? new Date(rangeMinDate) : new Date();

			setFirstSecondOfDay(rangeMinDate);

			rangeMinDate = rangeMinDate.getTime();

			var rangeMaxDate = this.$head.find(".dr-date-end").val();

			rangeMaxDate = rangeMaxDate ? new Date(rangeMaxDate) : new Date();

			setLastSecondOfDay(rangeMaxDate);

			rangeMaxDate = rangeMaxDate.getTime();

			// 当前日期
			var current_date = new Date();

			// 绘制日期
			var year = date.getFullYear(), month = date.getMonth() + 1, day = date
					.getDate();

			// 临时计算参数
			var real_date;

			var y = m = d = 0, fmt;

			var count = 1, html = [];

			var selected_str = formatDate(date, "-");

			var current_str = formatDate(current_date, "-");

			var

			// 指定月多少天
			days_in_month = new Date(year, month, 0).getDate(),

			// get the selected month's starting day (from 0 to 6)
			first_day = new Date(year, month - 1, 1).getDay(),

			// 上月显示多少天
			days_in_previous_month = new Date(year, month - 1, 0).getDate(),

			// 下月显示多少天
			days_from_previous_month = first_day - opts.firstDayOfWeek;

			// the final value of how many days are there to
			// be shown from
			// the
			// previous month
			days_from_previous_month = days_from_previous_month < 0 ? 7 + days_from_previous_month
					: days_from_previous_month;

			// 显示周

			html[count++] = '<thead><tr  class="row-week">';

			if (opts.showWeek)
				html[count++] = '<th>周</th>';

			for (var i = 0; i < 7; i++)
				html[count++] = '<th>'
						+ [ "日", "一", "二", "三", "四", "五", "六" ][(opts.firstDayOfWeek + i) % 7]
						+ '</th>';

			html[count++] = '</tr></thead>';

			html[count++] = '<tbody><tr>';

			// 42单元格
			for (i = 0; i < 42; i++) {

				// 一周7天
				if (i > 0 && i % 7 === 0)
					html[count++] = '</tr><tr>';

				// ISO 8601 周序号
				if (opts.showWeek && i % 7 === 0)
					html[count++] = '<td class="cell-week">'
							+ getWeekNo(new Date(year, month - 1, (i
									- days_from_previous_month + 1))) + '</td>';

				// the number of the day in month
				var day = (i - days_from_previous_month + 1);

				real_date = new Date(year, month - 1, day, 0, 0, 0, 0);

				if (i < days_from_previous_month) {

					// 不显示上一月日期
					if (!opts.showOtherMonth) {

						html[count++] = '<td class="disabled">&nbsp;</td>';
					} else {

						html[count++] = '<td data-month="-1" data-day="';

						html[count++] = rpad(days_in_previous_month
								- days_from_previous_month + i + 1);

						html[count++] = '" class="prev';

						// 不合法
						if (!isDateLegal(real_date, opts)) {

							html[count++] = ' disabled';
						} else {

							// 可选
							html[count++] = ' available';

							// 日期是否是可选范围内
							html[count++] = isDateInRange(real_date,
									rangeMinDate, rangeMaxDate) ? ' in-range'
									: ' off';
						}

						html[count++] = '" >';

						html[count++] = rpad(days_in_previous_month
								- days_from_previous_month + i + 1);

						html[count++] = '</td>';

					}

					continue;
				}

				if (day > days_in_month) {

					// 不显示下一月日期
					if (!opts.showOtherMonth) {

						html[count++] = '<td class="disabled">&nbsp;</td>';
					} else {

						html[count++] = '<td data-month="1" data-day="';

						html[count++] = rpad(day - days_in_month);

						html[count++] = '" class="next';

						// 不合法
						if (!isDateLegal(real_date, opts)) {

							html[count++] = ' disabled';
						} else {

							// 可选
							html[count++] = ' available';

							// 日期是否是可选范围内
							html[count++] = isDateInRange(real_date,
									rangeMinDate, rangeMaxDate) ? ' in-range'
									: ' off';
						}

						html[count++] = '" >';

						html[count++] = rpad(day - days_in_month);

						html[count++] = '</td>';
					}

					continue;
				}

				html[count++] = '<td data-day="';

				html[count++] = rpad(day);

				html[count++] = '" class="';

				// 不合法
				if (!isDateLegal(real_date, opts)) {

					html[count++] = 'disabled';
				} else {

					// 可选
					html[count++] = 'available';

					// 日期是否是可选范围内
					if (isDateInRange(real_date, rangeMinDate, rangeMaxDate))
						html[count++] = ' in-range';

					var real_str = formatDate(real_date, "-");

					// 当前日期
					if (real_str == current_str)
						html[count++] = ' current';

					// 选中日期
					if (real_str == selected_str)
						html[count++] = ' active';

				}

				html[count++] = '" >';

				html[count++] = rpad(day);

				html[count++] = '</td>';

			}

			html[count++] = '</tr></tbody>';

			$body.find("> table").html(html.join(""));

		},

		bodyEventRegister : function($body) {

			var self = this;

			// 默认日期框哪个聚焦
			this.on("show", function(e, f) {

				var $head = f.$head;

				// 移除弹出层
				f.$body.find(".dr-pop").remove();

				// 默认开始时间焦点
				if ($head && !$head.find(".dr-date-focus").length)
					$head.find(".dr-date-start").addClass("dr-date-focus");

			});

			// 选择日期
			$body.on("click." + this.widgetName, ".available", function(e) {

				// 移除弹出层
				$body.find(".dr-pop").remove();

				var $head = self.$head;

				$head.find(".btn-primary").removeClass("btn-primary");

				var $startDate = $head.find(".dr-date-start"), $endDate = $head
						.find(".dr-date-end");

				var $focus = $startDate.hasClass("dr-date-focus") ? $startDate
						: $endDate;

				var $day = $(this), day = $day.data("day"), date = $focus.val()
						.split("/");

				// 重新计算日期
				date = new Date(date[0], +date[1] - 1
						+ ($day.data("month") || 0), day, 0, 0, 0, 0);

				// 真实日期
				$focus.val(date.getFullYear() + "/" + rpad(date.getMonth() + 1)
						+ "/" + day);

				// 如果开始日期大于起始日期，要做修正了
				if (new Date($startDate.val()).getTime() > new Date($endDate
						.val()).getTime()) {

					$startDate.val($focus.val());

					$endDate.val($focus.val());
				}

				self.renderBody({
					date : date
				});

				// self.setValue($startDate.val() + "|" + $endDate.val());

				self.trigger("select", self.getValue());

				return false;
			});

			var onPrevOrNextMonthClick = function() {

				var $head = self.$head;

				var $startDate = $head.find(".dr-date-start");

				var $endDate = $head.find(".dr-date-end");

				var $focusDate = $startDate;

				if ($endDate.hasClass("dr-date-focus"))
					$focusDate = $endDate;

				var date = new Date($focusDate.val());

				var delta = $(this).hasClass("glyphicon-arrow-left") ? -1 : 1;

				date = new Date(date.getFullYear(), date.getMonth() + delta,
						date.getDate());

				$focusDate.val(formatDate(date));

				// 简单比较方式
				var startDate = +$startDate.val().replace(/\/|-/g, "");

				var endDate = +$endDate.val().replace(/\/|-/g, "");

				// 结束时间怎能大于开始时间
				if (startDate > endDate) {

					// 编辑开始日期
					if ($focusDate[0] == $startDate[0])
						$endDate.val($startDate.val());
					else
						$startDate.val($endDate.val());
				}

				self.renderBody({
					date : date
				});

				// self.setValue($startDate.val() + "|" +
				// $endDate.val());

				self.trigger("select", self.getValue());

			};

			// 移除年月选择弹出层
			$body.on("click." + this.widgetName, function(e) {

				var $pop = $body.find(".dr-pop");

				if ($pop == e.target || $pop.find(e.target).length != 0)
					return;

				$pop.remove();
			});

			// 上一月 OR 下一月
			$body.on("click." + this.widgetName, ".dr-nav .glyphicon",
					onPrevOrNextMonthClick);

			// 创建下拉项
			var createPopItem = function(value, current, isYear) {

				var html = [], it, text;

				for (var i = 0; i < 12; i++) {

					it = isYear ? (value - 5) + i : i;

					text = isYear ? (value - 5) + i : [ "一", "二", "三", "四",
							"五", "六", "七", "八", "九", "十", "十一", "十二" ][i]
							+ "月";

					html.push('<li class="', current == it ? 'active' : '',
							'" data-value="', it, '">', text, '</li>');
				}

				return html.join("");

			};

			var onPopMonthOrYearClick = function(e) {

				// 删除原来的
				$body.find(".dr-pop").remove();

				var $this = $(this), current = $this.data("year");

				var isYear = current ? true : false;

				if (!isYear)
					current = $this.data("month");

				var html = [ '<div class="dr-pop dr-pop-',
						isYear ? 'year' : 'month', '">' ];

				if (isYear)
					html
							.push('<div class="dr-pop-delta"><i data-delta="-7" class="caret caret-up"></i></div>');

				html.push('<ul class="list-unstyled">');

				html.push(createPopItem(current, current, isYear));

				html.push('</ul>');

				if (isYear)
					html
							.push('<div class="dr-pop-delta"><i data-delta="6" class="caret caret-down"></i></div>');

				$(html.join("")).appendTo($body);

				return false;
			};

			// 选择年月
			$body.on("click." + this.widgetName,
					".dr-date-year,.dr-date-month", onPopMonthOrYearClick);

			$body.on("mouseenter." + this.widgetName, '.dr-pop li', function() {

				$(this).addClass("hover");

			}).on("mouseleave." + this.widgetName, '.dr-pop li', function() {

				$(this).removeClass("hover");

			});

			// 年下拉更新
			$body.on("click." + this.widgetName, ".dr-pop .caret", function(e) {

				var $this = $(this), $ul = $this.closest(".dr-pop").find("ul");

				var delta = +$this.data("delta");

				// 下一页
				var value = $ul.find(delta > 0 ? "li:last" : "li:first").data(
						"value");

				value += delta;

				var current = $body.find(".dr-date-year").text();

				$ul.html(createPopItem(value, current, true));
			});

			var onPopItemClick = function(e) {

				var months = [ "一", "二", "三", "四", "五", "六", "七", "八", "九",
						"十", "十一", "十二" ];

				var $this = $(this), $pop = $this.closest(".dr-pop");

				var value = $this.data("value");

				var isYear = $pop.hasClass("dr-pop-year");

				var $span = isYear ? $body.find(".dr-date-year") : $body
						.find(".dr-date-month");

				$span.html((isYear ? value : (months[value] + "月"))
						+ "<i class='caret'></i>");

				var $startDate = self.$head.find(".dr-date-start"), $endDate = self.$head
						.find(".dr-date-end");

				var $focusDate = $startDate.hasClass("dr-date-focus") ? $startDate
						: $endDate;

				var focusDate = new Date($focusDate.val());

				focusDate[isYear ? "setFullYear" : "setMonth"](value);

				$focusDate.val(formatDate(focusDate));

				// 简单比较方式
				var startDate = +$startDate.val().replace(/\/|-/g, "");

				var endDate = +$endDate.val().replace(/\/|-/g, "");

				// 结束时间怎能大于开始时间
				if (startDate > endDate) {

					// 编辑开始日期
					if ($focusDate[0] == $startDate[0])
						$endDate.val($startDate.val());
					else
						$startDate.val($endDate.val());
				}

				self.renderBody({
					date : focusDate
				});

				$pop.remove();

				return false;
			};

			// 弹出层选择年月
			$body.on("click." + this.widgetName, '.dr-pop li', onPopItemClick);
		}
	};

	// ///////////////////////////////////////////////////////////////////

	function DateRange($ele, opts) {

		DropDown.call(this, $ele, opts);

		return this;
	}

	DateRange.prototype = DropDown.prototype;

	$.fn.DateRange = function(options) {

		var opts = $.extend({
			event : "click"
		}, DateRangeConfig, options);

		var api = this.data('DropDown');

		return api ? api : new DateRange(this, opts);
	};

})(jQuery);
