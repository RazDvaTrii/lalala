window.onload = function () {  
    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        console.log('clicked');
        sum();
    })
    document.getElementById('firstName').focus();
    var inputs;
    var all;
    var person = {};
    bal = 0;
    
    //enter event
    all = document.getElementsByClassName("move");
    inputs = document.querySelectorAll("input,select");
    for (var i = 0 ; i < inputs.length; i++) {
        inputs[i].addEventListener("keypress", function(e){
            if (e.which == 13) {
                e.preventDefault();
                var nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
                var currentInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex) + '"]')[0];
                if(this.tabIndex === 10){
                    sum();
                } else {
                    setStudentAtribute(currentInput.id, currentInput);
                    nextInput[0].focus();
                }
            }
        })
    }
    function setStudentAtribute(atribute, field){
    person[atribute] = field.value;
    }
    
    //arrows
    document.addEventListener("keydown", function(e){
        if(e.keyCode === 38 || e.keyCode ===40){
            detectArrows(e);
        }
       
    });
    function detectArrows(e){
        let arr = document.querySelectorAll(".move");
        let me = document.querySelectorAll(".move:focus")[0];
        let arrLen = arr.length;
        let index;
        
        arr.forEach( (key, value) => {            
            if (key.id === me.id) {
                index = value
                //console.log(index);
            }
        })
    
        if (e.keyCode == 38) {
            var b;
            b = index - 1 >= 0 ? index - 1 : 0;
            e.preventDefault();
            arr[b].focus();
        }
        else if (e.keyCode == 40) {
            var b;
            b = index + 1 <= arrLen ? index+1 : arrLen;
            e.preventDefault();
            arr[b].focus();
        }
        if(e.keyCode != 38 || e.keyCode != 40){
            return;
        }
    }
    
    //validaciq
    function setInputFilter(textbox, inputFilter){
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event){
            textbox.addEventListener(event,function(){
                if(inputFilter(this.value)){
                    this.oldValue = this.value;
                    this.OldSelectionStart = this.selectionStart;
                    this.OldSecetionEnd = this.selectionEnd;
                } else if(this.hasOwnProperty("oldValue")){
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelecitonStart, this.oldSelectionEnd);
                }
            });
        });
    }
    
    setInputFilter(document.getElementById("firstName"), function(value) {
    return /^[a-zA-Z]*$/i.test(value); });
    setInputFilter(document.getElementById("lastName"), function(value) {
    return /^[a-zA-Z]*$/i.test(value); });
    setInputFilter(document.getElementById("age"), function(value) {
    return /^\d*$/.test(value); });
    setInputFilter(document.getElementById("klas"), function(value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) >= 7 && parseInt(value)<=10);});
    setInputFilter(document.getElementById("school"), function(value) {
    return /^[a-zA-Z]*$/i.test(value); });
    setInputFilter(document.getElementById("wantedSchool"), function(value) {
    return /^[a-zA-Z]*$/i.test(value); });
    setInputFilter(document.getElementById("mathGrade"), function(value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) >= 2 && parseInt(value) <= 6); });
    setInputFilter(document.getElementById("bgGrade"), function(value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) >= 2 && parseInt(value) <= 6); });
    setInputFilter(document.getElementById("mathExam"), function(value) {
    return /^[0-9]+\.[0-9][0-9]$/.test(value) || (value === "" || parseInt(value) <= 100); });
    setInputFilter(document.getElementById("bgExam"), function(value) {
    return /\A(\d{1,3})(?:.)?(?:\d{1,3})?\z/.test(value) || (value === "" || parseInt(value) <= 100); });
    // return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); });
    
    
    function sum(){
        let l = document.getElementById('wantedSchool').value;
        let m = Number(document.getElementById('mathExam').value);
        let b = Number(document.getElementById('bgExam').value);
        let bal = ifs();
        switch(l)
        {
            case "MG":
                bal+= 3*m + b;
                var result = parseFloat(bal).toFixed(3);
                if(bal > 400){
                    setTimeout(() => {
                        swal({
                            title: "Поздравления, " + document.getElementById('firstName').value + " " + document.getElementById('lastName').value + "!",
                            text: "Вие сте приет/а  в " + l + "\nВашият БАЛ е  " + result,
                            icon: "success",
                          });
                    }, 2200);
                }
                else{
                    setTimeout(() => {
                        swal({
                            title: "Съжалявамe!, " + document.getElementById('firstName').value + " " + document.getElementById('lastName').value + "!",
                            text: "Вие не сте приет/а в " + l + "\nВашият БАЛ е  " + result,
                            icon: "error",
                          });
                    }, 2100);
                }
                break;
            case"Toha" :
                bal+= 2*m + 2*b;
                var result = parseFloat(bal).toFixed(3);
                if(bal > 276){
                    setTimeout(() => {
                        swal({
                            title: "Поздравления!, " + document.getElementById('firstName').value + " " + document.getElementById('lastName').value + "!",
                            text: "Вие сте приет/а в " + l + "\nВашият БАЛ е  " + result,
                            icon: "success",
                          });
                    }, 2100);
                }
                else{
                    setTimeout(() => {
                        swal({
                            title: "Съжалявамe!, " + document.getElementById('firstName').value + " " + document.getElementById('lastName').value + "!",
                            text: "Вие не сте приет/а в " + l + "\nВашият БАЛ е  " + result,
                            icon: "error",
                          });
                    }, 2100);
                }
                break;
            default:
                setTimeout(() => {
                    swal({
                        title: "Нещо се обърка!",
                        text: "Въведете съществуващо училище!",
                        icon: "error",
                    });
                }, 2100);
        }
    }
    function ifs(){
        let bal = 0;
        let c = document.getElementById('mathGrade').value;
        let d = document.getElementById('bgGrade').value;
        if(c == 6){
        bal+=50;
        } if(d == 6) {
        bal+=50;
        } if(c == 5){
        bal+=39;
        } if(d == 5){
        bal+=39;
        } if(c == 4){
        bal+=26;
        } if(d == 4){
        bal+=26;
        } if(c == 3){
        bal+=15;
        } if(d == 3){
        bal+=15;
        } else {
            bal+=0;
        } return bal;
    }
    
    
    document.getElementById('firstName').value='';
    document.getElementById('lastName').value='';
    document.getElementById('age').value='';
    document.getElementById('klas').value='';
    document.getElementById('school').value='';
    document.getElementById('wantedSchool').value='';
    document.getElementById('mathGrade').value='';
    document.getElementById('bgGrade').value='';
    document.getElementById('mathExam').value='';
    document.getElementById('bgExam').value='';
}