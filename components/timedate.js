(function () {
   /**
   * timedate
   * @attribute {string} label
   */
    customElements.define("time-picker", class TimePicker extends HTMLElement {

        constructor(self) {

            self = super(self);
            self._buildElements();
            self._debouncer = null;
            return self;
        }

        connectedCallback() {

            this._render();
            this._fireChange();

          //add datepicker
               $('#'+this.idPrefix+'_datetimepicker').datetimepicker({
              format: 'DD/MM/YYYY',
              icons:{
               next:"fa fa-chevron-right",
                previous:"fa fa-chevron-left",
                up:"fa fa-chevron-up",
                down:"fa fa-chevron-down"
              }
            });
        }

        _buildElements() {

            this.idPrefix = `el_${new Date().getTime()}`;

            this.txtTime = document.createElement("input");
               this.txtTime.setAttribute("id", "txtTime");
            this.txtTime.setAttribute("type", "text");
               this.txtTime.addEventListener("blur", _ => { this._fireChange() });
          922
        }

        _render() {

            let html = `
                <style>td{text-align:center;} .input-group{display:flex;}.input-group-addon{width:inherit;}>
                                             <span class="fa fa-calendar-o"></span>
                               </span>}}
                </style>
                    <label>${this.getAttribute("label")}: </label><br/>
                    <div class="field time">
                        <div class="input-group date" id="${this.idPrefix}_datetimepicker">
                            <span class="input-group-addon">
                            <span class="fa fa-calendar-o"></span>
                            </span>
                         <div class="inject"></div>
                              </div>
                                                                                </div>
            `;

            var el = document.createElement("div");
            el.innerHTML = html;

            el.querySelector(".field.time .inject").appendChild(this.txtTime);
            this.innerHTML = "";
            this.appendChild(el);
        }

        _fireChange() {

            if (this._debouncer) clearTimeout(this._debouncer);
            this._debouncer = setTimeout(_ => {
                this.dispatchEvent(new CustomEvent("change"));
            }, 100);
        }

        /**
         * Get the time
         * @model
         * @returns {string}
         */
        get time() {
            return this.txtTime.value;
        }
        /**
         * Set the time
         * @param {string} val
         */
        set time(val) {
            this.txtTime.value = val || "";
        }

    });

})();
