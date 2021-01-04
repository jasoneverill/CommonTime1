'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
    /**
    * timedate
    * @attribute {string} label
    */
    customElements.define("time-picker", function (_HTMLElement) {
        _inherits(TimePicker, _HTMLElement);

        function TimePicker(self) {
            var _this, _ret;

            _classCallCheck(this, TimePicker);

            self = (_this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, self)), _this);
            self._buildElements();
            self._debouncer = null;
            return _ret = self, _possibleConstructorReturn(_this, _ret);
        }

        _createClass(TimePicker, [{
            key: 'connectedCallback',
            value: function connectedCallback() {

                this._render();
                this._fireChange();

                //add datepicker
                $('#' + this.idPrefix + '_datetimepicker').datetimepicker({
                    format: 'DD/MM/YYYY',
                    icons: {
                        next: "fa fa-chevron-right",
                        previous: "fa fa-chevron-left",
                        up: "fa fa-chevron-up",
                        down: "fa fa-chevron-down"
                    }
                });
            }
        }, {
            key: '_buildElements',
            value: function _buildElements() {
                var _this2 = this;

                this.idPrefix = 'el_' + new Date().getTime();

                this.txtTime = document.createElement("input");
                this.txtTime.setAttribute("id", "txtTime");
                this.txtTime.setAttribute("type", "text");
                this.txtTime.addEventListener("blur", function (_) {
                    _this2._fireChange();
                });
                922;
            }
        }, {
            key: '_render',
            value: function _render() {

                var html = '\n                <style>td{text-align:center;} .input-group{display:flex;}.input-group-addon{width:inherit;}>\n                                             <span class="fa fa-calendar-o"></span>\n                               </span>}}\n                </style>\n                    <label>' + this.getAttribute("label") + ': </label><br/>\n                    <div class="field time">\n                        <div class="input-group date" id="' + this.idPrefix + '_datetimepicker">\n                            <span class="input-group-addon">\n                            <span class="fa fa-calendar-o"></span>\n                            </span>\n                         <div class="inject"></div>\n                              </div>\n                                                                                </div>\n            ';

                var el = document.createElement("div");
                el.innerHTML = html;

                el.querySelector(".field.time .inject").appendChild(this.txtTime);
                this.innerHTML = "";
                this.appendChild(el);
            }
        }, {
            key: '_fireChange',
            value: function _fireChange() {
                var _this3 = this;

                if (this._debouncer) clearTimeout(this._debouncer);
                this._debouncer = setTimeout(function (_) {
                    _this3.dispatchEvent(new CustomEvent("change"));
                }, 100);
            }

            /**
             * Get the time
             * @model
             * @returns {string}
             */

        }, {
            key: 'time',
            get: function get() {
                return this.txtTime.value;
            }
            /**
             * Set the time
             * @param {string} val
             */
            ,
            set: function set(val) {
                this.txtTime.value = val || "";
            }
        }]);

        return TimePicker;
    }(HTMLElement));
})();